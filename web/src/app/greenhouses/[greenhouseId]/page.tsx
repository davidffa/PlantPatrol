"use client"
import { useState, useEffect } from 'react';

import SolarPower from '@mui/icons-material/SolarPower'
import OpacityIcon from '@mui/icons-material/Opacity';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import Co2Icon from '@mui/icons-material/Co2';
import AddIcon from '@mui/icons-material/Add';

import { SensorChart } from '../../../components/charts/SensorChart'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";


import withAuth from '@/lib/withAuth'
import { Navbar } from '@/components/Navbar';
import api from '@/services/api'

import Swal from 'sweetalert2'


type Props = {
  params: { greenhouseId: string }
}

type Rule = {
  id?: string,
  name: string,
  minTemp: number,
  maxTemp: number,
  minHumidity: number,
  maxHumidity: number,
  minAIQ: number,
  maxAIQ: number,
  waterSystemFlow: number,
  ventilationRPM: number,
  airPurifier: boolean,
}

type Microcontroller = {
  controllerId: string;
  greenhouseId: string | null;
};

type SensorReading = {
  controllerId: string;
  readingType: ReadingType;
  temperature: number;
  humidity: number;
  aiq: number;
  uv: number;
  timestamp: string;
};

type ReadingType = "INSTANT" | "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY";

Chart.register(CategoryScale);

function GreenHouse({ params }: Props) {
  const { greenhouseId } = params;

  const [selectedSensors, setSelectedSensors] = useState<Record<number, boolean>>({
    0: true, // UVLight
    1: true, // Temperature
    2: true, // Humidity
    3: true, // AirQuality
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [availableMicrocontrollers, setAvailableMicrocontrollers] = useState<Microcontroller[]>([]);
  const [microcontrollers, setMicrocontrollers] = useState<Microcontroller[]>([]);
  const [tipo, setTipo] = useState<ReadingType>("DAILY");
  const [resp, setResp] = useState<SensorReading[]>([]);

  useEffect(() => {
    async function getAvailableMicrocontrollers() {
      const { data } = await api.get<Microcontroller[]>(`/controller`);
      setAvailableMicrocontrollers(data);
    }

    async function getMicrocontrollers() {
      const { data } = await api.get<Microcontroller[]>(`/greenhouse/${greenhouseId}/controllers`);
      setMicrocontrollers(data);

    }
    getAvailableMicrocontrollers();
    getMicrocontrollers();
    getRules();
  }, [greenhouseId]);

  useEffect(() => {
    async function getSensorsData(tipo: ReadingType) {
      const { data } = await api.get<SensorReading[]>(`/greenhouse/${greenhouseId}/sensors-data`, { params: { "type": tipo } });
      setResp(data.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()));
    }

    getSensorsData(tipo);
  }, [tipo]);

  useEffect(() => {
    function updateLabels(data: SensorReading[]) {
      microcontrollers.forEach(mc => {
        setChartLabels(prev => {
          return {
            ...prev,
            [mc.controllerId]: extractLabels(data, mc.controllerId)
          }
        })
      })
    }
    updateLabels(resp);
  }, [resp, microcontrollers]);

  const selectedStyle = "text-white bg-green"
  const selectedInterval = "text-green bg-white shadow-xl"

  const [rules, setRules] = useState<Rule[]>([])
  const [chartLabels, setChartLabels] = useState<Record<string, string[]>>({});

  const toggleSensor = (sensorId: number) => {
    setSelectedSensors((prev) => ({
      ...prev,
      [sensorId]: !prev[sensorId],
    }));
  };

  function extractLabels(data: SensorReading[], controllerId: string): string[] {
    return data.reduce<string[]>((acc, curr) => {
      if (curr.controllerId === controllerId) {
        switch (curr.readingType) {
          case "HOURLY": {
            acc.push(new Date(curr.timestamp).getHours().toString());
          } break;
          case "DAILY": {
            acc.push(new Date(curr.timestamp).getDate().toString());
          } break;
          case "WEEKLY": {
            acc.push(Math.ceil(new Date(curr.timestamp).getDate() / 7).toString());
          } break;
          case "MONTHLY": {
            acc.push(new Date(curr.timestamp).getMonth().toString());
          } break;
        }
      }

      return acc;
    }, []);
  }

  async function handleDeleteRule(id_rule: string | undefined) {
    const result = await Swal.fire({
      title: "Delete employee rule?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "red"
    });

    if (result.isConfirmed) {
      api.delete(`rules/${greenhouseId}/${id_rule}`).then(async (response) => {
        if (response.status == 204) {
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Rule deleted!"
          }).then(() => {
            setRules(rules.filter(r => r.id !== id_rule))
          })

        }
        else {
          Swal.fire({
            icon: "error",
            title: "Unexpected Error",
            text: `There was an unexpected error. ${response.data}`
          })
        }
      })
    }
  }
  const getRules = () => {
    try {
      api.get(`greenhouse/${greenhouseId}/rules`).then((response) => {
        if (response.status == 200) {
          setRules(response.data)
        }
      }).catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Unexpected Error",
          text: `There was an unexpected error. ${error}`
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
  async function handleAddMicrocontroller(mc: Microcontroller) {
    await api.patch(`/controller/${greenhouseId}`, mc).then((response) => {
      if (response.status == 204) {
        setMicrocontrollers((prev) => [...prev, mc]);
        setAvailableMicrocontrollers((prev) => prev.filter((mc2) => mc2.controllerId !== mc.controllerId));
        setIsModalOpen(false);
        Swal.fire("Success", "Microcontroller added successfully!", "success");
      } else {
        setIsModalOpen(false);
        Swal.fire({
          icon: "error",
          title: "Unexpected Error",
          text: "There was an unexpected error."
        })
      }
    })
  }

  async function handleDeleteMicrocontroller(mcId: string) {
    const result = await Swal.fire({
      title: "Delete this microcontroller?",
      text: "This action cannot be undone!",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    });
    if (result.isConfirmed) {
      await api.patch(`/controller/${greenhouseId}/${mcId}`).then((response) => {
        if (response.status == 204) {
          setMicrocontrollers((prev) => prev.filter((mc) => mc.controllerId !== mcId));
          setAvailableMicrocontrollers((prev) => [...prev, { controllerId: mcId, greenhouseId: null }]);
          Swal.fire("Success", "Microcontroller deleted successfully!", "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "Unexpected Error",
            text: "There was an unexpected error."
          })
        }
      }
      )
    };
  }

  return (
    <>
      <Navbar />
      <div className='w-full p-2 my-6 text-center flex-col justify-center'>
        <div className="text-5xl text-black p-3">
          Greenhouse
        </div>
        {/* filters */}
        <div className='w-3/4 mx-auto flex-col my-10'>
          {/* active button */}
          {/* time filter */}
          <div className='w-5/7 min-w-[200px] bg-green text-white flex justify-evenly p-2 rounded-badge'>
            <button onClick={() => setTipo("HOURLY")} className={`${"HOURLY" == tipo ? selectedInterval : selectedStyle} text-center text-md font-bold w-fit p-3 px-5 transition-all ease-in  rounded-badge`} >Day</button>
            <button onClick={() => setTipo("DAILY")} className={`${"DAILY" == tipo ? selectedInterval : selectedStyle} text-center text-md font-bold w-fit p-3 px-5 transition-all ease-in  rounded-badge`} >Week</button>
            <button onClick={() => setTipo("WEEKLY")} className={`${"WEEKLY" == tipo ? selectedInterval : selectedStyle} text-center text-md font-bold w-fit p-3 px-5 transition-all ease-in  rounded-badge`} >Month</button>
            <button onClick={() => setTipo("MONTHLY")} className={`${"MONTHLY" == tipo ? selectedInterval : selectedStyle} text-center text-md font-bold w-fit p-3 px-5 transition-all ease-in  rounded-badge`} >Year</button>
          </div>


          <div className="flex items-center justify-between w-3/4 mx-auto my-4">
            <div className="flex-1"></div>
            {/* Sensor Buttons */}
            <div className="flex gap-4 justify-center">
              {[
                { id: 0, name: "UVLight", icon: <SolarPower fontSize="large" /> },
                { id: 1, name: "Temperature", icon: <DeviceThermostatIcon fontSize="large" /> },
                { id: 2, name: "Humidity", icon: <OpacityIcon fontSize="large" /> },
                { id: 3, name: "AirQuality", icon: <Co2Icon fontSize="large" /> },
              ].map((sensor) => (
                <button
                  key={sensor.id}
                  onClick={() => toggleSensor(sensor.id)}
                  className={`aspect-square hover:scale-110 transition ease-in-out hover:shadow-md-fit rounded-full text-md p-4 text-center flex align-middle ${selectedSensors[sensor.id] ? "bg-green text-white" : "bg-beje text-brown"
                    }`}
                >
                  {sensor.icon}
                </button>
              ))}
            </div>

            {/* Add Microcontroller Button */}
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green text-white p-3 rounded-md"
              >
                Add Microcontroller
              </button>
            </div>
          </div>

          {/* Microcontrollers */}
          {microcontrollers?.map((mc) => (
            <div key={mc.controllerId} className="my-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Micro-controller:{mc.controllerId}</h3>
                <button
                  onClick={() => handleDeleteMicrocontroller(mc.controllerId)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 w-5/6 mx-auto">
                {Object.keys(selectedSensors)
                  .filter((key) => selectedSensors[Number(key)])
                  .map((sensorId) => (
                    <div key={`${mc.controllerId}-${sensorId}`} className="w-full p-3">
                      {
                        sensorId === "0"
                          ? (
                            <SensorChart data={{
                              labels: chartLabels[mc.controllerId],
                              datasets: [
                                {
                                  label: "Temperature (ºC)",
                                  data: resp.filter(r => r.controllerId === mc.controllerId).map(r => r.temperature),
                                  borderColor: "red",
                                  fill: true,
                                }
                              ]
                            }} />
                          )
                          : sensorId === "1"
                            ? (
                              <SensorChart data={{
                                labels: chartLabels[mc.controllerId],
                                datasets: [
                                  {
                                    label: "Humidity (%)",
                                    data: resp.filter(r => r.controllerId === mc.controllerId).map(r => r.humidity),
                                    borderColor: "green",
                                    fill: true,
                                  }
                                ]
                              }} />
                            )
                            : sensorId === "2"
                              ? (
                                <SensorChart data={{
                                  labels: chartLabels[mc.controllerId],
                                  datasets: [
                                    {
                                      label: "UV Light Index",
                                      data: resp.filter(r => r.controllerId === mc.controllerId).map(r => r.uv),
                                      borderColor: "orange",
                                      fill: true,
                                    }
                                  ]
                                }} />
                              )
                              : (
                                <SensorChart data={{
                                  labels: chartLabels[mc.controllerId],
                                  datasets: [
                                    {
                                      label: "Air Quality (AQI)",
                                      data: resp.filter(r => r.controllerId === mc.controllerId).map(r => r.aiq),
                                      borderColor: "gray",
                                      fill: true,
                                    }
                                  ]
                                }} />
                              )
                      }
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-3/4 max-w-xl rounded-lg shadow-lg p-6 relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Available Microcontrollers</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-black"
                >
                  ✖
                </button>
              </div>
              <ul className="flex flex-col gap-4">
                {!availableMicrocontrollers.length ?
                  <h3>Please connect a new microcontroller!</h3>
                  :
                  availableMicrocontrollers.map((mc) => (
                    <li
                      key={mc.controllerId}
                      className="flex justify-between items-center bg-gray-100 rounded-lg p-3 shadow-md"
                    >
                      <span className="text-lg">{mc.controllerId}</span>
                      <button
                        onClick={() => handleAddMicrocontroller(mc)}
                        className="bg-green text-white p-2 rounded-md"
                      >
                        Add
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}

        {/* Rules */}
        <div className='w-5/6 mx-auto p-3 flex flex-col'>
          <div className='w-full flex flex-row'>
            <div className='w-1/2 flex justify-start text-2xl font-bold text-black'>
              Action
            </div>
            <div className='w-1/2 flex justify-end'>
              <a href={`${greenhouseId}/rules/new/0`} className='flex flex-row gap-2 text-green '>
                Add New
                <AddIcon />
              </a>
            </div>
          </div>

          <div className="divider"></div>
          <div className='w-full flex flex-col gap-3 p-3'>
            {
              rules?.map((rule, idx) => (

                <div key={idx} className='w-full bg-gray-300 text-black grid grid-cols-2 rounded-lg gap-y-3'>
                  <div className='text-xl text-black flex font-semibold text-left p-3 justify-start my-auto'>
                    {rule.name}
                  </div>
                  <div className='flex flex-row gap-2 p-3 justify-end '>
                    <a href={`${greenhouseId}/rules/new/${rule.id}`} className="w-[150px] rounded-lg p-3 bg-green text-white text-center">
                      edit
                    </a>
                    <button onClick={() => handleDeleteRule(rule.id)} className="w-[150px] rounded-lg p-3 bg-red-700 text-white">
                      delete
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuth(GreenHouse)

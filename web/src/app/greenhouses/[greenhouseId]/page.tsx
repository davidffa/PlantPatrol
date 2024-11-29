"use client"
import { useState,useEffect } from 'react';

import SolarPower from '@mui/icons-material/SolarPower'
import OpacityIcon from '@mui/icons-material/Opacity';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import Co2Icon from '@mui/icons-material/Co2';
import AddIcon from '@mui/icons-material/Add';

import { SensorChart } from '../../../components/charts/SensorChart'
import { DataCharts as data } from "../../../utils/data"

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

enum SensorEnum {
  Temperature,
  Humidity,
  UVLight,
  AirQuality
}
enum IntervalEnum {
  Day,
  Week,
  Month,
  Year
}

Chart.register(CategoryScale);

 function GreenHouse({ params }: Props) {

  type Sensor = {
    id: number;
    name: string;
    icon: JSX.Element; // Define the icon property as a JSX.Element
  };

  const [sensors, setSensors] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
  });
  const [interval, setInterval] = useState<IntervalEnum>(IntervalEnum.Day)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO: Replace with actual sensors from the database
  const availableSensors: Sensor[] = [
    { id: 0, name: "UVLight", icon: <SolarPower fontSize="large" /> },
    { id: 1, name: "Temperature", icon: <DeviceThermostatIcon fontSize="large" /> },
    { id: 2, name: "Humidity", icon: <OpacityIcon fontSize="large" /> },
    { id: 3, name: "AirQuality", icon: <Co2Icon fontSize="large" /> },
  ];

  // the id to make the request to the database it could be anything passed as the paramenter
  const { greenhouseId } = params;

  const sensorChange = (type: SensorEnum) => {
    //changes the presented charts
    setSensors(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  }

  const selectedStyle = "text-white bg-green"
  const selectedInterval = "text-green bg-white shadow-xl"
  const [rules, setRules] = useState<Rule[]>([])

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
                  }).then(()=>{
                      setRules(rules.filter(r=> r.id !== id_rule))
                    })

              }
              else{
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
          }).catch((error)=>{
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
  const handleAddSensor = (sensorId: number) => {
    console.log(`Adding sensor with ID: ${sensorId}`);
    // You can make an API call here to add the sensor
    api.post(`/greenhouse/${greenhouseId}/add-sensor`, { sensorId })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire("Success", "Sensor added successfully!", "success");
          // Optionally update state to reflect the added sensor
          setSensors((prev) => ({ ...prev, [sensorId]: true }));
        } else {
          Swal.fire("Error", "Failed to add sensor.", "error");
        }
      })
      .catch((error) => {
        console.error("Error adding sensor:", error);
        Swal.fire("Error", "Failed to add sensor.", "error");
      });
  
    // Close the modal after adding
    setIsModalOpen(false);
  };

  const handleDeleteSensor = async (sensorId: number) => {
    const result = await Swal.fire({
      title: "Delete this sensor?",
      text: "This action cannot be undone!",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    });
  
    if (result.isConfirmed) {
      try {
        // API call to delete the sensor (if required)
        // await api.delete(`/greenhouse/${greenhouseId}/remove-sensor/${sensorId}`);
  
        // Update state to reflect sensor deletion
        setSensors((prev) => ({
          ...prev,
          [sensorId]: false,
        }));
  
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Sensor deleted successfully!",
        });
      } catch (error) {
        console.error("Error deleting sensor:", error);
        Swal.fire("Error", "Failed to delete the sensor.", "error");
      }
    }
  };

  useEffect(() => {
      getRules()
  },[getRules])

  return (
    <>
    <Navbar />
      <div className='w-full p-2 my-6 text-center flex-col justify-center'>
        <div className="text-5xl text-black p-3">
          GreenHouse
        </div>
        {/* filters */}
        <div className='w-3/4 mx-auto flex-col my-10'>
          {/* active button */}
          {/* time filter */}
          <div className='w-5/7 min-w-[200px] bg-green text-white flex justify-evenly p-2 rounded-badge'>
            <button onClick={() => setInterval(IntervalEnum.Day)} className={`${IntervalEnum.Day == interval ? selectedInterval : selectedStyle} text-center text-md font-bold w-fit p-3 px-5 transition-all ease-in  rounded-badge`} >Day</button>
            <button onClick={() => setInterval(IntervalEnum.Week)} className={`${IntervalEnum.Week == interval ? selectedInterval : selectedStyle} text-center text-md font-bold w-fit p-3 px-5 transition-all ease-in  rounded-badge`} >Week</button>
            <button onClick={() => setInterval(IntervalEnum.Month)} className={`${IntervalEnum.Month == interval ? selectedInterval : selectedStyle} text-center text-md font-bold w-fit p-3 px-5 transition-all ease-in  rounded-badge`} >Month</button>
            <button onClick={() => setInterval(IntervalEnum.Year)} className={`${IntervalEnum.Year == interval ? selectedInterval : selectedStyle} text-center text-md font-bold w-fit p-3 px-5 transition-all ease-in  rounded-badge`} >Year</button>
          </div>

          <div className='flex my-4 mx-auto justify-center'>
            {Object.keys(sensors).map((key) => {
              const sensorId = Number(key); // Convert key to a number
              const sensor = availableSensors.find((s) => s.id === sensorId);

              if (!sensors[sensorId] || !sensor) return null; // Check if the sensor exists

              return (
                <div key={sensorId} className="relative">
                  <button
                    onClick={() => sensorChange(sensor.id)}
                    className="aspect-square hover:scale-110 transition ease-in-out hover:shadow-md-fit rounded-full text-md p-4 my-0 mx-3 text-center flex align-middle text-white bg-green"
                  >
                    {sensor.icon}
                  </button>
                  <button
                    onClick={() => handleDeleteSensor(sensor.id)}
                    className="absolute top-0 right-0 bg-transparent text-black rounded-full p-1 text-sm hover:text-gray-600 transition"
                  >
                    ✖
                  </button>
                </div>
              );
            })}
            <button
              onClick={() => setIsModalOpen(true)}
              className="aspect-square hover:scale-110 transition ease-in-out hover:shadow-mdw-fit rounded-full text-md p-4 my-0 mx-3 text-center flex align-middle bg-green text-white"
            >
              <AddIcon fontSize="large" />
            </button>
          </div>
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white w-3/4 max-w-md rounded-lg shadow-lg p-6 relative">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Available Sensors</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-black"
                  >
                    ✖
                  </button>
                </div>

                {/* Sensor List */}
                <ul className="flex flex-col gap-4">
                  {availableSensors.map((sensor) => (
                    <li
                      key={sensor.id}
                      className="flex justify-between items-center bg-gray-100 rounded-lg p-3 shadow-md"
                    >
                      <span className="text-lg">{sensor.name}</span>
                      <button
                        onClick={() => handleAddSensor(sensor.id)}
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
        </div>

        {/* Graphics */}
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 w-5/6 mx-auto'>
          {
            Object.entries(sensors).map(([, value], idx) =>
              value ? (
                <div key={idx} className='w-full p-3 '>
                  <SensorChart data={data[idx][interval]} />
                </div>
              ) :
                null
            )
          }
        </div>
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
                                    rules?.map((rule,idx) => (
                                        
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

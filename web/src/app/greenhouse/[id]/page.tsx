"use client"
import { useState } from 'react';

import SolarPower from '@mui/icons-material/SolarPower'
import OpacityIcon from '@mui/icons-material/Opacity';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import Co2Icon from '@mui/icons-material/Co2';

import { SensorChart } from '../../../components/charts/SensorChart'
import { DataCharts as data } from "../../../utils/data"

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

type Props = {
  params: { id: string }
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

export default function GreenHouse({ params }: Props) {
  const [sensors, setSensors] = useState({ 0: true, 1: true, 2: true, 3: true });
  const [interval, setInterval] = useState<IntervalEnum>(IntervalEnum.Day)

  // the id to make the request to the database it could be anything passed as the paramenter
  const { id } = params;

  const sensorChange = (type: SensorEnum) => {
    //changes the presented charts
    setSensors(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  }

  const selectedStyle = "text-white bg-green"
  const nonSelectedStyle = "text-brown bg-beje"
  const selectedInterval = "text-green bg-white shadow-xl"

  return (
    <>
      <div className='w-full p-2 my-6 text-center flex-col justify-center'>
        <div className="text-5xl text-black p-3">
          GreenHouse {id}
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
            <button onClick={() => sensorChange(SensorEnum.UVLight)} className={`aspect-square hover:scale-110 transition ease-in-out hover:shadow-md-fit rounded-full text-md p-4 my-0 mx-3 text-center flex align-middle ${sensors[SensorEnum.UVLight] ? selectedStyle : nonSelectedStyle}`}>
              <SolarPower fontSize="large" />
            </button>
            <button onClick={() => sensorChange(SensorEnum.Temperature)} className={`aspect-square hover:scale-110 transition ease-in-out hover:shadow-md-fit rounded-full text-md p-4 my-0 mx-3 text-center flex align-middle ${sensors[SensorEnum.Temperature] ? selectedStyle : nonSelectedStyle}`} >
              <DeviceThermostatIcon fontSize="large" />
            </button>
            <button onClick={() => sensorChange(SensorEnum.Humidity)} className={`hover:scale-110 transition ease-in-out hover:shadow-mdw-fit rounded-full text-md p-4 my-0 mx-3 text-center flex align-middle ${sensors[SensorEnum.Humidity] ? selectedStyle : nonSelectedStyle}`} >
              <OpacityIcon fontSize="large" />
            </button>
            <button onClick={() => sensorChange(SensorEnum.AirQuality)} className={`hover:scale-110 transition ease-in-out hover:shadow-mdw-fit rounded-full text-md p-4 my-0 mx-3 text-center flex align-middle ${sensors[SensorEnum.AirQuality] ? selectedStyle : nonSelectedStyle}`} >
              <Co2Icon fontSize="large" />
            </button>
          </div>
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
      </div>
    </>
  )
}

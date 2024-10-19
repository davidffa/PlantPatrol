"use client"
import React from 'react'
import SolarPower from '@mui/icons-material/SolarPower'
import OpacityIcon from '@mui/icons-material/Opacity';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import Co2Icon from '@mui/icons-material/Co2';

import { useState } from 'react';
import BarChart from '../../../components/charts/BarChart'

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
function page({ params }: Props) {
  const [sensors, setSensors] = useState({ 0: true, 1: true, 2: true, 3: true });
  const [interval, setInterval] = useState<IntervalEnum>(IntervalEnum.Day)
  // the id to make the request to the database it could be anything passed as the paramenter
  let id = params.id

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
  const labels =[1,2,3,4,5,6,7]
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  return (
    <>
      <div className='w-full p-2 text-center flex-col'>
        <div className="text-5xl text-black p-3">
          GreenHouse 2
        </div>
        {/* filters */}
        <div className='w-3/4 mx-auto flex my-5'>
          {/* active button */}
          <button onClick={() => sensorChange(SensorEnum.UVLight)} className={`aspect-square hover:scale-110 transition ease-in-out hover:shadow-md-fit rounded-full  text-md p-3 my-0 mx-3 text-center flex align-middle ${sensors[SensorEnum.UVLight] ? selectedStyle : nonSelectedStyle}`}>
            <SolarPower fontSize="large" />
          </button>
          <button onClick={() => sensorChange(SensorEnum.Temperature)} className={`aspect-square hover:scale-110 transition ease-in-out hover:shadow-md-fit rounded-full  text-md p-3 my-0 mx-3 text-center flex align-middle ${sensors[SensorEnum.Temperature] ? selectedStyle : nonSelectedStyle}`} >
            <DeviceThermostatIcon fontSize="large" />
          </button>
          {/* time filter */}
          <div className='w-5/6 min-w-[200px] bg-green text-white flex justify-evenly p-2 rounded-badge'>
            <button onClick={() => setInterval(IntervalEnum.Day)} className={`${IntervalEnum.Day == interval ? selectedInterval : selectedStyle} text-center text-md font-bold w-fit p-3 px-5 transition-all ease-in  rounded-badge`} >Day</button>
            <button onClick={() => setInterval(IntervalEnum.Week)} className={`${IntervalEnum.Week == interval ? selectedInterval : selectedStyle} text-center text-md font-bold w-fit p-3 px-5 transition-all ease-in  rounded-badge`} >Week</button>
            <button onClick={() => setInterval(IntervalEnum.Month)} className={`${IntervalEnum.Month == interval ? selectedInterval : selectedStyle} text-center text-md font-bold w-fit p-3 px-5 transition-all ease-in  rounded-badge`} >Month</button>
            <button onClick={() => setInterval(IntervalEnum.Year)} className={`${IntervalEnum.Year == interval ? selectedInterval : selectedStyle} text-center text-md font-bold w-fit p-3 px-5 transition-all ease-in  rounded-badge`} >Year</button>
          </div>
          <button onClick={() => sensorChange(SensorEnum.Humidity)} className={`hover:scale-110 transition ease-in-out hover:shadow-mdw-fit rounded-full  text-md p-3 my-0 mx-3 text-center flex align-middle ${sensors[SensorEnum.Humidity] ? selectedStyle : nonSelectedStyle}`} >
            <OpacityIcon fontSize="large" />
          </button>
          <button onClick={() => sensorChange(SensorEnum.AirQuality)} className={`hover:scale-110 transition ease-in-out hover:shadow-mdw-fit rounded-full  text-md p-3 my-0 mx-3 text-center flex align-middle ${sensors[SensorEnum.AirQuality] ? selectedStyle : nonSelectedStyle}`} >
            <Co2Icon fontSize="large" />
          </button>
        </div>
        {/* Graphics */}
        <div className=''>
          <BarChart ctx={data}/>
        </div>
      </div>
    </>
  )
}

export default page
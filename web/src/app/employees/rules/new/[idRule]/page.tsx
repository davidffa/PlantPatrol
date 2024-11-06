"use client"
import React from 'react'
import  {useState} from 'react'
import {Slider } from '@mui/material'
type Props = {
  params: { idRule: string }
}
type Rule = { 
  name:string,
  minTemp:number,
  maxTemp:number,
  minHumidity:number,
  maxHumidity:number,
  minAIQ:number,
  maxAIQ:number,
  waterSystemFlow:number,
  ventilationRPM:number,
  airPurifier:boolean,
}

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 40,
    label: '40°C',
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}
export default function newRule({ params }: Props) {
  const { idRule } = params
  const [rule,setRule] = useState<Rule>({
  name:"",
  minTemp:0,
  maxTemp:10,
  minHumidity:0,
  maxHumidity:10,
  minAIQ:0,
  maxAIQ:10,
  waterSystemFlow:0,
  ventilationRPM:1000,
  airPurifier:true,
  })
  const minDistance = 10;
  const slideTemperature=(    event: Event,
    newValue: number | number[],
    activeThumb: number)=>{
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 70 - minDistance);
        setRule({
          ...rule,
          minTemp: clamped,
          maxTemp: clamped + minDistance,
        })
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setRule({
          ...rule,
          minTemp: clamped - minDistance,
          maxTemp: clamped,
        })
      }
    } else {
        setRule({
          ...rule,
          minTemp: newValue[0],
          maxTemp: newValue[1],
        })
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 w-full p-4 h-full  rounded-lg ">
        <div className='w-full text-left text-black font-bold text-4xl p-5'>
          Rule {idRule}
        </div>
      
        <div className="flex flex-col w-full p-3 h-full mx-auto my-auto">
            <div className='p-3 flex-row gap-2'>
              <input type="text" name='name' aria-label='Name' placeholder="Rule" className="input input-bordered w-4/5 " required />
            </div>
            <div className="grid grid-cols-2">
            <div className="w-full p-3 text-center flex-col flex h-full">
              <div className="text-3xl text-black text-center w-full my-6">
                Sensors
              </div>
              <div className="text-center grid grid-cols-1 gap-y-6 w-full p-3 ">
                <div className="rounded-md grid grid-cols-2 w-full p-3 border border-1 border-gray align-middle">
                  <div className="text-center text-xl h-full ">Temperature</div>
                  <div>
                    <Slider
                      value={[rule.minTemp,rule.maxTemp]}
                      onChange={slideTemperature}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      max={70}
                      step={1}
                      valueLabelDisplay="auto"
                      marks={marks}
                    />
                  </div>
                </div>

                <div className="rounded-md grid grid-cols-2 w-full p-3 border border-1 border-gray align-middle">
                  <div className="text-center text-xl h-full ">Humidity</div>
                  <div>
                    <Slider
                      value={[rule.minHumidity,rule.maxHumidity]}
                      onChange={slideHumidity}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      max={100}
                      step={1}
                      valueLabelDisplay="auto"
                      marks={marks}
                    />
                  </div>
                </div>
                <div className="rounded-md grid grid-cols-2 w-full p-3 border border-1 border-gray align-middle">
                  <div className="text-center text-xl h-full ">Temperature</div>
                  <div>
                    <Slider
                      value={[rule.minAIQ,rule.maxAIQ]}
                      onChange={slideAIQ}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      max={500}
                      step={20}
                      valueLabelDisplay="auto"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-3 text-center flex-col flex h-full">
              <div className="text-3xl text-black text-center w-full my-6">
                Actuators 
              </div>
              <div className="text-center grid grid-cols-1 gap-y-6 w-full p-3 ">
                <div className="rounded-md grid grid-cols-2 w-full p-3 border border-1 border-gray align-middle">
                  <div className="text-center text-xl h-full ">Temperature</div>
                  <div>
                    <Slider
                      value={[rule.minTemp,rule.maxTemp]}
                      onChange={slideTemperature}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      max={70}
                      step={1}
                      valueLabelDisplay="auto"
                      marks={marks}
                    />
                  </div>
                </div>

                <div className="rounded-md grid grid-cols-2 w-full p-3 border border-1 border-gray align-middle">
                  <div className="text-center text-xl h-full ">Temperature</div>
                  <div>
                    <Slider
                      value={[rule.minTemp,rule.maxTemp]}
                      onChange={slideTemperature}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      max={70}
                      step={1}
                      valueLabelDisplay="auto"
                      marks={marks}
                    />
                  </div>
                </div>
                <div className="rounded-md grid grid-cols-2 w-full p-3 border border-1 border-gray align-middle">
                  <div className="text-center text-xl h-full ">Temperature</div>
                  <div>
                    <Slider
                      value={[rule.minTemp,rule.maxTemp]}
                      onChange={slideTemperature}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      max={70}
                      step={1}
                      valueLabelDisplay="auto"
                      marks={marks}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

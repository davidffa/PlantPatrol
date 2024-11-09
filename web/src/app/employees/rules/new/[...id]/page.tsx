"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Slider } from '@mui/material'
import { Navbar } from '@/components/Navbar'
import api from '@/services/api'
import Swal from 'sweetalert2'
type Props = {
  params: { id: string[] }
}
type Rule = {
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

const marksPercentage = (value: number) => [
  {
    value: 0,
    label: '0%',
  },
  {
    value: value / 5,
    label: '20%',
  },
  {
    value: (value / 5) * 2,
    label: '40%',
  },
  {
    value: (value / 5) * 3,
    label: '60%',
  },
  {
    value: (value / 5) * 4,
    label: '80%',
  },
  {
    value: value,
    label: '100%',
  },
];
function valuetextTemp(value: number) {
  return `${value}°C`;
}
function valuetextHumidity(value: number) {
  return `${value}%`;
}
function valuetextVentilation(value: number) {
  return `${value} RPM`;
}
function valuetextAIQ(value: number) {
  return `${value}°C`;
}
export default function NewRule({ params }: Props) {
  const { id } = params
  const idRule = id[1]
  const idGH = id[0]

  const router = useRouter()

  const [rule, setRule] = useState<Rule>({
    name: "",
    minTemp: 0,
    maxTemp: 10,
    minHumidity: 0,
    maxHumidity: 10,
    minAIQ: 0,
    maxAIQ: 10,
    waterSystemFlow: 0,
    ventilationRPM: 1000,
    airPurifier: true,
  })
  const minDistance = 10;
  const getRule = () => {
    try {

      if (idRule !== '0') {
        console.log("UPDATING")
        //updating
        // change the endnpoit 
        api.get(`/rules/${idGH}`).then((response) => {
          if (response.status == 200) {
            console.log(response.data)
            setRule(response.data)

          }
        })
      }
    } catch (erro) {
      console.log(erro)
    }
  }

  useEffect(() => {
    getRule()
  }, [])

  const toggleAirPurifier = (prevState: Rule) => {
    if (prevState && typeof prevState.airPurifier === 'boolean') {
      return { ...prevState, airPurifier: !prevState.airPurifier };
    }
    return prevState;
  }

  const slideAIQ = (event: Event,
    newValue: number | number[],
    activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 70 - minDistance);
        setRule({
          ...rule,
          minAIQ: clamped,
          maxAIQ: clamped + minDistance,
        })
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setRule({
          ...rule,
          minAIQ: clamped - minDistance,
          maxAIQ: clamped,
        })
      }
    } else {
      setRule({
        ...rule,
        minAIQ: newValue[0],
        maxAIQ: newValue[1],
      })
    }
  }

  const slideVentilation = (event: Event,
    newValue: number | number[]) => {
    setRule({
      ...rule,
      ventilationRPM: typeof newValue === 'number' ? newValue : 0,
    })
  }
  const slideWater = (event: Event,
    newValue: number | number[]) => {
    setRule({
      ...rule,
      waterSystemFlow: typeof newValue === 'number' ? newValue : 0,
    })
  }
  const slideHumidity = (event: Event,
    newValue: number | number[],
    activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 70 - minDistance);
        setRule({
          ...rule,
          minHumidity: clamped,
          maxHumidity: clamped + minDistance,
        })
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setRule({
          ...rule,
          minHumidity: clamped - minDistance,
          maxHumidity: clamped,
        })
      }
    } else {
      setRule({
        ...rule,
        minHumidity: newValue[0],
        maxHumidity: newValue[1],
      })
    }
  }

  const slideTemperature = (event: Event,
    newValue: number | number[],
    activeThumb: number) => {
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
  const handleSave = () => {
    if (idRule !== '0') {
      //update
      api.put(`/rules/`, { _id: idRule, ...rule }).then((response) => {
        if (response.status == 204) {
          //message of success
          Swal.fire({
            icon: "success",
            title: "Rule Updated!"
          });
        }
      }).catch((erro) => {
        Swal.fire({
          icon: "error",
          title: `There was an unexpected error with the update of the rule! Erro:${erro}`
        });
      })
    }
    else {
      console.log(rule)
      //create a new rule 
      api.post(`/rules/${idGH}`, { ...rule }).then(async (response) => {
        if (response.status == 201) {
          //message of success
          await Swal.fire({
            icon: "success",
            title: "Rule Created!"
          }).then(() => {
            router.push(`/employees/rules/${idGH}`)
          })
        }
      }).catch((erro) => {
        Swal.fire({
          icon: "error",
          title: `There was an unexpected error with the creation of the rule! Erro:${erro.detail}`
        });
      })
    }

  }
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 w-full p-4 h-full  rounded-lg ">
        <div className='w-full text-left text-black font-bold text-4xl p-5'>
          Rule
        </div>

        <div className="flex flex-col w-full p-3 h-full mx-auto my-auto">
          <div className='p-3 flex-row gap-2'>
            <input type="text" value={rule.name} onChange={(e) => setRule({ ...rule, name: e.target.value })} name='name' aria-label='Name' placeholder="Rule" className="input input-bordered w-full " />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="w-full p-3 text-center flex-col flex h-full bg-green my-3 rounded-md text-white">
              <div className="text-3xl text-center w-full my-6">
                Sensors
              </div>
              <div className="text-center grid grid-cols-1 gap-y-6 w-full p-3 ">
                <div className="rounded-md grid grid-cols-2 w-full p-3 border border-1 border-gray align-middle">
                  <div className="text-center text-xl h-full ">Temperature</div>
                  <div className="px-5">
                    <Slider
                      className="text-white"
                      value={[rule.minTemp, rule.maxTemp]}
                      onChange={slideTemperature}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetextTemp}
                      max={70}
                      step={1}
                      marks={marks}
                    />
                  </div>
                </div>

                <div className="rounded-md grid grid-cols-2 w-full p-3 border border-1 border-gray align-middle">
                  <div className="text-center text-xl h-full ">Humidity</div>
                  <div className="px-5">
                    <Slider
                      className="text-white"
                      value={[rule.minHumidity, rule.maxHumidity]}
                      onChange={slideHumidity}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetextHumidity}
                      max={100}
                      step={1}
                      marks={marksPercentage(100)}
                    />
                  </div>
                </div>
                <div className="rounded-md grid grid-cols-2 w-full p-3 border border-1 border-gray align-middle">
                  <div className="text-center text-xl h-full ">Air Quality</div>
                  <div className="px-5">
                    <Slider
                      className="text-white"
                      value={[rule.minAIQ, rule.maxAIQ]}
                      onChange={slideAIQ}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetextAIQ}
                      marks={marksPercentage(500)}
                      max={500}
                      step={20}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-3 text-center flex-col flex h-full bg-brown my-3 rounded-md text-white">
              <div className="text-3xl text-center w-full my-6">
                Actuators
              </div>
              <div className="text-center grid grid-cols-1 gap-y-6 w-full p-3 ">
                <div className="rounded-md grid grid-cols-2 w-full p-3 border border-1 border-gray align-middle">
                  <div className="text-center text-xl h-full ">Water System Flow</div>
                  <div className="px-5">
                    <Slider
                      className="text-white"
                      value={rule.waterSystemFlow}
                      onChange={slideWater}
                      valueLabelDisplay="auto"
                      max={100}
                      step={0.1}
                      marks={marksPercentage(100)}
                    />
                  </div>
                </div>

                <div className="rounded-md grid grid-cols-2 w-full p-3 border border-1 border-gray align-middle">
                  <div className="text-center text-xl h-full ">Ventilation Speed</div>
                  <div className="px-5">
                    <Slider
                      className="text-white"
                      value={rule.ventilationRPM}
                      onChange={slideVentilation}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetextVentilation}
                      max={2000}
                      step={50}
                      marks={marksPercentage(2000)}
                    />
                  </div>
                </div>
                <div className="rounded-md grid grid-cols-2 w-full p-3 border border-1 border-gray align-middle">
                  <div className="text-center text-xl h-full ">Air Purifier</div>
                  <div className="px-5">
                    <input
                      type="checkbox"
                      onChange={() => setRule((prev) => toggleAirPurifier(prev))}
                      className="toggle toggle-lg color-blue bg-blue"
                      checked={rule.airPurifier}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-around my-3 p-5">
            <a className="w-1/6 bg-beje text-xl text-center p-3 rounded-lg text-black" href="/greenhouses/rules">
              Cancel
            </a>
            <button onClick={handleSave} className="w-1/6 bg-green text-xl text-center p-3 rounded-lg text-white">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

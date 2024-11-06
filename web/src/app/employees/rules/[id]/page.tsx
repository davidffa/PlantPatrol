"use client"
import { Navbar } from '@/components/Navbar'
import React from 'react'
import {useState} from 'react'
import AddIcon from '@mui/icons-material/Add';
import api from '@/services/api'

import Swal from 'sweetalert2'
type Props = {
    params: { id: string }
}
type Rule = {
    _id?:String,
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

export default function Rules({ params }: Props) {
    const { id } = params
    const [rules,setRules] = useState<Rule[]>([])
    async function handleDeleteRule(id_rule:String | undefined) {
        const result = await Swal.fire({
            title: "Delete employee rule?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Confirm",
            confirmButtonColor: "red"
        });

        if (result.isConfirmed) {
            api.delete(`rules/${id}/${id_rule}`).then((response)=>{
                if(response.status == 204){
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Rule deleted!"
                    })
                    return
                }
                Swal.fire({
                        icon: "error",
                        title: "Unexpected Error",
                        text: `There was an unexpected error. ${response.data}`
                    })
            })
        }
    }
    api.get(`rules/${id}`).then((response)=>{
        if(response.status == 200)
        {
            setRules(response.data)
        }
    })
    return (
        <>
            <Navbar />
            <div className='w-full p-3 h-full flex-col gap-2'>
                <div className="text-black text-5xl text-center w-full my-5 font-bold">
                    GreenHouse {id}
                </div>
                <div className="w-4/5 mx-auto p-3 text-left">
                    <div className="text-2xl font-bold text-black">
                        System Status:
                        <div className='w-full rounded-md bg-gray-200 p-7 my-4 text-left shadow-lg flex-col'>
                            <div className="w-full grid grid-cols-2 gap-3 text-lg text-left text-black">
                                Sensors: <p className='text-red-500'>Temperature sensor DOWN</p>
                            </div>
                            <div className="w-full grid grid-cols-2 gap-3 text-lg text-left text-black">
                                Ventilators: <p className='text-green'>OK</p>

                            </div>
                            <div className="w-full grid grid-cols-2 gap-3 text-lg text-left text-black">
                                Watering System: <p className='text-green'>OK</p>

                            </div>
                        </div>
                    </div>
                    <div className='w-full p-3 flex flex-col'>
                        <div className='w-full flex flex-row'>
                            <div className='w-1/2 flex justify-start text-2xl font-bold text-black'>
                                Action
                            </div>
                            <div className='w-1/2 flex justify-end'>
                                <a href={`/employees/rules/new/${id}`} className='flex flex-row gap-2 text-green '>
                                    Add New
                                    <AddIcon />
                                </a>
                            </div>
                        </div>

                        <div className="divider"></div>
                        <div className='w-full flex flex-col gap-3 p-3'>
                            <div className='w-full bg-gray-300 text-black grid grid-cols-2 rounded-lg '>
                                {
                                    rules?.map((rule,idx)=>(
                                        <>
                                        <div className='text-xl text-black flex font-semibold text-left p-3 justify-start my-auto'>
                                            {rule.name}
                                        </div>
                                        <div className='flex flex-row gap-2 p-3 justify-end '>
                                            <a href={`new/${rule._id}`} className="w-[150px] rounded-lg p-3 bg-green text-white text-center">
                                                edit
                                            </a>
                                            <button onClick={()=>handleDeleteRule(rule._id)} className="w-[150px] rounded-lg p-3 bg-red-700 text-white">
                                                delete
                                            </button>
                                        </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
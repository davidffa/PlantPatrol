import React from 'react'
import Image from 'next/image'
import SolarPower from '@mui/icons-material/SolarPower'
import OpacityIcon from '@mui/icons-material/Opacity';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import Co2Icon from '@mui/icons-material/Co2';
type Props = {
    greenhouse: string,
    image: string,
    humidity: number,
    temperature: number,
    aiq: number ,
    uv: number,
}

export default function GHouseCards({ greenhouse, image, humidity, temperature, aiq, uv }: Props) {
    return (
        <div className="card cursor-pointer shadow-md  hover:shadow-green hover:translate-y-[-4px]  transition-all ease-in-out image-full w-full " >
            <figure>
                <Image
                    src={image}
                    alt={greenhouse}
                    width={500}
                    height={500}
                />
            </figure>
            <div className="card-body ">
                <div className="w-full p-2 flex flex-col ">
                    <div className='h-1/2 w-full p-2 text-left text-2xl text-white'>
                        {greenhouse}
                    </div>
                    <div className='h-1/2 w-full p-1 grid grid-cols-2 align-bottom'>
                        <div className='flex w-full p-3 text-left text-white justify-between text-md '>
                            <OpacityIcon fontSize='large'/>
                            {humidity}%
                        </div>
                        <div className='flex w-full p-3 text-left text-white justify-between text-md '>
                            <DeviceThermostatIcon fontSize='large'/>
                            {temperature}ºC
                        </div>
                        <div className='flex w-full p-3 text-left text-white justify-between text-md '>
                            <SolarPower fontSize="large" />
                            {uv}mW/cm2
                        </div>
                        <div className='flex w-full p-3 text-left text-white justify-between text-md '>
                            <Co2Icon fontSize="large" />
                            {aiq}AIQ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
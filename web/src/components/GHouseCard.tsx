import React from 'react'
import Image from 'next/image'
import {humidity} from '../../../public/weather-humidity-rain-svgrepo-com.svg';
import IconSVG from './IconSVG';
type Props = {
    greenhouse: string,
    image: string,
    humidity?: number,
    temperature?: number,
    aiq?: number,
    uv?: number
}

export default function GHouseCards({ greenhouse, image, humidity, temperature, aiq, uv }: Props) {
    return (
        <div className="card bg-base-100 image-full w-96 shadow-xl">
            <figure>
                <Image
                    src={image}
                    alt={greenhouse}
                    width={500}
                    height={500}
                    />
            </figure>
            <div className="card-body">
                <div className="w-full p-2 flex flex-col h-">
                    <div className='h-1/2 w-full p-2 text-left text-black'>
                    {greenhouse}
                    </div>
                    <div className='h-1/2 w-full p-2 grid grid-cols-2'>
                        <div className='flex w-full p-3 text-center'>
                            <IconSVG
                            SvgIcon={humidity}
                            color="white"
                            width="48"
                            height="48"
                            src="/weather-humidity-rain-svgrepo-com.svg" alt={''}/>
                            {humidity}
                        </div>
                        <div className='flex w-full p-3 text-center'>
                            <IconSVG
                            SvgIcon={humidity}
                            color="white"
                            width="48"
                            height="48"
                            src="/temperature-svgrepo-com.svg" alt={''}/>
                            {temperature}
                        </div>
                        <div className='flex w-full p-3 text-center'>
                            <IconSVG
                            SvgIcon={humidity}
                            color="white"
                            width="48"
                            height="48"
                            src="/uv-index-alt-svgrepo-com.svg" alt={''}/>
                            {uv}
                        </div>
                        <div className='flex w-full p-3 text-center'>
                            <IconSVG
                            SvgIcon={humidity}
                            color="white"
                            width="48"
                            height="48"
                            src="/carbon-footprint-industry-ecology-environment-carbon-dioxide-conservation-carbon-label-svgrepo-com.svg" alt={''}/>
                            {aiq}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Image from 'next/image'
import SolarPower from '@mui/icons-material/SolarPower'
import OpacityIcon from '@mui/icons-material/Opacity';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import Co2Icon from '@mui/icons-material/Co2';
import api from '@/services/api';
import { on } from "events";

type Props = {
  greenhouse: string,
  id: number | string,
  image: string
  onDelete: () => void;
}

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

export default function GHouseCards({ id, greenhouse, image, onDelete }: Props) {
  const router = useRouter();
  const [humidity, setHumidity] = useState<number>(0);
  const [uv, setUv] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [aiq, setAiq] = useState<number>(0);

  async function handleDelete() {
    await api.delete(`/greenhouse/${id}`);
    onDelete();
  }

  useEffect(() => {
    async function getAVG() {
      try {
        const res = await api.get<SensorReading[]>(`/greenhouse/${id}/sensors-data`, { params: { "type": "INSTANT" } });

        if (res.status === 200) {
          const data = res.data;
          setHumidity(data.reduce((acc, curr) => acc + curr.humidity, 0) / data.length);
          setUv(data.reduce((acc, curr) => acc + curr.uv, 0) / data.length);
          setTemperature(data.reduce((acc, curr) => acc + curr.temperature, 0) / data.length);
          setAiq(data.reduce((acc, curr) => acc + curr.aiq, 0) / data.length);
        }
      } catch { }
    }
    getAVG();
  }, []);

  return (
    <>
      <div className="card cursor-pointer shadow-md  hover:shadow-green hover:translate-y-[-4px]  transition-all ease-in-out image-full w-full " onClick={() => router.push(`/greenhouses/${id}`)}>
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
            <div className='flex justify-end'>
              <Image 
                src="/trash-2.svg" 
                alt="Remove" 
                height={20} 
                width={20} 
                onClick={(event) => {
                  event.stopPropagation(); // Prevents navigation when the delete button is clicked
                  handleDelete();
                }} 
              />
            </div>
            <div className='h-1/2 w-full p-2 text-left text-2xl text-white'>
              {greenhouse}
            </div>
            <div className='h-1/2 w-full p-1 grid grid-cols-2 align-bottom'>
              <div className='flex w-full p-3 text-left text-white justify-between text-md'>
                <OpacityIcon fontSize='large' />
                {humidity}%
              </div>
              <div className='flex w-full p-3 text-left text-white justify-between text-md'>
                <DeviceThermostatIcon fontSize='large' />
                {temperature}ºC
              </div>
              <div className='flex w-full p-3 text-left text-white justify-between text-md'>
                <SolarPower fontSize="large" />
                {uv}mW/cm2
              </div>
              <div className='flex w-full p-3 text-left text-white justify-between text-md'>
                <Co2Icon fontSize="large" />
                {aiq}AIQ
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

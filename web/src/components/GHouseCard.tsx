import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Image from 'next/image'
import SolarPower from '@mui/icons-material/SolarPower'
import OpacityIcon from '@mui/icons-material/Opacity';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import Co2Icon from '@mui/icons-material/Co2';
import api from '@/services/api';

type Props = {
  greenhouse: string,
  id: number | string,
  image: string
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

export default function GHouseCards({ id, greenhouse, image }: Props) {
  const router = useRouter();
  const [humidity, setHumidity] = useState<number>(0);
  const [uv, setUv] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [aiq, setAiq] = useState<number>(0);
  const [lista, setLista] = useState<number[]>([]);

  useEffect(() => {
    async function getAVG() {
      const { data } = await api.get<SensorReading[]>(`/greenhouse/${id}/sensors-data`, { params: { "type": "INSTANT" } });

      setLista(data.map(r => r.humidity));
      lista.forEach(element => { setHumidity(humidity + element) });
      setHumidity(humidity / lista.length);

      setLista(data.map(r => r.uv));
      lista.forEach(element => { setUv(uv + element) });
      setUv(uv / lista.length);

      setLista(data.map(r => r.temperature));
      lista.forEach(element => { setTemperature(temperature + element) });
      setTemperature(temperature / lista.length);

      setLista(data.map(r => r.aiq));
      lista.forEach(element => { setAiq(aiq + element) });
      setAiq(aiq / lista.length);
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

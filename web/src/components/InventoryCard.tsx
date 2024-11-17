import React, { useState } from 'react'
import EditInput from './EditInput';
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/services/api";

type Props = {
  id: string,
  title: string,
  image: string,
  available: number,
  minimum: number,
  manager?: boolean,
  onDelete: () => void
}

export default function InventoryCard({ id, title, image, available, minimum, manager = false, onDelete }: Props) {
  const router = useRouter();

  const [min, setValue] = useState(minimum);
  const [ava, setValue2] = useState(available);


  async function handleValueChange(newValue: number) {
    setValue(newValue);
  };
  const handleValueChange2 = (newValue: number) => {
    setValue2(newValue);
  };

  async function handleDelete() {
    await api.delete(`/inventory/${id}`);
    onDelete();
  }


  return (

    <div className="card cursor-pointer shadow-md  hover:shadow-green hover:translate-y-[-4px]  transition-all ease-in-out image-full w-60 h-64">
      <figure>
        <img
          src={image}
          alt={title}
          height={300}
          width={350}
        />
      </figure>
      <div className="card-body ">
        <div className="w-full flex flex-col ">
          <div className='flex justify-end'>
            <Image src="/trash-2.svg" alt="Remove" height={20} width={20} onClick={handleDelete} />
          </div>
          <div className='h-2/5 w-full  text-left text-2xl text-white' onClick={() => !manager && router.push(`/employee/inventory/${id}`)} >
            {title}
          </div>

          {
            manager ?
              (
                <>
                  <div className=' h-1/6 w-full grid grid-cols-2 align-bottom'>
                    <div className='flex w-full text-left text-white justify-between text-md mt-12'>
                      <p>Available:</p>
                    </div>
                    <div className='flex  text-right text-white justify-between mt-12 px-6'>{available}</div>
                    <div></div>
                  </div>
                  <div className='h-1/6 flex w-full align-bottom justify-between '>
                    <div className='flex  text-left text-white justify-between mt-12 '>
                      <p>Minimum:</p>
                    </div>
                    <div >
                      <EditInput id={id} min={minimum} minvalue={min} onChange={handleValueChange} />
                    </div>
                  </div>
                </>
              ) :
              (
                <>
                  <div className='h-1/6 flex w-full align-bottom justify-between '>
                    <div className='flex  text-left text-white justify-between mt-12 '>
                      <p>Available:</p>
                    </div>
                    <div>
                      <EditInput id={id} min={available} minvalue={ava} onChange={handleValueChange2} />
                    </div>
                  </div>
                  <div className='h-1/6 w-full grid grid-cols-2 align-bottom'>
                    <div className='flex w-full text-left text-white justify-between text-md mt-12'>
                      <p>Minimum:</p>
                    </div>
                    <div className='flex  text-right text-white justify-between mt-12 px-6'>{minimum}</div>
                    <div></div>
                  </div>
                </>
              )
          }
        </div>
      </div>
    </div>
  )
}
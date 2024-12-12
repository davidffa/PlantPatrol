import React, { useState } from 'react'
import EditInput from './EditInput';
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2"
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
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await api.delete(`/inventory/${id}`).then(async ()=>{
          onDelete();
          })
        }
      });
  }


  return (

    <div className="group card cursor-pointer shadow-md  hover:shadow-green hover:translate-y-[-4px]  transition-all ease-in-out image-full w-full h-72">
      <figure>
        <img
          src={image}
          alt={title}
          className='w-full'
        />
      </figure>
      <div className="card-body relative w-full">
          <div className='flex justify-end '>
            <Image src="/trash-2.svg" alt="Remove" height={20} width={20} onClick={handleDelete} />
          </div>
          <div className='h-2/5 w-full text-left text-2xl text-white' onClick={() => !manager && router.push(`/employee/inventory/${id}`)} >
            {title}
          </div>

          {
            manager ?
              (
                <>
                  <div className='h-fit grid grid-cols-1 w-5/6 absolute bottom-6'>
                  <div className="grid grid-cols-2 w-full p-2">
                    <div className='flex w-full text-left text-white justify-between text-md '>
                      <p>Available:</p>
                    </div>
                    <div className='flex  text-right text-white justify-between '>{available}</div>
                  </div>
                  <div className="grid grid-cols-2 w-full p-2">
                    <div className='flex  text-left text-white justify-between '>
                      <p>Minimum:</p>
                    </div>
                    <div >
                      <EditInput id={id} min={minimum} minvalue={min} onChange={handleValueChange} />
                    </div>
                  </div>
                </div>
                </>
              ) :
              (
                <>
                  <div className='h-fit grid grid-cols-1 w-5/6 absolute bottom-6'>
                  <div className="grid grid-cols-2 w-full p-2">
                    <div className="flex text-left text-white justify-between">
                      <p>Available:</p>
                    </div>
                    <div>
                      <EditInput id={id} min={available} minvalue={ava} onChange={handleValueChange2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full p-2">
                    <div className='flex text-left text-white justify-between '>
                      <p>Minimum:</p>
                    </div>
                    <div className='flex text-right text-white justify-between '>{minimum}</div>
                  </div>
                </div>
                </>
              )
          }
        </div>
    </div>
  )
}

'use client';
import AddInventory from "@/components/AddInventory";
import InventoryCard from "@/components/InventoryCard";
import { Navbar } from "@/components/Navbar";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import api from "@/services/api";

type Plant = {
  "id": string,
  "name": string,
  "minimum": number,
  "amount": number,
  "family": string,
  "maxHeight": number,
  "about": string;
  "imageUrl": string;
}

export default function Inventory() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    async function getPlants() {
      const { data } = await api.get<Plant[]>("/inventory");

      setPlants(data);
    }
    getPlants();
  });
  const [components, setComponents] = useState<number[]>([]);

  const addInventory = () => {
    setComponents(prev => [...prev, prev.length]); // Adiciona um novo componente à lista
  };

  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Navbar />
      <div className="p-3">
        <div className="flex px-4 justify-between">
          <div className="input input-bordered flex justify-start items-center gap-2">
            <input type="search" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div className="mr-4">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="bg-green  hover:bg-dark-green hover:duration-200 rounded-full flex py-1 px-6 justify-center items-center gap-2 " onClick={() => modalRef.current?.showModal()}>
              <Image src="/plus.svg" alt="Adicionar" height={42} width={42} />
              <p className="text-2xl font-semibold text-white">New</p>
            </button>
            <dialog ref={modalRef} className="modal modal-middle ">
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
              <div className="modal-box w-11/12 max-w-5xl h-5/6 ">
                <div className="flex justify-between">
                  <h1 className="text-4xl font-semibold font-alt gap-2 py-2 mb-6 ">
                    Add to inventory
                  </h1>

                </div>

                <div className="modal-body">
                  <AddInventory />
                  {components.map((_, index) => (
                    <AddInventory key={index} />
                  ))}
                </div>
                <div className="mt-3 justify-between flex ">
                  <button className=" bg-green rounded-full hover:bg-dark-green hover:duration-200 flex justify-center items-center  " onClick={addInventory}>
                    <Image src="/plus.svg" alt="Adicionar" height={42} width={42} />
                  </button>
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="bg-green text-white text-xl  hover:bg-dark-green hover:duration-200 rounded-full flex py-2 px-6 justify-center items-center gap-4">
                      <b>Save</b>
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
        <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5  gap-12 align-center p-4">
          {
            plants.map(({ id, imageUrl, name, amount, minimum }) => (<InventoryCard key={id} id={id} image={imageUrl} title={name} available={amount} minimum={minimum} />))
          }
        </div>
      </div>
    </div>
  );
}

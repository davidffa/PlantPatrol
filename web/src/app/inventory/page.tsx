'use client';
import InventoryCard from "@/components/InventoryCard";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";
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

  return (
    <div>
      <Navbar />
      <div className="p-3">
        <div className="flex justify-end px-8">
          <div className="input input-bordered flex items-center gap-2">
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
        </div>
        <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5  gap-12 align-center p-4">
          {
            plants.map(({ id, imageUrl, name, amount, minimum }) => (<InventoryCard key={id} id={id} image={imageUrl} title={name} available={amount} minimum={minimum} manager />))
          }
        </div>
      </div>
    </div>
  );
}

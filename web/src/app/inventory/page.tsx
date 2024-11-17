'use client';
import InventoryCard from "@/components/InventoryCard";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPlants, setSearchPlants] = useState<Plant[]>([]);

  useEffect(() => {
    async function getPlants() {
      const { data } = await api.get<Plant[]>("/inventory");

      setPlants(data);
    }
    getPlants();
  }, []);

  useEffect(() => {
    async function getSearchPlants() {
      try {
        const { data } = await api.get<Plant[]>("/inventory", { params: { name: searchQuery.toLowerCase() } });
        setSearchPlants(data);
      } catch (err) {
        console.error(err);
      }
    } getSearchPlants();
  }, [searchQuery]);

  return (
    <div>
      <Navbar />
      <div className="p-3">
        <div className="flex justify-end px-8">
          <div className="input input-bordered flex items-center gap-2">
            <input type="search" className="grow" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <button className=" border ml-2 bg-gray-200 rounded-xl w-12 h-12 items-center justify-center">
            <Image
              className="ml-2"
              src="/search.svg"
              alt="Search"
              height={30}
              width={30}
            />
          </button>
        </div>
      </div>
      <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5  gap-12 align-center p-4">
        {searchQuery === "" ?
          plants.map(({ id, imageUrl, name, amount, minimum }) => (<InventoryCard key={id} id={id} image={imageUrl} title={name} available={amount} minimum={minimum} manager />))
          :
          searchPlants.map(({ id, imageUrl, name, amount, minimum }) => (<InventoryCard key={id} id={id} image={imageUrl} title={name} available={amount} minimum={minimum} manager />))
        }
      </div>
    </div>
  );
}

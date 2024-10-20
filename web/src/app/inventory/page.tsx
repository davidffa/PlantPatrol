'use client';
import InventoryCard from "@/components/InventoryCard";
import { Navbar } from "@/components/Navbar";

export default function Inventory() {
    
  return (
    <div>
    <Navbar/>
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
        <InventoryCard image='/roseimg.svg' title='Rose' available={4} minimum={3} manager/>
        <InventoryCard image='/redroseimg.svg' title='Red Rose' available={4} minimum={3} manager/>
        <InventoryCard image='/yellowroseimg.svg' title='Yellow Rose' available={4} minimum={3} manager/>
        <InventoryCard image='/mayflowerimg.svg' title='May Flower' available={4} minimum={3} manager/>
        <InventoryCard image='/ballcactusimg.svg' title='Ball Cactus' available={4} minimum={3} manager/>
        <InventoryCard image='/crysanthemumimg.svg' title='Crysanthemum' available={4} minimum={3} manager/>
        <InventoryCard image='/roseimg.svg' title='Rose1' available={4} minimum={3} manager/>
        <InventoryCard image='/redroseimg.svg' title='Red Rose1' available={4} minimum={3} manager/>
        <InventoryCard image='/yellowroseimg.svg' title='Yellow Rose1' available={4} minimum={3} manager/>
        <InventoryCard image='/mayflowerimg.svg' title='May Flower1' available={4} minimum={3} manager/>
        <InventoryCard image='/ballcactusimg.svg' title='Ball Cactus1' available={4} minimum={3} manager/>
        <InventoryCard image='/crysanthemumimg.svg' title='Crysanthemum1' available={4} minimum={3} manager/>
      </div>
      

    </div>
    </div>
  );
}

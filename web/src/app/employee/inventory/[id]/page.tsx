"use client"

import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { FormEvent, useState, useEffect } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

type Plant = {
  "id": string,
  "name": string,
  "minimum": number,
  "amount": number,
  "family": string,
  "maxHeight": number,
  "about": string;
  "curiosities": string;
  "imageUrl": string;
}
type Props = {
  params: { id: string }
}

export default function Details({ params }: Props) {
  const { id } = params;
  const router = useRouter();
  //const id = "6728a43ac0dcd32aa19138a2";

  const [plant, setPlant] = useState<Plant>();
  const [family, setFamily] = useState("");
  const [size, setSize] = useState("");
  const [about, setAbout] = useState("");
  const [curiosities, setCuriosities] = useState("");


  useEffect(() => {
    async function getPlant() {
      const { data } = await api.get<Plant>(`/inventory/${id}`);


      setFamily(data.family ?? "");
      setSize(data.maxHeight.toString() ?? "");
      setAbout(data.about ?? "");
      setCuriosities(data.curiosities ?? "");

      setPlant(data);
    }
    getPlant();
  });

  const [notesEnabled, setNotesEnabled] = useState(false);

  function handleEditDetails() {
    setNotesEnabled(!notesEnabled)
  }

  async function handleSaveDetails(event: FormEvent<HTMLFormElement>) {
    await api.patch(`/inventory/${id}`, { plant })
    event.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Saved with success!"
    });

  }
  return (
    <>
      <Navbar />
      <div className="mt-12 px-12">
        <div className="justify-between flex px-24 mb-4">
          <div className="flex-col ">
            <div className="flex">
              <Link href="/employee/inventory">
                <button className="py-2 px-6 gap-2">
                  <Image src="/arrow-left.svg" height={42} width={42} alt="Back" />
                </button>
              </Link>
              <h1 className="text-4xl font-semibold font-alt gap-2 py-2  ">
                {plant?.name}
              </h1>
            </div>
            <div className="px-20 mt-12">
              <img
                src={plant?.imageUrl}
                alt="Rose"
                height={350}
                width={400}
              />
            </div>
          </div>
          <div className="justify-around" >
            {
              !notesEnabled ?
                (
                  <div className="flex justify-end mb-6">
                    <button type="button" onClick={handleEditDetails} className="bg-green hover:bg-dark-green hover:duration-200 rounded-md py-2 w-28 justify-center items-center gap-2 mr-4">
                      <p className="text-2xl font-semibold text-white">Edit</p>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSaveDetails}>
                    <div className="flex justify-end mb-6">
                      <button type="submit" className="bg-green hover:bg-dark-green hover:duration-200 rounded-md py-2 w-28 justify-center items-center gap-2 mr-4">
                        <p className="text-2xl font-semibold text-white">Save</p>
                      </button>
                      <button onClick={() => router.push(`/employee/inventory/details?id=${id}`)} type="reset" className="bg-red-500 hover:bg-red-700 hover:duration-200 rounded-md py-2 w-28 justify-center items-center gap-2 " >
                        <p className="text-2xl font-semibold text-white">Cancel</p>
                      </button>
                    </div>
                  </form>
                )
            }
            <div className="flex justify-between gap-12">
              <div>
                <h2 className="text-2xl font-semibold mt-2">
                  Family:
                </h2>
                <input disabled={!notesEnabled} type="text" value={family} className="input input-md input-bordered w-full" onChange={(e) => setFamily(e.target.value)} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mt-2">
                  Size:
                </h2>
                <input disabled={!notesEnabled} type="text" value={size} className="input input-md input-bordered w-full" onChange={(e) => setSize(e.target.value)} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mt-2">
                About:
              </h2>
              <textarea disabled={!notesEnabled} className="textarea textarea-bordered textarea-xl min-w-full h-40" value={about} onChange={(e) => setAbout(e.target.value)} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mt-2">
                Curiosities:
              </h2>
              <textarea disabled={!notesEnabled} className="textarea textarea-bordered textarea-xl min-w-full h-40" value={curiosities} onChange={(e) => setCuriosities(e.target.value)} />
            </div>
          </div>
        </div >
      </div >

    </>
  )
}
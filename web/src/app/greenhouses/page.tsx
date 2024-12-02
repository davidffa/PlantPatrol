"use client"
import { Navbar } from '@/components/Navbar';
import GHouseCard from '../../components/GHouseCard';
import api from '@/services/api';

import withAuth from '@/lib/withAuth'
import { useEffect, useRef, useState } from 'react';
import GreenHouse from './[greenhouseId]/page';
import Swal from 'sweetalert2';
import AddHomeIcon from '@mui/icons-material/AddHome';


type GreenHouse = {
  id: string,
  name: string,
  location: string,
  humidity: number,
  uv: number,
  temperature: number,
  aiq: number,
}

function ManagerPage() {
  const [greenhouses, setGH] = useState<GreenHouse[]>([])
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [newName, setNewName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    try {
      api.get("/greenhouse").then((response) => {
        if (response.status == 200) {
          setGH(response.data)
        }
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "API Error",
        text: `There was an unexpected error with the request. Error ${error} `
      });
    }
  }, [])
  const addGreenHouse = () => {
    const data = { "name": newName, location }
    closeRef.current?.click()
    try {
      api.post("greenhouse", data).then((response) => {
        if (response.status == 201) {
          setGH([...greenhouses, response.data])
          Swal.fire({
            icon: "success",
            title: "Greenhouse",
            text: "Greenhouse created with success!"
          });
        }
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "API Error",
        text: `There was an unexpected error with the request. Error ${error} `
      });
    }
  }

  return (
    <>
      <Navbar />
      <div className='w-full grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4  gap-12 align-center p-4 '>
        {
          greenhouses.map((gh, idx) => (
            <GHouseCard key={idx} id={gh.id} image='/bg-greenhouse.png' greenhouse={gh.name} />
          ))
        }
        <button onClick={() => modalRef.current?.showModal()} className=" shadow-lg z-10 hover:text-green hover:bg-white min-h-[50px] min-w-[50px] w-[8vh] h-[8vh] flex align-middle justify-center bg-green text-white absolute bottom-0 right-0 m-6 rounded-full border-2 border-green p-3">
          <AddHomeIcon className='my-auto ' />
        </button>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog ref={modalRef} className="modal">
          <div className="modal-box text-center">
            <div className="w-full p-3 border-1 flex flex-col gap-2">
              <div className='text-center w-full text-2xl my-4'>Create a new GreenHouse</div>
              <div className='w-full flex justify-center p-3 my-2'>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Name:</span>
                  </div>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    type="text"
                    placeholder="ex: GreenHouse for Cactus..."
                    className="input input-bordered border-green w-full max-w-xs" />
                </label>
              </div>
              <div className='w-full flex justify-center p-3 my-2'>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Location:</span>
                  </div>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    placeholder="Ex: Rua Almeida Garret"
                    className="input input-bordered border-green w-full max-w-xs" />
                </label>
              </div>
              <button onClick={addGreenHouse} className='w-1/2 p-3 text-white bg-green text-xl mx-auto shadow-lg rounded-badge mt-3'>
                Create
              </button>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button ref={closeRef} className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  )
}

export default withAuth(ManagerPage)

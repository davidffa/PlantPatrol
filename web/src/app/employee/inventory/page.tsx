'use client';
import AddInventory from "@/components/AddInventory";
import InventoryCard from "@/components/InventoryCard";
import { Navbar } from "@/components/Navbar";
import { FormEvent, useRef, useState, useEffect } from "react";
import Image from "next/image";
import api from "@/services/api";
import Swal from "sweetalert2";
import withEmployeeAuth from "@/lib/withEmployeeAuth";

type Plant = {
  "id": string,
  "name": string,
  "minimum": number,
  "amount": number,
  "family": string,
  "maxHeight": number,
  "about": string,
  "curiosities": string,
  "imageUrl": string;
}

type AddPlant = {
  name: string;
  quantity: number;
}

function Inventory() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPlants, setSearchPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [invPage, setInvPage] = useState(1);

  useEffect(() => {
    getPlants(0);
  }, []);

  useEffect(() => {
    async function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
        return;
      }
      if (invPage === Infinity) return;

      const len = await getPlants(invPage);

      setInvPage(prev => len === 0 ? Infinity : prev + 1);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, invPage]);

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

  const [components, setComponents] = useState<number>(0);
  const [adds, setAdds] = useState<AddPlant[]>([]);

  async function getPlants(page: number) {
    const { data } = await api.get<Plant[]>("/inventory", { params: { page, pageSize: 15 } });

    if (page === 0) {
      setPlants(data);
    } else {
      setPlants(prev => [...prev, ...data]);
    }

    setIsLoading(false);

    return data.length;
  }

  const reloadPage = () => {
    window.location.reload();
  };

  const addInventory = () => {
    setComponents(prev => prev + 1); // Adiciona um novo componente à lista
  };

  function addToAdds(id: number, name: string, quantity: number) {
    setAdds(prev => {
      prev[id] = { name, quantity };

      return prev;
    })
  }

  const modalRef = useRef<HTMLDialogElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const { data } = await api.post<Plant[]>("/inventory", adds.filter(it => it.name.trim().length >= 0));

      setPlants([...plants, ...data]);

      modalRef.current?.close();

      setComponents(0);

      if (data.length === 0) {
        Swal.fire({
          icon: 'error',
          title: "Alredy exists a plant with the same name!"
        });
      }
      else {
        Swal.fire({
          icon: 'success',
          title: "Plants created",
          text: "Please, wait a while before the new plants descriptions and images to show up"
        });

        setTimeout(async () => {
          await getPlants(0);
          setInvPage(1);
        }, 2000);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error when adding to the inventory. Try again later."
      });
      console.error(err);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="p-3">
        <div className="flex px-4 justify-between">
          <div className="flex justify-start">
            <div className="input input-bordered flex justify-start items-center gap-2">
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
          <div className="mr-4">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="bg-green  hover:bg-dark-green hover:duration-200 rounded-full flex py-1 px-6 justify-center items-center gap-2 " onClick={() => { modalRef.current?.showModal(); addInventory(); }}>
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
                  {
                    Array(components).fill(0).map((_, idx) => (
                      <AddInventory key={idx} id={idx} onChange={addToAdds} />
                    ))
                  }
                </div>
                <div className="mt-3 justify-between flex ">
                  <button className=" bg-green rounded-full hover:bg-dark-green hover:duration-200 flex justify-center items-center  " onClick={addInventory}>
                    <Image src="/plus.svg" alt="Adicionar" height={42} width={42} />
                  </button>
                  <form method="dialog" onSubmit={handleSubmit}>
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
          {searchQuery === "" ?
            plants.map(({ id, imageUrl, name, amount, minimum }) => (<InventoryCard key={id} id={id} image={imageUrl} title={name} available={amount} minimum={minimum} onDelete={reloadPage} />))
            :
            searchPlants.map(({ id, imageUrl, name, amount, minimum }) => (<InventoryCard key={id} id={id} image={imageUrl} title={name} available={amount} minimum={minimum} onDelete={reloadPage} />))
          }
        </div>
      </div>
    </div>
  );
}

export default withEmployeeAuth(Inventory);

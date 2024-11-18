"use client"

import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { AxiosError } from "axios";


// import withAuth from "@/lib/withAuth";
// import { useAuth } from "@/contexts/auth";

export default function Create() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [employees, setEmployees] = useState<string[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await api.get("/employees");
        const employees = response.data.map((employee: { name: string }) => employee.name);
        setEmployees(["Everyone", ...employees])
      } catch (error) {
        const err = error as AxiosError;
        console.log("Failed to fetch employee: " + err);
      }
    }
    fetchEmployees();
  }, []);


  async function handleCreateAlert(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await api.post("/alert", {
        title,
        message: description,
        sendto: sendTo
      });

      alert("Form sent!")
      router.replace("/alerts");
    } catch (error) {
      const err = error as AxiosError;
      console.log("Failed to sent form: " + err);
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="px-12 mt-6 h-full flex flex-col">
        <h1 className="text-4xl font-semibold font-alt gap-2 py-2">
          Create an Alert
        </h1>
        <form className="flex flex-col justify-around h-full" onSubmit={handleCreateAlert}>
          <div>
            <div className="flex justify-between">
              <div className="py-8 w-4/6" >
                <h2 className="text-2xl font-semibold mb-3">
                  Title:
                </h2>
                <input 
                  required 
                  type="text" 
                  placeholder="Type here" 
                  className="input input-md input-bordered w-full" 
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="py-8">
                <h2 className="text-2xl font-semibold mb-3">
                  Send to:
                </h2>
                <select
                  id="send"
                  className="menu menu-dropdown bg-base-100 rounded-box z-[1] w-52 h-12 p-3 border border-gray-300"
                  value={sendTo}
                  onChange={(e) => setSendTo(e.target.value)}
                >
                  {employees.map((employee) => (
                    <option key={employee} value={employee}>
                      {employee}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                Description:
              </h2>
              <textarea 
                required 
                id="description" 
                className="textarea textarea-bordered textarea-xl min-w-full min-h-64 resize-none" 
                placeholder="Alert description" 
                onChange={(e) => setDescription(e.target.value)}
              />

            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Link href="/alerts" className="rounded">
              <Image src="/arrow-left.svg" alt="Back" width={42} height={42} />
            </Link>
            <button type="submit" className="bg-green hover:bg-dark-green hover:duration-200 rounded-full py-2 px-6 justify-center items-center gap-2">
              <p className="text-2xl font-semibold text-white">Send</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

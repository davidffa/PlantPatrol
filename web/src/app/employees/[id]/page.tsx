"use client"

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { activities } from "@/utils/recent-activities";

import Swal from "sweetalert2";
import withManagerAuth from "@/lib/withManagerAuth";
import api from "@/services/api";

type Props = {
  params: { id: string }
}

type EmployeeDetails = {
  name: string;
  age: number;
  address: string | null;
  notes: string | null;
  phoneNumber: string;
  employeeSince: string;
}

type ResetCredentialsResponse = {
  password: string;
}

function ManageEmployee({ params }: Props) {
  const { id } = params;
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employeeSince, setEmployeeSince] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [notesEnabled, setNotesEnabled] = useState(false);

  useEffect(() => {
    async function fetchEmployee() {
      const { data } = await api.get<EmployeeDetails>(`/employees/${id}`);

      setName(data.name);
      setAge(data.age);
      setPhoneNumber(data.phoneNumber);
      setEmployeeSince(data.employeeSince);
      // Set as empty string if they are null
      setAddress(data.address ?? "");
      setNotes(data.notes ?? "");
    }

    fetchEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSaveEmployeeNotes() {
    setNotesEnabled(false);

    await api.patch(`/employees/${id}/notes`, { notes })
  }

  async function handleResetCredentials() {
    const result = await Swal.fire({
      title: "Reset employee credentials?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "green"
    });

    if (result.isConfirmed) {
      const { data } = await api.patch<ResetCredentialsResponse>(`/employees/${id}/reset`);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Employee's credentials copied to clipboard!"
      });

      await navigator.clipboard.writeText(`Password: ${data.password}`);
    }
  }

  async function handleDeleteAccount() {
    const result = await Swal.fire({
      title: "Delete employee account?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "red"
    });

    if (result.isConfirmed) {
      await api.delete(`/employees/${id}`);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Employee deleted!"
      }).then(() => router.push("/employees"));
    }
  }

  return (
    <>
      <Navbar />

      <div className="p-12">
        <h1 className="text-center font-alt font-semibold text-4xl">Employee profile</h1>

        <div className="flex mt-8 gap-12">
          <div>
            <div className="flex flex-col gap-8 items-center bg-slate-100 p-12 rounded-lg shadow-md">
              <div className="rounded-full bg-white overflow-hidden h-36 w-36 flex items-center justify-center">
                <Image
                  src="/employee.png"
                  height={128}
                  width={128}
                  alt="An employee"
                />
              </div>
              <div className="flex flex-col gap-8 justify-start">
                <span className="font-medium">Name: <span className="font-normal">{name}</span></span>
                <span className="font-medium">Age: <span className="font-normal">{age}</span></span>
                <span className="font-medium">Phone number: <span className="font-normal">{Number(phoneNumber).toLocaleString()}</span></span>
                <span className="font-medium">Employee since: <span className="font-normal">{employeeSince}</span></span>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Additional notes:</span>

                    {
                      notesEnabled ?
                        (
                          <Image
                            className="cursor-pointer"
                            src="/save.svg"
                            width={18}
                            height={18}
                            alt="pencil"
                            onClick={handleSaveEmployeeNotes}
                          />
                        ) : (

                          <Image
                            className="cursor-pointer"
                            src="/edit-3.svg"
                            width={18}
                            height={18}
                            alt="pencil"
                            onClick={() => setNotesEnabled(!notesEnabled)}
                          />
                        )
                    }
                  </div>

                  <textarea className="textarea w-72 h-28 px-4 py-1 rounded-md resize-none disabled:bg-slate-200" value={notes} onChange={(e) => setNotes(e.target.value)} disabled={!notesEnabled} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full pt-10">
            <div>
              <h3 className="font-semibold ml-8">Actions</h3>
              <hr />

              <div className="flex justify-between mt-6 px-8">
                <button className="rounded-md bg-green font-medium text-white px-6 py-2 hover:bg-dark-green hover:duration-200" onClick={handleResetCredentials}>
                  Reset credentials
                </button>
                <button className="rounded-md bg-red-500 font-medium text-white px-6 py-2 hover:bg-red-700 hover:duration-200" onClick={handleDeleteAccount}>
                  Delete account
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col">
              <h3 className="font-semibold ml-8">Recent Activity</h3>
              <hr />

              <div className="flex flex-col justify-center mt-6 px-8 gap-3">
                {
                  activities.map((data, idx) => (
                    <Fragment key={idx}>
                      <div className="w-full flex justify-between items-center">
                        <span className="text-slate-400 text-sm">{data.description}</span>
                        <span className="text-slate-400 text-sm">{data.date.toLocaleDateString()} 1:00PM</span>
                      </div>
                      <hr />
                    </Fragment>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withManagerAuth(ManageEmployee);

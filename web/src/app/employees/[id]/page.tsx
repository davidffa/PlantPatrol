"use client"

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { activities } from "@/utils/recent-activities";

import Swal from "sweetalert2";
import withManagerAuth from "@/lib/withManagerAuth";

type Props = {
  params: { id: string }
}

function ManageEmployee({ params }: Props) {
  const { id } = params;
  const router = useRouter();

  const [notesEnabled, setNotesEnabled] = useState(false);
  const [notes, setNotes] = useState("A great employee!");

  function handleSaveEmployeeNotes() {
    setNotesEnabled(false);

    console.log(`Save notes ${notes}`);
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
      console.log(`Resetting credentials of employee id ${id}`);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Employee's credentials copied to clipboard!"
      });

      await navigator.clipboard.writeText("Username: test123 ; Password: pass")
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
                <span className="font-medium">Name: <span className="font-normal">Paulo Miranda</span></span>
                <span className="font-medium">Age: <span className="font-normal">26</span></span>
                <span className="font-medium">Phone number: <span className="font-normal">968 470 123</span></span>
                <span className="font-medium">Employee since: <span className="font-normal">24/10/2023</span></span>
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

"use client"

import { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import { Navbar } from "@/components/Navbar";

import Swal from "sweetalert2";
import withManagerAuth from "@/lib/withManagerAuth";

function NewEmployee() {
  async function handleCreateEmployee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Employee's credentials copied to clipboard!"
    });

    await navigator.clipboard.writeText("Username: test123 ; Password: pass")
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex mt-12 px-10 items-center justify-around">
        <Link href="/employees">
          <Image
            src="/arrow-left.svg"
            height={28}
            width={28}
            alt="Left arrow"
          />
        </Link>
        <h1 className="font-alt font-semibold text-4xl">New Employee</h1>
        { /* Dummy div, then I can use the justify-around and align this properly :) */}
        <div />
      </div>

      <div className="flex-grow flex items-center justify-center mb-24">
        <form className="w-full flex flex-col" onSubmit={handleCreateEmployee}>
          <div className="grid grid-cols-2 gap-y-6 gap-x-6 sm:gap-x-16 md:gap-x-28">
            <label className="form-control w-full max-w-xs justify-self-end">
              <div className="label">
                <span className="label-text">First name: <span className="text-red-400">*</span></span>
              </div>

              <input type="text" placeholder="John" className="input input-bordered w-full max-w-xs" required />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last name: <span className="text-red-400">*</span></span>
              </div>

              <input type="text" placeholder="Doe" className="input input-bordered w-full max-w-xs" required />
            </label>
            <label className="form-control w-full max-w-xs justify-self-end">
              <div className="label">
                <span className="label-text">Phone Number: <span className="text-red-400">*</span></span>
              </div>

              <input type="tel" placeholder="963931124" minLength={9} maxLength={9} className="input input-bordered w-full max-w-xs" required />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Birth date: <span className="text-red-400">*</span></span>
              </div>

              <input type="date" className="input input-bordered w-full max-w-xs" required />
            </label>
            <label className="form-control w-full max-w-xs justify-self-end">
              <div className="label">
                <span className="label-text">Address:</span>
              </div>

              <input type="text" placeholder="New York Street, 204, NY" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Additional notes: </span>
              </div>

              <textarea placeholder="Internship employee" className="textarea textarea-bordered w-full max-w-xs min-h-32 max-h-32 resize-none" />
            </label>

            { /* Skip a cell */}
            <div />

            <div className="max-w-xs w-full flex justify-end">
              <button type="submit" className="px-6 py-2 font-medium text-xl text-white bg-green hover:bg-dark-green hover:duration200 rounded-md justify-self-end">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withManagerAuth(NewEmployee);

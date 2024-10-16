"use client"

import { UnderlineInput } from "@/components/UnderlineInput";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert("Form submitted!");
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar
        showUser={false}
      />

      <main className="flex h-full items-center justify-center bg-slate-100">
        <form className="bg-white p-20 rounded-md flex flex-col gap-8 shadow-md shadow-slate-300" onSubmit={handleSubmit}>
          <h1 className="font-alt font-medium text-3xl text-center">Log in</h1>

          <div className="flex flex-col items-center justify-center gap-6">
            <UnderlineInput
              type="text"
              placeholder="Username"
              maxLength={32}
            />

            <div className="flex border-b border-b-slate-300 w-full">
              <input
                className="p-2 outline-none w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                maxLength={128}
              />
              <Image
                src={showPassword ? "/eye-off.svg" : "/eye.svg"}
                width={18}
                height={18}
                alt="eye"
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <button className="mt-6 p-2 bg-green hover:duration-200 hover:bg-dark-green font-medium text-white text-xl w-full rounded-md">
              LOGIN
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

"use client"

import { UnderlineInput } from "@/components/UnderlineInput";
import { FormEvent } from "react";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import withAuth from "@/lib/withAuth";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Password mismatch!");
      return;
    }

    alert("Form submitted!");
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <main className="flex h-full items-center justify-center bg-slate-100">
        <form className="bg-white p-20 rounded-md flex flex-col gap-8 shadow-md shadow-slate-300" onSubmit={handleSubmit}>
          <h1 className="font-alt font-medium text-3xl text-center">Change password</h1>

          <div className="flex flex-col items-center justify-center gap-6">
            <UnderlineInput
              type="password"
              placeholder="Old Password"
              maxLength={128}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <UnderlineInput
              type="password"
              placeholder="New Password"
              maxLength={128}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <UnderlineInput
              type="password"
              placeholder="Confirm Password"
              maxLength={128}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="mt-6 p-2 bg-green hover:duration-200 hover:bg-dark-green font-medium text-white text-xl w-full rounded-md">
              Confirm
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default withAuth(ChangePassword);

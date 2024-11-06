"use client"

import { UnderlineInput } from "@/components/UnderlineInput";
import { FormEvent, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";

import withAuth from "@/lib/withAuth";
import { useAuth } from "@/contexts/auth";

import Swal from "sweetalert2";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  const { user, refreshUser } = useAuth();

  useEffect(() => {
    if (!user) {
      console.log("No user found.");
      return;
    }

    if (!user?.passwordChanged) {
      Swal.fire({
        icon: "warning",
        title: "Please, change your password",
        text: "Its the first time you log in into the system, please change the password that was provided by the manager"
      });
    }
  }, [user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords mismatch!");
      return;
    }

    try {
      await api.patch("/employees/@me/change-password", {
        oldPassword,
        newPassword
      });

      await Swal.fire({
        icon: "success",
        title: "Password changed!"
      });

      await refreshUser();

      router.push("/greenhouses");
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Could not change the password",
          text: "The old password that you provided is wrong"
        });
        return;
      }

      Swal.fire({
        icon: "error",
        title: "Oops, something went wrong!",
        text: "Could not change the password, try again later..."
      });

      console.log(err);
    }
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

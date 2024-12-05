"use client"

import Link from "next/link";
import Image from "next/image";
import Drawer from "./Drawer";
import { useAuth } from "@/contexts/auth";

export function Navbar() {
  const { logout, isLogged } = useAuth();

  return (
    <div className="bg-dark-green w-full h-16  flex justify-between items-center">
      <Link className="flex items-center justify-center bg-green gap-4 px-6 h-full" href="/">
        <Image src="/logo.png" height={38} width={38} alt="PlantPatrol logo" />
        <span className="text-white text-xl font-bold font-alt">PlantPatrol</span>
      </Link>

      {
        isLogged && (
          <Drawer />
        )
      }

      {
        isLogged && (
          <div className="flex items-center justify-center">
            <div className="dropdown dropdown-end me-8  w-12 h-12 ">
              <div tabIndex={0} role="button" className="btn rounded-full p-2">
                <Image
                  src="/user.svg"
                  width={28}
                  height={28}
                  alt="User image"
                />
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><Link href="/change-password">Change Password</Link></li>
                <li><span onClick={logout}>Logout</span></li>
              </ul>
            </div>
          </div>
        )
      }
    </div>
  )
}

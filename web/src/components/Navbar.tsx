import Link from "next/link";
import Image from "next/image";
import Drawer from "./Drawer";

type Props = {
  showUser?: boolean;
}

export function Navbar({ showUser = true }: Props) {
  return (
    <div className="bg-dark-green w-full h-16  flex justify-between items-center">
      <Link className="flex items-center justify-center bg-green gap-4 px-6 h-full" href="/">
        <Image src="/logo.png" height={38} width={38} alt="PlantPatrol logo" />
        <span className="text-white text-xl font-bold font-alt">PlantPatrol</span>
      </Link>
      <Drawer></Drawer>

      {
        showUser && (
          <div className="flex items-center">
            <div className="cursor-pointer rounded-full bg-white me-8 p-2 border border-black flex items-center justify-center">
              <Image
                src="/user.svg"
                width={28}
                height={28}
                alt="User image"
              />
            </div>
          </div>
        )
      }
    </div>
  )
}

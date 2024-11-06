import { EmployeeCard } from "@/components/EmployeeCard"
import { Navbar } from "@/components/Navbar"
import withManagerAuth from "@/lib/withManagerAuth"
import Image from "next/image"
import Link from "next/link"

function Employees() {
  return (
    <>
      <Navbar />

      <div className="flex justify-between px-16 mt-10">
        <h1 className="font-alt font-bold text-4xl">Employee Management</h1>
        <Link href="/employees/new" className="rounded-full">
          <button className="bg-green py-4 px-8 rounded-full flex gap-4 items-center hover:bg-dark-green hover:duration-200">
            <Image
              src="/plus.svg"
              alt="Add"
              height={42}
              width={42}
            />
            <span className="text-white font-medium text-2xl">New</span>
          </button>
        </Link>
      </div>

      <div className="p-16 overflow-y-scroll flex flex-col gap-8">
        <EmployeeCard id="1" name="Paulo Miranda" imageUrl="/employee.png" age={26} />
        <EmployeeCard id="2" name="Joaquim Costa" imageUrl="/employee.png" age={56} />
        <EmployeeCard id="3" name="Rosa Marques" imageUrl="/employee-girl.png" age={41} />
      </div>
    </>
  )
}

export default withManagerAuth(Employees);

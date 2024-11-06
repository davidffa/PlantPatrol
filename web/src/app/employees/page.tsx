"use client"

import { EmployeeCard } from "@/components/EmployeeCard"
import { Navbar } from "@/components/Navbar"
import { useAuth } from "@/contexts/auth"
import withManagerAuth from "@/lib/withManagerAuth"
import api from "@/services/api"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type Employee = {
  id: string;
  name: string;
  age: number;
}

function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function getEmployees() {
      const { data } = await api.get<Employee[]>("/employees");

      setEmployees(data.filter(e => e.id !== user!.id));
    }

    getEmployees();
  }, [user]);

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
        {
          employees.map(({ id, name, age }) => (
            <EmployeeCard key={id} id={id} name={name} imageUrl="/employee.png" age={age} />
          ))
        }
      </div>
    </>
  )
}

export default withManagerAuth(Employees);

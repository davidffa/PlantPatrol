import Image from "next/image";

type Props = {
  name: string;
  imageUrl: string;
  age: number;
}

export function EmployeeCard({ name, imageUrl, age }: Props) {
  return (
    <div className="flex justify-between w-full bg-slate-100 py-5 px-10 rounded-lg shadow-md">
      <div className="flex gap-6 items-center">
        <div className="rounded-full bg-white overflow-hidden h-36 w-36 flex items-center justify-center">
          <Image
            src={imageUrl}
            height={128}
            width={128}
            alt="A employee"
          />
        </div>
        <div className="flex flex-col justify-around h-3/4">
          <p className="text-xl">Name: {name}</p>
          <p className="text-xl">Age: {age}</p>
        </div>
      </div>
      <button className="rounded-lg bg-dark-green text-white font-semibold text-lg my-auto p-6">
        Manage Account
      </button>
    </div>
  )
}

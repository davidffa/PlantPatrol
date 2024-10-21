import { AlertCollapse } from "@/components/AlertCollapse";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";

export default function Alerts() {
  return (
    <>
      <Navbar />
      <div className="p-12">
        <div className="flex justify-between">
          <div className="">
            <h1 className="text-4xl font-semibold font-alt gap-2 py-2  ">
              Alerts
            </h1>
          </div>

          <Link href="/alerts/create">
            <button className="bg-green hover:bg-dark-green hover:duration-200 rounded-full flex py-2 px-6 justify-center items-center gap-2 " >
              <Image src="/plus.svg" alt="Adicionar" height={42} width={42} />
              <p className="text-2xl font-semibold text-white">New</p>
            </button>
          </Link>

        </div>
        <div className="py-12">
          <h2 className="text-2xl font-semibold">
            Alerts sent:
          </h2>
        </div>

        <AlertCollapse
          title="Order more fertilizer"
          data="12/10/2024, 6:20PM"
          sender="Everyone"
          description="We're running out of fertilizer, please order at least 100L until next week."
        />
        <AlertCollapse
          title="Urgent meeting!"
          data="10/10/2024, 4:19PM"
          sender="Everyone"
          description="We're running out of fertilizer, please order at least 100L until next week."
        />
        <AlertCollapse
          title="Replace faulty sensour at greenhouse 3!"
          data="4/10/2024, 3:35PM"
          sender="Everyone"
          description="We're running out of fertilizer, please order at least 100L until next week."
        />
        <AlertCollapse
          title="Improve watering rules"
          data="3/10/2024, 10:12AM"
          sender="Everyone"
          description="We're running out of fertilizer, please order at least 100L until next week."
        />

      </div>
    </>
  );
}

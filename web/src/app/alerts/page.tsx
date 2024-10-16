import { AlertCollapse } from "@/components/AlertCollapse";
import Link from "next/link";

export default function Alerts() {
  return (
    <div className="p-12">
      <div className="flex justify-between">
        <div className="">
          <h1 className="text-4xl font-semibold font-alt gap-2 py-2  ">
            Alerts
          </h1>
        </div>

        <Link href="/alerts/create">
          <button className="bg-green hover:bg-dark-green hover:duration-200 rounded-full flex py-2 px-6 justify-center items-center gap-2 " >
            <img src="/plus.svg" alt="Adicionar" />
            <p className="text-2xl font-semibold text-white">New</p>
          </button>
        </Link>

      </div>
      <div className="py-12">
        <h2 className="text-2xl font-semibold">
          Alerts send:
        </h2>
      </div>
      
      <AlertCollapse
        title="Order more fertilizer"
        data="12/10/2024, 6:20PM"
        sender="Everyone"
        description="We're running out of fertilizer, please order at least 100L until next week.
        Regards, 
        Paulo Miranda"
        thanks="Regards,"
        name="Paulo Miranda"
      />
      <AlertCollapse
        title="Urgent meeting!"
        data="10/10/2024, 4:19PM"
        sender="Everyone"
        description="We're running out of fertilizer, please order at least 100L until next week."
        thanks="Regards,"
        name="Paulo Miranda"
      />
      <AlertCollapse
        title="Replace faulty sensour at greenhouse 3!"
        data="4/10/2024, 3:35PM"
        sender="Everyone"
        description="We're running out of fertilizer, please order at least 100L until next week."
        thanks="Regards,"
        name="Paulo Miranda"
      />
      <AlertCollapse
        title="Improve watering rules"
        data="3/10/2024, 10:12AM"
        sender="Everyone"
        description="We're running out of fertilizer, please order at least 100L until next week."
        thanks="Regards,"
        name="Paulo Miranda"
      />

    </div>
  );
}
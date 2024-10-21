import { AlertCollapseReciver } from "@/components/AlertCollapseReciver";
import { Navbar } from "@/components/Navbar";

export default function Alerts() {
  return (
    <>
      <Navbar />
      <div className="p-12">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold font-alt gap-2 py-2 mb-6 ">
            Alerts
          </h1>
          <hr className="mb-4" />
        </div>

        <AlertCollapseReciver
          title="SYSTEM: Check temp. sensor no. 2 at Greenhouse 2"
          data="13/10/2024, 1:40PM"
          description="We're running out of fertilizer, please order at least 100L until next week."
        />
        <AlertCollapseReciver
          title="Order more fertilizer"
          data="12/10/2024, 6:20PM"
          description="We're running out of fertilizer, please order at least 100L until next week."
        />
        <AlertCollapseReciver
          title="Urgent meeting!"
          data="10/10/2024, 4:19PM"
          description="We're running out of fertilizer, please order at least 100L until next week."
        />
        <AlertCollapseReciver
          title="Replace faulty sensour at greenhouse 3!"
          data="4/10/2024, 3:35PM"
          description="We're running out of fertilizer, please order at least 100L until next week."
        />
        <AlertCollapseReciver
          title="Improve watering rules"
          data="3/10/2024, 10:12AM"
          description="We're running out of fertilizer, please order at least 100L until next week."
        />
      </div>
    </>
  );
}

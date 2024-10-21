import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Create() {
  return (
    <>
      <Navbar />

      <div className="px-12 py-6">
        <div className="justify-right">
          <h1 className="text-4xl font-semibold font-alt gap-2 py-2  ">
            Create an Alert
          </h1>
        </div>
        <form>
          <div className="flex justify-between">
            <div className="py-8 w-4/6" >
              <h2 className="text-2xl font-semibold mb-3">
                Title:
              </h2>
              <input required type="text" placeholder="Type here" className="input input-md input-bordered w-full" />
            </div>
            <div className="py-8">
              <h2 className="text-2xl font-semibold mb-3">
                Send to:
              </h2>
              <div>
                <select name="Send" id="send" className="menu menu-dropdown bg-base-100 rounded-box  z-[1] w-52 h-12  p-3 border  border-gray-300 ">
                  <option value="Everyone">Everyone</option>
                  <option value="Paulo">Paulo Miranda</option>
                  <option value="Joaquim">Joaquim Costa</option>
                  <option value="Rosa">Rosa Marques</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Description:
            </h2>
            <textarea required id="description" className="textarea textarea-bordered textarea-xl min-w-full min-h-64" placeholder="Alert description"></textarea>

          </div>
          <div className="flex justify-between mt-6">
            <Link href="/alerts" className="rounded">
              <Image src="/arrow-left.svg" alt="Back" width={42} height={42} />
            </Link>
            <div>
              <button className="bg-green hover:bg-dark-green hover:duration-200 rounded-full py-2 px-6 justify-center items-center gap-2 " >
                <p className="text-2xl font-semibold text-white">Send</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
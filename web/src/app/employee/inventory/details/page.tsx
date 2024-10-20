import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Details() {
  return (
    <>
      <Navbar />
      <div className="p-12">
        <div className="justify-between flex px-24 mb-4">
          <div className="flex ">
            <Link href="/employee/inventory">
              <button className="py-2 px-6 gap-2">
                <Image src="/arrow-left.svg" height={42} width={42} alt="Back" />
              </button>
            </Link>
            <h1 className="text-4xl font-semibold font-alt gap-2 py-2  ">
              Rose
            </h1>
          </div>
          <div className="">
            <button className="bg-green hover:bg-dark-green hover:duration-200 rounded-md py-2 w-28 justify-center items-center gap-2 mr-4" >
              <p className="text-2xl font-semibold text-white">Save</p>
            </button>
            <button className="bg-red-500 hover:bg-red-700 hover:duration-200 rounded-md py-2 w-28 justify-center items-center gap-2 " >
              <p className="text-2xl font-semibold text-white">Cancel</p>
            </button>
          </div>
        </div>
        <form>
          <div className="flex justify-around">
            <div className="px-20 mt-4">
              <Image
                src="/roseimg.svg"
                alt="Rose"
                height={350}
                width={400}
              />
            </div>
            <div>
              <div className="flex justify-between gap-12">
                <div className="mb-3" >
                  <h2 className="text-2xl font-semibold ">
                    Family:
                  </h2>
                  <input required type="text" placeholder="Type here" className="input input-md input-bordered w-full" />
                </div>
                <div className="mb-3 " >
                  <h2 className="text-2xl font-semibold ">
                    Size:
                  </h2>
                  <input required type="text" placeholder="Type here" className="input input-md input-bordered w-full" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold ">
                  About:
                </h2>
                <textarea required className="textarea textarea-bordered textarea-xl min-w-full h-40" placeholder="Type here" />

              </div>
              <div>
                <h2 className="text-2xl font-semibold">
                  Curiosities:
                </h2>
                <textarea required className="textarea textarea-bordered textarea-xl min-w-full h-40" placeholder="Type here" />

              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
import React from 'react'


type Props = {
  params: { idRule: string }
}

export default function newRule({ params }: Props) {
  const { idRule } = params
  return (
    <>
      <div className="grid grid-cols-1 w-full p-4 h-full  rounded-lg ">
        <div className='w-full text-left text-black font-bold text-4xl p-5'>
          Rule {idRule}
        </div>
        <form action="">
          <div className="grid grid-cols-2">
            <div className='p-3 flex-row gap-2'>
              <input type="text" name='name' aria-label='Name' placeholder="Rule" className="input input-bordered w-4/5 " required />
            </div>
            <div className='p-3 '>
              <select className="select select-bordered w-full ">
                <option disabled selected>GreenHouse Section?</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className='grid grid-cols-2 my-6 '>
            <div className="flex flex-col">
              <div className="text-xl font-semibold text-center">
                Sensors
              </div>
              <div className='w-full p-3 grid grid-cols-2'>
div*2
                <input type="range" min={0} max="100" value="25" className="range" step="25" />
                <div className="flex w-full justify-between px-2 text-xs">
                  <span>|</span>
                  <span>|</span>
                  <span>|</span>
                  <span>|</span>
                  <span>|</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-semibold text-center">
                Actuators
              </div>
              <div className='w-full p-3'>

              </div>

            </div>
          </div>
        </form>

      </div>
    </>
  )
}
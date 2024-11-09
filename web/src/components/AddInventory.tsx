
export default function AddInventory(){
	return (
    <div className="rounded-xl bg-slate-200 mb-3">
      <form className="flex justify-beetween p-3 ">
        <div className="flex w-2/3 justify-between"> 
          <h2 className="mt-1">Name:</h2>
          <input required type="text" placeholder="Type here" className="input input-sm input-bordered w-2/3" />
          <div className="w-1/6"></div>
        </div>
        
        <div className="flex w-1/3 justify-between">
          <h2 className="mt-1">Quantity Available:</h2>
          <input required type="number" placeholder="" className="input input-sm input-bordered w-20" />
          <div className="w-1/6"></div>
        </div>
      </form>
    </div>
  )
}
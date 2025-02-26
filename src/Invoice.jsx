import { useContext } from "react"
import { AppContext } from "./Context"

export default function Invoice() {
  const {orders} = useContext(AppContext)
  const statusColors = {
    "Delivered": "bg-clr1-25 text-clr1",
    "In Transit": "bg-clr2-25 text-clr2",
    "Loading": "bg-lime-600/20 text-lime-600 ",
    "Delayed": "bg-yellow-400/20 text-yellow-400",
    "In Storage": "bg-stone-700/20 text-stone-700 ",
    "Cancelled": "bg-clr3-25 text-clr3",
    "New": "bg-indigo-500/25 text-indigo-500",
    "Checking in": "bg-pr text-white",
    "Unloading": "bg-indigo-500 text-white"
  };
  return (
    <div className="w-full min-h-screen flex items-center">
      <div className=" flex-1 h-full flex flex-col mt-8 p-5 gap-6">
        {orders.map((order,index)=>{
          return(
            <div key={index} className="bg-boxclr rounded-md shadow-md p-2">
              <div className="flex justify-between mx-3">
                <p className=" text-sm font-semibold">ORDER ID: #{order.package_information.package_id}</p> 
                <div  className={`text-center rounded-md w-20 p-2 ${statusColors[order.status] || "bg-gray-500 text-white"}`}>
                  <p className={`text-xs font-bold`}>{order.status}</p>
                </div>
              </div>
              
            </div>
          )
        })}

        
        
      </div>


      
      <div className="bg-boxclr mt-8 shadow-md flex-1 h-full">

      </div>
       
    </div>
  )
}

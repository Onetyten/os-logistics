import { faTriangleExclamation, faTruck, faTruckLoading, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AppContext } from "./Context";


export default function Dashboard() {
  const {orders,setOrders,orderSize} = useContext(AppContext)
  return (
    <div>
        <div className="px-3 2xl:px-[10%] xl:px-[5%] my-5 ">
          <p className="md:text-lg font-semibold text-sm ">DashBoard</p>
        </div>



        <div className="xl:grid-cols-8  2xl:px-[10%]  xl:px-[5%]  auto-cols-fr auto-rows-fr gap-3 px-3 grid-rows-3 flex flex-col md:grid w-full mb-32 md:mb-0">

            {/* onroute vehicles */}
            <div className={`bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md`}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-25 rounded-md text-primary ">
                  <FontAwesomeIcon icon={faTruck}/>
                </div>
                <p className="font-semibold">42</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm">On route vehicles</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm"> <span className="font-semibold">45% </span>of vehicles are on route</p>
              </div>
              
            
            </div>
            {/* loading vehicles */}
            <div className={`bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md`} onClick={()=>{console.log(orders,orderSize)}}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-clr2-25 rounded-md text-clr2">
                  <FontAwesomeIcon icon={faTruckLoading}/>
                </div>
                <p className="font-semibold">10</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm">Vehicles loading</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm"> <span className="font-semibold">15% </span>of vehicles are loading</p>
              </div>
              
            
            </div>
            {/*error prone vehicles */}
            <div className={`bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md`}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-clr3-25 rounded-md text-clr3 ">
                  <FontAwesomeIcon icon={faTriangleExclamation}/>
                </div>
                <p className="font-semibold">4</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm">Vehicles with errors</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm"> <span className="font-semibold">5% </span>of vehicles are error ridden</p>
              </div>
              
            
            </div>
            {/* in storage vehicles */}
            <div className={`bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md`}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-clr1-25 text-clr1 rounded-md ">
                  <FontAwesomeIcon icon={faWarehouse}/>
                </div>
                <p className="font-semibold">8</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm">Vehicles in storage</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm"> <span className="font-semibold">12% </span>of vehicles are in storage</p>
              </div>
              
            
            </div>
            
            



            <div className={`bg-boxclr mt-10 md:mt-0 rounded-md col-span-4 w-full min-h-32 row-span-2 shadow-md`}>
            
            </div>
            <div className={`bg-boxclr rounded-md col-span-4 w-full min-h-32 row-span-2 shadow-md`}>
        
            </div>


 
            <div className={`bg-boxclr mt-10 md:mt-0 rounded-md w-full min-h-32 row-span-2 col-span-3 xl:col-span-3 shadow-md`}>
            
            </div>
            <div className={`bg-boxclr rounded-md row-span-2 w-full min-h-32 xl:col-span-2 shadow-md`}>
        
            </div>
            <div className={`bg-boxclr rounded-md row-span-2 w-full min-h-32 col-span-4 xl:col-span-3 shadow-md`}>
        
            </div>
          
        </div>
    </div>
  )
}

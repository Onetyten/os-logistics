import { faTriangleExclamation, faTruck, faTruckLoading, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext} from "react";
import { AppContext } from "./Context";
import OrderByCountries from "./Components/OrderByCountries";
import DeliveryTimeline from "./Components/DeliveryTimeline";
import MonthlyShipment from "./Components/MonthlyShipment";
import VehicleOverview from "./Components/VehicleOverview";


export default function Dashboard() {
  const {orderStatuses,OnRouteSize,orderSize,oDeliveredSize,oLoadingSize,oDelayedSize,oInStorageSize,oCancelledSize,oCheckingSize,oUnLoadingSize,processedData,totalDistance} = useContext(AppContext)


  return (
    <div>
        <div className="px-0 2xl:px-[10%] xl:px-[5%] my-5 ">
          <p className="md:text-lg font-semibold text-sm ">DashBoard</p>
        </div>



        <div className="xl:grid-cols-8  2xl:px-[10%]  xl:px-[5%]  auto-cols-fr auto-rows-fr gap-3 px-0 grid-rows-3 flex flex-col md:grid w-full mb-32 md:mb-0">

            {/* onroute vehicles */}
            <div className={`bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md`}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-25 rounded-md text-primary ">
                  <FontAwesomeIcon icon={faTruck}/>
                </div>
                <p className="font-semibold">{(OnRouteSize+oLoadingSize+oCheckingSize)}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm">On route vehicles</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm"> <span className="font-semibold">{Math.floor(((OnRouteSize+oLoadingSize+oCheckingSize)/orderSize)*100)} % </span>of vehicles are on route</p>
              </div>
            </div>

            
            {/* unloading vehicles */}
            <div className={`bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md`} onClick={()=>{console.log(orderStatuses,processedData)}}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-clr2-25 rounded-md text-clr2">
                  <FontAwesomeIcon icon={faTruckLoading}/>
                </div>
                <p className="font-semibold">{oUnLoadingSize}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm">Vehicles unloading</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm"> <span className="font-semibold">{Math.floor((oUnLoadingSize/orderSize)*100)} %  </span>of vehicles are unloading</p>
              </div>
              
            
            </div>
            {/*error prone vehicles */}
            <div className={`bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md`}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-clr3-25 rounded-md text-clr3 ">
                  <FontAwesomeIcon icon={faTriangleExclamation}/>
                </div>
                <p className="font-semibold">{oDelayedSize+oCancelledSize}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm">Vehicles with errors</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm"> <span className="font-semibold">{Math.floor(((oDelayedSize+oCancelledSize)/orderSize)*100)} %</span>of vehicles are error ridden</p>
              </div>
              
            
            </div>
            {/* in storage vehicles */}
            <div className={`bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md`}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-clr1-25 text-clr1 rounded-md ">
                  <FontAwesomeIcon icon={faWarehouse}/>
                </div>
                <p className="font-semibold">{oInStorageSize+oDeliveredSize}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm">Vehicles in storage</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm"> <span className="font-semibold">{Math.floor(((oInStorageSize+oDeliveredSize)/orderSize)*100)} %</span>of vehicles are in storage</p>
              </div>
            </div>

            <VehicleOverview/>
            <MonthlyShipment/>
            <DeliveryTimeline/>

            <div className={`bg-boxclr rounded-md row-span-2 w-full min-h-32 xl:col-span-2 p-3 shadow-md`}>
              <p className="text-sm font-semibold">Total distance to travel</p>
              <div className="flex w-full h-full justify-center text-primary items-center">
                <p className="text-2xl font-bold">{totalDistance}KM</p>
              </div>
            </div>

            <OrderByCountries/>


        </div>
    </div>
  )
}

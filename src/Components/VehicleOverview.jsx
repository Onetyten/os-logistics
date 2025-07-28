import OverviewItem from "./OverviewItem";
import { useContext} from "react";
import { AppContext } from "../Context";

export default function VehicleOverview() {
    const {OnRouteSize,orderSize,oDeliveredSize,oLoadingSize,oDelayedSize,oInStorageSize,oCancelledSize,oCheckingSize,oUnLoadingSize,vehicleType,} = useContext(AppContext)

  return (
    <div className={`bg-boxclr rounded-md col-span-4 w-full min-h-32 p-3 row-span-2 shadow-md`}>
        <p className="text-sm font-semibold">Vehicles Overview</p>
        <div className="flex mt-4 flex-wrap md:flex-nowrap justify-around w-full rounded-md overflow-hidden ">
            <OverviewItem item="Checking in"  color={"bg-blue-600/10"} percentage={Math.floor(((oCheckingSize)/orderSize)*100)} />
            <OverviewItem item="Loading"  color={"bg-blue-600/20"} percentage={Math.floor(((oLoadingSize)/orderSize)*100)} />
            <OverviewItem item="In Transit"  color={"bg-blue-600/30"} percentage={Math.floor(((OnRouteSize)/orderSize)*100)} />
            <OverviewItem item="Unloading"  color={"bg-blue-600/40"} percentage={Math.floor(((oUnLoadingSize)/orderSize)*100)}/>
            <OverviewItem item="In Storage"  color={"bg-blue-600/50"} percentage={Math.floor(((oInStorageSize)/orderSize)*100)} />   
            <OverviewItem item="Delayed"  color={"bg-blue-600/60"} percentage={Math.floor(((oDelayedSize)/orderSize)*100)}/>
            <OverviewItem item="Cancelled"  color={"bg-blue-600/70"} percentage={Math.floor(((oCancelledSize)/orderSize)*100)} />
            <OverviewItem item="Delivered" color={"bg-blue-600/80"} percentage={Math.floor(((oDeliveredSize)/orderSize)*100)} />
          

            
            
        </div>

        <div className="w-full mt-3">
        <p className="text-center text-sm font-semibold">Number of vehicles : {orderSize}</p>
        <div className="mt-3 flex flex-col gap-3">
            {Object.entries(vehicleType).map(([name,count])=>{
            if (name == "null"){
                name = "Others"
            }
            return(
                <div key={name} className="flex w-full justify-between">
                <p className="text-sm">{name}</p>
                <p className="text-sm font-semibold text-primary">{count}</p>
                </div>
            )
            })}
        </div>
        </div>
        
        

    </div>
  )
}

import OverviewItem from "./OverviewItem";
import { useShipmentAnalysis } from "../hooks/shipmentAnalysis";

export default function VehicleOverview() {
    const {shipmentStatusPercentage:statusPerc,shipmentStatusCount,intransitVehicleList} = useShipmentAnalysis()
    console.log(intransitVehicleList)
    

  return (
    <div className={`bg-boxclr rounded-md col-span-4 w-full min-h-32 p-3 row-span-2 shadow-md`}>
        <p className="text-sm font-semibold">Vehicles Overview</p>
        <div className="flex mt-4 flex-wrap md:flex-nowrap justify-around w-full rounded-md overflow-hidden ">
            <OverviewItem item="Checking in"  color={"bg-blue-600/10"} percentage={statusPerc.checkingIn} />
            <OverviewItem item="Loading"  color={"bg-blue-600/20"} percentage={statusPerc.loading} />
            <OverviewItem item="In Transit"  color={"bg-blue-600/30"} percentage={statusPerc.inTransit} />
            <OverviewItem item="Unloading"  color={"bg-blue-600/40"} percentage={statusPerc.unloading}/>
            <OverviewItem item="In Storage"  color={"bg-blue-600/50"} percentage={statusPerc.inStorage} />   
            <OverviewItem item="Delayed"  color={"bg-blue-600/60"} percentage={statusPerc.delayed}/>
            <OverviewItem item="Cancelled"  color={"bg-blue-600/70"} percentage={statusPerc.cancelled} />
            <OverviewItem item="Delivered" color={"bg-blue-600/80"} percentage={statusPerc.delivered} />
        </div>

        <div className="w-full mt-3">
        <p className="text-center text-sm font-semibold">Number of vehicles in transit : {shipmentStatusCount.inTransit}</p>
        <div className="mt-3 flex flex-col gap-3">
            {intransitVehicleList.map(([name,count])=>{
            if (name == "null" || name == "undefined"){
                return
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

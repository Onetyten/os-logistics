import OverviewItem from "./OverviewItem";
import { useShipmentAnalysis } from "../hooks/shipmentAnalysis";
import SpotlightBorder from "./SpotlightBorder";
import TextScramble from "./TextScramble";

export default function VehicleOverview() {
    const {shipmentStatusPercentage:statusPerc,shipmentStatusCount,intransitVehicleList} = useShipmentAnalysis()
    

  return (
    <div className={` col-span-4 flex flex-col sm:justify-between  w-full sm:h-full xl:row-span-3 lg:row-span-4 sm:row-span-7 row-span-10 gap-2 `}>
        <SpotlightBorder className="rounded-md flex-1 sm:h-2/3 shadow-md p-3 sm:p-6 flex flex-col justify-between gap-2">
            <p className="text-base text-primary font-semibold">Vehicle Overview</p>
            <div className="flex flex-wrap lg:flex-nowrap justify-around w-full rounded-md overflow-hidden ">
                <OverviewItem item="Checking in"  color={"bg-primary/10"} percentage={statusPerc.checkingIn} />
                <OverviewItem item="Loading"  color={"bg-primary/20"} percentage={statusPerc.loading} />
                <OverviewItem item="In Transit"  color={"bg-primary/30"} percentage={statusPerc.inTransit} />
                <OverviewItem item="Unloading"  color={"bg-primary/40"} percentage={statusPerc.unloading}/>
                <OverviewItem item="In Storage"  color={"bg-primary/50"} percentage={statusPerc.inStorage} />   
                <OverviewItem item="Delayed"  color={"bg-primary/60"} percentage={statusPerc.delayed}/>
                <OverviewItem item="Cancelled"  color={"bg-primary/70"} percentage={statusPerc.cancelled} />
                <OverviewItem item="Delivered" color={"bg-primary/80"} percentage={statusPerc.delivered} />
            </div>
            <div className="text-center before:w-4 before:h-4 before:bg-primary text-muted flex gap-2 justify-center text-sm font-semibold">Number of vehicles in transit : 
                <TextScramble texts={[`${shipmentStatusCount.inTransit}`]} nextLetterSpeed={50} className="text-primary" letterSpeed={30}/>
                
            </div>

        </SpotlightBorder>
      
        <div className=" w-full xl:h-1/3 grid grid-cols-4 gap-2">
            {intransitVehicleList.map(([name,count])=>{
            if (name == "null" || name == "undefined"){
                return
            }
            return(
                <SpotlightBorder key={name} className="flex col-span-4 xl:col-span-1 lg:col-span-2 sm:col-span-1 flex-col gap-1 xl:gap-4 w-full h-full justify-center items-center bg-boxclr rounded-md flex-1 shadow-md p-2 sm:p-6">
                    <TextScramble className="sm:text-base text-muted" texts={[`${name}s`]} nextLetterSpeed={50} letterSpeed={30}/>
                    <div className="text-base font-bold text-primary">
                        <TextScramble texts={[`${count}`]} nextLetterSpeed={100} letterSpeed={50}/> 
                        
                    </div>
                </SpotlightBorder>
            )
            })}
        </div>
    </div>
  )
}

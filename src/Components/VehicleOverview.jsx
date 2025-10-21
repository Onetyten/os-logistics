import OverviewItem from "./OverviewItem";
import { useShipmentAnalysis } from "../hooks/shipmentAnalysis";
import SpotlightBorder from "./SpotlightBorder";
import TextScramble from "./TextScramble";

export default function VehicleOverview() {
    const {shipmentStatusPercentage:statusPerc,shipmentStatusCount,intransitVehicleList} = useShipmentAnalysis()
    

  return (
    <div className={` col-span-4 flex flex-col sm:justify-between  w-full h-[800px] sm:h-full row-span-3 gap-2 `}>
        <SpotlightBorder className="rounded-md flex-1 sm:h-2/3 shadow-md p-3 sm:p-6 flex flex-col justify-between gap-2">
            <p className="text-lg text-primary font-semibold">Vehicles overview</p>
            <div className="flex flex-wrap md:flex-nowrap justify-around w-full rounded-md overflow-hidden ">
                <OverviewItem item="Checking in"  color={"bg-primary/10"} percentage={statusPerc.checkingIn} />
                <OverviewItem item="Loading"  color={"bg-primary/20"} percentage={statusPerc.loading} />
                <OverviewItem item="In Transit"  color={"bg-primary/30"} percentage={statusPerc.inTransit} />
                <OverviewItem item="Unloading"  color={"bg-primary/40"} percentage={statusPerc.unloading}/>
                <OverviewItem item="In Storage"  color={"bg-primary/50"} percentage={statusPerc.inStorage} />   
                <OverviewItem item="Delayed"  color={"bg-primary/60"} percentage={statusPerc.delayed}/>
                <OverviewItem item="Cancelled"  color={"bg-primary/70"} percentage={statusPerc.cancelled} />
                <OverviewItem item="Delivered" color={"bg-primary/80"} percentage={statusPerc.delivered} />
            </div>
            <p className="text-center before:w-4 before:h-4 before:bg-primary text-muted flex gap-2 justify-center text-sm font-semibold">Number of vehicles in transit : 
                <TextScramble texts={[`${shipmentStatusCount.inTransit}`]} nextLetterSpeed={50} className="text-primary" letterSpeed={30}/>
                
            </p>

        </SpotlightBorder>
      
        <div className=" w-full h-24 sm:h-1/3 flex gap-2">
            {intransitVehicleList.map(([name,count])=>{
            if (name == "null" || name == "undefined"){
                return
            }
            return(
                <SpotlightBorder key={name} className="flex flex-col gap-4 w-full h-full justify-center items-center bg-boxclr rounded-md flex-1 shadow-md p-3 sm:p-6">
                    <TextScramble className="text-xl text-muted" texts={[`${name}s`]} nextLetterSpeed={50} letterSpeed={30}/>

                    <p className="text-xl font-bold text-primary">
                        <TextScramble texts={[`${count}`]} nextLetterSpeed={100} letterSpeed={50}/> 
                        
                    </p>
                </SpotlightBorder>
            )
            })}
        </div>


        

    </div>
  )
}

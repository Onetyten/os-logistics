import { lazy } from "react";
import { useShipmentAnalysis } from "./hooks/shipmentAnalysis";
import { faTruck,faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StatusLazy from "./Components/lazyLoaded/statusLazy";
import OverviewLazy from "./Components/lazyLoaded/overviewLazy";
import MonthlyShipmentLazy from "./Components/lazyLoaded/MonthlyShipmentLazy";
import OrderByCountryLazy from "./Components/lazyLoaded/OrderByCountryLazy";
import TotalCostLazy from "./Components/lazyLoaded/TotalCostLazy";
import TotalCostCard from "./Components/TotalCost";
const OrderByCountries = lazy(() => import("./Components/OrderByCountries"));
const DeliveryTimeline = lazy(() => import("./Components/DeliveryTimeline"));
export const MonthlyShipment = lazy(() => import("./Components/MonthlyShipment"));
export const VehicleOverview = lazy(() => import("./Components/VehicleOverview"));
const StatusGrid = lazy(()=>import("/src/Components/statusGrid"))




export default function Dashboard() {
  const {shipmentStatusCount,shipmentStatusPercentage,loading} = useShipmentAnalysis()

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 auto-cols-fr auto-rows-[100px] sm:auto-rows-[120px] gap-2 grid w-full mb-32 md:mb-0">
          <StatusLazy />
          <StatusLazy />
          <StatusLazy />
          <StatusLazy />
          <TotalCostLazy />
          <OverviewLazy />
          <OrderByCountryLazy />
          <MonthlyShipmentLazy />
          <MonthlyShipmentLazy />
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-6">
      <div className="xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 auto-cols-fr auto-rows-[100px] sm:auto-rows-[120px] gap-2 grid w-full mb-32 md:mb-0">
        
        
        <StatusGrid icon={<FontAwesomeIcon icon={faTruck} />} message="of shipments are on route" color={"text-blue-500"} bgcolor={"bg-blue-500/50"} count={shipmentStatusCount.inTransit+shipmentStatusCount.loading+shipmentStatusCount.checkingIn+shipmentStatusCount.unloading} percentage={shipmentStatusPercentage.inTransit+shipmentStatusPercentage.loading+shipmentStatusPercentage.checkingIn+shipmentStatusPercentage.unloading}/>
  
        <StatusGrid icon={<FontAwesomeIcon icon={faWarehouse} />} message="of shipments are in storage" color={"text-orange-500"} bgcolor={"bg-orange-400/50"}  count={shipmentStatusCount.inStorage} percentage={shipmentStatusPercentage.inStorage}/>

        <StatusGrid icon={<FontAwesomeIcon icon={faWarehouse} />} message="of shipments have errors" color={"text-red-500"} bgcolor={"bg-red-500/50"}  count={shipmentStatusCount.cancelled+shipmentStatusCount.delayed} percentage={shipmentStatusPercentage.cancelled+shipmentStatusPercentage.delayed}/>
  
        <StatusGrid icon={<FontAwesomeIcon icon={faWarehouse} />} message="of shipments have been delivered" color={"text-teal-600"} bgcolor={"bg-teal-600/50"}  count={shipmentStatusCount.delivered} percentage={shipmentStatusPercentage.delivered}/>
    
        <TotalCostCard/>
        
        <VehicleOverview/>

        <OrderByCountries />

        <MonthlyShipment />

        <DeliveryTimeline />

      </div>
    </div>
  );
}

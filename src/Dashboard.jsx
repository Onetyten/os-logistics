import { lazy, Suspense } from "react";
import { useShipmentAnalysis } from "./hooks/shipmentAnalysis";
import { faTruck,faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StatusLazy from "./Components/lazyLoaded/statusLazy";
import OverviewLazy from "./Components/lazyLoaded/overviewLazy";
import MonthlyShipmentLazy from "./Components/lazyLoaded/MonthlyShipmentLazy";
import TimelineLazy from "./Components/lazyLoaded/TimelineLazy";
import TotalDistanceLazy from "./Components/lazyLoaded/TotalDistanceLazy";
import OrderByCountryLazy from "./Components/lazyLoaded/OrderByCountryLazy";
// lazy loaded importd
const OrderByCountries = lazy(() => import("./Components/OrderByCountries"));
const DeliveryTimeline = lazy(() => import("./Components/DeliveryTimeline"));
export const MonthlyShipment = lazy(() => import("./Components/MonthlyShipment"));
export const VehicleOverview = lazy(() => import("./Components/VehicleOverview"));
const StatusGrid = lazy(()=>import("/src/Components/statusGrid"))
const TotalDistanceCard = lazy(()=>import("./Components/TotalDistanceCard"))



export default function Dashboard() {
  const {shipmentStatusCount,shipmentStatusPercentage} = useShipmentAnalysis()
  return (
    <div className="flex flex-col gap-6">
      {/* <div className="">
        <p className="md:text-lg font-semibold text-sm">DashBoard</p>
      </div> */}

      <div className="xl:grid-cols-8 auto-cols-fr auto-rows-fr gap-4 grid-rows-3 flex flex-col md:grid w-full mb-32 md:mb-0">
        
        {/* On route vehicles */}
        <Suspense fallback={<StatusLazy/>} >
          <StatusGrid icon={<FontAwesomeIcon icon={faTruck} />} message="of shipments are on route" color={"text-blue-300"} bgcolor={"bg-blue-500/50"} count={shipmentStatusCount.inTransit+shipmentStatusCount.loading+shipmentStatusCount.checkingIn+shipmentStatusCount.unloading} percentage={shipmentStatusPercentage.inTransit+shipmentStatusPercentage.loading+shipmentStatusPercentage.checkingIn+shipmentStatusPercentage.unloading}/>
        </Suspense>
       
        {/* In storage vehicles */}
        <Suspense fallback={<StatusLazy/>} >
          <StatusGrid icon={<FontAwesomeIcon icon={faWarehouse} />} message="of shipments are in storage" color={"text-orange-300"} bgcolor={"bg-orange-400/50"}  count={shipmentStatusCount.inStorage} percentage={shipmentStatusPercentage.inStorage}/>
        </Suspense>

        {/* Error-prone vehicles */}
        <Suspense fallback={<StatusLazy/>} >
          <StatusGrid icon={<FontAwesomeIcon icon={faWarehouse} />} message="of shipments have errors" color={"text-red-400"} bgcolor={"bg-red-500/50"}  count={shipmentStatusCount.cancelled+shipmentStatusCount.delayed} percentage={shipmentStatusPercentage.cancelled+shipmentStatusPercentage.delayed}/>
        </Suspense>


        {/* Delivered*/}
        <Suspense fallback={<StatusLazy/>} >
          <StatusGrid icon={<FontAwesomeIcon icon={faWarehouse} />} message="of shipments have been delivered" color={"text-teal-500"} bgcolor={"bg-teal-600/50"}  count={shipmentStatusCount.delivered} percentage={shipmentStatusPercentage.delivered}/>
        </Suspense>



        {/* Lazy-loaded components wrapped in Suspense */}
        <Suspense fallback={<OverviewLazy/>}>
          <VehicleOverview/>
        </Suspense>

        <Suspense fallback={<MonthlyShipmentLazy/>}>
          <MonthlyShipment />
        </Suspense>

        <Suspense fallback={<TimelineLazy/>}>
          <DeliveryTimeline />
        </Suspense>

        <Suspense fallback={<TotalDistanceLazy/>}>
          <TotalDistanceCard/>
        </Suspense>

        <Suspense fallback={<OrderByCountryLazy/>}>
          <OrderByCountries />
        </Suspense>

      </div>
    </div>
  );
}

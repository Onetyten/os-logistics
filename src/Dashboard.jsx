import { lazy, Suspense } from "react";

const OrderByCountries = lazy(() => import("./Components/OrderByCountries"));
const DeliveryTimeline = lazy(() => import("./Components/DeliveryTimeline"));
export const MonthlyShipment = lazy(() => import("./Components/MonthlyShipment"));
export const VehicleOverview = lazy(() => import("./Components/VehicleOverview"));
const Onroute = lazy(()=>import("./Components/Onroute"))
const Unloading = lazy(()=>import("./Components/Unloading"))
const ErrorProneVehicles  = lazy(()=>import("./Components/ErrorProneVehicles"))
const InstorageVehicles = lazy(()=>import("./Components/InstorageVehicles"))
const TotalDistanceCard = lazy(()=>import("./Components/TotalDistanceCard"))

export default function Dashboard() {

  return (
    <div>
      <div className="px-0 2xl:px-[10%] xl:px-[5%] my-5">
        <p className="md:text-lg font-semibold text-sm">DashBoard</p>
      </div>

      <div className="xl:grid-cols-8 2xl:px-[10%] xl:px-[5%] auto-cols-fr auto-rows-fr gap-3 px-0 grid-rows-3 flex flex-col md:grid w-full mb-32 md:mb-0">
        
        {/* On route vehicles */}
        <Suspense fallback={<div className="bg-boxclr text-sm flex flex-col gap-2 rounded-md h-44 col-span-2 p-3 shadow-md">
          <div className="bg-bkground w-full h-8"></div>
          <div className="bg-bkground w-full flex-1"></div>
        </div>} >
          <Onroute/>
        </Suspense>
       
        {/* Unloading vehicles */}
        <Suspense fallback={<div className="bg-boxclr text-sm flex flex-col gap-2 rounded-md h-44 col-span-2 p-3 shadow-md">
          <div className="bg-bkground w-full h-8"></div>
          <div className="bg-bkground w-full flex-1"></div>
        </div>} >
          <Unloading/>
        </Suspense>

        {/* Error-prone vehicles */}
        <Suspense fallback={<div className="bg-boxclr text-sm flex flex-col gap-2 rounded-md h-44 col-span-2 p-3 shadow-md">
          <div className="bg-bkground w-full h-8"></div>
          <div className="bg-bkground w-full flex-1"></div>
        </div>} >
          <ErrorProneVehicles/>
        </Suspense>

        {/* In storage vehicles */}
        <Suspense fallback={<div className="bg-boxclr text-sm flex flex-col gap-2 rounded-md h-44 col-span-2 p-3 shadow-md">
          <div className="bg-bkground w-full h-8"></div>
          <div className="bg-bkground w-full flex-1"></div>
        </div>} >
          <InstorageVehicles/>
        </Suspense>


        {/* Lazy-loaded components wrapped in Suspense */}
        <Suspense fallback={<div className={`bg-boxclr h-96 mt-10 md:mt-0 rounded-md col-span-4 w-full min-h-32 p-6 flex gap-5 flex-col row-span-2 shadow-md`}>
          <div className="bg-bkground w-full h-24"></div>
          <div className="bg-bkground w-full flex-1"></div>
          </div>}>
          <VehicleOverview />
        </Suspense>

        <Suspense fallback={<div className={`bg-boxclr h-96 mt-10 md:mt-0 rounded-md col-span-4 w-full min-h-32 p-6 flex gap-5 flex-col row-span-2 shadow-md`}>
          <div className="bg-bkground w-[30%] h-12"></div>
          <div className="bg-bkground w-full flex-1"></div>
          </div>}>
          <MonthlyShipment />
        </Suspense>

        <Suspense fallback={<div className={`bg-boxclr h-96 mt-10 md:mt-0 rounded-md col-span-3 w-full min-h-32 p-6 flex gap-5 flex-col row-span-2 shadow-md`}>
          <div className="bg-bkground w-[30%] h-14"></div>
          <div className="bg-bkground w-full flex-1"></div>
          </div>}>
          <DeliveryTimeline />
        </Suspense>


        <Suspense fallback={<div className={`bg-boxclr h-96 mt-10 md:mt-0 rounded-md col-span-2 w-full min-h-32 p-6 flex gap-5 justify-around flex-col row-span-2 shadow-md`}>
          <div className="bg-bkground w-[30%] h-14"></div>
          <div className="bg-bkground w-full h-14"></div>
          </div>}>
          <TotalDistanceCard/>
        </Suspense>

        

        <Suspense fallback={<div className={`bg-boxclr h-96 mt-10 md:mt-0 rounded-md col-span-3 w-full min-h-32 p-6 flex gap-5 flex-col row-span-2 shadow-md`}>
          <div className="bg-bkground w-[30%] h-14"></div>
          <div className="bg-bkground w-full flex-1"></div>
          </div>}>
          <OrderByCountries />
        </Suspense>

      </div>
    </div>
  );
}

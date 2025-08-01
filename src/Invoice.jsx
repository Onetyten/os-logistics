import {lazy, Suspense,useEffect,useRef } from "react";
import 'maplibre-gl/dist/maplibre-gl.css'

import { useShipmentAnalysis } from "./hooks/shipmentAnalysis";
import OrderMap from "./Components/OrderMap";
import InvoiceDetails from "./Components/invoiceDetails";
import OrderItemLoader from "./Components/lazyLoaded/OrderItemLoader";
import {useDispatch, useSelector } from "react-redux";
import { setSelectedOrder } from "../utils/state/selectedOrder/selectedOrderSlice";
// import { setSelectedOrder } from "../utils/state/selectedOrder/selectedOrderSlice";
const OrderItem = lazy(() => import('./Components/OrderItem'));



export default function Invoice() {
  const dispatch = useDispatch()
  const {shipmentData} = useShipmentAnalysis()
  const containerRef = useRef();
  const selectedOrder = useSelector((state)=>state.selectedOrder.selectedOrder)

  useEffect(()=>{
      if (!selectedOrder || selectedOrder == null){
        dispatch(setSelectedOrder(shipmentData[0]))
      }
  },[dispatch, selectedOrder, shipmentData])



  


  return (
    <div className="w-full xl:h-screen mb-8 flex gap-10 xl:gap-0 flex-col xl:flex-row items-center">
      {/* left side */}
      {/* Orders List */}
      <div ref={containerRef} className="flex-1 xl:h-full max-h-[500px] xl:max-h-full shadow-lg w-full xl:shadow-none overflow-scroll flex flex-col gap-4">
        {shipmentData.map((order, index) => (
          <Suspense key={index} fallback={<OrderItemLoader />}>
            <OrderItem
              order={order}
              selectedOrder={selectedOrder}
            />
          </Suspense>
        ))}
      </div>


      {/* right side */}
      {/* Selected Order Details */}
      <div className="bg-bkground overflow-scroll md:text-sm text-xs px-4 gap-3 shadow-md flex-1 w-full flex-col h-full flex items-center justify-center">


        <OrderMap selectedOrder={selectedOrder}/>
        
        <div className="w-full">
         <p className="text-sm font-bold">Details</p>
        </div>
        <InvoiceDetails selectedOrder={selectedOrder}/>
        

        
        
      </div>
    </div>
  );
}

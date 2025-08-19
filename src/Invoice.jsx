import {lazy, Suspense,useEffect,useRef } from "react";
import { useShipmentAnalysis } from "./hooks/shipmentAnalysis";
import OrderMap from "./Components/OrderMap";
import InvoiceDetails from "./Components/invoiceDetails";
import OrderItemLoader from "./Components/lazyLoaded/OrderItemLoader";
import {useDispatch, useSelector } from "react-redux";
import { setSelectedOrder } from "../utils/state/selectedOrder/selectedOrderSlice";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
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
    <div className="w-full xl:h-screen mb-8 flex gap-10 xl:gap-4 justify-around flex-col xl:flex-row items-center">
   
      <OverlayScrollbarsComponent options={{ scrollbars: { theme: "os-theme-dark", autoHide:'never'}}} ref={containerRef} className="flex-1 xl:h-full max-h-[500px] xl:max-h-full shadow-md w-full xl:shadow-none">      
        <div className="flex flex-col gap-4">
          {shipmentData.map((order, index) => (
            <Suspense key={index} fallback={<OrderItemLoader />}>
              <OrderItem order={order} selectedOrder={selectedOrder} />
            </Suspense>
          ))}
        </div>
      </OverlayScrollbarsComponent>




    <OverlayScrollbarsComponent options={{ scrollbars: { theme: "os-theme-dark", autoHide:'never' }}} className=" md:text-sm text-xs gap-4 flex-1 w-full h-full flex flex-col items-center justify-start">
          <div className="h-full w-full flex  flex-col gap-4">
              <OrderMap selectedOrder={selectedOrder}/>
      
                <div className="w-full">
                  <p className="text-sm font-bold">Details</p>
                </div>
            
              <InvoiceDetails selectedOrder={selectedOrder}/>
          </div>
    </OverlayScrollbarsComponent>



    
    </div>
  );
}

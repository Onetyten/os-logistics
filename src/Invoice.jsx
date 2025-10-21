import {lazy, Suspense,useEffect,useRef } from "react";
import { useShipmentAnalysis } from "./hooks/shipmentAnalysis";
import OrderMap from "./Components/OrderMap";
import InvoiceDetails from "./Components/invoiceDetails";
import OrderItemLoader from "./Components/lazyLoaded/OrderItemLoader";
import {useDispatch, useSelector } from "react-redux";
import { setSelectedOrder } from "../utils/state/selectedOrder/selectedOrderSlice";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { FixedSizeList as List } from "react-window";
import "overlayscrollbars/overlayscrollbars.css";
const OrderItem = lazy(() => import('./Components/OrderItem'));
import AutoSizer from "react-virtualized-auto-sizer";


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
    <div className="w-full h-dvh mb-8 flex xl:gap-10 gap-4 justify-around flex-col xl:flex-row items-center"> 
      <OverlayScrollbarsComponent options={{ scrollbars: { theme: "os-theme-dark", autoHide: "never" } }}  className="flex-1 xl:h-full xl:max-h-full shadow-md w-full xl:shadow-none xl:border-0 p-3 xl:p-0 border-primary border-2">
        <div className="h-full w-full">
          <AutoSizer>
            {({ height, width }) => (
              <List height={height} width={width} itemSize={190} itemCount={shipmentData.length} ref={containerRef} className="flex-1 hide-scrollbar w-full">
                {({ index, style }) => {
                  const order = shipmentData[index];
                  return (
                    <div style={style} className="flex flex-col gap-1 sm:gap-4">
                      <Suspense key={index} fallback={<OrderItemLoader />}>
                        <OrderItem order={order} selectedOrder={selectedOrder} />
                      </Suspense>
                    </div>
                  );
                }}
              </List>
            )}
          </AutoSizer>
        </div>
      </OverlayScrollbarsComponent>


    <OverlayScrollbarsComponent options={{ scrollbars: { theme: "os-theme-dark", autoHide:'never' }}} className=" md:text-sm text-xs gap-4 flex-1 w-full h-full flex flex-col items-center justify-start">
          <div className="h-full w-full flex  flex-col gap-4">
              <OrderMap selectedOrder={selectedOrder}/>
                
              <InvoiceDetails selectedOrder={selectedOrder}/>
          </div>
    </OverlayScrollbarsComponent>



    
    </div>
  );
}

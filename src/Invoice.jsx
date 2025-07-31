import { useEffect, useState,lazy, Suspense } from "react";
import 'maplibre-gl/dist/maplibre-gl.css'

import { useShipmentAnalysis } from "./hooks/shipmentAnalysis";
import OrderMap from "./Components/OrderMap";
import InvoiceDetails from "./Components/invoiceDetails";
import OrderItemLoader from "./Components/lazyLoaded/OrderItemLoader";
const OrderItem = lazy(() => import('./Components/OrderItem'));



export default function Invoice() {
  const [route, setRoute] = useState(null);
  const {shipmentData} = useShipmentAnalysis()
  const [selectedOrder, setSelectedOrder] = useState(shipmentData[0]);

  useEffect(() => {
    if (!selectedOrder || !selectedOrder.origin || !selectedOrder.destination) {
      return;
    }
    const setMapRoute = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [selectedOrder.origin.longitude, selectedOrder.origin.latitude], // Start
              [selectedOrder.destination.longitude, selectedOrder.destination.latitude], // End
            ],
          },},],};
    setRoute(setMapRoute);
  }, [selectedOrder]);
  
  

  return (
    <div className="w-full xl:h-screen mb-8 flex flex-col xl:flex-row items-center">
      {/* left side */}
      {/* Orders List */}
      <div className="flex-1 xl:h-full max-h-96 xl:max-h-full shadow-lg w-full xl:shadow-none overflow-scroll flex flex-col gap-4">
        
        {shipmentData.map((order, index) => (
          <Suspense key={index} fallback={<OrderItemLoader/>}>
            <OrderItem order={order} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}/>
          </Suspense>
        ))}
      </div>


      {/* right side */}
      {/* Selected Order Details */}
      <div className="bg-bkground overflow-scroll md:text-sm text-xs px-4 gap-3 shadow-md flex-1 w-full flex-col h-full flex items-center justify-center">


        <OrderMap route={route} selectedOrder={selectedOrder}/>
        
        <div className="w-full">
         <p className="text-sm font-bold">Main info</p>
        </div>
        <InvoiceDetails selectedOrder={selectedOrder}/>
        

        
        
      </div>
    </div>
  );
}

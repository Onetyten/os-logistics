import { useContext, useEffect, useState } from "react";
import { AppContext } from "./Context";
import Truck0 from '../public/Images/TruckProgress0.png'
import Truck1 from '../public/Images/TruckProgress1.png'
import Truck2 from '../public/Images/TruckProgress2.png'
import Truck3 from '../public/Images/TruckProgress3.png'
import Truck4 from '../public/Images/TruckProgress4.png'
import Truck5 from '../public/Images/TruckProgress5.png'
import Map, {Source,Layer} from "@vis.gl/react-maplibre";
import 'maplibre-gl/dist/maplibre-gl.css'

export default function Invoice() {
  const [route, setRoute] = useState(null);
  const { orders } = useContext(AppContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const[ InfoTabIndex,setInfoTabIndex ]= useState(1)

  const statusColors = {
    "Delivered": "bg-clr1-75 text-white",
    "In Transit": "bg-clr2-75 text-white",
    "Loading": "bg-lime-600/50 text-white ",
    "Delayed": "bg-yellow-400/50 text-white",
    "In Storage": "bg-stone-700/50 text-white ",
    "Cancelled": "bg-clr3 text-white",
    "New": "bg-indigo-500/50 text-white",
    "Checking in": "bg-primary-75 text-white",
    "Unloading": "bg-sky-700/50 text-white"
  };

  useEffect(()=>{
    setSelectedOrder(orders[0])
  },[orders])

  const statusProgress = {
    "New": "w-0",
    "Loading": "w-[25%]",
    "Checking in": "w-[35%]",
    "In Transit": "w-[50%]",
    "Unloading": "w-[70%]",
    "In Storage": "w-[80%]",
    "Delayed": "w-[60%]",
    "Cancelled": "w-0 bg-red-500",
    "Delivered": "w-full bg-green-500"
  };

  const truckImages = {
    "New": Truck0,
    "Loading": Truck1,
    "Checking in": Truck1,
    "In Transit": Truck2,
    "Unloading": Truck3,
    "In Storage": Truck4,
    "Delayed": Truck4,
    "Cancelled": Truck0,
    "Delivered": Truck5,
  };

  useEffect(() => {
    if (!selectedOrder || !selectedOrder.origin || !selectedOrder.destination) {
      return;
    }
  
    const exampleRoute = {
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
          },
        },
      ],
    };
  
    setRoute(exampleRoute);
  }, [selectedOrder]);
  
  const truckImageSrc = truckImages[selectedOrder?.status] || Truck0;
  

  return (
    <div className="w-full xl:h-screen mb-8 flex flex-col xl:flex-row items-center">
      {/* Orders List */}
      <div className="flex-1 xl:h-full max-h-96 xl:max-h-full shadow-lg w-full xl:shadow-none overflow-scroll flex flex-col p-5 gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className={` ${selectedOrder?.package_information.package_id === order.package_information.package_id
              ? "bg-primary text-boxclr" : "bg-boxclr text-textclr"} rounded-md shadow-md p-4 cursor-pointer`}
            onClick={() => setSelectedOrder(order)} // Select order on click
          >
            {/* Order Header */}
            <div className="flex justify-between items-center">
              <p className="md:text-sm text-xs font-semibold">
                ORDER ID: #{order.package_information.package_id}
              </p>
              <div
                className={`text-center rounded-md md:w-24  md:p-2 p-1 ${
                  statusColors[order.status] || "bg-textclr2 text-white"
                }`}
              >
                <p className="md:text-sm text-xs font-bold">{order.status}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full flex h-2 mt-3 bg-clr2-25 rounded-3xl">
              <div
                className={`bg-clr2 h-full rounded-3xl transition-all duration-500 ${
                  statusProgress[order.status] || "w-[10%]"
                }`}
              ></div>
            </div>

            {/* Order Updates */}
            <div className="mt-4">
              <p className={`md:text-sm text-xs${selectedOrder?.package_information.package_id === order.package_information.package_id
                ?"text-textclr2":"text-textclr"} font-semibold `}>Order Updates:</p>
              <div className="mt-2 space-y-2">
                {order.updates.map((update, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded-md">
                    <p className="text-xs font-medium">{update.state}</p>
                    <p className={`text-xs ${selectedOrder?.package_information.package_id === order.package_information.package_id
                ?"text-boxclr":"text-textclr2"} `}>
                      {new Date(update.timeline).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Order Details */}
      <div className="bg-bkground overflow-scroll mt-8 md:text-sm text-xs p-4 gap-3 shadow-md flex-1 w-full flex-col h-full flex items-center justify-center">
        <div className="w-full">
         <p className="text-sm font-semibold">ORDER ID : <span className="font-bold">#{selectedOrder?.package_information?.package_id}</span> </p>
        </div>

        
        
        <div className="w-full rounded-xl flex-1 bg-boxclr p-3">
        <Map
        initialViewState={{
          longitude:  0.1870,
          latitude:  5.6037,
          zoom: 1,
        }}
        style={{ width: "100%", height: "400px" }}
        mapStyle="https://demotiles.maplibre.org/style.json"
      >
        {route && (
          <Source id="route" type="geojson" data={route}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                "line-color": "#ff0000",
                "line-width": 4,
              }}
            />
          </Source>
        )}
      </Map>
                

        </div>
        
        <div className="w-full">
         <p className="text-sm font-bold">Main info</p>
        </div>
        
        <div className="w-full flex-1 bg-boxclr">

          <div className="w-full grid grid-cols-3 shadow-md text-sm">
              <div  onClick={() => setInfoTabIndex(1)} className={`${InfoTabIndex == 1 ? "bg-boxclr" : "bg-bkground"} flex items-center justify-center py-3 text-center w-full h-full`} >
                <p>Order details</p>
              </div>
              <div  onClick={() => setInfoTabIndex(2)} className={`${InfoTabIndex == 2 ? "bg-boxclr" : "bg-bkground"} flex items-center justify-center py-3 text-center w-full h-full`}
              >
                <p>Vehicle Information</p>
              </div>
              <div  
                onClick={() => setInfoTabIndex(3)} 
                className={`${InfoTabIndex == 3 ? "bg-boxclr" : "bg-bkground"} flex items-center justify-center py-3 text-center w-full h-full`}
              >
                <p>Customer Information</p>
              </div>
            </div>

          {InfoTabIndex == 1 && (
            <div className="flex flex-col h-72 p-3 justify-start w-full items-center">
              <div className="flex-1 justify-center w-full p-3 gap-4 flex flex-col">
                <div className="flex justify-between text-center">
                  <p className="text-textclr2 font-bold text-md">PACKAGE ID</p>
                  <p className="text-textclr font-semibold text-sm">
                    {selectedOrder?.package_information?.package_id}
                  </p>
                </div>

                <div className="flex justify-between text-center">
                  <p className="text-textclr2 font-bold text-md">VEHICLE NUMBER</p>
                  <p className="text-textclr font-semibold text-sm">
                    {selectedOrder?.package_information?.weight} Kg
                  </p>
                </div>

                <div className="flex justify-between text-center">
                  <p className="text-textclr2 font-bold text-md">DISTANCE</p>
                  <p className="text-textclr font-semibold text-sm">
                    {selectedOrder?.distance} Km
                  </p>
                </div>

                <div className="flex justify-between w-full text-center">
                  <p className="text-textclr2 text-center w-full font-bold text-md">DIMENSIONS</p>
                </div>


                <div className="flex justify-between text-center">
                  <p className="text-textclr2 font-bold text-md">PACKAGE ID</p>
                  <p className="text-textclr font-semibold text-sm">
                    {selectedOrder?.package_information?.dimensions?.length} cm
                  </p>
                </div>

                <div className="flex justify-between text-center">
                  <p className="text-textclr2 font-bold text-md">VEHICLE NUMBER</p>
                  <p className="text-textclr font-semibold text-sm">
                    {selectedOrder?.package_information?.dimensions?.width} cm
                  </p>
                </div>

                <div className="flex justify-between text-center">
                  <p className="text-textclr2 font-bold text-md">VEHICLE NUMBER</p>
                  <p className="text-textclr font-semibold text-sm">
                    {selectedOrder?.package_information?.dimensions?.height} cm
                  </p>
                </div>



              </div>
            </div>
          )}



          {InfoTabIndex == 2 && (
              <div className="flex flex-col mb-6 h-72 p-3 justify-start w-full items-center">
                <img src={truckImageSrc} alt="Truck Progress" className="flex-1 object-contain w-[50%]" />
                <div className="flex-1 justify-center w-full p-3 gap-4 flex flex-col">
                  <div className="flex justify-between text-center">
                    <p className="text-textclr2 font-bold text-md">VEHICLE TYPE</p>
                    <p className="text-textclr font-semibold text-sm">
                      {selectedOrder?.vehicle_information?.vehicle_type}
                    </p>
                  </div>

                  <div className="flex justify-between text-center">
                    <p className="text-textclr2 font-bold text-md">VEHICLE NUMBER</p>
                    <p className="text-textclr font-semibold text-sm">
                      {selectedOrder?.vehicle_information?.vehicle_number}
                    </p>
                  </div>
                </div>
              </div>
            )}



            {InfoTabIndex == 3 && (
                  <div className="flex flex-col  h-72 p-3 justify-start py-8 w-full items-center">
                    <div className="flex-1 justify-start w-full p-3 gap-4 flex flex-col">
                      <div className="flex justify-between text-center">
                        <p className="text-textclr2 font-bold text-md">CUSTOMER NAME</p>
                        <p className="text-textclr font-semibold text-sm">
                          {selectedOrder?.customer_information?.customer_name}
                        </p>
                      </div>

                      <div className="flex justify-between text-center">
                        <p className="text-textclr2 font-bold text-md">CUSTOMER ID</p>
                        <p className="text-textclr font-semibold text-sm">
                          {selectedOrder?.customer_information?.customer_id}
                        </p>
                      </div>


                      <div className="flex justify-between text-center">
                        <p className="text-textclr2 font-bold text-md">CITY</p>
                        <p className="text-textclr font-semibold text-sm">
                          {selectedOrder?.destination?.city}
                        </p>
                      </div>
                      <div className="flex justify-between text-center">
                        <p className="text-textclr2 font-bold text-md">STATE</p>
                        <p className="text-textclr font-semibold text-sm">
                          {selectedOrder?.destination?.state}
                        </p>
                      </div>
                      <div className="flex justify-between text-center">
                        <p className="text-textclr2 font-bold text-md">COUNTRY</p>
                        <p className="text-textclr font-semibold text-sm">
                          {selectedOrder?.destination?.country}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

            </div>
        
      </div>
    </div>
  );
}

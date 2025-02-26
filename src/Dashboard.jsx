import { faTriangleExclamation, faTruck, faTruckLoading, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { AppContext } from "./Context";
import OverviewItem from "./overviewItem";
import NewOrders from "./Components/NewOrders";
import Preparing from "./Components/Preparing";
import Shipping from "./Components/Shipping";
import { NavLink as Link } from "react-router"
import { Area, AreaChart, Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { curveCardinal } from 'd3-shape';


export default function Dashboard() {
  const {orderStatuses,OnRouteSize,orderSize,oDeliveredSize,oLoadingSize,oDelayedSize,oInStorageSize,oCancelledSize,oCheckingSize,oUnLoadingSize,vehicleType,processedData,totalDistance,monthlyShipment} = useContext(AppContext)
  const[ countriesTabIndex,setCountriesTabIndex ]= useState(1)
  const cardinal = curveCardinal.tension(0.2);
  return (
    <div>
        <div className="px-3 2xl:px-[10%] xl:px-[5%] my-5 ">
          <p className="md:text-lg font-semibold text-sm ">DashBoard</p>
        </div>



        <div className="xl:grid-cols-8  2xl:px-[10%]  xl:px-[5%]  auto-cols-fr auto-rows-fr gap-3 px-3 grid-rows-3 flex flex-col md:grid w-full mb-32 md:mb-0">

            {/* onroute vehicles */}
            <div className={`bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md`}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-25 rounded-md text-primary ">
                  <FontAwesomeIcon icon={faTruck}/>
                </div>
                <p className="font-semibold">{(OnRouteSize+oLoadingSize+oCheckingSize)}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm">On route vehicles</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm"> <span className="font-semibold">{Math.floor(((OnRouteSize+oLoadingSize+oCheckingSize)/orderSize)*100)} % </span>of vehicles are on route</p>
              </div>
              
            
            </div>
            {/* unloading vehicles */}
            <div className={`bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md`} onClick={()=>{console.log(orderStatuses,processedData)}}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-clr2-25 rounded-md text-clr2">
                  <FontAwesomeIcon icon={faTruckLoading}/>
                </div>
                <p className="font-semibold">{oUnLoadingSize}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm">Vehicles unloading</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm"> <span className="font-semibold">{Math.floor((oUnLoadingSize/orderSize)*100)} %  </span>of vehicles are unloading</p>
              </div>
              
            
            </div>
            {/*error prone vehicles */}
            <div className={`bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md`}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-clr3-25 rounded-md text-clr3 ">
                  <FontAwesomeIcon icon={faTriangleExclamation}/>
                </div>
                <p className="font-semibold">{oDelayedSize+oCancelledSize}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm">Vehicles with errors</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm"> <span className="font-semibold">{Math.floor(((oDelayedSize+oCancelledSize)/orderSize)*100)} %</span>of vehicles are error ridden</p>
              </div>
              
            
            </div>
            {/* in storage vehicles */}
            <div className={`bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md`}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-clr1-25 text-clr1 rounded-md ">
                  <FontAwesomeIcon icon={faWarehouse}/>
                </div>
                <p className="font-semibold">{oInStorageSize+oDeliveredSize}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm">Vehicles in storage</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-textclr2 text-sm"> <span className="font-semibold">{Math.floor(((oInStorageSize+oDeliveredSize)/orderSize)*100)} %</span>of vehicles are in storage</p>
              </div>
              
            
            </div>
            
            



            <div className={`bg-boxclr mt-10 md:mt-0 rounded-md col-span-4 w-full min-h-32 p-3 row-span-2 shadow-md`}>
              <p className="text-sm font-semibold">Vehicles Overview</p>
              <div className="flex mt-4 justify-around w-full rounded-md overflow-hidden ">
                <OverviewItem item="Delivered" color={"bg-blue-600/10"} percentage={Math.floor(((oDeliveredSize)/orderSize)*100)} />
                <OverviewItem item="In Transit"  color={"bg-blue-600/20"} percentage={Math.floor(((OnRouteSize)/orderSize)*100)} />
                <OverviewItem item="Loading"  color={"bg-blue-600/30"} percentage={Math.floor(((oLoadingSize)/orderSize)*100)} />
                <OverviewItem item="Delayed"  color={"bg-blue-600/40"} percentage={Math.floor(((oDelayedSize)/orderSize)*100)}/>
                <OverviewItem item="In Storage"  color={"bg-blue-600/50"} percentage={Math.floor(((oInStorageSize)/orderSize)*100)} />
                <OverviewItem item="Cancelled"  color={"bg-blue-600/55"} percentage={Math.floor(((oCancelledSize)/orderSize)*100)} />
                <OverviewItem item="Checking in"  color={"bg-blue-600/60"} percentage={Math.floor(((oCheckingSize)/orderSize)*100)} />
                <OverviewItem item="Unloading"  color={"bg-blue-600/65"} percentage={Math.floor(((oUnLoadingSize)/orderSize)*100)}/>
              </div>

              <div className="w-full mt-3">
                <p className="text-center text-sm font-semibold">Number of vehicles : {orderSize}</p>
                <div className="mt-3 flex flex-col gap-3">
                  {Object.entries(vehicleType).map(([name,count])=>{
                      
                    return(
                      <div key={name} className="flex w-full justify-between">
                        <p className="text-sm">{name == null? "Nil":name}</p>
                        <p className="text-sm font-semibold text-primary">{count}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              
            
            </div>

            <div className={`bg-boxclr mt-10 md:mt-0 rounded-md col-span-4 w-full h-96 p-3 row-span-2 shadow-md`}>
              <p className="text-sm font-semibold">Monthly shipment</p>

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyShipment} >
                  {/* <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/> */}
                  <XAxis  dataKey="date" tick={{ fontSize: "10px" }}/>
                  <YAxis tick={{ fontSize: "12px" }}/>
                  <Tooltip tick={{ fontSize: "12px" }} />
                  {/* <Area type="monotone" dataKey="count" stroke="#1b54fe" fill="#1b54fe" fillOpacity={0.3} /> */}
                  <Area type={cardinal} dataKey="count" stroke="#1b54fe" fill="#1b54fe" fillOpacity={0.8} />
                </AreaChart>
              </ResponsiveContainer>
        
            </div>


 
            <div className={`bg-boxclr mt-10 md:mt-0 rounded-md w-full min-h-32 text-xs pb-8 h-96 row-span-2 p-3 col-span-3 xl:col-span-3 shadow-md`}>
              <p className="text-sm font-semibold">Delivery Timeline</p>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processedData}>
                  <XAxis dataKey="shipment"  tick={{ fontSize: "10px" }}/>
                  <YAxis  tick={{ fontSize: "10px" }}/>
                  <Tooltip />
                  <Legend/>
                  <Bar dataKey="daysDifference" stackId="a" fill="#1b54fe" name="Shipping Duration" />
                </BarChart>





              </ResponsiveContainer>
              
            
            </div>




            <div className={`bg-boxclr rounded-md row-span-2 w-full min-h-32 xl:col-span-2 p-3 shadow-md`}>
              <p className="text-sm font-semibold">Total distance to travel</p>
              <div className="flex w-full h-full justify-center text-primary items-center">
                <p className="text-2xl font-bold">{totalDistance}KM</p>
              </div>
            </div>





            <div className={`bg-boxclr rounded-md row-span-2 w-full h-96 overflow-y-scroll col-span-4 p-3 xl:col-span-3 shadow-md`}>
              <p className="text-sm font-semibold">Orders by countries</p>
              <div className="w-full shadow-md text-sm flex my-4 justify-around">
                <div  onClick={()=>{setCountriesTabIndex(1)}} className={`${countriesTabIndex == 1?"bg-boxclr":"bg-bkground"} py-3 text-center w-full h-full`}>
                  <p>New</p>
                </div>
                <div  onClick={()=>{setCountriesTabIndex(2)}} className={`${countriesTabIndex == 2?"bg-boxclr":"bg-bkground"} py-3 text-center w-full h-full`}>
                  <p>Preparing</p>
                </div>
                <Link onClick={()=>{setCountriesTabIndex(3)}} className={`${countriesTabIndex == 3?"bg-boxclr":"bg-bkground"} py-3 text-center w-full h-full`}>
                  <p>Shipping</p>
                </Link>
              </div>

              <div>

               {countriesTabIndex == 1 &&( <NewOrders/>)}
               {countriesTabIndex == 2 &&( <Preparing/>)}
               {countriesTabIndex == 3 &&( <Shipping/>)}
                
                
              </div>
            </div>
          
        </div>
    </div>
  )
}

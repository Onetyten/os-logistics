/* eslint-disable no-unused-vars */
import { createContext,useRef ,useEffect, useState } from "react"
import PropTypes, { object } from "prop-types"
import axios from "axios"

const AppContext = createContext()

const AppProvider = ({children}) => {


    const [orders,setOrders] = useState([])
    const [orderStatuses,setOrderStatuses] = useState([])
    const [vehicleType,setVehicleType] = useState([])
    const [monthlyShipment,setmonthlyShipment] = useState([])
    const [processedData, setProcessedData] = useState([]);
    const [totalDistance,setTotalDistance] = useState(0)
    let [orderSize,setOrderSize] = useState(0)

    // filtered ordered statuses
    const [oDelivered,setODelivered] =  useState([])
    const [oNew,setONew] =  useState([])
    const [OnRoute,setOnRoute] =  useState([])
    const [oLoading,setOLoading] =  useState([])
    const [oDelayed,setODelayed] =  useState([])
    const [oInStorage,setOInStorage] =  useState([])
    const [oCancelled,setOCancelled] =  useState([])
    const [oChecking,setOChecking] =  useState([])
    const [oUnLoading,setOUnLoading] =  useState([])
  
    const [oDeliveredSize,setODeliveredSize] =  useState(0)
    const [OnRouteSize,setOnRouteSize] =  useState(0)
    const [oLoadingSize,setOLoadingSize] =  useState(0)
    const [oDelayedSize,setODelayedSize] =  useState(0)
    const [oInStorageSize,setOInStorageSize] =  useState(0)
    const [oCancelledSize,setOCancelledSize] =  useState(0)
    const [oCheckingSize,setOCheckingSize] =  useState(0)
    const [oUnLoadingSize,setOUnLoadingSize] =  useState(0)

    const ws = useRef(null);



    // fetch json from orders.json
    const fetchJson = async ()=>{
        try {
            const response = await axios.get("/json/orders.json")
            setOrders(response.data)
            console.log(orders)
        } catch (error) {
            console.log(error)
        }
    }

    

    useEffect(()=>{
        setOrderSize(orders.length)
        setOrderStatuses((prev)=>{
            const statusSet = new Set(prev)
            orders.forEach(order => {
                statusSet.add(order.status)   
            });
            return Array.from(statusSet)
        })
        
        setVehicleType(orders.reduce((acc,order)=>{
            acc[order.vehicle_information?.vehicle_type] = (acc[order.vehicle_information?.vehicle_type]||0)+1
            return acc
        },{}))

        const shipmentData = orders.reduce((acc, order) => {
            const shipmentDate = order.shipment_statistics?.shipment_per_date;
            const eta = order.eta;
      
            if (!shipmentDate) return acc;
      
            acc[shipmentDate] = acc[shipmentDate] || { date: shipmentDate, count: 0, eta: [] };
            acc[shipmentDate].count += 1;
            acc[shipmentDate].eta.push(eta);
      
            return acc;
          }, {});


        const chartData = Object.values(shipmentData).sort((a, b) => new Date(a.date) - new Date(b.date));
        setmonthlyShipment(chartData);





        
        setODelivered(orders.filter((order)=>order.status == "Delivered"))
        setOnRoute(orders.filter((order)=>order.status == "In Transit"))
        setOLoading(orders.filter((order)=>order.status == "Loading"))
        setODelayed(orders.filter((order)=>order.status == "Delayed"))
        setOInStorage(orders.filter((order)=>order.status == "In Storage"))
        setOCancelled(orders.filter((order)=>order.status == "Cancelled"))
        setOChecking(orders.filter((order)=>order.status == "Checking in"))
        setOUnLoading(orders.filter((order)=>order.status == "Unloading"))
        setONew(orders.filter((order)=>order.status == "New"))


        let mileage = 0
        orders.forEach(order => {
            mileage += order.distance
        });
        setTotalDistance(mileage)

    },[orders])



    useEffect(() => {
        if (monthlyShipment.length === 0) return;
      
        const processed = monthlyShipment.map((shipment, index) => {
          if (!shipment.eta.length) return null;
      
          const shipmentDate = new Date(shipment.date);
          const etaDate = new Date(shipment.eta[0]);
      
          const daysDifference = (etaDate - shipmentDate) / (1000 * 60 * 60 * 24);
      
          return { shipment: `Shipment ${index + 1}`, daysDifference };
        }).filter(Boolean); // Remove null values
      
        setProcessedData(processed)
        console.log(processedData)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [monthlyShipment]); 




    useEffect(()=>{
        setOnRouteSize(OnRoute.length)
        setODeliveredSize(oDelivered.length)
        setOLoadingSize(oLoading.length)
        setODelayedSize(oDelayed.length)
        setOInStorageSize(oInStorage.length)
        setOCancelledSize(oCancelled.length)
        setOCheckingSize(oChecking.length)
        setOUnLoadingSize(oUnLoading.length)

    },[OnRoute,oDelivered,oLoading,oDelayed,oInStorage,oCancelled,oChecking,oUnLoading])



    // use effect
    useEffect(()=>{
        fetchJson()
    },[])


    
    return(
        <AppContext.Provider value={{orders,setOrders,orderSize,orderStatuses,OnRoute,OnRouteSize,oDeliveredSize,oLoadingSize,oDelayedSize,oInStorageSize,oCancelledSize,oCheckingSize,oUnLoadingSize,vehicleType,totalDistance,oLoading,setOLoading,oInStorage,oChecking,oNew,monthlyShipment,processedData}}>
            {children}
        </AppContext.Provider>
    )
}


export {AppContext,AppProvider}


AppProvider.propTypes = {
    children: PropTypes.node
}
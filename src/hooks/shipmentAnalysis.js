
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useShipmentAnalysis=() => {
    const shipmentData = useSelector((state)=>state.shipment.shipment)
    const loading = useSelector(state => state.shipment.loading)

    const shipmentStatus = shipmentData.map(item=>item.status)
  
    const shipmentStatusObject = useMemo(()=>{
      return shipmentStatus.reduce((acc,status)=>{
        acc[status] = (acc[status]||0)+1
        return acc
    },{})
    },[shipmentStatus])
    const TotalSize = useMemo(()=>{
      return shipmentStatus.length
    },[shipmentStatus])

    const shipmentStatusCount = useMemo(()=>{
      return{
        inStorage:shipmentStatusObject?.["In Storage"],
        checkingIn:shipmentStatusObject?.["Checking In"],
        delayed:shipmentStatusObject?.Delayed,
        delivered:shipmentStatusObject?.Delivered,
        inTransit:shipmentStatusObject?.["In Transit"],
        loading:shipmentStatusObject?.Loading,
        unloading:shipmentStatusObject?.Unloading,
        cancelled:shipmentStatusObject?.Cancelled,
      }
    },[shipmentStatusObject])

    const percentage = (count,total)=>{
      return total>0?Math.floor((count/total) * 100) : 0
    } 
    
    const shipmentStatusPercentage = useMemo(()=>{
      return{
        inStorage:percentage(shipmentStatusCount?.inStorage || 0, TotalSize),
        checkingIn: percentage(shipmentStatusCount?.checkingIn || 0, TotalSize),
        delayed: percentage(shipmentStatusCount?.delayed || 0, TotalSize),
        delivered: percentage(shipmentStatusCount?.delivered || 0, TotalSize),
        inTransit: percentage(shipmentStatusCount?.inTransit || 0, TotalSize),
        loading: percentage(shipmentStatusCount?.loading || 0, TotalSize),
        unloading: percentage(shipmentStatusCount?.unloading || 0, TotalSize),
        cancelled: percentage(shipmentStatusCount?.cancelled || 0, TotalSize),
      }
    },[shipmentStatusCount,TotalSize])


    const inTransitShipment = useMemo(()=>{
      return shipmentData.filter(item=>item.status=="In Transit")
    },[shipmentData])

    const inTransitVehicles = useMemo(()=>{
      return inTransitShipment.reduce((acc,item)=>{
        const type = item.vehicle_information?.vehicle_type
        if (type){
          acc[type] = (acc[type]||0)+1
        }
        return acc
      }
      ,{})
    },[inTransitShipment])

    const intransitVehicleList = useMemo(()=>{
      return Object.entries(inTransitVehicles)
    },[inTransitVehicles])

      const notDeliveredShipment = useMemo(()=>{
        return shipmentData.filter(item=>item.status!=="Delivered")
      },[shipmentData])

      const totalDistance = useMemo(()=>{
      return notDeliveredShipment.reduce((acc,item)=>{
        acc += Number(item.distance) || 0
        return acc
      },0)
    },[notDeliveredShipment])

    const newOrders = useMemo(()=>{
      return shipmentData.filter(item=>item.status=="Checking In")
    },[shipmentData])

    const preparingOrders = useMemo(()=>{
      return shipmentData.filter(item=>item.status=="Loading")
    },[shipmentData])

    const shippingOrders = useMemo(()=>{
      return shipmentData.filter(item=>item.status!=="Loading" && item.status!=="Checking In")
    },[shipmentData])

    const dailyShipments = useMemo(()=>{
      return shipmentData.map((item)=>item.updates[0]?.timeline).filter(Boolean)
    },[shipmentData])

    const TotalbaseShippingFee = useMemo(()=>{
      return shipmentData.reduce((sum,delta)=>{
       return Number(sum+=delta.payment_information.base_shipping_fee) || 0
      },0)

    },[shipmentData])
    const TotalInsuranceFee = useMemo(()=>{
      return shipmentData.reduce((sum,delta)=>{
       return Number(sum+=delta.payment_information.insurance_fee) || 0
      },0)
    },[shipmentData])
    const TotalTaxes = useMemo(()=>{
      return shipmentData.reduce((sum,delta)=>{
       return Number(sum+=delta.payment_information.taxes) || 0
      },0)
    },[shipmentData])
    
    const dailyShipmentCount = useMemo(()=>{
      return dailyShipments.reduce((acc,item)=>{
        acc[item] = (acc[item]||0)+1
        // console.log(acc)
        return acc
      },{})
    },[dailyShipments])

  


    const dailyshipmentChart = Object.entries(dailyShipmentCount).filter(([date]) => date).sort(([DateA],[DateB])=>DateA.localeCompare(DateB)).map(([date,count])=> {
      return(
        {"date":date.split("T")[0],"value":count}
      )
    })

    const deliveryDays = useMemo(()=>{
      return shipmentData.map( (item,index)=> {
        return{
          "shipment":index,
          "delivery_time":(new Date(item.eta) - new Date(item.updates[0]?.timeline))/ (1000 * 60 * 60 * 24)
        }
      })
    },[shipmentData])

        
        


  return {loading,shipmentData,TotalSize,shipmentStatusCount,shipmentStatusPercentage,intransitVehicleList,totalDistance,newOrders,preparingOrders,shippingOrders,dailyshipmentChart,deliveryDays,TotalbaseShippingFee,TotalInsuranceFee,TotalTaxes}
}

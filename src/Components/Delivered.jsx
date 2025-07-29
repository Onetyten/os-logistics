import { faTruckLoading } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Delivered(prop) {
   const {shipmentResult} = prop
  const totalSize = shipmentResult.reduce((acc,item)=>{
      return acc+=item.count
  },0)
  const deliveredCount = shipmentResult.find(item=>item.status=="Delivered")?.count || 0
  return (
        <div className="bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-clr2-25 rounded-md text-clr2">
              <FontAwesomeIcon icon={faTruckLoading} />
            </div>
            <p className="font-semibold">{deliveredCount}</p>
          </div>
          <p className="text-textclr2 text-sm">
            <span className="font-semibold">{Math.floor((deliveredCount/ totalSize) * 100)}%</span> 
          </p>
        </div>
  )
}

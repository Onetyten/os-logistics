import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function ErrorProneVehicles(prop) {
  const {shipmentResult} = prop
  const totalSize = shipmentResult.reduce((acc,item)=>{
      return acc+=item.count
  },0)
  const errorCount = (shipmentResult.find(item=>item.status=="Cancelled")?.count || 0) + (shipmentResult.find(item=>item.status=="Delayed")?.count || 0)

  return (
    <div className="bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md">
        <div className="flex items-center gap-2">
        <div className="p-2 bg-clr3-25 rounded-md text-clr3">
            <FontAwesomeIcon icon={faTriangleExclamation} />
        </div>
        <p className="font-semibold">{errorCount}</p>
        </div>
        <p className="text-textclr2 text-sm">
        <span className="font-semibold">{Math.floor(((errorCount) / totalSize) * 100)}%</span> 
        </p>
    </div>
  )
}

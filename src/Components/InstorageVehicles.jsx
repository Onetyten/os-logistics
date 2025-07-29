import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function InstorageVehicles(prop) {
  const {shipmentResult} = prop
  const totalSize = shipmentResult.reduce((acc,item)=>{
    return acc+=item.count
  },0)
  const inStorageCount = shipmentResult.find(item=>item.status=="In Storage")?.count || 0


  return (
        <div className="bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-clr1-25 text-clr1 rounded-md">
              <FontAwesomeIcon icon={faWarehouse} />
            </div>
            <p className="font-semibold">{inStorageCount}</p>
          </div>
          <p className="text-textclr2 text-sm">
            <span className="font-semibold">{Math.floor(((inStorageCount) / totalSize) * 100)}%</span> of shipments are in storage
          </p>
        </div>
  )
}

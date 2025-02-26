import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from "../Context";
import { useContext } from 'react';


export default function InstorageVehicles() {
    const { orderSize, oDeliveredSize, oInStorageSize} = useContext(AppContext);
  return (
        <div className="bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-clr1-25 text-clr1 rounded-md">
              <FontAwesomeIcon icon={faWarehouse} />
            </div>
            <p className="font-semibold">{oInStorageSize + oDeliveredSize}</p>
          </div>
          <p className="text-textclr2 text-sm">
            <span className="font-semibold">{Math.floor(((oInStorageSize + oDeliveredSize) / orderSize) * 100)}%</span> of vehicles are in storage
          </p>
        </div>
  )
}

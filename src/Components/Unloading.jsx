import { faTruckLoading } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from "../Context";
import { useContext } from 'react';

export default function Unloading() {
    const { orderStatuses,orderSize, oUnLoadingSize, processedData } = useContext(AppContext);
  return (
        <div className="bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md" onClick={() => console.log(orderStatuses, processedData)}>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-clr2-25 rounded-md text-clr2">
              <FontAwesomeIcon icon={faTruckLoading} />
            </div>
            <p className="font-semibold">{oUnLoadingSize}</p>
          </div>
          <p className="text-textclr2 text-sm">
            <span className="font-semibold">{Math.floor((oUnLoadingSize / orderSize) * 100)}%</span> of vehicles are unloading
          </p>
        </div>
  )
}

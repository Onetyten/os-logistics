import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from "../Context";
import { useContext } from 'react';


export default function ErrorProneVehicles() {
    const { orderSize,oDelayedSize, oCancelledSize} = useContext(AppContext);
  return (
    <div className="bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md">
        <div className="flex items-center gap-2">
        <div className="p-2 bg-clr3-25 rounded-md text-clr3">
            <FontAwesomeIcon icon={faTriangleExclamation} />
        </div>
        <p className="font-semibold">{oDelayedSize + oCancelledSize}</p>
        </div>
        <p className="text-textclr2 text-sm">
        <span className="font-semibold">{Math.floor(((oDelayedSize + oCancelledSize) / orderSize) * 100)}%</span> of vehicles have errors
        </p>
    </div>
  )
}

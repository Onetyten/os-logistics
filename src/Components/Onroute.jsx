import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from "../Context";
import { useContext } from 'react';

export default function Onroute() {
    const { OnRouteSize, orderSize, oLoadingSize, oCheckingSize } = useContext(AppContext);
  return (
    <div className="bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md">
        <div className="flex items-center gap-2">
        <div className="p-2 bg-primary-25 rounded-md text-primary">
            <FontAwesomeIcon icon={faTruck} />
        </div>
        <p className="font-semibold">{OnRouteSize + oLoadingSize + oCheckingSize}</p>
        </div>
        <p className="text-textclr2 text-sm">
        <span className="font-semibold">{Math.floor(((OnRouteSize + oLoadingSize + oCheckingSize) / orderSize) * 100)}%</span> of vehicles are on route
        </p>
    </div>
  )
}

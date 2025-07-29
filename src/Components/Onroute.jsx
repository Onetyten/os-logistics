import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Onroute(prop) {
  const {count,percentage} = prop
  
  return (
    <div className="bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md">
        <div className="flex items-center gap-2">
        <div className="p-2 bg-primary-25 rounded-md text-primary">
            <FontAwesomeIcon icon={faTruck} />
        </div>
        <p className="font-semibold">{count}</p>
        </div>
        <p className="text-textclr2 text-sm">
        <span className="font-semibold">{percentage}%</span> of shipments are on route
        </p>
    </div>
  )
}

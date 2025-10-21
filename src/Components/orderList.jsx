
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faArrowRight} from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"
import { FixedSizeList as List } from "react-window"
import { NavLink as Link } from "react-router";
import { useDispatch } from "react-redux";
import { setSelectedOrder } from "../../utils/state/selectedOrder/selectedOrderSlice";
import { setScrollTrue } from "../../utils/state/setAutoScroll/setAutoScrollSlice";





export default function OrderList({Orders }) {
    const dispatch = useDispatch()
    const itemHeight = 90
  return (
    <div className="w-full h-full hide-scrollbar flex flex-col mb-8">
        <List height={500} itemCount={Orders.length} itemSize={itemHeight} width="100%" className="hide-scrollbar">
            {({index,style})=>{
                const item = Orders[index]
                return(
                <Link to="invoice" key={index} style={style} onClick={()=>{
                    dispatch(setSelectedOrder(item))
                    dispatch(setScrollTrue())
                    }} className="my-3 hover:bg-gray-300/5 text-muted items-center cursor-pointer sm:p-3 xs:p-1 flex justify-between gap-4">

                    <div className="flex items-start gap-3 text-sm flex-1 text-clr2">
                        <div className="flex text-sm gap-2 text-primary items-center">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <div className="text-xs space-y-1">
                            <p className="text-primary text-sm">SENDER</p>
                            <p className="mt-2">{item.origin.country}</p>
                            <p>{item.origin.state}</p>
                        </div>
                    </div>

                    <div className="xs:px-6 text-primary">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>

                    <div className="flex items-start gap-3 text-sm flex-1">
                        <div className="flex text-sm gap-2 text-primary items-center">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <div className="text-xs space-y-1">
                            <p className="text-primary text-sm">RECEIVER</p>
                            <p className="mt-2">{item.destination.country}</p>
                            <p>{item.destination.state}</p>
                        </div>
                    </div>

                </Link>
                )
            }}
        </List>
    </div>
  )
}

OrderList.propTypes = {
    Orders:PropTypes.array.isRequired
}
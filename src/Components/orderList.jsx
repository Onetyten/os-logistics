
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle} from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"
import { FixedSizeList as List } from "react-window"
import { NavLink as Link } from "react-router";
import { useDispatch } from "react-redux";
import { setSelectedOrder } from "../../utils/state/selectedOrder/selectedOrderSlice";
import { setScrollTrue } from "../../utils/state/setAutoScroll/setAutoScrollSlice";





export default function OrderList({Orders }) {
    const dispatch = useDispatch()
    const itemHeight = 100
  return (
    <div className="w-full h-full flex flex-col mb-8">
        <List height={500} itemCount={Orders.length} itemSize={itemHeight} width="100%">
            {({index,style})=>{
                const item = Orders[index]
                return(
                <Link to="invoice" key={index} style={style} onClick={()=>{
                    dispatch(setSelectedOrder(item))
                    dispatch(setScrollTrue())
                    }} className="my-3 hover:bg-gray-300/20 cursor-pointer p-3 flex justify-between gap-4">

                    <div className="flex items-start gap-3 text-sm flex-1 text-clr2">
                        <div className="flex text-sm gap-2 text-clr2 items-center">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <div>
                            <p>SENDER</p>
                            <p className="text-textclr">{item.origin.country}</p>
                            <p className="text-textclr2">{item.origin.state}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm flex-1 text-primary ">
                        <div className="flex text-sm gap-2 text-primary  items-center">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <div>
                            <p>RECEIVER</p>
                            <p className="text-textclr">{item.destination.country}</p>
                            <p className="text-textclr2">{item.destination.state}</p>
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

import { useRef, useEffect } from "react";
import PropTypes, { string } from 'prop-types'; // Import PropTypes
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOrder } from '../../utils/state/selectedOrder/selectedOrderSlice';
import { setScrollFalse } from "../../utils/state/setAutoScroll/setAutoScrollSlice";
import SpotlightBorder from "./SpotlightBorder";


const OrderItem = ({ order, selectedOrder }) => {
    const dispatch = useDispatch()
    const autoScroll = useSelector((state)=>state.setScroll.setScroll)
    const itemRef = useRef();

    const isSelected = selectedOrder?.id === order?.id;

    useEffect(() => {
      if (isSelected && itemRef.current && autoScroll == true ) {
        itemRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, [autoScroll, isSelected]);

    if (!selectedOrder||!selectedOrder.package_information ) {
        return (
          <div className="w-full min-h-96 flex items-center justify-center bg-boxclr rounded-xl shadow-md">
            <p className="text-textclr">No order selected</p>
          </div>
        );
    }
    
      const statusColors = {
        "Delivered": "bg-primary/50",
        "In Transit": "bg-[#a2b18a]/50",
        "Loading": "bg-[#f9a057]/50",
        "Delayed": "bg-[#feab00]/50",
        "In Storage": "bg-blue-600/50",
        "Cancelled": "bg-[#fc655f]/50",
        "New": "bg-[#db528b]/50",
        "Checking In": "bg-[#966c7d]/50",
        "Unloading": "bg-[#75768c]/50"
      };

    const statusProgress = {
      "New": "w-0",
      "Loading": "w-[25%]",
      "Checking in": "w-[35%]",
      "In Transit": "w-[50%]",
      "Unloading": "w-[70%]",
      "In Storage": "w-[80%]",
      "Delayed": "w-[60%]",
      "Cancelled": "w-0",
      "Delivered": "w-full"
    };

    const selected = selectedOrder?.package_information.package_id === order?.package_information.package_id
  
  return (
    <SpotlightBorder className="h-[200px]">
        <div ref={itemRef} className={` ${ selected? "text-primary bg-primary/10  bg-center bg-contain" : ""} w-full h-full flex flex-col gap-4 rounded-md shadow-md p-4 cursor-pointer`} onClick={() =>{ 
          dispatch(setSelectedOrder(order))
          dispatch(setScrollFalse())
        }}>
        <div className="flex justify-between items-center">
          <p className="text-base font-semibold">
            ORDER ID: #{order.package_information.package_id}
          </p>
          <div
            className={`text-center shadow-md md:w-24 md:p-2 p-1 text-white ${statusColors[order.status] || "bg-textclr2 "}`}>
            <p className="md:text-sm text-xs font-bold">{order.status}</p>
          </div>
        </div>


        <div className="w-full flex h-2 shadow-md bg-primary/30 rounded-3xl">
          <div
            className={`bg-primary h-full rounded-3xl transition-all duration-500 ${
              statusProgress[order.status] || "w-[10%]"
            }`}
          ></div>
        </div>

        <div className="flex gap-3 flex-col w-full">
          {order.updates.slice(order.updates.length-3,order.updates.length).map((update, index) => (
            <div key={index} className="flex justify-between items-center text-muted rounded-md">
              <p className="text-sm font-medium">{update.state}</p>
              <p className={`text-sm ${selected ? "text-boxclr" : "text-textclr2"} `}>
                {new Date(update.timeline).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      
      </div>
    </SpotlightBorder>
  );
};








// Prop types validation
OrderItem.propTypes = {
  order: PropTypes.shape({
    id:string,
    package_information: PropTypes.shape({
      package_id: PropTypes.string.isRequired,
    }).isRequired,
    status: PropTypes.string.isRequired,
    updates: PropTypes.arrayOf(
      PropTypes.shape({
        state: PropTypes.string.isRequired,
        timeline: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,

  selectedOrder: PropTypes.shape({
    id:string,
    package_information: PropTypes.shape({
      package_id: PropTypes.string,
    }),
  }),
  setSelectedOrder: PropTypes.func.isRequired,
  statusColors: PropTypes.object.isRequired,
  statusProgress: PropTypes.object.isRequired,
};

export default OrderItem;
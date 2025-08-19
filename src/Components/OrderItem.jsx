
import { useRef, useEffect } from "react";
import PropTypes, { string } from 'prop-types'; // Import PropTypes
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOrder } from '../../utils/state/selectedOrder/selectedOrderSlice';
import { setScrollFalse } from "../../utils/state/setAutoScroll/setAutoScrollSlice";

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
      "Delivered": "bg-green-400",
      "In Transit": "bg-blue-600/50",
      "Loading": "bg-blue-600/50  ",
      "Delayed": "bg-orange-400",
      "In Storage": "bg-blue-600/50 ",
      "Cancelled": "bg-red-500",
      "New": "bg-blue-600/50",
      "Checking In": "bg-blue-600/50",
      "Unloading": "bg-blue-600/50"
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


  
  return (
    <div ref={itemRef}
      className={` ${selectedOrder?.package_information.package_id === order?.package_information.package_id ? "bg-primary text-boxclr" : "bg-boxclr text-textclr"} rounded-md shadow-md p-4 cursor-pointer`} onClick={() =>{ 
        dispatch(setSelectedOrder(order))
        dispatch(setScrollFalse())
      }}>
      {/* Order Header */}
      <div className="flex justify-between items-center">
        <p className="md:text-sm text-xs font-semibold">
          ORDER ID: #{order.package_information.package_id}
        </p>
        <div
          className={`text-center rounded-md shadow-md md:w-24 text-white md:p-2 p-1 ${statusColors[order.status] || "bg-textclr2 "}`}>
          <p className="md:text-sm text-xs font-bold">{order.status}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full flex h-2 mt-3 shadow-md bg-blue-500/30 rounded-3xl">
        <div
          className={`bg-blue-500/80 h-full rounded-3xl transition-all duration-500 ${
            statusProgress[order.status] || "w-[10%]"
          }`}
        ></div>
      </div>

      <div className="mt-4">
        <div className="mt-2 space-y-2">
          {order.updates.map((update, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 rounded-md">
              <p className="text-xs font-medium">{update.state}</p>
              <p className={`text-xs ${selectedOrder?.package_information.package_id === order?.package_information.package_id
                ? "text-boxclr" : "text-textclr2"} `}>
                {new Date(update.timeline).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
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
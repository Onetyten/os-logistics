
import { useRef, useEffect } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import { useDispatch } from 'react-redux';
import { setSelectedOrder } from '../../utils/state/selectedOrder/selectedOrderSlice';

const OrderItem = ({ order, selectedOrder }) => {
    const dispatch = useDispatch()
    const itemRef = useRef();

    const isSelected = selectedOrder?.package_information?.package_id === order?.package_information?.package_id;

    useEffect(() => {
      if (isSelected && itemRef.current) {
        itemRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, []);
    if (!selectedOrder||!selectedOrder.package_information ) {
        return (
          <div className="w-full min-h-96 flex items-center justify-center bg-boxclr rounded-xl shadow-md">
            <p className="text-textclr">No order selected</p>
          </div>
        );
    }
    
    const statusColors = {
      "Delivered": "bg-green-400/50",
      "In Transit": "bg-clr2-75",
      "Loading": "bg-lime-600/50  ",
      "Delayed": "bg-orange-400/50",
      "In Storage": "bg-violet-700/50 ",
      "Cancelled": "bg-red-400/50",
      "New": "bg-indigo-500/50",
      "Checking in": "bg-primary-75",
      "Unloading": "bg-sky-700/50"
    };
  
  
    const statusProgress = {
      "New": "w-0",
      "Loading": "w-[25%]",
      "Checking in": "w-[35%]",
      "In Transit": "w-[50%]",
      "Unloading": "w-[70%]",
      "In Storage": "w-[80%]",
      "Delayed": "w-[60%]",
      "Cancelled": "w-0 bg-red-500",
      "Delivered": "w-full"
    };


  
  return (
    <div ref={itemRef}
      className={` ${selectedOrder?.package_information.package_id === order?.package_information.package_id ? "bg-primary text-boxclr" : "bg-boxclr text-textclr"} rounded-md shadow-md p-4 cursor-pointer`} onClick={() => dispatch(setSelectedOrder(order))}>
      {/* Order Header */}
      <div className="flex justify-between items-center">
        <p className="md:text-sm text-xs font-semibold">
          ORDER ID: #{order.package_information.package_id}
        </p>
        <div
          className={`text-center rounded-md md:w-24 text-white md:p-2 p-1 ${
            statusColors[order.status] || "bg-textclr2 "
          }`}
        >
          <p className="md:text-sm text-xs font-bold">{order.status}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full flex h-2 mt-3 bg-blue-500/50 rounded-3xl">
        <div
          className={`bg-teal-400 h-full rounded-3xl transition-all duration-500 ${
            statusProgress[order.status] || "w-[10%]"
          }`}
        ></div>
      </div>

      {/* Order Updates */}
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
    package_information: PropTypes.shape({
      package_id: PropTypes.string,
    }),
  }),
  setSelectedOrder: PropTypes.func.isRequired,
  statusColors: PropTypes.object.isRequired,
  statusProgress: PropTypes.object.isRequired,
};

export default OrderItem;
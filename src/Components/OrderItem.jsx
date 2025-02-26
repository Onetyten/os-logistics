
import PropTypes from 'prop-types'; // Import PropTypes

const OrderItem = ({ order, selectedOrder, setSelectedOrder, statusColors, statusProgress }) => {
  return (
    <div
      className={` ${selectedOrder?.package_information.package_id === order.package_information.package_id ? "bg-primary text-boxclr" : "bg-boxclr text-textclr"} rounded-md shadow-md p-4 cursor-pointer`} onClick={() => setSelectedOrder(order)}>
      {/* Order Header */}
      <div className="flex justify-between items-center">
        <p className="md:text-sm text-xs font-semibold">
          ORDER ID: #{order.package_information.package_id}
        </p>
        <div
          className={`text-center rounded-md md:w-24  md:p-2 p-1 ${
            statusColors[order.status] || "bg-textclr2 text-white"
          }`}
        >
          <p className="md:text-sm text-xs font-bold">{order.status}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full flex h-2 mt-3 bg-clr2-25 rounded-3xl">
        <div
          className={`bg-clr2 h-full rounded-3xl transition-all duration-500 ${
            statusProgress[order.status] || "w-[10%]"
          }`}
        ></div>
      </div>

      {/* Order Updates */}
      <div className="mt-4">
        <p className={`md:text-sm text-xs${selectedOrder?.package_information.package_id === order.package_information.package_id
          ? "text-textclr2" : "text-textclr"} font-semibold `}>Order Updates:</p>
        <div className="mt-2 space-y-2">
          {order.updates.map((update, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 rounded-md">
              <p className="text-xs font-medium">{update.state}</p>
              <p className={`text-xs ${selectedOrder?.package_information.package_id === order.package_information.package_id
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
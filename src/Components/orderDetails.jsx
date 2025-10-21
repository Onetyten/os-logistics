import PropTypes from "prop-types";
import DetailListItem from "./detailListItem";



export default function OrderDetails({selectedOrder}) {
  
  if (!selectedOrder||!selectedOrder.package_information ) {
      return (
        <div className="w-full min-h-96 flex items-center justify-center bg-boxclr rounded-xl shadow-md">
          <p className="text-textclr">No order selected</p>
        </div>
      );
  }
  return (
    <div className="flex flex-col h-72 p-3 hide-scrollbar overflow-y-auto justify-start w-full hide-scrollbar items-center">
        <div className="flex-1 justify-start w-full p-3 gap-4 flex flex-col">

            <DetailListItem name="PACKAGE ID" info={selectedOrder?.package_information?.package_id} />
            <DetailListItem name="PACKAGE NAME" info={selectedOrder?.package_information.package_name} />
            <DetailListItem name="VEHICLE NUMBER" info= {selectedOrder?.vehicle_information?.vehicle_number} />
            <DetailListItem name="Package status" info= {selectedOrder?.status} />
            <DetailListItem name="ETA" info= {selectedOrder?.eta} />
            <DetailListItem name="weight" info= {`${Math.floor(selectedOrder?.package_information.weight/2.20462)}Kg`} />
            <DetailListItem name="volume" info= {`${(selectedOrder?.package_information.dimensions.length*selectedOrder?.package_information.dimensions.width*selectedOrder?.package_information.dimensions.height/20)}cm³`} />

        </div>
    </div>
  )
}


OrderDetails.propTypes = {
  selectedOrder: PropTypes.shape({
    status:PropTypes.string,
    eta: PropTypes.string,
    package_information: PropTypes.shape({
      package_name: PropTypes.string,
      package_id: PropTypes.string,
      weight: PropTypes.number,
      dimensions: PropTypes.shape({
        length: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    }),
    distance: PropTypes.number,
    vehicle_information: PropTypes.shape({
      vehicle_type: PropTypes.string,
      vehicle_number: PropTypes.string,
    }),
    customer_information: PropTypes.shape({
      customer_name: PropTypes.string,
      customer_id: PropTypes.string,
    }),
    destination: PropTypes.shape({
      city: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
    }),
  }),
  truckImageSrc:PropTypes.node,

};
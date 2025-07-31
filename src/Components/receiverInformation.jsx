import PropTypes from "prop-types";
import DetailListItem from "./detailListItem";



export default function ReceiverInformation({selectedOrder}) {
  return (
    <div className="flex flex-col h-72 p-3 overflow-y-scroll justify-start w-full items-center">
        <div className="flex-1 justify-start w-full p-3 gap-4 flex flex-col">
          <DetailListItem name="receiver id" info= {selectedOrder?.receiver_information.receiver_id} />
          <DetailListItem name="Name" info= {selectedOrder?.receiver_information.name} />
          <DetailListItem name="address" info= {selectedOrder?.receiver_information.address} />
          <DetailListItem name="email" info= {selectedOrder?.receiver_information.email} />
          <DetailListItem name="country" info= {selectedOrder?.destination.country} />
          <DetailListItem name="city" info= {selectedOrder?.destination.city} />
          <DetailListItem name="phone number" info= {selectedOrder?.receiver_information.phone} />
        </div>
    </div>
)
}


ReceiverInformation.propTypes = {
  selectedOrder: PropTypes.shape({
    receiver_information: PropTypes.shape({
      receiver_id: PropTypes.string,
      name: PropTypes.string,
      address: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string
    }),
    destination: PropTypes.shape({
      country: PropTypes.string,
      city: PropTypes.string
    })
  })
}


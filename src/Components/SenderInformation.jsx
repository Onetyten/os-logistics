import PropTypes from 'prop-types';
import DetailListItem from './detailListItem';

export default function SenderInformation({selectedOrder}) {
  return (
    <div className="flex flex-col h-72 p-3 overflow-y-anto hide-scrollbar  justify-start w-full items-center">
        <div className="flex-1 justify-start w-full p-3 gap-4 flex flex-col">
            <DetailListItem name="sender id" info= {selectedOrder?.sender_information.sender_id} />
            <DetailListItem name="Name" info= {selectedOrder?.sender_information.name} />
            <DetailListItem name="address" info= {selectedOrder?.sender_information.address} />
            <DetailListItem name="email" info= {selectedOrder?.sender_information.email} />
            <DetailListItem name="country" info= {selectedOrder?.origin.country} />
            <DetailListItem name="city" info= {selectedOrder?.origin.city} />
            <DetailListItem name="phone number" info= {selectedOrder?.sender_information.phone} />
        </div>
    </div>
  )
}

SenderInformation.propTypes = {
  selectedOrder: PropTypes.shape({
    sender_information: PropTypes.shape({
      sender_id: PropTypes.string,
      name: PropTypes.string,
      address: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string
    }),
    origin: PropTypes.shape({
      country: PropTypes.string,
      city: PropTypes.string
    })
  })
};
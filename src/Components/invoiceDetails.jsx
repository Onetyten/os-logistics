import { useState } from "react"
import PropTypes from "prop-types";
import OrderDetails from "./orderDetails";
import SenderInformation from "./SenderInformation";
import ReceiverInformation from "./receiverInformation";
import SpotlightBorder from "./SpotlightBorder";


export default function InvoiceDetails({selectedOrder}) {
    const[ InfoTabIndex,setInfoTabIndex ]= useState(1)

  return (
    <SpotlightBorder className="w-full mb-14 p-4 text-base md:mb-0 flex-1 bg-boxclr">
          <div className="w-full mb-4">
            <p className="text-lg text-primary font-bold">Details</p>
          </div>
          <div className="w-full grid grid-cols-3 shadow-md text-base ">
              <div  onClick={() => setInfoTabIndex(1)} className={`${InfoTabIndex == 1 ? "bg-primary" : "bg-background"} rounded-l-md cursor-pointer flex items-center justify-center py-3 text-center w-full h-full`} >
                <p>Package <span className="hidden sm:inline">details</span> </p>
              </div>
              <div  onClick={() => setInfoTabIndex(2)} className={`${InfoTabIndex == 2 ? "bg-primary" : "bg-background"} cursor-pointer  flex items-center justify-center py-3 text-center w-full h-full`}
              >
                <p>Sender <span className="hidden sm:inline">information</span></p>
              </div>
              <div onClick={() => setInfoTabIndex(3)} className={`${InfoTabIndex == 3 ? "bg-primary" : "bg-background"} rounded-r-md cursor-pointer  flex items-center justify-center py-3 text-center w-full h-full`}>
                <p>Receiver <span className="hidden sm:inline">Information</span></p>
              </div>
          </div>

            {InfoTabIndex == 1 && (
              <OrderDetails selectedOrder={selectedOrder}/>
            )}

            {InfoTabIndex == 2 && (
                <SenderInformation selectedOrder={selectedOrder} />
            )}

            {InfoTabIndex == 3 && (
              <ReceiverInformation selectedOrder={selectedOrder} />
            )}

    </SpotlightBorder>
  )
}



InvoiceDetails.propTypes = {
  selectedOrder: PropTypes.shape({
    status:PropTypes.string,
    package_information: PropTypes.shape({
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
  truckImageSrc:PropTypes.node
};
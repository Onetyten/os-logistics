import { useState } from "react"
import PropTypes from "prop-types";
// import Truck0 from '/Images/TruckProgress0.png'
// import Truck1 from '/Images/TruckProgress1.png'
// import Truck2 from '/Images/TruckProgress2.png'
// import Truck3 from '/Images/TruckProgress3.png'
// import Truck4 from '/Images/TruckProgress4.png'
// import Truck5 from '/Images/TruckProgress5.png'
import OrderDetails from "./orderDetails";
import SenderInformation from "./SenderInformation";
import ReceiverInformation from "./receiverInformation";


export default function InvoiceDetails({selectedOrder}) {
    const[ InfoTabIndex,setInfoTabIndex ]= useState(1)

    // const truckImages = {
    //     "New": Truck0,
    //     "Loading": Truck1,
    //     "Checking in": Truck1,
    //     "In Transit": Truck2,
    //     "Unloading": Truck3,
    //     "In Storage": Truck4,
    //     "Delayed": Truck4,
    //     "Cancelled": Truck0,
    //     "Delivered": Truck5,
    // };
    // const truckImageSrc = truckImages[selectedOrder?.status] || Truck0;


  return (
    <div className="w-full mb-14 md:mb-0 flex-1 bg-boxclr">

          <div className="w-full grid grid-cols-3 shadow-md text-sm">
              <div  onClick={() => setInfoTabIndex(1)} className={`${InfoTabIndex == 1 ? "bg-boxclr" : "bg-bkground"} cursor-pointer flex items-center justify-center py-3 text-center w-full h-full`} >
                <p>Package <span className="hidden sm:inline">details</span> </p>
              </div>
              <div  onClick={() => setInfoTabIndex(2)} className={`${InfoTabIndex == 2 ? "bg-boxclr" : "bg-bkground"} cursor-pointer  flex items-center justify-center py-3 text-center w-full h-full`}
              >
                <p>Sender <span className="hidden sm:inline">information</span></p>
              </div>
              <div  
                onClick={() => setInfoTabIndex(3)} 
                className={`${InfoTabIndex == 3 ? "bg-boxclr" : "bg-bkground"} cursor-pointer  flex items-center justify-center py-3 text-center w-full h-full`}
              >
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

            </div>
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
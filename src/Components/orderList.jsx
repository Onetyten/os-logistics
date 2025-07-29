
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle} from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"

export default function OrderList(props) {
  const {Orders } = props 
  return (
    <div className="w-full h-full flex flex-col mb-8">
        <div>
            {Orders.map((item,index)=>{
                return(
                      <div key={index} className="my-3  p-3 flex justify-between gap-4">
  
                          
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
  
  
                      </div>
                  )
              })}
        </div>
    </div>
  )
}

OrderList.propTypes = {
    Orders:PropTypes.node
}
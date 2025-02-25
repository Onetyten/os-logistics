
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faTruck } from "@fortawesome/free-solid-svg-icons"
import { faCompass } from "@fortawesome/free-regular-svg-icons"
import { NavLink as Link } from "react-router"
import { useState } from "react"

export default function Sidebar() {
    const [index,setIndex] = useState(1)
  return (
    <div className="bg-boxclr md:w-52 bottom-0 left-0 shadow-md md:p-6 md:relative fixed w-full h-16 rounded-none md:rounded-l-2xl rounded-r-none md:min-h-screen flex gap-10 flex-row md:flex-col justify-start">
        <p className="text-primary text-3xl font-ibm font-bold hidden md:block">OS</p>
        <div className="flex md:gap-4 md:flex-col flex-row  md:flex-start justify-around items-center  md:items-start w-full">

          <Link to='/' onClick={()=>{setIndex(1)}}  className={`md:text-sm ${index == 1 ? "text-primary":"text-textclr"} gap-3 justify-start md:flex-row text-xs flex-col items-center flex`}>
              <FontAwesomeIcon icon={faHome}/>
              <p>Dashboard</p>  
          </Link>
          <Link to="invoice" onClick={()=>{setIndex(2)}}  className={`md:text-sm ${index == 2 ? "text-primary":"text-textclr"} gap-3 justify-start md:flex-row text-xs flex-col items-center flex`}>
              <FontAwesomeIcon icon={faTruck }/>
              <p>Invoice</p>  
          </Link>
          <Link to="map" onClick={()=>{setIndex(3)}}  className={`md:text-sm ${index == 3 ? "text-primary":"text-textclr"} gap-3 justify-start md:flex-row text-xs flex-col items-center flex`}>
              <FontAwesomeIcon icon={faCompass}/>
              <p>Map</p>  
          </Link>


        </div>

          
    </div>
  )
}


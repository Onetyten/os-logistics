import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTruck } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { NavLink as Link } from "react-router";
import {useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchShipment } from "../utils/state/shipmentSlice/shipmentSlice";
// import { persistor } from "../store";



export default function Sidebar() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchShipment())
  },[dispatch])

  // useEffect(() => {
  //   if (import.meta.env.DEV) {
  //     persistor.purge();
  //   }
  // }, []);

  
  

  return (
    <div className="bg-boxclr z-20 md:w-52 bottom-0 left-0 shadow-md md:p-6 fixed md:relative w-full h-16  md:h-screen flex gap-10 flex-row md:flex-col justify-start">
      <p className="text-primary text-xl 2xl:text-3xl font-ibm font-bold hidden md:block">OS</p>
      <div className="flex md:gap-4 md:flex-col flex-row md:flex-start justify-around items-center md:items-start w-full">

        
      <Link to="/" end className={({ isActive }) => `md:text-sm gap-3 justify-start md:flex-row text-xs flex-col items-center flex ${isActive ? "text-primary" :"text-textclr"}`} >
        <FontAwesomeIcon icon={faHome} />
        <p>Dashboard</p>
      </Link>

      <Link to="/invoice" className={({ isActive }) =>`md:text-sm gap-3 justify-start md:flex-row text-xs flex-col items-center flex ${isActive ? "text-primary" :"text-textclr"}`}>
        <FontAwesomeIcon icon={faTruck} />
        <p>Invoice</p>
      </Link>

      <Link to="/map" className={({ isActive }) =>`md:tm gap-3 justify-start md:flex-row text-xs flex-col items-center flex ${isActive ? "text-primary" :"text-textclr"}`}>
            <FontAwesomeIcon icon={faCompass} />
        <p>Map</p>
      </Link>

      </div>
    </div>
  );
}

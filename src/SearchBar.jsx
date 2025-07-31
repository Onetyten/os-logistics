import { useEffect, useState } from 'react';
import { faBell, faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../utils/state/darkMode/darkModeSlice';
import { useShipmentAnalysis } from './hooks/shipmentAnalysis';
import { FixedSizeList as List } from "react-window";
import OutsideClickHandler from 'react-outside-click-handler';
import { NavLink as Link } from "react-router";
import { setSelectedOrder } from '../utils/state/selectedOrder/selectedOrderSlice';

export default function SearchBar() {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState("")
  const [filterBy, setFilterBy] = useState("name")
  const { shipmentData } = useShipmentAnalysis()
  const darkmode = useSelector((state) => state.darkmode.darkmode)

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', darkmode)
  }, [darkmode])

  const filteredShipments = shipmentData?.filter((item) => {
    const name = item.package_information?.package_name?.toLowerCase()
    const country = item.origin?.country?.toLowerCase()
    const id = item.package_information?.package_id?.toLowerCase()
    const search = searchText.toLowerCase()

    if (filterBy === "name") return name?.includes(search)
    if (filterBy === "country") return country?.includes(search)
    if (filterBy === "ID") return id?.includes(search)
    return false
  }) || []

  const toggleTheme = () => {
    dispatch(toggleDarkMode())
  }

  const handleClear = () => {
    setSearchText("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
  <OutsideClickHandler onOutsideClick={handleClear}>
    <div className='relative'>
      <form onSubmit={handleSubmit} className="w-full bg-boxclr h-12 shadow-md flex items-center rounded-md p-2">
        <div className="h-full flex items-center justify-center px-2">
          <FontAwesomeIcon icon={faSearch} className="text-textclr" />
        </div>

        <div className="flex-1 relative h-full flex items-center">
          <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search Orders" className="w-full px-2 bg-boxclr placeholder:text-text-clr2 text-text-clr2 focus:outline-0 text-sm h-full" />
        </div>

        <div className='sm:flex hidden gap-1 items-center'>
          <p className='text-textclr2 text-center'>Search by :</p>
          <select className='text-textclr2 text-left bg-boxclr outline-none' value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
            <option value="name">package name</option>
            <option value="country">country</option>
            <option value="ID">package id</option>
          </select>
        </div>

        <div className="h-full gap-4 md:gap-7 flex items-center justify-center px-3 md:px-5">
         
          <FontAwesomeIcon icon={faBell} className="text-textclr2 cursor-pointer" onClick={() => toast("No new notifications")} />
          <div className={`flex items-center w-5 h-5 cursor-pointer overflow-hidden border-textclr2 rounded-full ${darkmode ? '' : 'border-[1px]'}`} onClick={toggleTheme} >
            <div className={`flex-1 h-full ${darkmode ? 'bg-textclr2' : 'bg-textclr2'} rounded-l-full`} />
            <div className={`flex-1 h-full ${darkmode ? 'bg-bkground' : 'bg-white'} rounded-r-full`} />
          </div>
        </div>
      </form>



      {searchText.trim() !== "" && (
        <div className='h-72 bg-boxclr absolute w-full z-50 shadow-md top-16 overflow-y-scroll'>
          {filteredShipments.length > 0 ? (
            <List height={288} width={"100%"} itemSize={70} itemCount={filteredShipments.length}>
              {({ index, style }) => {
                const item = filteredShipments[index];
                return (
                  <Link to="invoice" onClick={()=>{
                    handleClear()
                    dispatch(setSelectedOrder(item))
                  }} key={item.package_information?.package_id} style={style} className="px-4 py-2 border-b hover:bg-gray-300/20 border-bkground">
                    <p className="text-sm font-bold text-textclr">
                      {item.package_information.package_name}
                    </p>
                    <p className="text-xs text-textclr2">
                      {item.origin.country} → {item.destination.country}
                    </p>
                    <p className="text-xs text-textclr2">
                      ID: {item.package_information.package_id}
                    </p>
                  </Link>
                );
              }}
            </List>
          ) : (
            <p className="text-center text-xs text-textclr2 mt-4">No matching results</p>
          )}
        </div>
      )}
    </div>
  </OutsideClickHandler>
  );
}

import { useState } from 'react';
import { faBell,faChevronDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useShipmentAnalysis } from './hooks/shipmentAnalysis';
import { FixedSizeList as List } from "react-window";
import OutsideClickHandler from 'react-outside-click-handler';
import { NavLink as Link } from "react-router";
import { setSelectedOrder } from '../utils/state/selectedOrder/selectedOrderSlice';
import { setScrollTrue } from '../utils/state/setAutoScroll/setAutoScrollSlice';

export default function SearchBar() {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState("")
  const filterArr=["name","country","id"]
  const [filterBy, setFilterBy] = useState(filterArr[0])
  const [showOption,setShowOptions] = useState(false)
  const { shipmentData } = useShipmentAnalysis()
  const filteredShipments = shipmentData?.filter((item) => {
    const name = item.package_information?.package_name?.toLowerCase()
    const country = item.origin?.country?.toLowerCase()
    const id = item.package_information?.package_id?.toLowerCase()
    const search = searchText.toLowerCase()
    if (filterBy === filterArr[0]) return name?.includes(search)
    if (filterBy === filterArr[1]) return country?.includes(search)
    if (filterBy === filterArr[2]) return id?.includes(search)
    return false
  }) || []

  const handleClear = () => {
    setSearchText("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }

  return (
  <OutsideClickHandler onOutsideClick={handleClear}>
    <div className='relative'>
      <form onSubmit={handleSubmit} className="w-full bg-box h-12 shadow-md flex items-center rounded-md p-2">

        <div className="flex-1 relative h-full flex items-center">
          <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search Orders" className="w-full px-2 bg-box placeholder:text-muted text-text-clr2 focus:outline-0 text-sm h-full" />
        </div>


        <div className="h-full gap-4 md:gap-7 flex items-center justify-center px-3 md:px-5">

          <div className='sm:flex hidden gap-2 items-center'>
            <p className='text-muted text-sm text-center'>Search by :</p>
            <OutsideClickHandler onOutsideClick={()=>{setShowOptions(false)}}>
              <div className='text-primary text-sm relative capitalize gap-6'>
                <div className='select-none flex justify-center text-primary relative items-center capitalize gap-4' onClick={()=>{setShowOptions(!showOption)}}>
                  {filterBy}
                  <FontAwesomeIcon className='text-xs' icon={faChevronDown}/>
                </div>
                {showOption&&
                  <div className='absolute w-24 z-70 top-8 left-1/2 -translate-x-1/2 bg-background'>
                      {filterArr.map((item,index)=>{
                        return(
                          <div key={index} onClick={()=>{setFilterBy(item);setShowOptions(false)}} className='p-2 hover:bg-primary hover:text-background'>
                              {item}
                          </div>
                        )
                      })}
                  </div>
                }
              </div>
            </OutsideClickHandler>
          </div>
          
          <FontAwesomeIcon icon={faBell} className="text-primary cursor-pointer" onClick={() => toast("No new notifications")} />
        </div>
      </form>



      {searchText.trim() !== "" && (
        <div className='h- bg-box absolute w-full z-50 border-primary border border-t-0 rounded-b-md shadow-md top-16'>
          {filteredShipments.length > 0 ? (
            <List height={300} width={"100%"} itemSize={80} itemCount={filteredShipments.length} className='hide-scrollbar'>
              {({ index, style }) => {
                const item = filteredShipments[index];
                return (
                  <Link to="invoice" onClick={()=>{
                    handleClear()
                    dispatch(setSelectedOrder(item))
                    dispatch(setScrollTrue())
                  }} 
                  
                  key={item.package_information?.package_id} style={style} className="px-4 py-2 text-muted hover:bg-primary hover:text-background">
                    <p className="text-sm font-bold text-white text-textclr">
                      {item.package_information.package_name}
                    </p>
                    <p className="text-[15px]">
                      {item.origin.country} → {item.destination.country}
                    </p>
                    <p className="text-[15px]">
                      ID: {item.package_information.package_id}
                    </p>
                  </Link>
                );
              }}
            </List>
          ) : (
            <p className="text-center text-sm h-72 text-muted mt-4">No matching results</p>
          )}
        </div>
      )}


    </div>
  </OutsideClickHandler>
  );
}

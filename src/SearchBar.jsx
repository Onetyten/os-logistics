import { useEffect } from 'react';
import { faBell,faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../utils/state/darkMode/darkModeSlice';

export default function SearchBar() {
  const dispatch = useDispatch()
  const darkmode = useSelector((state)=>state.darkmode.darkmode)

  useEffect(()=>{
    if (darkmode==true){
      document.documentElement.classList.add('dark-theme');
    }
    else
    {
      document.documentElement.classList.remove('dark-theme');
    }
   },[darkmode])



  const toggleTheme = () => {
    dispatch(toggleDarkMode())
  };

  return (
    <div className="w-full bg-boxclr h-12 shadow-md flex items-center rounded-md p-2">
      <div className=" h-full flex items-center cursor-pointer justify-center px-2 ">
        <FontAwesomeIcon icon={faSearch} className="text-textclr" />
      </div>

      <input
        type="text"
        placeholder="Search Orders"
        className="flex-1 px-2 bg-boxclr placeholder:text-text-clr2 text-text-clr2 focus:outline-0 text-sm h-full"
      />

      <div className="h-full gap-4 md:gap-7 flex items-center justify-center px-3 md:px-5 ">
        <div className={`flex items-center w-5 h-5 cursor-pointer overflow-hidden border-textclr2 rounded-full ${darkmode?'':'border-[1px]'}`} onClick={toggleTheme} >
          <div className={`flex-1 h-full ${darkmode?'bg-textclr2':'bg-textclr2'}  rounded-l-full`}>

          </div>
          <div className={`flex-1 h-full ${darkmode?'bg-bkground':'bg-white'} rounded-r-full`}>

          </div>
        </div>
        <FontAwesomeIcon icon={faBell} className="text-textclr2 cursor-pointer" onClick={()=>{toast("No new notifications")}} />
      </div>
    </div>
  );
}
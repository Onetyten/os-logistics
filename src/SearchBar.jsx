import { faBell, faMoon, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function SearchBar() {
  return (
    <div className="w-full bg-boxclr h-12 shadow-md flex items-center rounded-md">
        <div className=" h-full flex items-center justify-center px-2 ">
            <FontAwesomeIcon icon={faSearch} className="text-textclr"/>

        </div>
        
        <input type="text" placeholder="Search Orders"  className="flex-1 px-2 bg-boxclr placeholder:text-text-clr2  text-text-clr2 focus:outline-0  text-sm h-full"/>

        <div className="h-full gap-4 md:gap-7 flex items-center justify-center px-3 md:px-5 ">
            <FontAwesomeIcon icon={faMoon} className="text-textclr2"/>
            <FontAwesomeIcon icon={faBell} className="text-textclr2"/>
        </div>
        
    </div>
  )
}

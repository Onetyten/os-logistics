import { useState, useEffect } from 'react';
import { faBell, faMoon, faSun, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';

export default function SearchBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
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
        <FontAwesomeIcon
          icon={isDarkMode ? faSun : faMoon}
          className="text-textclr2 cursor-pointer"
          onClick={toggleTheme}
        />
        <FontAwesomeIcon icon={faBell} className="text-textclr2 cursor-pointer" onClick={()=>{toast("No new notifications")}} />
      </div>
    </div>
  );
}
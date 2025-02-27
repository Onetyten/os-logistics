
import { useState } from "react"
import Dashboard from "./Dashboard"
import Invoice from "./Invoice"
import Map from "./Map"
import SearchBar from "./SearchBar"
import Sidebar from "./Sidebar"
import { BrowserRouter as Router,Routes,Route } from "react-router"
import { AppProvider } from "./Context"



function App() {

  const [pages,setPages] = useState(["/","invoice","map"])

  return (
    <Router>
      <AppProvider>
        
        <div className="flex bg-bkground  relative px-2 py-4 sm:px-4 sm:py-6">
          
          <Sidebar pages = {pages} setPages = {setPages} />
          

          
          <div className="md:ml-52  flex flex-col flex-1 px-3 ">
            <SearchBar/>
            <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="invoice" element={<Invoice/>}/>
              <Route path="map" element={<Map/>}/>
            </Routes>
          
            
            
          </div>
      
        </div>

      </AppProvider>

    </Router>
    
  )
}

export default App

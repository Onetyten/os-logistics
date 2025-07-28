
import { useState } from "react"
import Dashboard from "./Dashboard"
import Invoice from "./Invoice"
import Map from "./Map"
import SearchBar from "./SearchBar"
import Sidebar from "./Sidebar"
import { BrowserRouter as Router,Routes,Route } from "react-router"
import { AppProvider } from "./Context"
import { ToastContainer } from "react-toastify"



function App() {

  const [pages,setPages] = useState(["/","invoice","map"])

  return (
    <Router>
      <AppProvider>
        
        <div className="flex bg-bkground items-center w-screen min-h-screen overflow-hidden relative">
          
          <Sidebar pages = {pages} setPages = {setPages} />
          

          
          <div className="flex flex-col flex-1 p-4 sm:p-8 sm:px-12 overflow-y-scroll justify-start items-center h-screen ">
            <div className="flex flex-col w-full gap-6 ">
              <SearchBar/>
              <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="invoice" element={<Invoice/>}/>
                <Route path="map" element={<Map/>}/>
              </Routes>
           
            </div>
            
            
          </div>
          <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={true}
          draggable
          closeOnClick={false}
          rtl={false}
        />
      
        </div>

      </AppProvider>

    </Router>
    
  )
}

export default App

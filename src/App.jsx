
import { useState } from "react"
import Dashboard from "./Dashboard"
import Invoice from "./Invoice"
import Map from "./Map"
import SearchBar from "./SearchBar"
import Sidebar from "./Sidebar"
import { BrowserRouter as Router,Routes,Route } from "react-router"
import { ToastContainer } from "react-toastify"
import { Provider } from "react-redux"
import { persistor, store } from "../store"
import { PersistGate } from "redux-persist/integration/react"

function App() {
  const [pages,setPages] = useState(["/","invoice","map"])
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
            <div className="flex bg-background text-white font-console items-center w-screen min-h-dvh overflow-hidden relative">
              <Sidebar pages = {pages} setPages = {setPages} />
              <div className="flex flex-col flex-1 p-4 sm:p-8  overflow-y-scroll hide-scrollbar justify-start items-center h-dvh ">
                <div className="flex flex-col w-full gap-6 ">
                  <SearchBar/>
                  <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="invoice" element={<Invoice/>}/>
                    <Route path="map" element={<Map/>}/>
                  </Routes>
                </div>
              </div>
              <ToastContainer position="top-right" autoClose={2000} hideProgressBar={true} newestOnTop={true} draggable closeOnClick={false} rtl={false}/>
            </div>
        </Router>
      </PersistGate>
    </Provider>
    
  )
}

export default App

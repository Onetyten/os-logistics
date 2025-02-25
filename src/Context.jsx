/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"

const AppContext = createContext()

const AppProvider = ({children}) => {


    const [orders,setOrders] = useState([])
    let [orderSize,setOrderSize] = useState(0)
    const [ordersOnRoute,setOrdersOnRoute] =  useState([])
    let [ordersOnRouteSize,setOrdersOnRouteSize] = useState(0)


    // fetch json from orders.json
    const fetchJson = async ()=>{
        try {
            const response = await axios.get("/json/orders.json")
            setOrders(response.data)
            console.log(orders)
        } catch (error) {
            console.log(error)
        }
    }

    

    useEffect(()=>{
        setOrderSize(orders.length)
        
    },[orders])
    // use effect
    useEffect(()=>{
        fetchJson()
    },[])


    
    return(
        <AppContext.Provider value={{orders,setOrders,orderSize}}>
            {children}
        </AppContext.Provider>
    )
}


export {AppContext,AppProvider}


AppProvider.propTypes = {
    children: PropTypes.node
}
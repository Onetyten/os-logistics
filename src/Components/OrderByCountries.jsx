import { useState } from 'react';
import OrderList from './orderList';
import { useContext } from "react"
import { AppContext } from "../Context"

export default function OrderByCountries() {
    const {oLoading,oNew,OnRoute,oInStorage,oChecking} = useContext(AppContext)
    const shippingOrders = [...OnRoute, ...oInStorage, ...oChecking];
    
    const [countriesTabIndex, setCountriesTabIndex] = useState(1)

    return (
        <div className="bg-boxclr rounded-md row-span-2 w-full h-96 overflow-y-scroll col-span-4 p-3 xl:col-span-3 shadow-md">
            <p className="text-sm font-semibold">Orders by countries</p>
            <div className="w-full shadow-md text-sm flex my-4 justify-around">
                <div onClick={() => setCountriesTabIndex(1)} 
                     className={`${countriesTabIndex === 1 ? "bg-boxclr" : "bg-bkground"} py-3 cursor-pointer text-center w-full h-full`}>
                    <p>New</p>
                </div>
                <div onClick={() => setCountriesTabIndex(2)} 
                     className={`${countriesTabIndex === 2 ? "bg-boxclr" : "bg-bkground"} py-3 cursor-pointer text-center w-full h-full`}>
                    <p>Preparing</p>
                </div>
                <div onClick={() => setCountriesTabIndex(3)} 
                     className={`${countriesTabIndex === 3 ? "bg-boxclr" : "bg-bkground"} py-3 cursor-pointer text-center w-full h-full`}>
                    <p>Shipping</p>
                </div>
            </div>

            <div>
                {/* new */}
                {countriesTabIndex === 1 && <OrderList Orders = {oNew}/> }
                {/* loading */}
                {countriesTabIndex === 2 && <OrderList Orders = {oLoading} name /> }
                {/* shipping */}
                {countriesTabIndex === 3 && <OrderList Orders = {shippingOrders} />}
            </div>
        </div>
    );
}

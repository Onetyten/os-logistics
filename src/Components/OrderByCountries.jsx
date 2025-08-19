import { useState } from 'react';
import OrderList from './orderList';
import { useShipmentAnalysis } from '../hooks/shipmentAnalysis';

export default function OrderByCountries() {
    const {newOrders,preparingOrders,shippingOrders} = useShipmentAnalysis()
    const [countriesTabIndex, setCountriesTabIndex] = useState(1)

    const tabs = [
        {name:"New",key:1,orders:newOrders},
        {name:"Preparing",key:2,orders:preparingOrders},
        {name:"Shipping",key:3,orders:shippingOrders},
    ]

    return (
        <div className="bg-boxclr rounded-md row-span-2 w-full h-96 overflow-hidden relative col-span-4 p-3 xl:col-span-3 shadow-md">
            <p className="text-sm font-semibold">Orders by countries</p>

            <div className=" shadow-md text-sm sticky top-0 flex my-4 mb-0 justify-around">
                {tabs.map((item)=>{
                    return(
                        <div onClick={() => setCountriesTabIndex(item.key)} key={item.key} className={`${countriesTabIndex === item.key ? "bg-boxclr" : "bg-bkground"} py-3 cursor-pointer text-center w-full h-full`}>
                        <p>{item.name}</p>
                    </div>
                    )
                })}
            </div>

            <div className='overflow-y-hidden h-68'>
                {tabs.map((item)=> countriesTabIndex === item.key && <OrderList key={item.key} Orders = {item.orders}/>)}
            </div>
        </div>
    );
}

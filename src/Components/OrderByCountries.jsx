import { useState } from 'react';
import OrderList from './orderList';
import { useShipmentAnalysis } from '../hooks/shipmentAnalysis';
import SpotlightBorder from './SpotlightBorder';

export default function OrderByCountries() {
    const {newOrders,preparingOrders,shippingOrders} = useShipmentAnalysis()
    const [countriesTabIndex, setCountriesTabIndex] = useState(1)

    const tabs = [
        {name:"New",key:1,orders:newOrders},
        {name:"Preparing",key:2,orders:preparingOrders},
        {name:"Shipping",key:3,orders:shippingOrders},
    ]

    return (
        <SpotlightBorder className="bg-boxclr rounded-md row-span-3 w-full overflow-hidden relative col-span-4 p-3 xl:col-span-2 shadow-md">
            <p className="text-lg text-primary font-semibold">Orders by countries</p>

            <div className=" shadow-md text-sm sticky top-0 flex my-4 mb-0 justify-around">
                {tabs.map((item,index)=>{
                    return(
                        <div onClick={() => setCountriesTabIndex(item.key)} key={index} className={`${countriesTabIndex === item.key ? "bg-primary text-background" : "bg-background"} py-3 cursor-pointer ${index==0?"rounded-l-md":index==tabs.length-1?"rounded-r-md":"rounded-none" } text-center w-full h-full`}>
                        <p>{item.name}</p>
                    </div>
                    )
                })}
            </div>

            <div className='overflow-y-hidden h-68'>
                {tabs.map((item)=> countriesTabIndex === item.key && <OrderList key={item.key} Orders = {item.orders}/>)}
            </div>
        </SpotlightBorder>
    );
}

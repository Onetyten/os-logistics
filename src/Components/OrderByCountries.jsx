import { useState, useEffect } from 'react';
import NewOrders from "./Shipping";
import Preparing from "./Preparing";
import Shipping from "./Shipping";

export default function OrderByCountries() {
    // Load saved index from localStorage, default to 1
    const [countriesTabIndex, setCountriesTabIndex] = useState(() => {
        return parseInt(localStorage.getItem("countriesTabIndex")) || 1;
    });

    // Update localStorage whenever the index changes
    useEffect(() => {
        localStorage.setItem("countriesTabIndex", countriesTabIndex);
    }, [countriesTabIndex]);

    return (
        <div className="bg-boxclr rounded-md row-span-2 w-full h-96 overflow-y-scroll col-span-4 p-3 xl:col-span-3 shadow-md">
            <p className="text-sm font-semibold">Orders by countries</p>
            <div className="w-full shadow-md text-sm flex my-4 justify-around">
                <div onClick={() => setCountriesTabIndex(1)} 
                     className={`${countriesTabIndex === 1 ? "bg-boxclr" : "bg-bkground"} py-3 text-center w-full h-full`}>
                    <p>New</p>
                </div>
                <div onClick={() => setCountriesTabIndex(2)} 
                     className={`${countriesTabIndex === 2 ? "bg-boxclr" : "bg-bkground"} py-3 text-center w-full h-full`}>
                    <p>Preparing</p>
                </div>
                <div onClick={() => setCountriesTabIndex(3)} 
                     className={`${countriesTabIndex === 3 ? "bg-boxclr" : "bg-bkground"} py-3 text-center w-full h-full`}>
                    <p>Shipping</p>
                </div>
            </div>

            <div>
                {countriesTabIndex === 1 && <NewOrders />}
                {countriesTabIndex === 2 && <Preparing />}
                {countriesTabIndex === 3 && <Shipping />}
            </div>
        </div>
    );
}

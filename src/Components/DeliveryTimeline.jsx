import { useShipmentAnalysis } from "../hooks/shipmentAnalysis";
import { curveCardinal } from 'd3-shape';
import { Area, AreaChart, ResponsiveContainer, CartesianGrid,Tooltip, XAxis, YAxis } from "recharts";
import SpotlightBorder from "./SpotlightBorder";


export default function DeliveryTimeline() {
    const {deliveryDays} = useShipmentAnalysis()
    const cardinal = curveCardinal.tension(0.2);
  return (
    <SpotlightBorder className={`bg-boxclr rounded-md w-full row-span-3 text-xs p-3 sm:p-6 col-span-4 shadow-md`}>
        <p className="text-lg text-primary font-semibold mb-8">Delivery duration over time</p>
        
        <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={deliveryDays} margin={{ top: 10, right: 0, left: -40, bottom: 10 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
            <XAxis dataKey="shipment" tick={{ fontSize: "10px" }} minTickGap={100} />
            <YAxis dataKey="delivery_time" tick={{ fontSize: "12px" }}/>
            <Tooltip tick={{ fontSize: "12px", }}  formatter={(value) => [`${value > 1?value:1} day${value > 1?"s":""}`, "Delivery time"]}  labelFormatter={(label) => `Shipment: ${label}`} contentStyle={{backgroundColor:"#121212",borderWidth:2,borderRadius:5}} />
            <Area type={cardinal} dataKey="delivery_time" stroke="#3ECF8E" fill="#3ECF8E" fillOpacity={0.8} />
        </AreaChart>
        </ResponsiveContainer>
    </SpotlightBorder>
)
}

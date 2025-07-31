import { useShipmentAnalysis } from "../hooks/shipmentAnalysis";
import { curveCardinal } from 'd3-shape';
import { Area, AreaChart, ResponsiveContainer, CartesianGrid,Tooltip, XAxis, YAxis } from "recharts";


export default function DeliveryTimeline() {
    const {deliveryDays} = useShipmentAnalysis()
    const cardinal = curveCardinal.tension(0.2);
  return (
    <div className={`bg-boxclr rounded-md w-full min-h-32 text-xs h-96 row-span-2 p-3 sm:p-6 col-span-3 md:col-span-4 xl:col-span-3 shadow-md`}>
        <p className="text-sm font-semibold mb-8">Delivery duration over time</p>
        
        <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={deliveryDays} margin={{ top: 10, right: 0, left: -40, bottom: 10 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
            <XAxis dataKey="shipment" tick={{ fontSize: "10px" }} minTickGap={100} />
            <YAxis dataKey="delivery_time" tick={{ fontSize: "12px" }}/>
            <Tooltip tick={{ fontSize: "12px" }}  formatter={(value) => [`${value > 1?value:1} day${value > 1?"s":""}`, "Delivery time"]}  labelFormatter={(label) => `Shipment: ${label}`} />
            <Area type={cardinal} dataKey="delivery_time" stroke="#1b54fe" fill="#1b54fe" fillOpacity={0.8} />
        </AreaChart>
        </ResponsiveContainer>
    </div>
)
}

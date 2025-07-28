import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppContext } from "../Context";
import { useContext } from "react";

export default function DeliveryTimeline() {
    const {processedData} = useContext(AppContext)
  return (
    <div className={`bg-boxclr rounded-md w-full min-h-32 text-xs pb-8 h-96 row-span-2 p-3 col-span-3 md:col-span-4 xl:col-span-3 shadow-md`}>
        <p className="text-sm font-semibold mb-8">Delivery Timeline</p>
        <ResponsiveContainer width="99%" height="80%">
        <BarChart data={processedData} margin={{ top: 10, right: 0, left: -40, bottom: 10 }}>
            <XAxis dataKey="shipment"  tick={{ fontSize: "10px" }}/>
            <YAxis  tick={{ fontSize: "10px" }}/>
            <Tooltip />
            <Legend/>
            <Bar dataKey="daysDifference" stackId="a" fill="#1b54fe" name="No of shipment per date" />
        </BarChart>
        </ResponsiveContainer>
    </div>
)
}

import {useContext} from 'react'
import { AppContext } from "../Context";
import { curveCardinal } from 'd3-shape';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export default function MonthlyShipment() {
    const {monthlyShipment} = useContext(AppContext)
    const cardinal = curveCardinal.tension(0.2);
  return (
    <div className={`bg-boxclr rounded-md col-span-4 w-full h-96 p-3 row-span-2 shadow-md`}>
        <p className="text-sm font-semibold mb-8">Monthly shipment</p>

        <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={monthlyShipment} margin={{ top: 10, right: 0, left: -40, bottom: 10 }}>
            {/* <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/> */}
            <XAxis  dataKey="date" tick={{ fontSize: "10px" }} minTickGap={100} tickFormatter={(date) => {
                const d = new Date(date);
                return d.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                });
              }}
            />
            <YAxis tick={{ fontSize: "12px" }}/>
            <Tooltip tick={{ fontSize: "12px" }} />
            {/* <Area type="monotone" dataKey="count" stroke="#1b54fe" fill="#1b54fe" fillOpacity={0.3} /> */}
            <Area type={cardinal} dataKey="count" stroke="#1b54fe" fill="#1b54fe" fillOpacity={0.8} />
        </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

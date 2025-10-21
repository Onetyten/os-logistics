import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { useShipmentAnalysis } from "../hooks/shipmentAnalysis";
import SpotlightBorder from "./SpotlightBorder";

export default function TotalCostCard() {
  const { TotalbaseShippingFee, TotalInsuranceFee, TotalTaxes } = useShipmentAnalysis();

  const data = [
    { name: "Base Shipping Fee", value: TotalbaseShippingFee },
    { name: "Insurance", value: TotalInsuranceFee },
    { name: "Taxes", value: TotalTaxes },
  ];


  const Colors = [ { pattern: "url(#solid)", color: "#3ECF8E" },{ pattern: "url(#stripes)", color: "#3ECF8E" }, { pattern: "url(#dots)", color: "#3ECF8E" }]

  
  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(0) + "k";
    return num.toFixed(2);
  };

  return (
    <SpotlightBorder className="row-span-3  md:col-span-4 2xl:col-span-2 bg-boxclr rounded-md w-full h-96 sm:h-full flex flex-col p-3 shadow-md">
      <p className="text-lg text-primary font-semibold">Total Cost Composition</p>
      <div className="flex w-full flex-1 justify-center items-center">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <defs>
              <pattern id="dots" patternUnits="userSpaceOnUse" width="6" height="6">
                <circle cx="1" cy="1" r="1" fill="rgba(62, 207, 142, 0.4)" />
              </pattern>
              <pattern id="stripes" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                <rect width="4" height="8" fill="rgba(62, 207, 142, 0.4)" />
              </pattern>
              <pattern id="solid" patternUnits="userSpaceOnUse" width="1" height="1">
                <rect width="1" height="1" fill="rgba(62, 207, 142, 1)" />
              </pattern>
            </defs>

            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} isAnimationActive={true} label={false}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={Colors[index % Colors.length].pattern} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatNumber(value)} contentStyle={{ backgroundColor: "#121212", borderRadius: 5, borderWidth: 2, borderColor: "#3ECF8E"}}itemStyle={{ color: "#ffffff", fontSize: "12px"}} labelStyle={{fontWeight: "bold"}} />

          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-xs mt-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-primary">
            <div className="w-3 h-3 border border-primary" style={{ background: Colors[index % Colors.length].color }}/>
            <span className="text-secondary">{item.name}:</span>
            <span className="font-semibold">{formatNumber(item.value)}</span>
          </div>
        ))}
      </div>
    </SpotlightBorder>
  );
}

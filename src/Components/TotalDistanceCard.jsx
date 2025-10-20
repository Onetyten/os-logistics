import { useShipmentAnalysis } from "../hooks/shipmentAnalysis";
import SpotlightBorder from "./SpotlightBorder";

export default function TotalDistanceCard() {
    const {totalDistance } = useShipmentAnalysis()
  return (
    <SpotlightBorder className="bg-boxclr row-span-3 rounded-md w-full md:col-span-4 xl:col-span-2 p-3 shadow-md">
        <p className="text-lg text-primary font-semibold">Total distance to travel</p>
        <div className="flex w-full h-full justify-center text-primary items-center">
        <p className="text-4xl font-extrabold">{(totalDistance || 0).toLocaleString()} KM</p>
        </div>
    </SpotlightBorder>
  )
}

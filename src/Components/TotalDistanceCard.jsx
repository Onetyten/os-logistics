import { useShipmentAnalysis } from "../hooks/shipmentAnalysis";

export default function TotalDistanceCard() {
    const {totalDistance } = useShipmentAnalysis()
  return (
    <div className="bg-boxclr h-96 rounded-md row-span-2 w-full min-h-32 md:col-span-4 xl:col-span-2 p-3 shadow-md">
        <p className="text-sm font-semibold">Total distance to travel</p>
        <div className="flex w-full h-full justify-center text-primary items-center">
        <p className="text-2xl font-bold">{(totalDistance || 0).toLocaleString()} KM</p>
        </div>
    </div>
  )
}

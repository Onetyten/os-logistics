import { useShipmentAnalysis } from "../hooks/shipmentAnalysis";
import SpotlightBorder from "./SpotlightBorder";
import TextScramble from "./TextScramble";

export default function TotalDistanceCard() {
    const {totalDistance,totalRevenue } = useShipmentAnalysis()
  return (
    <div className="row-span-3 md:col-span-4 xl:col-span-2 flex flex-col gap-3">
      <SpotlightBorder className="bg-boxclr rounded-md w-full flex flex-col flex-1 p-3 shadow-md">
          <p className="text-lg text-primary font-semibold">Total distance to travel</p>
          <div className="flex w-full flex-1 justify-center text-primary items-center">
            <p className="text-3xl font-extrabold flex gap-2">
              <TextScramble texts={[`${(totalDistance || 0).toLocaleString()}`]} nextLetterSpeed={50} letterSpeed={30}/> KM
            </p>
          </div>
      </SpotlightBorder>
      <SpotlightBorder className="bg-boxclr rounded-md w-full flex flex-col flex-1 p-3 shadow-md">
          <p className="text-lg text-primary font-semibold">Pending Revenue</p>
          <div className="flex w-full flex-1 justify-center text-primary items-center">
            <p className="text-3xl font-extrabold flex gap-2">
              <TextScramble texts={[`${(totalRevenue|| 0).toLocaleString()}`]} nextLetterSpeed={50} letterSpeed={30}/> USD
            </p>
          </div>
      </SpotlightBorder>

    </div>
  )
}

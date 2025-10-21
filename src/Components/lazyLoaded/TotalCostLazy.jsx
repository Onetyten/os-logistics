import SpotlightBorder from "../SpotlightBorder";

export default function TotalCostLazy() {
  return (
    <div className="row-span-4 sm:row-span-3  col-span-4 2xl:col-span-2 bg-boxclr rounded-md w-full h-full flex flex-col p-3 shadow-md">
      <SpotlightBorder className="bg-boxclr rounded-md w-full justify-center items-center flex flex-col flex-1 p-3 shadow-md">
            <div className="text-2xl w-[80%] h-[80%] bg-background font-extrabold flex gap-2">
            </div>
      </SpotlightBorder>
    </div>
  )
}

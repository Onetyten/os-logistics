import SpotlightBorder from "../SpotlightBorder";

export default function TotalCostLazy() {
  return (
    <div className="row-span-3 md:col-span-4 xl:col-span-2 flex flex-col gap-3">
      <SpotlightBorder className="bg-boxclr rounded-md w-full justify-center items-center flex flex-col flex-1 p-3 shadow-md">
            <div className="text-2xl w-[80%] h-[80%] bg-background font-extrabold flex gap-2">
            </div>
      </SpotlightBorder>
    </div>
  )
}

import SpotlightBorder from "../SpotlightBorder";

export default function StatusLazy() {
  return (
    <SpotlightBorder className="bg-boxclr text-sm flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md">
        <div className="bg-background w-full h-8"></div>
        <div className="bg-background w-full flex-1"></div>
    </SpotlightBorder>
  )
}

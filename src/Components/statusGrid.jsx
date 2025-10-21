import SpotlightBorder from "./SpotlightBorder"

export default function StatusGrid(prop) {
  const {count,percentage,message,icon} = prop
  
  return (
    <SpotlightBorder className="bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 sm:p- shadow-md">
        <div className="flex items-center gap-2">
        <div className={`p-2 text-primary rounded-md bg-primary/20`}>
            {icon}
        </div>
        <p className="font-semibold text-xl text-primary">{count}</p>
        </div>
        <p className="text-muted text-sm">
        <span className="font-semibold text-primary">{percentage}%</span> {message}
        </p>
    </SpotlightBorder>
  )
}

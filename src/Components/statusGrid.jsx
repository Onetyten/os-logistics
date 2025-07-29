
export default function StatusGrid(prop) {
  const {count,percentage,message,icon,color,bgcolor} = prop
  
  return (
    <div className="bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 shadow-md">
        <div className="flex items-center gap-2">
        <div className={`p-2 ${color} rounded-md ${bgcolor}`}>
            {icon}
        </div>
        <p className="font-semibold">{count}</p>
        </div>
        <p className="text-textclr2 text-sm">
        <span className="font-semibold">{percentage}%</span> {message}
        </p>
    </div>
  )
}

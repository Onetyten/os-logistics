import SpotlightBorder from "./SpotlightBorder"
import TextScramble from "./TextScramble"

export default function StatusGrid(prop) {
  const {count,percentage,message,icon} = prop
  
  return (
    <SpotlightBorder className="bg-boxclr flex flex-col gap-2 rounded-md col-span-2 p-3 sm:p-6 justify-between shadow-md">
        <div className="flex items-center gap-2">
          <div className={`p-2 text-primary rounded-md bg-primary/20`}>
              {icon}
          </div>
          <TextScramble className="font-semibold text-xl text-primary" texts={[`${count}`]} nextLetterSpeed={50} letterSpeed={30}/>
          
        </div>
        <div className="text-muted flex gap-2 w-f text-sm">
          <TextScramble className="font-semibold text-primary" texts={[`${percentage}%`]} nextLetterSpeed={50} letterSpeed={30}/>
          <TextScramble texts={[`${message}`]} nextLetterSpeed={50} letterSpeed={30}/>
        </div>
    </SpotlightBorder>
  )
}

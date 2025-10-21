import PropTypes from "prop-types"
import TextScramble from "./TextScramble"

export default function DetailListItem({name,info}) {
  return (
    <div className="flex justify-between gap-4 text-center">
        <p className="text-textclr2 text-left font-bold uppercase text-xs sm:text-base ">{name}</p>
        <TextScramble className="text-textclr text-right font-semibold text-xs sm:text-base" texts={[`${info}`]} nextLetterSpeed={30} letterSpeed={20} key={info}/>
    </div>
  )
}

DetailListItem.propTypes = {
    name:PropTypes.string,
    info:PropTypes.string
}
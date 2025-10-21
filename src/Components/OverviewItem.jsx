import PropTypes from "prop-types"
import TextScramble from "./TextScramble"

export default function OverviewItem(props) {
    const {item ,color,percentage} = props
  return (
    <div className={`${color} w-full flex flex-col justify-between gap-3 py-2 px-1`}>
        <p className="text-sm text-center font-semibold">{item}</p>
    
        <TextScramble className="text-sm text-center mb-1" texts={[`${percentage}%`]} nextLetterSpeed={100} letterSpeed={100}/>
    </div>
  )
}

OverviewItem.propTypes = {
    item:PropTypes.node,
    color:PropTypes.node,
    percentage:PropTypes.node
}

import PropTypes from "prop-types"

export default function OverviewItem(props) {
    const {item ,color,percentage} = props
  return (
    <div className={`${color} w-full flex flex-col gap-3 py-2 px-1`}>
        <p className="text-xs md:text-[10px] text-center font-semibold">{item}</p>
        <p className="text-xs md:text-[1opx] text-center">{percentage}%</p>
    </div>
  )
}

OverviewItem.propTypes = {
    item:PropTypes.node,
    color:PropTypes.node,
    percentage:PropTypes.node
}

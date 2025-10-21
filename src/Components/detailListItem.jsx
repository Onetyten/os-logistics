import PropTypes from "prop-types"

export default function DetailListItem({name,info}) {
  return (
    <div className="flex justify-between gap-4 text-center">
        <p className="text-textclr2 text-left font-bold uppercase text-xs sm:text-base ">{name}</p>
        <p className="text-textclr text-right font-semibold text-xs sm:text-base">
            {info}
        </p>
    </div>
  )
}

DetailListItem.propTypes = {
    name:PropTypes.string,
    info:PropTypes.string
}
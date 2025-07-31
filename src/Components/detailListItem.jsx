import PropTypes from "prop-types"

export default function DetailListItem({name,info}) {
  return (
    <div className="flex justify-between text-center">
        <p className="text-textclr2 font-bold uppercase text-md">{name}</p>
        <p className="text-textclr font-semibold text-sm">
            {info}
        </p>
    </div>
  )
}

DetailListItem.propTypes = {
    name:PropTypes.string,
    info:PropTypes.string
}
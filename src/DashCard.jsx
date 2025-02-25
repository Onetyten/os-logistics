import PropTypes from "prop-types"

export default function DashCard({children,span}) {
  return (
    <div className={`bg-boxclr rounded-md col-span-${span} shadow-md`}>
        {children}
    </div>
  )
}

DashCard.propTypes={
    children: PropTypes.node,
    span: PropTypes.node,
}



import React from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

const PnlArrow = ({ change }: { change: number }) => {
  return <>{change > 0 ? <FaArrowUp /> : change < 0 ? <FaArrowDown /> : null}</>
}

export default React.memo(PnlArrow)

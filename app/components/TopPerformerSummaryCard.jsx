import { pnlTextColor } from "@utils/pnlTextColor"
import React, { useMemo } from "react"
import { FaArrowDown, FaArrowUp, FaStar } from "react-icons/fa"
import SummaryCard from "./SummaryCard"

const TopPerformerSummaryCard = () => {
  const percentage = -3.48
  const pnlColor = pnlTextColor(percentage)

  const props = useMemo(
    () => ({
      Title: () => (
        <span>
          Top Performer: <span className="text-emerald-500">(TSLA)</span>
        </span>
      ),
      subTitle: "924",
      ImgComponent: () => <FaStar />,
      iconColor: "pink-500", // - tw jit border-pink-500 text-pink-500
      Heading: () => (
        <h1 className={`inline-flex space-x-1 ${pnlColor}`}>
          {percentage ? <FaArrowUp /> : <FaArrowDown />}
          <span> {percentage.toFixed(2)}%</span>
        </h1>
      ),
      headingSubText: "Since last week",
    }),
    [percentage, pnlColor]
  )

  return <SummaryCard {...props} />
}

export default TopPerformerSummaryCard

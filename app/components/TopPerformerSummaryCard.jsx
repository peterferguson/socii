import React from "react"
import { FaArrowUp, FaPercent } from "react-icons/fa"
import SummaryCard from "./SummaryCard"

const TopPerformerSummaryCard = () => {
  const props = {
    Title: () => <span>Performance vs. Market</span>,
    subTitle: "49,65%",
    ImgComponent: () => <FaPercent />,
    iconColor: "blue-500",
    headingColor: "text-emerald-500",
    Heading: () => (
      <h1 className="inline-flex space-x-1">
        <FaArrowUp /> <span> 3.48%</span>
      </h1>
    ),
    headingSubText: "Since yesterday",
  }
  return <SummaryCard {...props} />
}

export default TopPerformerSummaryCard

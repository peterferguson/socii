import React from "react"
import { FaArrowUp, FaUsers } from "react-icons/fa"
import SummaryCard from "./SummaryCard"

const LastPurchaseSummaryCard = () => {
  const props = {
    Title: () => (
      <span>
        Top Performer: <span className="text-emerald-500">(TSLA)</span>
      </span>
    ),
    subTitle: "924",
    ImgComponent: () => <FaUsers />,
    iconColor: "pink-500",
    headingColor: "text-red-500",
    Heading: () => (
      <h1 className="inline-flex space-x-1">
        <FaArrowUp /> <span> 3.48%</span>
      </h1>
    ),
    headingSubText: "Since last week",
  }
  return <SummaryCard {...props} />
}

export default LastPurchaseSummaryCard

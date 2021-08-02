import React from "react"
import { FaArrowUp, FaChartBar } from "react-icons/fa"
import SummaryCard from "./SummaryCard"

const PortfolioValueSummaryCard = () => {
  const props = {
    Title: () => (
      <span>
        Portfolio Value
        <br />
      </span>
    ),
    subTitle: "350,907",
    ImgComponent: () => <FaChartBar />,
    iconColor: "red-500",
    headingColor: "text-emerald-500",
    Heading: () => (
      <h1 className="inline-flex space-x-1">
        <FaArrowUp /> <span> 3.48%</span>
      </h1>
    ),
    headingSubText: "Since last month",
  }
  return <SummaryCard {...props} />
}
export default PortfolioValueSummaryCard

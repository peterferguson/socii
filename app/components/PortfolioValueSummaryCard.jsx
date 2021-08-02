import { usePortfolioHistory } from "@hooks"
import React from "react"
import { FaArrowUp, FaChartBar } from "react-icons/fa"
import SummaryCard from "./SummaryCard"

const PortfolioValueSummaryCard = () => {
  const { history } = usePortfolioHistory()
  const props = {
    Title: () => (
      <span>
        Portfolio Value
        <br />
        <br />
      </span>
    ),
    subTitle: `$ ${history?.equity?.slice(-1)[0]}`,
    ImgComponent: () => <FaChartBar />,
    iconColor: "red-500", // - tw jit border-red-500 text-red-500
    headingColor: "text-emerald-500",
    Heading: () => (
      <h1 className="inline-flex space-x-1">
        <FaArrowUp />{" "}
        <span> {(history?.profitLossPct?.slice(-1)[0] * 100).toFixed(3)}%</span>
      </h1>
    ),
    headingSubText: "Since yesterday",
  }
  return <SummaryCard {...props} />
}
export default PortfolioValueSummaryCard

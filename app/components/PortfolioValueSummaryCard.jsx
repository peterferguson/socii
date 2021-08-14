import { usePortfolioHistory } from "@hooks"
import { pnlTextColor } from "@utils/pnlTextColor"
import React, { useMemo } from "react"
import { FaArrowDown, FaArrowUp, FaChartBar } from "react-icons/fa"
import SummaryCard from "./SummaryCard"

const PortfolioValueSummaryCard = () => {
  const { history } = usePortfolioHistory()
  const percentage = history?.profitLossPct?.slice(-1)[0] * 100
  const pnlColor = pnlTextColor(percentage)
  const props = useMemo(
    () => ({
      Title: () => <span className="mb-8">Portfolio Value</span>,
      subTitle: `$ ${history?.equity?.slice(-1)[0]}`,
      ImgComponent: () => <FaChartBar />,
      iconColor: "red-500", // - tw jit border-red-500 text-red-500
      Heading: () => (
        <h1 className={`inline-flex space-x-1 ${pnlColor}`}>
          {percentage ? <FaArrowUp /> : <FaArrowDown />}
          <span> {percentage.toFixed(2)}%</span>
        </h1>
      ),
      headingSubText: "Since yesterday",
    }),
    [history?.equity, percentage, pnlColor]
  )
  return <SummaryCard {...props} />
}
export default PortfolioValueSummaryCard

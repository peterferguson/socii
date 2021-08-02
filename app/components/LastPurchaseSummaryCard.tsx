import { useOrders } from "@hooks/useOrders"
import { pnlTextColor } from "@utils/pnlTextColor"
import React from "react"
import { FaArrowDown, FaArrowUp, FaChartPie } from "react-icons/fa"
import SummaryCard from "./SummaryCard"

const LastPurchaseSummaryCard = () => {
  // const orders = useOrders()

  // console.log(orders)
  const percentage = 3
  const pnlColor = pnlTextColor(percentage)

  // TODO: Once the orders are being recorded in firebase from the events then change this
  const props = {
    Title: () => (
      <>
        Latest Purchase: <span className="text-emerald-500">(TSLA)</span>
      </>
    ),
    subTitle: "2,356",
    ImgComponent: () => <FaChartPie />,
    iconColor: "orange-500", // - tw jit border-orange-500 text-orange-500
    Heading: () => (
      <h1 className={`inline-flex space-x-1 ${pnlColor}`}>
        {percentage ? <FaArrowUp /> : <FaArrowDown />}
        <span> {percentage.toFixed(2)}%</span>
      </h1>
    ),
    headingSubText: "Since last week",
  }
  return <SummaryCard {...props} />
}

export default LastPurchaseSummaryCard

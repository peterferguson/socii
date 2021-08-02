import { useOrders } from "@hooks/useOrders"
import React from "react"
import { FaArrowUp, FaChartPie } from "react-icons/fa"
import SummaryCard from "./SummaryCard"

const LastPurchaseSummaryCard = () => {
  // const orders = useOrders()

  // console.log(orders)

  const props = {
    Title: () => (
      <>
        Latest Purchase: <span className="text-emerald-500">(TSLA)</span>
      </>
    ),
    subTitle: "2,356",
    ImgComponent: () => <FaChartPie />,
    iconColor: "orange-500", // - tw jit border-orange-500 text-orange-500
    headingColor: "text-emerald-500",
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

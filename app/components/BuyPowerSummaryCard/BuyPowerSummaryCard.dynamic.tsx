import dynamic from "next/dynamic"
import BuyPowerSummaryCard from "./BuyPowerSummaryCard"

export const BuyPowerSummaryCardDynamic = dynamic(
  () => import("./BuyPowerSummaryCard" /* webpackChunkName: "BuyPowerSummaryCard" */),
  { ssr: false }
) as typeof BuyPowerSummaryCard

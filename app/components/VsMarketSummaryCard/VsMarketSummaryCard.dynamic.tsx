import dynamic from "next/dynamic"
import VsMarketSummaryCard from "./VsMarketSummaryCard"

export const VsMarketSummaryCardDynamic = dynamic(
  () => import("./VsMarketSummaryCard" /* webpackChunkName: "VsMarketSummaryCard" */),
  { ssr: false }
) as typeof VsMarketSummaryCard

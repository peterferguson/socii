import dynamic from "next/dynamic"
import PortfolioEquitySummaryCard from "./PortfolioEquitySummaryCard"

export const PortfolioEquitySummaryCardDynamic = dynamic(
  () =>
    import(
      "./PortfolioEquitySummaryCard" /* webpackChunkName: "PortfolioEquitySummaryCard" */
    ),
  { ssr: false }
) as typeof PortfolioEquitySummaryCard

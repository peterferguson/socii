import dynamic from "next/dynamic"
import PortfolioHistoryCard from "./PortfolioHistoryCard"

export const PortfolioHistoryCardDynamic = dynamic(
  () => import("./PortfolioHistoryCard" /* webpackChunkName: "PortfolioHistoryCard" */),
  { ssr: false }
) as typeof PortfolioHistoryCard

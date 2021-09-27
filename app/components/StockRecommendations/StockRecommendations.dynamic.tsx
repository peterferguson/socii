import dynamic from "next/dynamic"
import StockRecommendations from "./StockRecommendations"

export const StockRecommendationsDynamic = dynamic(
  () => import("./StockRecommendations" /* webpackChunkName: "StockRecommendations" */),
  { ssr: false }
) as typeof StockRecommendations

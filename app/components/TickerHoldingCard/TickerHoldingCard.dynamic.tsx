import dynamic from "next/dynamic"
import TickerHoldingCard from "./TickerHoldingCard"

export const TickerHoldingCardDynamic = dynamic(
  () => import("./TickerHoldingCard" /* webpackChunkName: "TickerHoldingCard" */),
  { ssr: false }
) as typeof TickerHoldingCard

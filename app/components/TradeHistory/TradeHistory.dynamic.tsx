import dynamic from "next/dynamic"
import TradeHistory from "./TradeHistory"

export const TradeHistoryDynamic = dynamic(
  () => import("./TradeHistory" /* webpackChunkName: "StockTable" */),
  { ssr: false }
) as typeof TradeHistory

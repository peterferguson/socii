import dynamic from "next/dynamic"
import GroupTradeHistory from "./GroupTradeHistory"

export const GroupTradeHistoryDynamic = dynamic(
  () => import("./GroupTradeHistory" /* webpackChunkName: "StockTable" */),
  { ssr: false }
) as typeof GroupTradeHistory

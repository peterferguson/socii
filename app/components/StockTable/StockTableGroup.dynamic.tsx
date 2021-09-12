import dynamic from "next/dynamic"
import StockTableGroup from "./StockTableGroup"

export const StockTableGroupDynamic = dynamic(
  () => import("./StockTableGroup" /* webpackChunkName: "StockTable" */),
  { ssr: false }
) as typeof StockTableGroup

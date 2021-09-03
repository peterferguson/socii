import dynamic from "next/dynamic"
import StockTable from "./StockTable"

export const StockTableDynamic = dynamic(
  () => import("./StockTable" /* webpackChunkName: "StockTable" */),
  { ssr: false }
) as typeof StockTable

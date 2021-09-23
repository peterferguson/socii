import dynamic from "next/dynamic"
import StockNews from "./StockNews"

export const StockNewsDynamic = dynamic(
  () => import("./StockNews" /* webpackChunkName: "StockNews" */),
  { ssr: false }
) as typeof StockNews

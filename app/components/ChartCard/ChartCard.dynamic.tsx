import dynamic from "next/dynamic"
import ChartCard from "./ChartCard"

export const ChartCardDynamic = dynamic(
  () => import("./ChartCard" /* webpackChunkName: "ChartCard" */),
  { ssr: false }
) as typeof ChartCard

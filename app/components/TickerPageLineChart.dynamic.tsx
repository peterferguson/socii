import dynamic from "next/dynamic"
import TickerPageLineChart from "./TickerPageLineChart"

export const TickerPageLineChartDynamic = dynamic(
  () => import("./TickerPageLineChart" /* webpackChunkName: "TickerPageLineChart" */),
  { ssr: false }
) as typeof TickerPageLineChart

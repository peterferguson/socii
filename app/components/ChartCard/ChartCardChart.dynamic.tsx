import dynamic from "next/dynamic"
import ChartCardChart from "./ChartCardChart"

export const ChartCardChartDynamic = dynamic(
  () => import("./ChartCardChart" /* webpackChunkName: "ChartCardChart" */),
  { ssr: false }
) as typeof ChartCardChart

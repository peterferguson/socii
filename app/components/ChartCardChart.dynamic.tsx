import dynamic from "next/dynamic"
import { ChartCardChart } from "./ChartCardChart"

export const ChartCardChartDynamic = dynamic(
  () =>
    import("./ChartCardChart" /* webpackChunkName: "ChartCardChart" */).then(
      (mod) => mod.ChartCardChart as any
    ),
  { ssr: false }
) as typeof ChartCardChart

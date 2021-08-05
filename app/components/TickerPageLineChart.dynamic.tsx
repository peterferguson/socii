import dynamic from "next/dynamic"
import { TickerPageLineChart } from "./TickerPageLineChart"

export const TickerPageLineChartDynamic = dynamic(
  () =>
    import("./TickerPageLineChart" /* webpackChunkName: "TickerPageLineChart" */).then(
      (mod) => mod.TickerPageLineChart as any
    ),
  { ssr: false }
) as typeof TickerPageLineChart

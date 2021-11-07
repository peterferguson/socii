import dayjs from "dayjs"

export interface PortfolioHistoryTimeseries {
  equity: Timeseries
  pnl: Timeseries
  pnl_pct: Timeseries
}
interface TimeseriesTick {
  x: dayjs.Dayjs
  y: number
}
type Timeseries = TimeseriesTick[]

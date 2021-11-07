import { IEXChartItem } from "./IEXChartItem"

export interface IEXOneDayChartItem extends IEXChartItem {
  minute: string
  average: number
  notional: number
  numberOfTrades: number
}

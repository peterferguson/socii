import { IEXChartItem } from "./IEXChartItem";


export interface IEXMultiDayChartItem extends IEXChartItem {
  date: string;
  open: number;
  close: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
}

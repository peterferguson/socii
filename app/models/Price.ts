import dayjs from "dayjs"

export interface Price {
  latestPrice: number
  changePercent: number
  iexRealtimePrice: number
  latestUpdate: dayjs.Dayjs | string
  currency: string
}

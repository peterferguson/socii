import dayjs from "dayjs"

export interface Price {
  latestPrice: number
  percentChange: number
  iexRealtimePrice: number
  latestUpdate: dayjs.Dayjs | string
  currency: string
}

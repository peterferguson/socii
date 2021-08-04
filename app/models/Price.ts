import dayjs from "dayjs"

export interface Price {
  price: number
  percentChange: number
  iexRealtimePrice: number
  latestUpdate: dayjs.Dayjs | string
  currency: string
}

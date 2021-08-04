import dayjs from "dayjs"

export interface Price {
  price: number
  percentChange: number
  realtimePrice: number
  latestUpdate: dayjs.Dayjs | string
  currency: string
}

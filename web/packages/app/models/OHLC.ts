import dayjs from "dayjs"

export type OHLC = {
  timestamp: Date | number | string | dayjs.Dayjs
  open?: number
  high?: number
  low?: number
  close?: number
  volume?: number
  adjclose?: number
  dividends?: number
}

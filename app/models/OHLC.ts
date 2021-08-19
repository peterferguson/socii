export type OHLC = {
  timestamp: Date | number | string
  open?: number
  high?: number
  low?: number
  close?: number
  volume?: number
  adjclose?: number
  dividends?: number
}

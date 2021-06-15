const { Client } = require("iexjs")

export const iexClient = new Client({
  api_token: process.env.NEXT_PUBLIC_IEXCLOUD_PUBLIC_KEY,
  version: "stable",
})

export const iexPrice = (tickerSymbol: string) =>
  iexClient.quote(tickerSymbol, { filter: "latestPrice" })

export const iexPctChange = (tickerSymbol: string) =>
  iexClient.quote(tickerSymbol, { filter: "changePercent" })

export const iexPriceChange = (tickerSymbol: string) =>
  iexClient.quote(tickerSymbol, { filter: "latestPrice,changePercent" })

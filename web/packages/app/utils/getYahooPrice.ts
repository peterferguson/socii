import { fetchYahoo } from "./fetchYahoo"

export interface YahooPriceData {
  currency?: string
  currencyAsset?: string
  exchange?: string
  exchangeDataDelayedBy?: number
  exchangeName?: string
  fromCurrency?: any
  lastMarket?: any
  longName?: string
  marketCap?: number
  marketState?: string
  maxAge?: number
  postMarketChange?: number
  postMarketChangePercent?: number
  postMarketPrice?: number
  postMarketSource?: string
  postMarketTime?: number
  preMarketChange?: number
  preMarketChangePercent?: number
  preMarketPrice?: number
  preMarketSource?: string
  preMarketTime?: string
  priceHint?: number
  quoteSourceName?: string
  quoteType?: string
  regularMarketChange?: number
  regularMarketChangePercent?: number
  regularMarketDayHigh?: number
  regularMarketDayLow?: number
  regularMarketOpen?: number
  regularMarketPreviousClose?: number
  regularMarketPrice?: number
  regularMarketSource?: string
  regularMarketTime?: string
  regularMarketVolume?: number
  shortName?: string
  asset?: string
  toCurrency?: any
  underlyingAsset?: any
}
interface YahooPrice {
  [asset: string]: YahooPriceData
}

export const getYahooPrice = async (
  assets: string[],
  filters: Array<keyof YahooPriceData> = []
): Promise<YahooPrice> => {
  const yahooData = await fetchYahoo(assets, "get_price")

  if (filters)
    return Object.entries(yahooData).reduce((acc, [key, value]) => {
      const filtered = Object.entries(value).reduce((acc, [k, v]) => {
        if (filters.includes(k as keyof YahooPriceData)) acc[k] = v
        return acc
      }, {})
      return acc ? { ...acc, [key]: filtered } : { [key]: filtered }
    }, {})

  return yahooData
}

interface YahooPriceData {
  currency: string
  currencySymbol: string
  exchange: string
  exchangeDataDelayedBy: number
  exchangeName: string
  fromCurrency: any
  lastMarket: any
  longName: string
  marketCap: number
  marketState: string
  maxAge: number
  postMarketChange: number
  postMarketChangePercent: number
  postMarketPrice: number
  postMarketSource: string
  postMarketTime: number
  preMarketChange: number
  preMarketChangePercent: number
  preMarketPrice: number
  preMarketSource: string
  preMarketTime: string
  priceHint: number
  quoteSourceName: string
  quoteType: string
  regularMarketChange: number
  regularMarketChangePercent: number
  regularMarketDayHigh: number
  regularMarketDayLow: number
  regularMarketOpen: number
  regularMarketPreviousClose: number
  regularMarketPrice: number
  regularMarketSource: string
  regularMarketTime: string
  regularMarketVolume: number
  shortName: string
  symbol: string
  toCurrency: any
  underlyingSymbol: any
}
interface YahooPrice {
  [symbol: string]: YahooPriceData
}

export const getYahooPrice = async (
  tickers: string[],
  filters: Array<keyof YahooPriceData> = []
): Promise<YahooPrice> => {
  const functionUrl = `https://europe-west2-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/get_price`

  const yahooData = await (
    await fetch(functionUrl, {
      method: "POST",
      mode: "cors",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        tickerSymbol: tickers.join(" "),
      }),
    })
  ).json()

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

import { cors, withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"
import { iexClient } from "../index"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end()

  const { tickerSymbol, filter } = req.query as { tickerSymbol: string; filter: string }

  const data = await iexClient.quote(tickerSymbol, { filter })
  
  res.status(200).json(data)
}

export default withAuth(withCORS(handler))

// - Sample result for TSLA
//  {
//   symbol: "TSLA",
//   companyName: "Tesla Inc",
//   primaryExchange: "NASDAQ/NGS (GLOBAL SELECT MARKET)",
//   calculationPrice: "close",
//   open: null,
//   openTime: null,
//   openSource: "official",
//   close: null,
//   closeTime: null,
//   closeSource: "official",
//   high: null,
//   highTime: null,
//   highSource: null,
//   low: null,
//   lowTime: null,
//   lowSource: null,
//   latestPrice: 646.98,
//   latestSource: "Close",
//   latestTime: "July 28, 2021",
//   latestUpdate: 1627502401144,
//   latestVolume: null,
//   iexRealtimePrice: 649.48,
//   iexRealtimeSize: 9,
//   iexLastUpdated: 1627563480360,
//   delayedPrice: null,
//   delayedPriceTime: null,
//   oddLotDelayedPrice: null,
//   oddLotDelayedPriceTime: null,
//   extendedPrice: null,
//   extendedChange: null,
//   extendedChangePercent: null,
//   extendedPriceTime: null,
//   previousClose: 644.78,
//   previousVolume: 32813290,
//   change: 2.2,
//   changePercent: 0.00341,
//   volume: null,
//   iexMarketPercent: 0.005177928207676065,
//   iexVolume: 667,
//   avgTotalVolume: 20368328,
//   iexBidPrice: 0,
//   iexBidSize: 0,
//   iexAskPrice: 0,
//   iexAskSize: 0,
//   iexOpen: 647.04,
//   iexOpenTime: 1627502388085,
//   iexClose: 649.48,
//   iexCloseTime: 1627563480360,
//   marketCap: 640520006923,
//   peRatio: 650.17,
//   week52High: 900.4,
//   week52Low: 273,
//   ytdChange: -0.07975918673034135,
//   lastTradeTime: 1627502399958,
//   currency: "USD",
//   isUSMarketOpen: false,
// }

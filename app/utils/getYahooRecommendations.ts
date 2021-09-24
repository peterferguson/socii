import { fetchYahoo } from "./fetchYahoo"

export const getYahooRecommendations = async ({
  tickers,
}: {
  tickers: string[]
}): Promise<string[]> => {
  const yahooData = await fetchYahoo(tickers, "get_recommendations")
  return yahooData[tickers[0]]?.recommendedSymbols.map((d) => d.symbol)
}

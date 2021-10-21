import { fetchYahoo } from "./fetchYahoo"

export const getYahooRecommendations = async ({
  assets,
}: {
  assets: string[]
}): Promise<string[]> => {
  const yahooData = await fetchYahoo(assets, "get_recommendations")
  return yahooData[assets[0]]?.recommendedSymbols.map((d) => d.symbol) ?? []
}

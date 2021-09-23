export const getYahooRecommendations = async ({
  tickers,
}: {
  tickers: string[]
}): Promise<any[]> => {
  const functionUrl = `https://europe-west2-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/get_recommendations`

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

  return yahooData[tickers[0]]?.recommendedSymbols.map((d) => d.symbol)
}

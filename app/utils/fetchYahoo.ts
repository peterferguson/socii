import { fetcher } from "./fetcher"

export const fetchYahoo = async (tickers: string[], endpoint: string) => {
  const functionUrl = `https://europe-west2-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/${endpoint}`

  return await fetcher(functionUrl, {
    method: "POST",
    mode: "cors",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      tickerSymbol: tickers.join(" "),
    }),
  })
}

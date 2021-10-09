import { fetcher } from "./fetcher"

export const fetchYahoo = async (
  tickers: string[],
  endpoint: string,
  method: string = "POST"
) => {
  const functionUrl = `https://europe-west2-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/${endpoint}`

  // TODO: add yahoo prefix when necessary
  switch (method) {
    case "POST":
      return await fetcher(functionUrl, {
        method: "POST",
        mode: "cors",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tickerSymbol: tickers.map((ticker) => ticker.split(".")[0]).join(" "),
        }),
      })
    case "GET":
      return await fetcher(functionUrl, {
        method: "GET",
        mode: "cors",
        headers: { "content-type": "application/json" },
      })
    default:
      return
  }
}

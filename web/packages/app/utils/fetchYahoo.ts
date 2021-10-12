import { fetcher } from "./fetcher"
import Constants from "expo-constants"

const NEXT_PUBLIC_FIREBASE_PROJECT_ID = "socii-development"
// Constants.manifest.extra.NEXT_PUBLIC_FIREBASE_PROJECT_ID

export const fetchYahoo = async (
  tickers: string[],
  endpoint: string,
  method: string = "POST"
) => {
  const functionUrl = `https://europe-west2-${NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/${endpoint}`

  console.log(`Fetching ${tickers.length} tickers from ${functionUrl}`)
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
      }).catch((e) => e.message)
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

import { fetcher } from "./fetcher"
import Constants from "expo-constants"

const {
  firebase: { projectId },
} = Constants.manifest.extra

export const fetchYahoo = async (
  tickers: string[],
  endpoint: string,
  method: string = "POST",
  body: any = null
) => {
  const functionUrl = `https://europe-west2-${projectId}.cloudfunctions.net/${endpoint}`

  if (!body)
    body = {
      tickerSymbol: tickers.map((ticker) => ticker.split(".")[0]).join(" "),
    }

  console.log(`Fetching ${tickers.length} tickers data from endpoint ${functionUrl}`)
  console.log("headers", method, JSON.stringify(body))

  // TODO: add yahoo prefix when necessary
  switch (method) {
    case "POST":
      return await fetcher(functionUrl, {
        method: "POST",
        mode: "cors",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
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

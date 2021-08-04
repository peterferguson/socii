import { QuerySnapshot } from "@firebase/firestore"
import { getAlphaVantageData } from "@lib/firebase/client/db"
import { OHLCTimeseries } from "@models/OHLCTimseries"
import { Price } from "@models/Price"
import { logoUrl } from "@utils/logoUrl"
import { tickerTimeseries } from "./tickerTimeseries"
const { Client } = require("iexjs")

interface IgetTickersStaticProps {
  tickerDocs: QuerySnapshot
  timeseriesLimit?: number
  subQueryField?: string
}

// TODO: Remove the timeseries query so we can pull it separately and load other data first
// TODO: Allow a query list to filter the return in the ticker data

export const getTickersStaticProps = async ({
  tickerDocs,
  timeseriesLimit = 30,
  subQueryField = "",
}: IgetTickersStaticProps) => {
  const iexClient = new Client({
    api_token: process.env.IEXCLOUD_PUBLIC_KEY,
    version: "stable",
  })

  return {
    props: {
      tickers: tickerDocs.docs.map(async (tickerDoc) => {
        // * Get ticker company data
        const ticker = tickerDoc.data()
        let dataQuery

        const price: Price = await iexClient.quote(ticker.tickerSymbol, {
          filter: "latestPrice,changePercent,iexRealtimePrice,latestUpdate,currency",
        })

        // * serialize the dates broke due to nesting of the ticker data
        // * therefore just going to stringify the ticker data then parse it

        if (!ticker.logoUrl) ticker.logoUrl = await logoUrl(ticker.ISIN)

        const timeseries: OHLCTimeseries = await tickerTimeseries(
          ticker.tickerSymbol,
          timeseriesLimit,
          ticker.ISIN
        )

        if (subQueryField)
          dataQuery = await getAlphaVantageData(ticker.tickerSymbol, subQueryField)

        return {
          ticker: JSON.parse(JSON.stringify(ticker)), // - serialize nested dates
          timeseries,
          dataQuery,
          price,
        }
      }),
    },
  }
}

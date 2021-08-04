import { QuerySnapshot } from "@firebase/firestore"

import { Price } from "@models/Price"
import { getTickerProps } from "./getTickerProps"
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
  const iexClient = new Client({ api_token: process.env.IEX_TOKEN, version: "stable" })

  return {
    props: {
      tickers: await Promise.all(
        tickerDocs.docs.map(async (tickerDoc) => {
          const { ticker, timeseries, dataQuery } = await getTickerProps(
            tickerDoc,
            timeseriesLimit,
            subQueryField
          )

          const price: Price = await iexClient.quote(ticker.tickerSymbol, {
            filter: "latestPrice,changePercent,iexRealtimePrice,latestUpdate,currency",
          })

          return {
            ticker: JSON.parse(JSON.stringify(ticker)), // - serialize nested dates
            timeseries,
            dataQuery,
            price,
          }
        })
      ),
    },
  }
}

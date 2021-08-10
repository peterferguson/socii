import { QuerySnapshot } from "@firebase/firestore"
import { OHLCTimeseries } from "@models/OHLCTimseries"

import { Price } from "@models/Price"
import { getTickerProps } from "./getTickerProps"
const { Client } = require("iexjs")

interface ITickersStaticProps {
  tickerDocs: QuerySnapshot
  timeseriesLimit?: number
  subQueryField?: string
}

interface TickerPropsData {
  ticker: any
  timeseries: OHLCTimeseries
  dataQuery: any
  price: Price
}

export interface TickersProps {
  tickers: TickerPropsData[]
}

interface ITickersStaticPropsResult {
  props: TickersProps
}

// TODO: Remove the timeseries query so we can pull it separately and load other data first
// TODO: Allow a query list to filter the return in the ticker data

export const getTickersStaticProps = async ({
  tickerDocs,
  timeseriesLimit = 30,
  subQueryField = "",
}: ITickersStaticProps): Promise<ITickersStaticPropsResult> => {
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

          // TODO: Create a wrapper arround the price data to store it in firestore

          return {
            ticker: JSON.parse(JSON.stringify(ticker)) || {}, // - serialize nested dates
            timeseries,
            dataQuery,
            price,
          }
        })
      ),
    },
  }
}

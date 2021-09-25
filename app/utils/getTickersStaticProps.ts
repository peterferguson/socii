import { DocumentData } from "@firebase/firestore"
import { OHLCTimeseries } from "@models/OHLCTimseries"
import { Price } from "@models/Price"
import { getTickerProps } from "./getTickerProps"
const { Client } = require("iexjs")

interface ITickersStaticProps {
  tickerDocs: DocumentData[]
  timeseriesLimit?: number
  subQueryField?: string
}

interface TickerPropsData {
  ticker: any
  timeseries: OHLCTimeseries
  dataQuery?: any
  price?: Price
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
  subQueryField = "",
}: ITickersStaticProps): Promise<ITickersStaticPropsResult> => {
  const iexClient = new Client({ api_token: process.env.IEX_TOKEN, version: "stable" })
  console.log(`Loading ${tickerDocs.length} tickers`)

  return {
    props: {
      tickers: await Promise.all(
        tickerDocs?.map(async (tickerDoc) => {
          let ticker, timeseries: OHLCTimeseries, dataQuery, price: Price
          try {
            const tickerProps = await getTickerProps(tickerDoc, subQueryField)
            ticker = tickerProps.ticker
            timeseries = tickerProps.timeseries
            dataQuery = tickerProps.dataQuery
          } catch (e) {
            console.error(e)
          }

          // TODO: Create a wrapper arround the price data to store it in firestore
          // !
          // !
          // !
          // TODO: Get the price through an API call no need for library here
          // !
          // !
          // !
          try {
            price = await iexClient.quote(ticker.tickerSymbol, {
              filter: "latestPrice,changePercent,iexRealtimePrice,latestUpdate",
            })
          } catch (error) {
            console.log(error)
          }

          return {
            ticker: JSON.parse(JSON.stringify(ticker)) || {}, // - serialize nested dates
            timeseries: (timeseries || []) as OHLCTimeseries,
            dataQuery: dataQuery || {},
            price: (price || {}) as Price,
          }
        })
      ),
    },
  }
}

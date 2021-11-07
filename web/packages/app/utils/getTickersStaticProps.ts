import { DocumentData } from "@firebase/firestore"
import { OHLCTimeseries } from "../models/OHLCTimseries"
import { Price } from "../models/Price"
import { getTickerProps } from "./getTickerProps"
import { IntervalEnum, PeriodEnum } from "./getYahooTimeseries"
// const { Client } = require("iexjs")

interface ITickersStaticProps {
  tickerDocs: DocumentData[]
  period?: PeriodEnum
  interval?: IntervalEnum
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
const defaultPrice = {
  latestPrice: 0,
  changePercent: -0.1,
  iexRealtimePrice: 0,
  latestUpdate: "9999-12-31",
  currency: "USD",
}
// TODO: Remove the timeseries query so we can pull it separately and load other data first
// TODO: Allow a query list to filter the return in the ticker data

export const getTickersStaticProps = async ({
  tickerDocs,
  period = PeriodEnum["1D"],
  interval = IntervalEnum["1m"],
  subQueryField = "",
}: ITickersStaticProps): Promise<ITickersStaticPropsResult> => {
  // const iexClient = new Client({ api_token: process.env.IEX_TOKEN, version: "stable" })
  // console.log(`Loading ${tickerDocs.length} tickers`)

  return {
    props: {
      tickers: await Promise.all(
        tickerDocs?.map(async tickerDoc => {
          let ticker, timeseries: OHLCTimeseries, dataQuery, price: Price
          try {
            const tickerProps = await getTickerProps(
              tickerDoc,
              period,
              interval,
              subQueryField
            )
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
            price = defaultPrice
            // price = await iexClient.quote(ticker.tickerSymbol, {
            //   filter: "latestPrice,changePercent,iexRealtimePrice,latestUpdate",
            // })
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

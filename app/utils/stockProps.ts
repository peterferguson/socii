import { OHLCTimeseries } from "@models/OHLCTimseries"
import { serializeObjectDateKeys } from "./serializeObjectDateKeys"
import { tickerExistsSubquery } from "./tickerExistsSubquery"
import { tickerTimeseries } from "./tickerTimeseries"

// TODO: Needs refactored
// TODO: Remove the timeseries query so we can pull it separately and load other data first
// TODO: Allow a query list to filter the return in the ticker data

export const stockProps = async ({
  tickerQuery = null,
  subQueryField = "",
  timeseriesLimit = 30,
  tickerDocs = null,
}) => {
  tickerDocs = tickerDocs ? tickerDocs : await tickerQuery.get()

  let tickerSymbols = []
  let sector = null

  for await (const tickerDoc of tickerDocs.docs) {
    // * Get ticker company data
    let ticker = await tickerDoc.data()

    // * serialize the dates broke due to nesting of the ticker data
    // * therefore just going to stringify the ticker data then parse it
    ticker = JSON.parse(JSON.stringify(ticker))

    const timeseries: OHLCTimeseries = await tickerTimeseries(
      tickerDoc.ref,
      timeseriesLimit,
      ticker.tickerSymbol
    )

    if (subQueryField) {
      sector = await tickerExistsSubquery(tickerDoc.ref, subQueryField)
    }

    tickerSymbols.push({ ticker, timeseries, sector })
  }

  return {
    props: {
      tickerSymbols,
    },
  }
}

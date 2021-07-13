import { OHLCTimeseries } from "@models/OHLCTimseries";
import { tickerExistsSubquery } from "./tickerExistsSubquery";
import { tickerTimeseries } from "./tickerTimeseries";

// TODO: Needs refactored
// TODO: Remove the timeseries query so we can pull it separately and load other data first
// TODO: Allow a query list to filter the return in the ticker data

export const stockProps = async ({
  tickerQuery = null, subQueryField = "", timeseriesLimit = 30, tickerDocs = null,
}) => {
  tickerDocs = tickerDocs ? tickerDocs : await tickerQuery.get();

  let tickerSymbols = [];
  let sector = null;

  for await (const tickerDoc of tickerDocs.docs) {
    // * Get ticker company data
    let ticker = await tickerDoc.data();

    for await (const key of Object.keys(ticker)) {
      // - duck typing check for date values
      if (typeof ticker[key].toMillis === "function") {
        ticker[key] = JSON.stringify(ticker[key].toDate());
      }
    }

    const timeseries: OHLCTimeseries = await tickerTimeseries(
      tickerDoc.ref,
      timeseriesLimit,
      ticker.tickerSymbol
    );

    if (subQueryField) {
      sector = await tickerExistsSubquery(tickerDoc.ref, subQueryField);
    }

    tickerSymbols.push({ ticker, timeseries, sector });
  }

  return {
    props: {
      tickerSymbols,
    },
  };
};

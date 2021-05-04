import { tickerToISIN, firestore } from "@lib/firebase";
import IEXQuery, { ChartRangeOption } from "@lib/iex";

export const isBrowser = typeof window !== "undefined";

export const pctChange = (first: number, second: number): number => {
  return ((first - second) * 100) / second;
};

export const pnlBackgroundColor = (pctChange) => {
  return pctChange > 0
    ? "bg-teal-200"
    : pctChange < 0
    ? "bg-red-200"
    : "bg-gray-200";
};

export const pnlTextColor = (pctChange) => {
  return pctChange > 0
    ? "text-teal-200"
    : pctChange < 0
    ? "text-red-200"
    : "text-brand";
};

export const logoUrl = (isin) => {
  if (isin.length <= 4) {
    isin = tickerToISIN(isin);
  }
  return `https://storage.googleapis.com/sociiinvest.appspot.com/logos/${isin}.png`;
};

export const handleEnterKeyDown = (event, callback) => {
  if (event.key === "Enter") {
    callback();
  }
};

export const alphaVantageData = async (
  tickerSymbol,
  functionType = "TIME_SERIES_DAILY"
) => {
  const apiKey = "E9W8LZBTXVYZ31IO";
  const data = fetchURL(
    `https://www.alphavantage.co/query?function=${functionType}&symbol=${tickerSymbol}&apikey=${apiKey}`
  );

  const dates = Object.keys(data["Time Series (Daily)"]);

  // * Return close for each date as timeseries
  return dates.map((ts) => ({
    date: ts,
    close: parseFloat(data["Time Series (Daily)"][ts]["4. close"]),
    volume: parseFloat(data["Time Series (Daily)"][ts]["5. volume"]),
  }));
};

// ! EXPENSIVE
export const iexChartTimeseries = async (
  tickerSymbol: string,
  range: ChartRangeOption = "1mm"
) => {
  const iexClient = new IEXQuery();
  const data = await fetchURL(iexClient.stockChart(tickerSymbol, range));

  // * Return close for each date as timeseries
  return data.map(({ close, date, volume }) => ({
    close,
    volume,
    timestamp: new Date(date).getTime(),
  }));
};

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const fetchURL = async (url) => (await fetch(url)).json();

export const stockProps = async (
  tickerQuery,
  subQueryField = "",
  timeseriesLimit = 30
) => {
  const tickerDocs = await tickerQuery.get();

  let tickerSymbols = [];
  let sector;

  for await (const tickerDoc of tickerDocs.docs) {
    // * Get ticker company data
    var ticker = await tickerDoc.data();
    ticker["timestamp"] = JSON.stringify(ticker.timestamp.toDate());
    ticker["timeseriesLastUpdated"] = JSON.stringify(
      ticker.timeseriesLastUpdated.toDate()
    );

    const timeseries = await tickerTimeseries(tickerDoc.ref, timeseriesLimit);

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

export const tickerExistsSubquery = async (tickerRef, queryField) => {
  // * Get sector & industry data
  const sectorRef = tickerRef
    .collection("data")
    .where(queryField, ">", "''")
    .orderBy(queryField, "asc")
    .limit(1);

  var sector = (await sectorRef.get()).docs[0].data();

  return { ...sector, lastUpdate: sector.lastUpdate.toMillis() };
};

export const tickerTimeseries = async (tickerRef, limit = 30) => {
  // * Get timeseries data
  const timeseriesRef = tickerRef
    .collection("timeseries")
    .orderBy("timestamp", "desc")
    .limit(limit);

  var timeseriesDocs = (await timeseriesRef.get()).docs;

  return timeseriesDocs.map((doc) => {
    return { ...doc.data(), timestamp: parseInt(doc.id) * 1000 };
  });
};

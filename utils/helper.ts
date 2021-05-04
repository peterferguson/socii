import { tickerToISIN } from "@lib/firebase";
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

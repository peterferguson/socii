import { tickerToISIN } from "@lib/firebase";

export const pctChange = (first, second) => {
  return ((first - second) * 100) / second
}

export const pnlColour = (pctChange) => {
  return pctChange > 0
    ? "bg-teal-200"
    : pctChange < 0
    ? "bg-red-200"
    : "bg-gray-200";
};

export const logoUrl = (isin) => {
  if (isin.length <= 4) {
    isin = tickerToISIN(isin)
  }
  return `https://storage.googleapis.com/sociiinvest.appspot.com/logos/${isin}.png`;
}

export const handleEnterKeyDown = (event, callback) => {
    if (event.key === 'Enter') {
      callback()
    }
  }

export const alphaVantageData = async (tickerSymbol, functionType = "TIME_SERIES_DAILY") => {
  const apiKey = "E9W8LZBTXVYZ31IO";
  const fetchUrl = `https://www.alphavantage.co/query?function=${functionType}&symbol=${tickerSymbol}&apikey=${apiKey}`;
  const response = await fetch(fetchUrl);
  const data = await response.json();

  const dates = Object.keys(data["Time Series (Daily)"]);

  // * Return close for each date as timeseries
  return dates.map((ts) => ({
    date: ts,
    close: parseFloat(data["Time Series (Daily)"][ts]["4. close"]),
    volume: parseFloat(data["Time Series (Daily)"][ts]["5. volume"]),
  }));

}
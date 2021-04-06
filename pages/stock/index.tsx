import LineChart from "@components/LineChart";
import { useEffect, useState } from "react";
import useFetch from "react-fetch-hook";

export default function Stock() {
  const tickerSymbol = "TSLA"; // TODO this will be retrieved from the routing url
  const functionType = "TIME_SERIES_DAILY";
  const apiKey = "E9W8LZBTXVYZ31IO";
  const fetchUrl = `https://www.alphavantage.co/query?function=${functionType}&symbol=${tickerSymbol}&apikey=${apiKey}`;
  const [timeseries, setTimeseries] = useState(null);
  const { isLoading, data } = useFetch(fetchUrl);

  // Alpha Vantage OHLC
  useEffect(() => {
      if (!data) return;
      const dates = Object.keys(data["Time Series (Daily)"]);
    
      // Return close for each date
      setTimeseries(
          dates.map((ts) => ({
              date: new Date(ts),
              close: parseFloat(data["Time Series (Daily)"][ts]["4. close"]),
            }))
          );
        }, [data]);

  return (
    <div>
      {!isLoading && timeseries ? (
        <LineChart tickerSymbol={tickerSymbol} data={timeseries} />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

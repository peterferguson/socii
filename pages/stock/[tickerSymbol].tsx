import LineChart from "@components/LineChart";
import styles from "@styles/Home.module.css";
import { firestore } from "@lib/firebase";
import { useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import { useRouter } from "next/router";

export async function getStaticProps({ params }) {
  const { tickerSymbol } = params; // TODO add username section here based on the users portfolio

  // const tickerDoc = await getTickerISIN(ticker); // TODO Implement a retrival function of ticker data based on ticker rather than ISIN

  // const tickerSymbol = ticker.toUpperCase();
  const functionType = "TIME_SERIES_DAILY";
  const apiKey = "E9W8LZBTXVYZ31IO";
  const fetchUrl = `https://www.alphavantage.co/query?function=${functionType}&symbol=${tickerSymbol}&apikey=${apiKey}`;

  const response = await fetch(fetchUrl);
  const data = await response.json();
  console.log(data);
  // const { data } = useFetch(fetchUrl);

  // if (!data) return;

  const dates = Object.keys(data["Time Series (Daily)"]);
  // Return close for each date
  const timeseries = dates.map((ts) => ({
    date: ts,
    close: parseFloat(data["Time Series (Daily)"][ts]["4. close"]),
    volume: parseFloat(data["Time Series (Daily)"][ts]["5. volume"]),
  }));
  return {
    props: { timeseries, tickerSymbol },
    revalidate: 3000,
  };
}

export async function getStaticPaths(context) {
  // const snapshot = await firestore
  //   .collection("tickers")
  //   .where("marketCountry", "in", [
  //     "United Kingdom",
  //     "United States of America",
  //   ])
  //   .get();

  // const paths = snapshot.docs.map((doc) => {
  //   const { tickerSymbol } = doc.data();
  //   return {
  //     params: { tickerSymbol },
  //   };
  // });


  // For testing to not use the firebase quota
  const paths = [
    {params: 'AAPL'},
    {params: 'TSLA'},
    {params: 'GME'},
    {params: 'NIO'},
    {params: 'PLTR'},
    {params: 'XPEV'},
    {params: 'PLUG'},
    {params: 'AMD'},
    {params: 'FB'},
  ]


  return { paths, fallback: false }; //TODO change query to return only popular stocks & use fallback: true
  // TODO need to implement a popular flag on the tickers to ensure only some are pre-rendered!
  // TODO also add in the small letter versions of each the pages maybe a mapping of some kind so a page is not rendered for each
}

export default function TickerPage(props) {
  // const [timeseries, setTimeseries] = useState(null);

  // // Alpha Vantage OHLC
  // useEffect(() => {
  //   if (!data) return;
  //   const dates = Object.keys(data["Time Series (Daily)"]);

  //   // Return close for each date
  //   setTimeseries(
  //     dates.map((ts) => ({
  //       x: new Date(ts),
  //       y: parseFloat(data["Time Series (Daily)"][ts]["4. close"]),
  //     }))
  //   );
  // }, [data]);

  return (
    <div className={styles.container}>
      {props.timeseries ? (
        <LineChart tickerSymbol={props.tickerSymbol} data={props.timeseries} />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

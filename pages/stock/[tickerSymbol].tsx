import LineChart from "@components/LineChart";
import TradingViewChart from "@components/TradingViewChart";
import SmallCardComponent from "@components/Card";
// import styles from "@styles/Home.module.css";
import { firestore } from "@lib/firebase";
import { useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export async function getStaticProps({ params }) {
  const { tickerSymbol } = params; // TODO add username section here based on the users portfolio

  const functionType = "TIME_SERIES_DAILY";
  const apiKey = "E9W8LZBTXVYZ31IO";
  const fetchUrl = `https://www.alphavantage.co/query?function=${functionType}&symbol=${tickerSymbol}&apikey=${apiKey}`;

  const response = await fetch(fetchUrl);
  const data = await response.json();

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
  const snapshot = await firestore
    .collection("tickers")
    .where("isPopular", "==", true)
    .get();

  const paths = snapshot.docs.map((doc) => {
    const { tickerSymbol } = doc.data();
    return {
      params: { tickerSymbol },
    };
  });

  return { paths, fallback: false }; 
  //TODO change query to return only popular stocks & use fallback: true
  // TODO need to implement a popular flag on the tickers to ensure only some are pre-rendered!
  // TODO also add in the small letter versions of each the pages maybe a mapping of some kind so a page is not rendered for each
}

export default function TickerPage(props) {

  const [colorType, setColorType] = useState("typeA");
  const [showTradingView, setShowTradingView] = useState(false);
  const [companyLogoUrl, setCompanyLogoUrl] = useState(undefined);

  // TODO: Need to get the ticker logo display working

  // getLogoUrlFromTicker(props.tickerSymbol).then((url) => {
  //   setCompanyLogoUrl(url);
  //   console.log(url);
  //   console.log(companyLogoUrl);
  // });

  // toast.promise(
  //   getLogoUrlFromTicker(props.tickerSymbol),
  //   {
  //     loading: 'Loading',
  //     success: (url) => `Successfully saved ${url}`,
  //     error: (err) => `This just happened: ${err.toString()}`,
  //   },
  //   {
  //     style: {
  //       minWidth: '250px',
  //     },
  //     success: {
  //       duration: 5000,
  //       icon: '🔥',
  //     },
  //   }
  // );

  const colorRanges = {
    typeA: ["#59E4EC", "#0D676C"],
    typeB: ["#EFC1E3", "#B52F93"],
  };

  const nextType = {
    typeA: "typeB",
    typeB: "typeA",
  };

  return (
    // <div className="flex h-full w-full ">
    <>
      <div className="flex-auto w-full h-1/8">
        <div className="flex w-full h-1/8">
          {companyLogoUrl && (
            <SmallCardComponent
              // imageUrl={companyLogoUrl}
              headerText={props.tickerSymbol}
            />
          )}
          <button
            className="flex rounded p-2 m-4 text-white bg-brand hover:bg-brand-dark"
            onClick={() => setShowTradingView(!showTradingView)}
          >
            {!showTradingView ? "TradingView" : "socii Chart"}
          </button>
          {!showTradingView && (
            <button
              className="flex rounded p-2 m-4 text-white bg-brand hover:bg-brand-dark"
              onClick={() => setColorType(nextType[colorType])}
            >
              Toggle Color
            </button>
          )}
        </div>
      </div>
      <div className="flex pb-96 w-full h-1/3">
        {showTradingView ? (
          <TradingViewChart tickerSymbol={props.tickerSymbol} />
        ) : props.timeseries ? (
          <LineChart
            tickerSymbol={props.tickerSymbol}
            data={props.timeseries}
            colorRanges={colorRanges}
            colorType={colorType}
          />
        ) : (
          <div>Loading</div>
        )}
      </div>
    </>
    // </div>
  );
}

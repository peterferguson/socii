import LineChart from "@components/LineChart";
import TradingViewChart from "@components/TradingViewChart";
import { firestore } from "@lib/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

export async function getStaticProps({ params }) {
  // TODO add username section here based on the users portfolio
  const { tickerSymbol } = params;

  // * Get ticker data from firestore
  const tickerRef = firestore
    .collection("tickers")
    .where("tickerSymbol", "==", tickerSymbol)
    .limit(1);

  const tickerDoc = await tickerRef.get();

  let tickerData;
  try {
    tickerData = tickerDoc.docs[0].data();
  } catch (e) {
    // console.log(e);
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  // * Use the tickerAdded field to know when the symbol was added to the site
  const tickerAdded = JSON.stringify(tickerData.timestamp.toDate());
  delete tickerData.timestamp;

  // * Get summary data from firestore
  const summaryRef = firestore.doc(
    `tickers/${tickerData.ISIN}/data/alphaVantage`
  );

  const tickerSummaryDoc = await summaryRef.get();

  if (!tickerSummaryDoc) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const tickerSummary = tickerSummaryDoc.data();
  const summaryLastUpdated = JSON.stringify(tickerSummary.lastUpdate.toDate());
  delete tickerSummary.lastUpdate;

  // * Get timeseries data from api
  const functionType = "TIME_SERIES_DAILY";
  const apiKey = "E9W8LZBTXVYZ31IO";
  const fetchUrl = `https://www.alphavantage.co/query?function=${functionType}&symbol=${tickerSymbol}&apikey=${apiKey}`;

  const response = await fetch(fetchUrl);
  const data = await response.json();

  const dates = Object.keys(data["Time Series (Daily)"]);

  // * Return close for each date
  const timeseries = dates.map((ts) => ({
    date: ts,
    close: parseFloat(data["Time Series (Daily)"][ts]["4. close"]),
    volume: parseFloat(data["Time Series (Daily)"][ts]["5. volume"]),
  }));

  return {
    props: {
      timeseries,
      tickerSymbol,
      tickerData,
      tickerSummary,
      summaryLastUpdated,
      tickerAdded,
    },
    // revalidate: 3000,
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

  return { paths, fallback: true };
  // TODO also add in the small letter versions of each the pages maybe a mapping of some kind so a page is not rendered for each
}

export default function TickerPage(props) {
  const router = useRouter();

  if (router.isFallback) {
    // useEffect(() => {
    //   if (!props.tickerAdded) {
    //     router.push("/404");
    //     return
    //   }
    // }, []);
    return <div>Loading...</div>;
  }

  const [colorType, setColorType] = useState("typeA");
  const [showTradingView, setShowTradingView] = useState(false);

  const colorRanges = {
    typeA: ["#59E4EC", "#0D676C"],
    typeB: ["#EFC1E3", "#B52F93"],
  };

  const nextType = {
    typeA: "typeB",
    typeB: "typeA",
  };

  const lengthOfTime = props.timeseries.length;
  const previousClose = props.timeseries[lengthOfTime - 1].close;
  const twicePreviousClose = props.timeseries[lengthOfTime - 2].close;
  const previousMonthClose = props.timeseries[lengthOfTime - 29].close;

  const dailyPctChange =
    ((previousClose - twicePreviousClose) * 100) / twicePreviousClose;
  const monthlyPctChange =
    ((previousClose - previousMonthClose) * 100) / previousMonthClose;

  const logoUrl = `https://storage.googleapis.com/sociiinvest.appspot.com/logos/${props.tickerData.ISIN}.png`;

  return (
    <>
      {/* Card Component Start */}
      {/* TODO: Market state with some nice symbols like sun & moon for open & closed plus info on last updated */}
      <div className="relative pl-8 pt-4 bg-gray-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-1/3 sm:w-52">
          <div className="items-center sm:flex">
            <img
              className="shadow-lg rounded-full h-auto w-16 items-center"
              src={logoUrl}
              alt={`${props.tickerSymbol} logo`}
            />
            <div className="p-2 h-auto w-auto text-center">
              <div
                className={`${
                  dailyPctChange > 0
                    ? "bg-teal-200"
                    : dailyPctChange < 0
                    ? "bg-red-200"
                    : "bg-gray-200"
                } text-black text-tiny sm:text-xs px-2 mx-1 rounded-full font-semibold w-full text-center inline-block`}
              >
                D: {dailyPctChange.toFixed(2)}%
              </div>
              <div
                className={`${
                  monthlyPctChange > 0
                    ? "bg-teal-200"
                    : monthlyPctChange < 0
                    ? "bg-red-200"
                    : "bg-gray-200"
                } text-black text-tiny sm:text-xs px-2 mx-1 rounded-full font-semibold w-full text-center hidden sm:inline-block`}
              >
                M: {monthlyPctChange.toFixed(2)}%
              </div>
            </div>
          </div>
          <div className="ml-2 text-gray-600 uppercase text-xs inline-block font-semibold tracking-wider">
            {props.tickerSymbol} &bull; {props.tickerData.shortName}
          </div>
        </div>
      </div>
      {/* Card Component End */}

      <div className="flex-auto w-full h-1/8 bg-gray-50">
        <div className="flex w-full h-1/8">
          <button
            className="flex rounded shadow-lg p-2 m-4 text-white bg-brand hover:bg-brand-dark"
            onClick={() => setShowTradingView(!showTradingView)}
          >
            {!showTradingView ? "TradingView" : "socii Chart"}
          </button>
          {!showTradingView && (
            <button
              className="flex rounded shadow-lg p-2 m-4 text-white bg-brand hover:bg-brand-dark"
              onClick={() => setColorType(nextType[colorType])}
            >
              Toggle Color
            </button>
          )}
        </div>
      </div>
      <div className="flex w-full h-2/3 bg-gray-50">
      {/* <div className="flex w-11/12 h-full bg-gray-50"> */}
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
      {/* </div> */}
      </div>
    </>
  );
}

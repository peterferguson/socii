import LineChart from "@components/LineChart";
import TradingViewChart from "@components/TradingViewChart";
import SmallCardComponent from "@components/Card";
import { firestore, tickerToISIN, firebaseConfig } from "@lib/firebase";
import { useState } from "react";

export async function getStaticProps({ params }) {
  const { tickerSymbol } = params; // TODO add username section here based on the users portfolio

  const tickerISIN = await tickerToISIN(tickerSymbol);

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

  // * Get ticker data from firestore
  const tickerRef = firestore
    .collection("tickers")
    .where("tickerSymbol", "==", tickerSymbol)
    .limit(1);

  const tickerData = (await tickerRef.get()).docs[0].data();

  return {
    props: { timeseries, tickerSymbol, tickerData, tickerISIN },
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

  // TODO: Need to get the ticker logo display working

  const colorRanges = {
    typeA: ["#59E4EC", "#0D676C"],
    typeB: ["#EFC1E3", "#B52F93"],
  };

  const nextType = {
    typeA: "typeB",
    typeB: "typeA",
  };

  const dailyPctChange = 1;
  const closePrice = 420;
  const logoUrl = `https://storage.googleapis.com/sociiinvest.appspot.com/logos/${props.tickerISIN}.png`;

  return (
    // <div className="flex h-full w-full ">
    <>
      {/* Card Component Start */}
      {/* Market state with some nice symbols like sun & moon for open & closed plus info on last updated */}
      <div className="relative p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
          <div className="flex items-baseline">
            <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
              ${props.tickerSymbol} &bull; {props.tickerData.shortName}
            </div>
            <span
              className={`${
                dailyPctChange > 0
                  ? "bg-teal-200"
                  : dailyPctChange < 0
                  ? "bg-red-200"
                  : "bg-gray-200"
              } text-black text-xs px-2 mx-1 inline-block rounded-full  uppercase font-semibold tracking-wide`}
            >
              1D: {dailyPctChange.toFixed(2)}%
            </span>
          </div>

          <div className="mt-1">
            ${closePrice.toFixed(2)}
            <span className="text-gray-600 text-sm"> /wk</span>
          </div>
          <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
            A random Title
          </h4>
          <div className="w-6/12 sm:w-4/12 px-4">
            <img
              src={logoUrl}
              alt={`${props.tickerSymbol} logo`}
              className="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
            />
          </div>

          <div className="mt-4">
            <span className="text-teal-600 text-md font-semibold">
              4/5 ratings{" "}
            </span>
            <span className="text-sm text-gray-600">
              (based on 234 ratings)
            </span>
          </div>
        </div>
      </div>
      {/* Card Component End */}

      <div className="flex-auto w-full h-1/8">
        <div className="flex w-full h-1/8">
          {/* {props.companyLogoUrl && (
            <SmallCardComponent
              // imageUrl={props.companyLogoUrl}
              imageUrl={logoUrl}
              headerText={props.tickerSymbol}
            />
          )} */}
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

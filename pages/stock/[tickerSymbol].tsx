import LineChart from "@components/LineChart";
import TradingViewChart from "@components/TradingViewChart";
import SmallAssetCard from "@components/SmallAssetCard";
import { alphaVantageData, isBrowser, pctChange } from "@utils/helper";
import { firestore, tickerToISIN } from "@lib/firebase";
import { useRouter } from "next/router";
import { useState } from "react";
import { Switch } from "@headlessui/react";

export async function getStaticProps({ params }) {
  // TODO add username section here based on the users portfolio
  const { tickerSymbol } = params;

  const isin = await tickerToISIN(tickerSymbol);

  // * Get ticker data from firestore
  const tickerRef = firestore.doc(`tickers/${isin}`);
  const tickerDoc = await tickerRef.get();

  let tickerData;
  try {
    tickerData = tickerDoc.data();
  } catch (e) {
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
  delete tickerData.timeseriesLastUpdated;

  const timeseriesRef = tickerRef
    .collection("timeseries")
    .orderBy("timestamp", "desc");

  var timeseriesDocs = (await timeseriesRef.get()).docs;

  let timeseries;
  if (timeseriesDocs.length === 0) {
    // * Get timeseries data from api
    timeseries = await alphaVantageData(tickerSymbol);
  }

  timeseries = timeseriesDocs.map((doc) => {
    return { ...doc.data(), timestamp: parseInt(doc.id) * 1000 };
  });

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
    return <div>Loading...</div>;
  }

  const [showTradingView, setShowTradingView] = useState(false);

  const previousClose = props.timeseries[0].close;
  const twicePreviousClose = props.timeseries[1].close;
  const previousMonthClose = props.timeseries[21].close;

  const dailyPctChange = pctChange(previousClose, twicePreviousClose);
  const monthlyPctChange = pctChange(previousClose, previousMonthClose);

  return (
    <>
      <div className="flex flex-row w-full h-1/8 bg-gray-50">
        <SmallAssetCard
          logoUrl={props.tickerData.logoUrl}
          tickerSymbol={props.tickerSymbol}
          shortName={props.tickerData.shortName}
          dailyPctChange={dailyPctChange}
          monthlyPctChange={monthlyPctChange}
        />
      </div>
      <div className="flex w-full h-2/3 bg-gray-50 justify-center items-center">
        <div className="w-full rounded-xl shadow-lg p-2 m-4 bg-white">
          <div className="flex justify-between w-full h-20">
            <span className="z-50 w-12 text-2xl h-4">${previousClose}</span>
            <div className="flex">
              <div className="px-4">
                {!showTradingView ? "TradingView" : "socii Chart"}
              </div>
              {isBrowser && (
                <Switch
                  checked={showTradingView}
                  onChange={setShowTradingView}
                  className={`${
                    showTradingView ? "bg-brand" : "bg-brand-light"
                  } relative inline-flex items-center h-6 rounded-full w-11 \
                  flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className="sr-only">Show Trading View Chart</span>
                  <span
                    className={`${
                      showTradingView ? "translate-x-6" : "translate-x-1"
                    } inline-block w-4 h-4 transform bg-white rounded-full \
                    pointer-events-none h-[34px] w-[34px] shadow-lg ring-0 transition ease-in-out duration-200`}
                  />
                </Switch>
              )}
            </div>
          </div>
          {showTradingView ? (
            <TradingViewChart tickerSymbol={props.tickerSymbol} />
          ) : props.timeseries ? (
            <LineChart
              tickerSymbol={props.tickerSymbol}
              data={props.timeseries}
            />
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </>
  );
}

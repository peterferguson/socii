import LineChart from "@components/LineChart";
import SelectGroupModal from "@components/SelectGroupModal";
import TradingViewChart, {
  TradingViewStockFundamentals,
} from "@components/TradingViewChart";
import { SmallAssetCard } from "@components/AssetCards";
import { isBrowser, pctChange, pnlTextColor, stockProps } from "@utils/helper";
import { UserContext, SelectedGroupContext } from "@lib/context";

import { firestore } from "@lib/firebase";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { Switch } from "@headlessui/react";

export default function TickerPage({ tickerSymbols }) {
  let { ticker, timeseries } = tickerSymbols[0];

  const tickerSymbol = ticker.tickerSymbol;
  const router = useRouter();

  const { user, userGroups } = useContext(UserContext);

  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [showTradingView, setShowTradingView] = useState(false);
  const [crosshairIndexValue, setCrosshairIndexValue] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(userGroups?.slice(0));

  const changeSelectedGroup = (groupName) => setSelectedGroup(groupName);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  timeseries = timeseries.map((d) => {
    return {
      x: d.timestamp instanceof Date ? d.timestamp : new Date(d.timestamp),
      y: d.close,
    };
  });

  const latestClose: number = timeseries[0].y;
  const highlightedClose: number = timeseries[crosshairIndexValue].y;
  let previousMonthClose: number = highlightedClose;

  try {
    previousMonthClose = timeseries[crosshairIndexValue + 21].y;
  } catch (err) {}

  const monthlyPctChange = pctChange(highlightedClose, previousMonthClose);

  // * Show the pct change of highlighted value versus today
  const highlightedChange = pctChange(latestClose, highlightedClose).toFixed(2);

  const handleInvest = () => {
    if (!user) {
      router.push("/enter");
    } else {
      setOpenGroupModal(true);
    }
  };

  return (
    <>
      <div className="flex flex-row w-full bg-gray-50">
        <SmallAssetCard
          logoUrl={ticker.logoUrl}
          tickerSymbol={tickerSymbol}
          shortName={ticker.shortName}
          currentPrice={latestClose}
          monthlyPctChange={monthlyPctChange}
        />
        <div className="hidden sm:block flex-grow"></div>
        <div className="flex-none px-4 sm:pl-8 pt-4 bg-gray-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-40 sm:w-52 items-center justify-center">
            <span className="z-10 w-12 text-3xl sm:text-4xl h-4">
              ${highlightedClose}
              {highlightedChange && (
                <span
                  className={`flex w-32 text-sm text-gray-300 ${pnlTextColor(
                    highlightedChange
                  )}`}
                >
                  {`(${highlightedChange})%`}
                </span>
              )}
              <span className="flex w-32 text-sm text-gray-300">
                {`on ${timeseries[crosshairIndexValue].x.toLocaleDateString()}`}
              </span>
            </span>
          </div>
          <div
            className="btn m-2 ml-0 mt-6 mb-0 text-center w-40 sm:w-52"
            onClick={() => handleInvest()}
          >
            <span className="z-10 w-12 text-4xl h-4">Invest</span>
          </div>
        </div>
      </div>
      <Chart
        showTradingView={showTradingView}
        setShowTradingView={setShowTradingView}
        tickerSymbol={tickerSymbol}
        timeseries={timeseries}
        crosshairIndexValue={crosshairIndexValue}
        setCrosshairIndexValue={setCrosshairIndexValue}
        latestClose={latestClose}
      />
      {/* <TradingViewStockFundamentals tickerSymbol={tickerSymbol} /> */}
      {isBrowser && (
        <SelectedGroupContext.Provider
          value={{ selectedGroup, changeSelectedGroup }}
        >
          <SelectGroupModal
            userGroups={userGroups}
            openGroupModal={openGroupModal}
            setOpenGroupModal={setOpenGroupModal}
            goClickHandler={() => {
              router.push(`/groups/${selectedGroup}`);
            }}
          />
        </SelectedGroupContext.Provider>
      )}
    </>
  );
}

function Chart({
  showTradingView,
  setShowTradingView,
  tickerSymbol,
  timeseries,
  crosshairIndexValue,
  setCrosshairIndexValue,
  latestClose,
}) {
  return (
    <div className="flex w-full h-2/3 bg-gray-50 justify-center items-center">
      <div className="w-full rounded-xl shadow-lg p-2 m-4 bg-white">
        <div className="flex justify-between w-full h-20">
          {!showTradingView ? (
            <div className="flex text-gray-600 text-2xl sm:text-3xl">
              {`A $100 investment on ${timeseries[
                crosshairIndexValue
                  ? crosshairIndexValue
                  : timeseries.length - 1
              ].x.toLocaleDateString()} would be worth $${(
                100 *
                (1 +
                  pctChange(
                    latestClose,
                    crosshairIndexValue
                      ? timeseries[crosshairIndexValue].y
                      : timeseries[timeseries.length - 1].y
                  ) /
                    100)
              ).toFixed(2)} today`}
            </div>
          ) : (
            <div className="flex-grow"></div>
          )}
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
              flex-shrink-0 border-2 border-transparent cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Show Trading View Chart</span>
                <span
                  className={`${
                    showTradingView ? "translate-x-6" : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full \
                pointer-events-none shadow-lg ring-0 transition ease-in-out duration-200`}
                />
              </Switch>
            )}
          </div>
        </div>
        {showTradingView ? (
          <TradingViewChart tickerSymbol={tickerSymbol} />
        ) : timeseries ? (
          <LineChart
            crosshairIndexValue={crosshairIndexValue}
            setCrosshairIndexValue={setCrosshairIndexValue}
            timeseries={timeseries}
          />
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  // TODO add username section here based on the users portfolio
  const { tickerSymbol } = params;
  let props;

  const tickerQuery = firestore
    .collection("tickers")
    .where("tickerSymbol", "==", tickerSymbol)
    .limit(1);

  try {
    props = await stockProps(tickerQuery);
  } catch (e) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    ...props,
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

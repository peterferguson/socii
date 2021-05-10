import GroupSelectorRadioGroup from "@components/GroupSelector";
import LineChart from "@components/LineChart";
import TradingViewChart from "@components/TradingViewChart";
import { SmallAssetCard } from "@components/AssetCards";
import {
  alphaVantageData,
  iexChartTimeseries,
  isBrowser,
  pctChange,
  pnlTextColor,
} from "@utils/helper";
import { UserContext, SelectedGroupContext } from "@lib/context";

import { firestore, tickerToISIN } from "@lib/firebase";
import { useRouter } from "next/router";
import { useState, Fragment, useContext } from "react";
import { Switch } from "@headlessui/react";
import { Dialog, Transition } from "@headlessui/react";

export async function getStaticProps({ params }) {
  // TODO add username section here based on the users portfolio
  const { tickerSymbol } = params;

  // TODO:
  // TODO:
  // TODO:
  // TODO:
  // TODO:
  // TODO: Convert this section to use the stock props helper functions
  // TODO: Ensure these also have error handling and work for ssr fallbacks
  // TODO:
  // TODO:
  // TODO:
  // TODO:
  // TODO:



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
  let tickerAdded;
  if ("timestamp" in tickerData) {
    tickerAdded = JSON.stringify(tickerData.timestamp.toDate());
    delete tickerData.timestamp;
  }
  if ("timeseriesLastUpdated" in tickerData) {
    delete tickerData.timeseriesLastUpdated;
  }

  const timeseriesRef = tickerRef
    .collection("timeseries")
    .orderBy("timestamp", "desc");

  var timeseriesDocs = (await timeseriesRef.get()).docs;

  let timeseries;
  if (timeseriesDocs.length === 0) {
    // * Get timeseries data from api
    timeseries = await alphaVantageData(tickerSymbol);
    // TODO: This is server-side so update firestore with the timeseries data onCall
  } else {
    timeseries = timeseriesDocs.map((doc) => ({
      ...doc.data(),
      timestamp: parseInt(doc.id) * 1000,
    }));
    // ! EXPENSIVE
    // const timeseries = await iexChartTimeseries(tickerSymbol)
  }

  console.log(timeseries);

  // * Get summary data from firestore
  // TODO: If this doesnt exist we need to populate it on call
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

  let summaryLastUpdated;
  if ("lastUpdate" in tickerSummary) {
    summaryLastUpdated = JSON.stringify(tickerSummary.lastUpdate.toDate());
    delete tickerSummary.lastUpdate;
  }

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

export default function TickerPage({ timeseries, tickerData, tickerSymbol }) {
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
          logoUrl={tickerData.logoUrl}
          tickerSymbol={tickerSymbol}
          shortName={tickerData.shortName}
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

function SelectGroupModal({
  userGroups,
  openGroupModal,
  setOpenGroupModal,
  goClickHandler = () => {},
}) {
  const closeModal = () => setOpenGroupModal(false);

  const letsGoClickHander = () => {
    closeModal();
    goClickHandler();
  };

  return (
    <Transition appear show={openGroupModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-blur-lg"
        open={openGroupModal}
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium text-gray-900 font-poppins pb-4"
              >
                Select a group to invest with:
              </Dialog.Title>
              <div className="mt-2">
                <GroupSelectorRadioGroup groupNames={userGroups} />
              </div>
              <div className="flex mt-4">
                <div className="flex-grow" />
                <button
                  type="button"
                  className="flex-none justify-center px-4 py-2 text-sm font-medium \
                  text-blue-900 bg-blue-100 border border-transparent rounded-md \
                  hover:bg-blue-200 focus:outline-none focus-visible:ring-2 \
                  focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={letsGoClickHander}
                >
                  Yes, Lets go! 🚀
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

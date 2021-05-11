import Custom404 from "../404";
import LineChart from "@components/LineChart";
import MultiSelect from "@components/MultiSelect";
import SelectGroupModal from "@components/SelectGroupModal";
import TradingViewChart, {
  TradingViewStockFundamentals,
} from "@components/TradingViewChart";
import { SmallAssetCard } from "@components/AssetCards";
import {
  isBrowser,
  logoUrl,
  pctChange,
  pnlTextColor,
  stockProps,
} from "@utils/helper";
import { alphaVantageQueryOptions } from "@lib/constants";
import { UserContext, SelectedGroupContext } from "@lib/context";
import { firestore } from "@lib/firebase";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { Switch } from "@headlessui/react";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function TickerPage({ tickerSymbols }) {
  if (!tickerSymbols) {
    return <Custom404 />;
  }

  let { ticker, timeseries } = tickerSymbols[0];

  const tickerSymbol = ticker.tickerSymbol;
  const router = useRouter();

  const { user, userGroups } = useContext(UserContext);

  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [openStockSharingModal, setOpenStockSharingModal] = useState(false);
  const [showTradingView, setShowTradingView] = useState(false);
  const [crosshairIndexValue, setCrosshairIndexValue] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(userGroups[0]);

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
          logoUrl={logoUrl(ticker.ISIN)}
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
        <>
          <SelectedGroupContext.Provider
            value={{ selectedGroup, changeSelectedGroup }}
          >
            <SelectGroupModal
              userGroups={userGroups}
              openGroupModal={openGroupModal}
              setOpenGroupModal={setOpenGroupModal}
              goClickHandler={() => setOpenStockSharingModal(true)}
            />
          </SelectedGroupContext.Provider>
          <ShareStockInformationModal
            selectedGroup={selectedGroup}
            tickerSymbol={tickerSymbol}
            openStockSharingModal={openStockSharingModal}
            setOpenStockSharingModal={setOpenStockSharingModal}
            goClickHandler={() => setOpenStockSharingModal(true)}
          />
        </>
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

function ShareStockInformationModal({
  selectedGroup,
  tickerSymbol,
  openStockSharingModal,
  setOpenStockSharingModal,
  goClickHandler = () => {},
}) {
  const closeModal = () => setOpenStockSharingModal(false);

  const letsGoClickHander = () => {
    closeModal();
    goClickHandler();
  };

  return (
    <Transition appear show={openStockSharingModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-blur-lg"
        open={openStockSharingModal}
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
                {`Tell ${selectedGroup} about ${tickerSymbol}!`}
              </Dialog.Title>
              <div className="mt-2">
                <div className="font-poppins text-sm text-blueGray-500">Select some data to tell your friends about!</div>
                <MultiSelect items={alphaVantageQueryOptions} />
                <div className="font-poppins text-sm text-blueGray-500">Tell them your thoughts!</div>

              </div>
              <div className="flex mt-4">
                <div className="flex-grow" />
                <button
                  type="button"
                  className="flex-none justify-center px-4 py-2 text-sm font-medium \
                  text-teal-900 bg-teal-100 border border-transparent rounded-md \
                  hover:bg-teal-200 focus:outline-none focus-visible:ring-2 \
                  focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                  onClick={letsGoClickHander}
                >
                  To the moon 🌕
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
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
    props = await stockProps(tickerQuery, "", 100);
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

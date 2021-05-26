import Custom404 from "../404"
import LineChart from "@components/LineChart"
import ShareStockInformationModal from "@components/ShareStockInformationModal"
import SelectGroupModal from "@components/SelectGroupModal"
import TradingViewChart, {
  TradingViewStockProfile,
  TradingViewStockFinancials,
} from "@components/TradingViewChart"
import { SmallAssetCard } from "@components/AssetCards"
import { isBrowser, logoUrl, pctChange, pnlTextColor, stockProps } from "@utils/helper"
import { UserContext, SelectedGroupContext } from "@lib/context"
import { firestore } from "@lib/firebase"

import { useRouter } from "next/router"
import React, { useState, useContext } from "react"
import { Switch } from "@headlessui/react"
import { useEffect } from "react"

export default function TickerPage({ tickerSymbols }) {
  const router = useRouter()

  const { user, userGroups } = useContext(UserContext)
  let { ticker, timeseries } = tickerSymbols?.[0] || {}

  timeseries = timeseries?.map((d) => {
    return {
      x: d.timestamp instanceof Date ? d.timestamp : new Date(d.timestamp),
      y: d.close,
    }
  })

  const [openGroupModal, setOpenGroupModal] = useState(false)
  const [openStockSharingModal, setOpenStockSharingModal] = useState(false)
  const [tickerLogoUrl, setTickerLogoUrl] = useState("")
  const [selectedGroup, setSelectedGroup] = useState(
    userGroups ? userGroups?.[0] : null
  )

  const changeSelectedGroup = (groupName) => setSelectedGroup(groupName)

  useEffect(() => {
    const setLogoUrl = async () => {
      setTickerLogoUrl(ticker.logoUrl || logoUrl(ticker.ISIN))
    }

    setLogoUrl()
  }, [ticker])

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!tickerSymbols) {
    // TODO: Replace with skeleton loaders
    return <Custom404 />
  }

  return (
    <>
      <TickerComponents
        user={user}
        ticker={ticker}
        timeseries={timeseries}
        tickerLogoUrl={tickerLogoUrl}
        router={router}
        setOpenGroupModal={setOpenGroupModal}
      />
      {isBrowser && timeseries && (
        <>
          <SelectedGroupContext.Provider value={{ selectedGroup, changeSelectedGroup }}>
            {openGroupModal && (
              <SelectGroupModal
                userGroups={userGroups}
                openGroupModal={openGroupModal}
                setOpenGroupModal={setOpenGroupModal}
                goClickHandler={() => setOpenStockSharingModal(true)}
              />
            )}
          </SelectedGroupContext.Provider>
          {openStockSharingModal && (
            <ShareStockInformationModal
              selectedGroup={selectedGroup}
              tickerSymbol={ticker.tickerSymbol}
              tickerLogoUrl={tickerLogoUrl}
              openStockSharingModal={openStockSharingModal}
              setOpenStockSharingModal={setOpenStockSharingModal}
              goClickHandler={() => {}}
              pricePlaceholder={timeseries?.[0]?.y.toString()}
            />
          )}
        </>
      )}
      <div className="flex flex-col items-center justify-center sm:flex-row">
        {/* // TODO: repsonive view */}
        <TradingViewStockProfile
          tickerSymbol={ticker.tickerSymbol}
          exchange={ticker.exchange}
          className="p-4 m-4"
          // height={height}
          // width={width * 0.5}
        />
        <TradingViewStockFinancials
          tickerSymbol={ticker.tickerSymbol}
          exchange={ticker.exchange}
          // height={height}
          // width={width * 0.5}
          className="p-4 m-4 mb-12 sm:mb-4"
        />
      </div>
    </>
  )
}

function TickerComponents({
  user,
  ticker,
  timeseries,
  tickerLogoUrl,
  router,
  setOpenGroupModal,
}) {
  const tickerSymbol = ticker?.tickerSymbol

  const [showTradingView, setShowTradingView] = useState(false)
  const [crosshairIndexValue, setCrosshairIndexValue] = useState(0)

  const latestClose = timeseries?.[0]?.y
  const highlightedClose = timeseries[crosshairIndexValue]?.y
  let previousMonthClose = highlightedClose

  try {
    previousMonthClose = timeseries[crosshairIndexValue + 21]?.y
  } catch (err) {}

  const monthlyPctChange = pctChange(highlightedClose, previousMonthClose)

  // * Show the pct change of highlighted value versus today
  const highlightedChange = pctChange(latestClose, highlightedClose).toFixed(2)

  const handleInvest = () => {
    if (!user) {
      router.push("/enter")
    } else {
      setOpenGroupModal(true)
    }
  }
  return (
    <>
      <div className="flex flex-row w-full bg-gray-50">
        <SmallAssetCard
          logoUrl={tickerLogoUrl}
          tickerSymbol={tickerSymbol}
          shortName={ticker.shortName}
          currentPrice={latestClose}
          monthlyPctChange={monthlyPctChange}
        />
        <div className="flex-grow hidden sm:block" />
        <div className="flex-none px-4 pt-4 sm:pl-8 bg-gray-50">
          <div className="items-center justify-center w-40 p-4 bg-white rounded-lg shadow-lg sm:w-52">
            <span className="z-10 w-12 h-4 text-3xl sm:text-4xl">
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
            className="w-40 m-2 mt-6 mb-0 ml-0 text-center btn sm:w-52"
            onClick={() => handleInvest()}
          >
            <span className="z-10 w-12 h-4 text-4xl">Invest</span>
          </div>
        </div>
      </div>
      <Chart
        showTradingView={showTradingView}
        setShowTradingView={setShowTradingView}
        ticker={ticker}
        timeseries={timeseries}
        crosshairIndexValue={crosshairIndexValue}
        setCrosshairIndexValue={setCrosshairIndexValue}
        latestClose={latestClose}
      />
    </>
  )
}

function Chart({
  showTradingView,
  setShowTradingView,
  ticker,
  timeseries,
  crosshairIndexValue,
  setCrosshairIndexValue,
  latestClose,
}) {
  return (
    <div className="flex items-center justify-center w-full h-2/3 bg-gray-50">
      <div className="w-full p-2 m-4 bg-white shadow-lg rounded-xl">
        <div className="flex justify-between w-full h-20">
          {!showTradingView ? (
            <div className="flex text-2xl text-gray-600 sm:text-3xl">
              {`A $100 investment on ${timeseries[
                crosshairIndexValue ? crosshairIndexValue : timeseries.length - 1
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
          <TradingViewChart
            tickerSymbol={ticker?.tickerSymbol}
            exchange={ticker?.exchange}
          />
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
  )
}

export async function getStaticProps({ params }) {
  // TODO add username section here based on the users portfolio
  const { tickerSymbol } = params
  let props

  const tickerQuery = firestore
    .collection("tickers")
    .where("tickerSymbol", "==", tickerSymbol)
    .limit(1)

  try {
    props = await stockProps(tickerQuery, "", 100)
  } catch (e) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    }
  }

  return {
    ...props,
    revalidate: 3000,
  }
}

export async function getStaticPaths(context) {
  const snapshot = await firestore
    .collection("tickers")
    .where("isPopular", "==", true)
    .get()

  const paths = snapshot.docs?.map((doc) => {
    const { tickerSymbol } = doc.data()
    return {
      params: { tickerSymbol },
    }
  })

  return { paths, fallback: true }
  // TODO also add in the small letter versions of each the pages maybe a mapping of some kind so a page is not rendered for each
}
import LineChart from "@components/LineChart"
import SelectGroupModal from "@components/SelectGroupModal"
import ShareStockInformationModal from "@components/ShareStockInformationModal"
import {
  TradingViewStockFinancials,
  TradingViewStockProfile,
} from "@components/TradingViewChart"
import { tailwindColorMap } from "@lib/constants"
import { SelectedGroupContext, UserContext } from "@lib/context"
import { firestore } from "@lib/firebase"
import { useWindowSize } from "@lib/hooks"
import { isBrowser, logoUrl, pctChange, pnlTextColor, stockProps } from "@utils/helper"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import Custom404 from "../404"

export default function TickerPage({ tickerSymbols }) {
  const router = useRouter()

  const [width, height] = useWindowSize()
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
    const setLogoUrl = async () =>
      setTickerLogoUrl(ticker.logoUrl || logoUrl(ticker.ISIN))

    if (ticker) setLogoUrl()
  }, [ticker])

  if (router.isFallback) return <div>Loading...</div>

  // TODO: Replace with skeleton loaders
  if (!tickerSymbols) return <Custom404 />

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
          height={height * 0.8}
          width={width * 0.7}
        />
        <TradingViewStockFinancials
          tickerSymbol={ticker.tickerSymbol}
          exchange={ticker.exchange}
          height={height * 0.8}
          width={width * 0.7}
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

  const [crosshairIndexValue, setCrosshairIndexValue] = useState(0)
  const [gainColor, setGainColor] = useState("text-gray-400")

  const latestClose = timeseries?.[0]?.y
  const highlightedClose = timeseries[crosshairIndexValue]?.y
  let movingMonthlyClose = highlightedClose

  try {
    movingMonthlyClose = timeseries[crosshairIndexValue + 21]?.y
  } catch (err) {
    console.log(err)
  }

  const movingMonthlyPctChange = pctChange(highlightedClose, movingMonthlyClose)

  const lastMonthPctChange = pctChange(latestClose, timeseries[21]?.y)

  // * Show the pct change of highlighted value versus today
  const highlightedChange = pctChange(latestClose, highlightedClose).toFixed(2)

  const handleInvest = () => {
    if (!user) router.push("/enter")
    else setOpenGroupModal(true)
  }

  const tickerProps = {
    logoUrl: tickerLogoUrl,
    tickerSymbol: tickerSymbol,
    shortName: ticker.shortName,
    currentPrice: latestClose,
    movingMonthlyPctChange: movingMonthlyPctChange,
  }

  useEffect(() => {
    setGainColor(tailwindColorMap[pnlTextColor(lastMonthPctChange)])
  }, [lastMonthPctChange])

  return (
    <>
      <div className="flex flex-col w-full sm:flex-row">
        {/* <SmallAssetCard {...tickerProps} /> */}
        <div className="flex-none pt-4 pl-0 sm:pl-8 ">
          <PriceCard
            {...tickerProps}
            movingMonthlyPctChange={lastMonthPctChange}
            gainColor={gainColor}
          />
        </div>
        <div className="flex-grow hidden sm:block" />
        <div className="flex-grow px-4 sm:flex-none sm:pl-8">
          <div
            className="mx-0 mt-4 mb-0 text-center btn btn-transition"
            onClick={() => handleInvest()}
          >
            <span className="z-10 w-12 h-4 text-4xl">Invest</span>
          </div>
        </div>
      </div>
      <Chart
        timeseries={timeseries}
        crosshairIndexValue={crosshairIndexValue}
        setCrosshairIndexValue={setCrosshairIndexValue}
        highlightedChange={highlightedChange}
        highlightedClose={highlightedClose}
      />
    </>
  )
}

function PriceCard({
  logoUrl,
  tickerSymbol,
  shortName,
  currentPrice,
  gainColor,
  currencySymbol = "$",
  movingMonthlyPctChange,
}) {
  return (
    <div className="p-4 m-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
      <div className="flex items-center">
        <img
          className="w-16 h-auto mx-auto rounded-full shadow-lg"
          src={logoUrl}
          alt={`${tickerSymbol} logo`}
        />
        <div className="flex flex-col">
          <span className="ml-2 font-bold tracking-wider text-gray-700 uppercase text-md dark:text-white">
            {tickerSymbol}
          </span>
          <br />
          <span className="ml-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-white">
            {shortName}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-start">
        <p className="my-4 text-4xl font-bold text-left text-gray-700 dark:text-gray-100">
          {currentPrice}
          <span className="text-sm">{currencySymbol}</span>
        </p>
        <div className={`flex items-center text-sm ${gainColor}`}>
          <svg
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"></path>
          </svg>
          <span>{movingMonthlyPctChange.toFixed(2)}%</span>
          <span className="text-gray-400 align-bottom text-tiny">vs last month</span>
        </div>
      </div>
    </div>
  )
}

function Chart({
  timeseries,
  crosshairIndexValue,
  setCrosshairIndexValue,
  highlightedChange,
  highlightedClose,
}) {
  const is1Col = !useMediaQuery({ minWidth: 640 })
  return (
    <div className="flex items-center justify-center w-full h-2/3 ">
      <div className="w-full p-2 m-4 bg-white shadow-lg rounded-xl">
        <div className="flex justify-between w-full h-20">
          <div className="flex-grow"></div>
          <div className="flex-none p-2 sm:p-4">
            <span className="z-10 text-lg leading-4 sm:text-4xl">
              ${highlightedClose}
              {highlightedChange && (
                <p className={`flex text-tiny ${pnlTextColor(highlightedChange)}`}>
                  {`(${highlightedChange})%`}
                </p>
              )}
              <p className="flex text-gray-300 text-tiny">
                {`on ${timeseries[crosshairIndexValue].x.toLocaleDateString()}`}
              </p>
            </span>
          </div>
        </div>
        {timeseries ? (
          <LineChart
            crosshairIndexValue={crosshairIndexValue}
            setCrosshairIndexValue={setCrosshairIndexValue}
            timeseries={timeseries}
            heightScale={is1Col ? 0.35 : 0.6}
            widthScale={is1Col ? 0.8 : 0.65}
          />
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  )
}

// TODO: Remove tooltip and color price in the graph display of values

export async function getStaticProps({ params }) {
  // TODO add username section here based on the users portfolio
  const { tickerSymbol } = params
  let props

  const tickerQuery = firestore
    .collection("tickers")
    .where("tickerSymbol", "==", tickerSymbol)
    .limit(1)

  try {
    props = await stockProps({ tickerQuery, timeseriesLimit: 100 })
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

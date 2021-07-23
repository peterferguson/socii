import SelectGroupModal from "@components/SelectGroupModal"
import ShareStockInformationModal from "@components/ShareStockInformationModal"
import { selectedGroupContext } from "@contexts/selectedGroupContext"
import { useAuth } from "@hooks/useAuth"
import { tailwindColorMap } from "@lib/constants"
import { firestore } from "@lib/firebase"
import { isBrowser } from "@utils/isBrowser"
import { logoUrl } from "@utils/logoUrl"
import { pctChange } from "@utils/pctChange"
import { pnlTextColor } from "@utils/pnlTextColor"
import { stockProps } from "@utils/stockProps"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Custom404 from "../404"
import { PriceCard } from "@components/PriceCard"
import { Chart } from "@components/Chart"

export default function TickerPage({ tickerSymbols }) {
  const router = useRouter()
  const { user, userGroups } = useAuth()
  let { ticker, timeseries } = tickerSymbols?.[0] || {}

  timeseries = timeseries?.map((d) => ({
    x: d.timestamp instanceof Date ? d.timestamp : new Date(d.timestamp),
    y: d.close,
  }))

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
          <selectedGroupContext.Provider value={{ selectedGroup, changeSelectedGroup }}>
            {openGroupModal && (
              <SelectGroupModal
                userGroups={userGroups}
                openGroupModal={openGroupModal}
                setOpenGroupModal={setOpenGroupModal}
                goClickHandler={() => setOpenStockSharingModal(true)}
              />
            )}
          </selectedGroupContext.Provider>
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

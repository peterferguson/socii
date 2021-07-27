import {
  SelectGroupModal,
  SelectOrderTypeModal,
  SelectInvestActionModal,
  ShareStockInformationModal,
  TickerSymbolPageMainContent,
} from "@components/index"
import { selectedGroupContext } from "@contexts/selectedGroupContext"
import { useAuth } from "@hooks/useAuth"
import { firestore } from "@lib/firebase"
import { isBrowser } from "@utils/isBrowser"
import { logoUrl } from "@utils/logoUrl"
import { stockProps } from "@utils/stockProps"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Custom404 from "../404"
import { fetcher } from "@utils/fetcher"

export default function TickerPage({ tickerSymbols }) {
  const router = useRouter()
  const { user, userGroups } = useAuth()
  let { ticker, timeseries } = tickerSymbols?.[0] || {}

  const [openGroupModal, setOpenGroupModal] = useState(false)
  const [openSelectOrderTypeModal, setOpenSelectOrderTypeModal] = useState(false)
  const [openSelectInvestActionModal, setOpenSelectInvestActionModal] = useState(false)
  const [openStockSharingModal, setOpenStockSharingModal] = useState(false)
  const [tickerLogoUrl, setTickerLogoUrl] = useState("")
  const [selectedGroup, setSelectedGroup] = useState(
    userGroups ? userGroups?.[0] : null
  )
  const [positions, setPositions] = useState([])

  const alpacaId = "933ab506-9e30-3001-8230-50dc4e12861c" // - user?.alpacaID

  // !
  // !
  // !
  // !
  // !
  // !
  // !
  // TODO:
  // TODO:
  // TODO: Write a reducer to handle the state flow of the modals & dynamically import the modals
  // TODO: Display a my position section if the user holds the stock
  // TODO: Breakdown the positions into groups if the user holds the stock
  // TODO:
  // TODO:
  // !
  // !
  // !
  // !
  // !
  // !
  // !

  // ? Maybe execute this in the background? Or just use the data already in the db?
  useEffect(() => {
    const getPositions = async () => {
      setPositions(
        await fetcher("/api/alpaca/positions", {
          method: "POST",
          headers: { Authorization: `Bearer ${user?.token}` },
          body: JSON.stringify({ accountId: alpacaId }),
        })
      )
    }
    if (user?.token && alpacaId) getPositions()
  }, [user, alpacaId])

  const holding = positions.filter(
    (position) => position.symbol === ticker?.tickerSymbol
  )[0]

  console.log(holding)


  // - Get the users positions, this will not depend on userGroups for being able to trade
  // - but will restrict the groups that can sell the ticker!
  // 1 If the user has a position show the buy vs sell option first then the group selection
  // 2 If the user has no position group selection first

  timeseries = timeseries?.map((d) => ({
    x: d.timestamp instanceof Date ? d.timestamp : new Date(d.timestamp),
    y: d.close,
  }))

  const changeSelectedGroup = (groupName) => setSelectedGroup(groupName)

  useEffect(() => {
    const setLogoUrl = async () =>
      setTickerLogoUrl(ticker.logoUrl || logoUrl(ticker.ISIN))

    if (ticker) setLogoUrl()
  }, [ticker])

  const investHandler = () => {
    if (!user) router.push("/enter")
    holding ? setOpenSelectInvestActionModal(true) : setOpenGroupModal(true)
  }

  if (router.isFallback) return <div>Loading...</div>

  // TODO: Replace with skeleton loaders
  if (!tickerSymbols) return <Custom404 />

  return (
    <>
      <TickerSymbolPageMainContent
        ticker={ticker}
        timeseries={timeseries}
        tickerLogoUrl={tickerLogoUrl}
        investHandler={investHandler}
      />
      {/* FIXME: This is next to unreadable! */}
      {/* ! The modals are routed between with on click actions */}
      {/* FIXME: Also all modals could be loaded dynamically */}
      {isBrowser && timeseries && (
        <>
          <selectedGroupContext.Provider value={{ selectedGroup, changeSelectedGroup }}>
            {openGroupModal && (
              <SelectGroupModal
                userGroups={userGroups}
                openGroupModal={openGroupModal}
                setOpenGroupModal={setOpenGroupModal}
                goClickHandler={() =>
                  holding
                    ? setOpenSelectOrderTypeModal(true)
                    : setOpenSelectInvestActionModal(true)
                }
              />
            )}
          </selectedGroupContext.Provider>
          {openSelectOrderTypeModal && (
            <SelectOrderTypeModal
              tickerSymbol={ticker.tickerSymbol}
              tickerLogoUrl={tickerLogoUrl}
              openSelectOrderTypeModal={openSelectOrderTypeModal}
              setOpenSelectOrderTypeModal={setOpenSelectOrderTypeModal}
              goClickHandler={() => setOpenStockSharingModal(true)}
            />
          )}
          {openSelectInvestActionModal && (
            <SelectInvestActionModal
              tickerSymbol={ticker.tickerSymbol}
              tickerLogoUrl={tickerLogoUrl}
              openSelectInvestActionModal={openSelectInvestActionModal}
              setOpenSelectInvestActionModal={setOpenSelectInvestActionModal}
              goClickHandler={
                () =>
                  holding ? setOpenGroupModal(true) : setOpenStockSharingModal(true)
                // TODO: Need to add a state for the selected components of the modals
                // TODO: This re-routing will depend on the selected component
              }
            />
          )}
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

// TODO: Create a card for displaying the current holding information & splits by group on interaction
const TickerHoldingCard = ({ holding }) => {
  console.log(holding?.avgEntryPrice)
  console.log(holding?.qty)
  console.log(holding?.side)
  console.log(holding?.marketValue)
  console.log(holding?.costBasis)
  console.log(holding?.unrealizedPl)
  console.log(holding?.unrealizedPlpc)
  console.log(holding?.unrealizedIntradayPl)
  console.log(holding?.unrealizedIntradayPlpc)
  console.log(holding?.currentPrice)
  console.log(holding?.lastdayPrice)
  console.log(holding?.changeToday)

  return (
    <>
      <div className=""></div>
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

import PieCard, { PieCardSkeleton } from "@components/PieCard"
import DonutChart from "@components/DonutChart"
import { firestore } from "@lib/firebase"
import { iexQuote, logoUrl, round } from "@utils/helper"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"

interface IGroupColumnCard {
  groupName: string
  className?: string
}

export default function GroupColumnCard({ groupName, className }: IGroupColumnCard) {
  const [currentPrices, setCurrentPrices] = useState([])
  const holdingsRef = firestore
    .collection(`groups/${groupName}/holdings`)
    .where("shares", "!=", 0)

  let [holdings, loading] = useCollectionData(holdingsRef)

  useEffect(() => {
    holdings?.map(async ({ tickerSymbol }) => {
      const { latestPrice } = await iexQuote(tickerSymbol, "latestPrice")

      setCurrentPrices((previousState) => ({
        ...previousState,
        [tickerSymbol]: latestPrice,
      }))
    })
  }, [holdings])

  const holdingData = holdings?.map(
    ({ assetRef, tickerSymbol, shortName, avgPrice, shares }) => {
      return { ISIN: assetRef.id, tickerSymbol, shortName, avgPrice, shares }
    }
  )

  return (
    <div
      className={`flex flex-col items-center p-4 mx-auto mb-4 bg-white rounded shadow-2xl sm:rounded-xl ${className}`}
    >
      {!loading ? (
        <GroupPieChart
          groupName={groupName}
          holdingData={holdingData}
          currentPrices={currentPrices}
        />
      ) : (
        <PieCardSkeleton scaling={0.3} radius={250} />
      )}
      {!loading && (
        <div className="w-full py-3 mb-8 -mt-8 text-center border-b border-gray-400 h-3.5">
          <span className="py-0 text-gray-400 bg-white px-2.5">
            {holdings.length} Investments
          </span>
        </div>
      )}
      {!loading && (
        <ul>
          {holdingData.map((holding, index) => {
            return currentPrices ? (
              <StockCard
                key={`holding-${index}`}
                holding={holding}
                latestPrice={currentPrices[holding.tickerSymbol]}
                index={index}
              />
            ) : (
              <StockCardSkeleton />
            )
          })}
        </ul>
      )}
    </div>
  )
}

interface IGroupPieChart {
  groupName: string
  holdingData: any
  currentPrices: any
  className?: string
}
export function GroupPieChart({
  groupName,
  holdingData,
  currentPrices,
  className = "",
}: IGroupPieChart) {
  const portfolioValue = holdingData
    ?.map(({ tickerSymbol, shares }) => currentPrices[tickerSymbol] * shares)
    .reduce((a, b) => a + b, 0)

  const gain =
    ((portfolioValue -
      holdingData
        ?.map(({ avgPrice, shares }) => avgPrice * shares)
        .reduce((a, b) => a + b, 0)) *
      100) /
    portfolioValue

  const pieData = holdingData?.map(({ tickerSymbol, shortName, shares }) => ({
    theta: (currentPrices[tickerSymbol] * shares) / portfolioValue,
    label: shortName,
    subLabel: tickerSymbol,
  }))

  return (
    <div
      className={`
      w-88 sm:w-full items-center justify-center flex flex-col m-0 sm:m-4 
      mb-2 sm:mb-4 ${className}
    `}
    >
      <Link href={`/groups/${groupName}`}>
        <a>
          <div className="relative z-10 text-4xl text-center text-transparent cursor-pointer top-2 font-primary bg-clip-text bg-gradient-to-r from-brand-pink  to-brand">
            {groupName}
          </div>
        </a>
      </Link>
      <DonutChart
        className="z-0 -mt-6"
        data={pieData}
        scaling={0.35}
        radius={250}
        text={{
          main: `$${portfolioValue?.toFixed(2)}`,
          sub: `${gain.toFixed(2)}%`,
        }}
      />
    </div>
  )
}

export function GroupPieCard({
  groupName,
  holdingData,
  currentPrices,
  className = "",
}: IGroupPieChart) {
  const portfolioValue = holdingData
    ?.map(({ tickerSymbol, shares }) => currentPrices[tickerSymbol] * shares)
    .reduce((a, b) => a + b, 0)

  const gain =
    ((portfolioValue -
      holdingData
        ?.map(({ avgPrice, shares }) => avgPrice * shares)
        .reduce((a, b) => a + b, 0)) *
      100) /
    portfolioValue

  const pieData = holdingData?.map(({ tickerSymbol, shortName, shares }) => ({
    theta: (currentPrices[tickerSymbol] * shares) / portfolioValue,
    label: shortName,
    subLabel: tickerSymbol,
  }))

  return (
    <PieCard
      className={className}
      groupName={groupName}
      data={pieData}
      scaling={0.35}
      radius={250}
      text={{
        main: `$${portfolioValue?.toFixed(2)}`,
        sub: `${gain.toFixed(2)}%`,
      }}
    />
  )
}

interface IStockCard {
  holding: any
  lastestPrice: number
  currencySymbol?: string
  index: number
}

function StockCard({ holding, latestPrice, currencySymbol = "$", index }) {
  const tickerSymbol = holding.tickerSymbol

  const pnl = (100 * (latestPrice - holding.avgPrice)) / latestPrice

  return (
    <li
      className={`relative h-auto m-1 ${
        index !== 0 ? "border-t border-gray-200 mt-2" : ""
      } `}
    >
      <div className="flex p-2 bg-white">
        <Link href={`/stocks/${tickerSymbol}`}>
          <div className="items-center justify-center flex-none flex-grow-0 m-auto rounded-full cursor-pointer">
            <img
              className="w-10 h-10 mx-2 rounded-full ring-1 ring-brand-shade-darkest"
              src={logoUrl(holding.ISIN)}
              alt={`${tickerSymbol} logo`}
            />
          </div>
        </Link>
        <div className="items-center flex-grow-0 pt-1 pr-4 min-w-[70px]">
          <div className="text-base font-extrabold tracking-wider uppercase text-brand-shade-darkest font-primary">
            {tickerSymbol}
          </div>
          <div className="overflow-hidden font-thin tracking-wider uppercase text-brand-shade-darkest text-tiny">
            {holding.shortName}
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="flex flex-col items-center justify-center flex-grow-0 w-20 mr-4">
          {/* <div className="overflow-hidden font-semibold text-gray-600 text-tiny overflow-ellipsis">
            {latestPrice ? (
              `${round(holding.shares, 4)} Shares`
            ) : (
              <div className="w-12 bg-gray-200 animate-pulse"></div>
            )}
          </div> */}
          <div className="overflow-hidden font-semibold tracking-wider text-black uppercase text-md overflow-ellipsis">
            {latestPrice ? (
              `${currencySymbol}${(latestPrice * holding.shares).toFixed(2)}`
            ) : (
              <div className="w-12 bg-gray-200 animate-pulse"></div>
            )}
          </div>
          <div
            className={`${
              pnl > 0 ? "bg-teal-200" : pnl < 0 ? "bg-red-200" : "bg-brand"
            } text-gray-700 text-tiny sm:text-xs px-2 rounded-full font-semibold w-full text-center inline-block`}
          >
            {pnl.toFixed(2)}%
          </div>
        </div>
      </div>
    </li>
  )
}

function StockCardSkeleton() {
  return (
    <div className="flex h-auto m-1">
      <div className="flex h-20 p-2 bg-white rounded-lg shadow-2xl w-88 sm:w-96">
        <div className="justify-center flex-none w-20 mx-auto rounded-full">
          <div className="w-10 h-10 mx-auto bg-gray-200 rounded-full shadow-lg animate-pulse" />
          <div className="w-8 h-3 mx-auto my-2 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex-grow w-80"></div>
        <div className="flex flex-col items-center justify-center w-20">
          <div className="w-12 h-3 px-2 mx-auto my-2 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-12 h-3 mx-auto my-2 bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

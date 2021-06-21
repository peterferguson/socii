import PieCard, { PieCardSkeleton } from "@components/PieCard"
import { firestore } from "@lib/firebase"
import { iexQuote, logoUrl, round } from "@utils/helper"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"

export default function GroupColumn({ groupName }) {
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
    <div className="flex flex-col items-center mx-auto mb-4">
      {!loading ? (
        <GroupPieCard
          groupName={groupName}
          holdingData={holdingData}
          currentPrices={currentPrices}
        />
      ) : (
        <PieCardSkeleton scaling={0.3} radius={250} />
      )}
      {!loading && (
        <div className="w-full py-3 my-8 text-center border-b border-gray-400 h-3.5">
          <span className="py-0 text-gray-400 px-2.5 bg-gray-50">
            {holdings.length} Investments
          </span>
        </div>
      )}
      {!loading &&
        holdingData.map((holding, index) => {
          return currentPrices ? (
            <StockCard
              key={`holding-${index}`}
              holding={holding}
              latestPrice={currentPrices[holding.tickerSymbol]}
            />
          ) : (
            <StockCardSkeleton />
          )
        })}
    </div>
  )
}

export function GroupPieCard({
  groupName,
  holdingData,
  currentPrices,
  className = "",
}) {
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

function StockCard({ holding, latestPrice, currencySymbol = "$" }) {
  const tickerSymbol = holding.tickerSymbol

  const pnl = (100 * (latestPrice - holding.avgPrice)) / latestPrice

  return (
    <div className="flex h-auto m-1">
      <div className="flex h-20 p-2 bg-white rounded-lg shadow-2xl w-88 sm:w-96">
        <div className="justify-center flex-none w-20 mx-auto rounded-full">
          <Link href={`/stocks/${tickerSymbol}`}>
            <div className="cursor-pointer">
              <a>
                <img
                  className="w-10 h-10 mx-auto rounded-full shadow-lg"
                  src={logoUrl(holding.ISIN)}
                  alt={`${tickerSymbol} logo`}
                />
              </a>
              <a>
                <div className="w-20 overflow-hidden font-semibold tracking-wider text-center text-gray-600 uppercase text-tiny h-[15px]">
                  {holding.shortName}
                </div>
              </a>
              <a>
                <div className="font-semibold tracking-wider text-center text-gray-600 uppercase text-tiny h-[15px]">
                  {tickerSymbol}
                </div>
              </a>
            </div>
          </Link>
        </div>
        <div className="flex-grow" />
        <div className="flex flex-col items-center justify-center w-20 mr-4">
          <div className="overflow-hidden font-semibold text-gray-600 text-tiny overflow-ellipsis">
            {latestPrice ? (
              `${round(holding.shares, 4)} Shares`
            ) : (
              <div className="w-12 bg-gray-200 animate-pulse"></div>
            )}
          </div>
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
    </div>
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

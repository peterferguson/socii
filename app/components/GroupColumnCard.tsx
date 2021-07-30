import {
  StockCard,
  StockCardSkeleton,
  GroupPieChart,
  PieCardSkeleton,
} from "@components"
import { useAuth } from "@hooks"
import { firestore } from "@lib/firebase"
import { iexQuote } from "@utils/iexQuote"
import React, { useEffect, useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"

export interface IGroupColumnCard {
  groupName: string
  className?: string
}

export default function GroupColumnCard({ groupName, className }: IGroupColumnCard) {
  const {
    user: { token },
  } = useAuth()
  const [currentPrices, setCurrentPrices] = useState([])
  const holdingsRef = firestore
    .collection(`groups/${groupName}/holdings`)
    .where("shares", "!=", 0)

  let [holdings, loading] = useCollectionData(holdingsRef)

  useEffect(() => {
    holdings?.map(async ({ tickerSymbol }) => {
      const { latestPrice } = await iexQuote(tickerSymbol, "latestPrice", token)

      setCurrentPrices((previousState) => ({
        ...previousState,
        [tickerSymbol]: latestPrice,
      }))
    })
    // - dont want the effect to run token is updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

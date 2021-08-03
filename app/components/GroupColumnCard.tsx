import {
  GroupPieChart,
  PieCardSkeleton,
  StockCard,
  StockCardSkeleton,
} from "@components"
import { useAuth } from "@hooks"
import { firestore, QueryDocumentSnapshot } from "@lib/firebase/client/firebase"
import { iexQuote } from "@utils/iexQuote"
import React, { useEffect, useState } from "react"
export interface IGroupColumnCard {
  groupName: string
  className?: string
}

export default function GroupColumnCard({ groupName, className }: IGroupColumnCard) {
  const {
    user: { token },
  } = useAuth()

  const [holdings, setHoldings] = useState<QueryDocumentSnapshot[]>(undefined)
  const [holdingData, setHoldingData] = useState([])
  const [currentPrices, setCurrentPrices] = useState([])

  useEffect(() => {
    const getHoldings = () => {
      const holdingsRef = firestore
        .collection(`groups/${groupName}/holdings`)
        .where("shares", "!=", 0)
      const unsubscribe = holdingsRef.onSnapshot((snap) => setHoldings(snap.docs))

      return unsubscribe
    }
    if (groupName) getHoldings()
  }, [groupName])

  useEffect(() => {
    setHoldingData(
      holdings?.map((doc) => {
        const { tickerSymbol, assetRef, shortName, avgPrice, shares } = doc.data()
        return { ISIN: assetRef.id, tickerSymbol, shortName, avgPrice, shares }
      })
    )
  }, [holdings])

  useEffect(() => {
    holdingData?.map(async ({ tickerSymbol }) => {
      const { latestPrice } = await iexQuote(tickerSymbol, "latestPrice", token)

      setCurrentPrices((previousState) => ({
        ...previousState,
        [tickerSymbol]: latestPrice,
      }))
    })
  }, [holdingData, token])

  return (
    <div
      className={`flex flex-col items-center p-4 mx-auto mb-4 bg-white rounded shadow-2xl sm:rounded-xl ${className}`}
    >
      {holdingData?.length !== 0 ? (
        <GroupPieChart
          groupName={groupName}
          holdingData={holdingData}
          currentPrices={currentPrices}
        />
      ) : (
        <PieCardSkeleton scaling={0.3} radius={250} />
      )}
      {holdingData?.length !== 0 && (
        <div className="w-full py-3 mb-8 -mt-8 text-center border-b border-gray-400 h-3.5">
          <span className="py-0 text-gray-400 bg-white px-2.5">
            {holdings?.length} Investments
          </span>
        </div>
      )}
      {holdingData?.length !== 0 && (
        <ul>
          {holdingData?.map((holding, index) => {
            return currentPrices ? (
              <StockCard
                key={`holding-${index}`}
                holding={holding}
                latestPrice={currentPrices[holding?.tickerSymbol]}
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

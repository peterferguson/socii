import {
  GroupPieChart,
  PieCardSkeleton,
  StockCard,
  StockCardSkeleton,
} from "@components"
import { useAuth } from "@hooks"
import { setHoldingData } from "@lib/firebase/client/db"
import { QueryDocumentSnapshot } from "firebase/firestore"
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
  const [holdingInfo, setHoldingInfo] = useState([])
  const [currentPrices, setCurrentPrices] = useState([])

  useEffect(() => groupName && setHoldingData(groupName, setHoldings), [groupName])

  useEffect(
    () =>
      setHoldingInfo(
        holdings?.map((doc) => {
          const { tickerSymbol, assetRef, shortName, avgPrice, shares } = doc.data()
          return { ISIN: assetRef.id, tickerSymbol, shortName, avgPrice, shares }
        })
      ),
    [holdings]
  )

  useEffect(() => {
    holdingInfo?.map(async ({ tickerSymbol }) => {
      const price = await iexQuote(tickerSymbol, token)

      setCurrentPrices((previousState) => ({
        ...previousState,
        [tickerSymbol]: price.iexRealtimePrice || price.latestPrice,
      }))
    })
  }, [holdingInfo, token])

  return (
    <div
      className={`flex flex-col items-center mx-auto p-4 mb-4 bg-white rounded shadow-lg sm:rounded-xl ${className}`}
    >
      {holdingInfo?.length !== 0 ? (
        <GroupPieChart
          groupName={groupName}
          holdingData={holdingInfo}
          currentPrices={currentPrices}
        />
      ) : (
        <PieCardSkeleton scaling={0.3} radius={250} />
      )}
      {holdingInfo?.length !== 0 && (
        <div className="w-full py-3 mb-8 -mt-8 text-center border-b border-gray-400 h-3.5">
          <span className="py-0 text-gray-400 bg-white px-2.5">
            {holdings?.length} Investments
          </span>
        </div>
      )}
      {holdingInfo?.length !== 0 && (
        <ul className="w-full">
          {holdingInfo?.map((holding, index) => {
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

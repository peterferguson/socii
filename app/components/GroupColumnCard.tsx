import { GroupPieChart, StockCard, StockCardSkeleton } from "@components"
import { useAuth } from "@hooks"
import { getGroupCashBalanceListener } from "@lib/firebase/client/db/getGroupCashBalance"
import { setHoldingData } from "@lib/firebase/client/db/setHoldingData"
import { iexQuote } from "@utils/iexQuote"
import { tw } from "@utils/tw"
import { QueryDocumentSnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useUnmountPromise } from "react-use"
import { NoHoldingsPieCardSkeleton } from "./PieCard"

export interface IGroupColumnCard {
  groupName: string
  className?: string
}

export default function GroupColumnCard({ groupName, className }: IGroupColumnCard) {
  const { user } = useAuth()
  const mounted = useUnmountPromise()

  const [cashBalance, setCashBalance] = useState<number>(undefined)
  const [holdings, setHoldings] = useState<QueryDocumentSnapshot[]>(undefined)
  const [holdingInfo, setHoldingInfo] = useState([])
  const [currentPrices, setCurrentPrices] = useState([])

  useEffect(() => {
    let unsubscribe
    if (groupName) unsubscribe = getGroupCashBalanceListener(groupName, setCashBalance)
    return () => unsubscribe
  }, [groupName])

  useEffect(() => {
    let unsubscribe
    if (groupName) unsubscribe = setHoldingData(groupName, setHoldings)
    return () => unsubscribe
  }, [groupName])

  useEffect(() => {
    setHoldingInfo(
      holdings?.map((doc) => {
        const { symbol, assetRef, shortName, avgPrice, qty } = doc.data()
        return { ISIN: assetRef.id, symbol, shortName, avgPrice, qty }
      })
    )
  }, [holdings])

  useEffect(() => {
    const updatePriceState = async () => {
      holdingInfo &&
        Promise.all(
          holdingInfo?.map(async ({ symbol }) => {
            const price = await iexQuote(symbol, user?.token)
            setCurrentPrices((previousState) => ({
              ...previousState,
              [symbol]: price?.iexRealtimePrice || price?.latestPrice,
            }))
          })
        )
    }
    mounted(updatePriceState())
  }, [holdingInfo, mounted, user?.token])

  return (
    <>
      {holdingInfo?.length !== 0 ? (
        <div
          className={tw(
            "flex flex-col items-center p-4 mb-4 bg-white shadow-lg rounded-2xl",
            className || ""
          )}
        >
          <GroupPieChart
            groupName={groupName}
            holdingData={holdingInfo}
            currentPrices={currentPrices}
            cashBalance={cashBalance}
          />
          <div className="w-full py-3 mb-8 -mt-8 text-center border-b border-gray-400 h-3.5">
            <span className="py-0 text-gray-400 bg-white px-2.5">
              {holdings?.length} Investments
            </span>
          </div>
          <ul className="w-full">
            {holdingInfo?.map((holding, index) => {
              return currentPrices ? (
                <StockCard
                  key={`holding-${index}`}
                  holding={holding}
                  latestPrice={currentPrices[holding?.symbol]}
                  index={index}
                />
              ) : (
                <StockCardSkeleton />
              )
            })}
          </ul>
        </div>
      ) : (
        <NoHoldingsPieCardSkeleton groupName={groupName} scaling={0.3} radius={250} />
      )}
    </>
  )
}

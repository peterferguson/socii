import { QueryDocumentSnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { useAuth } from "../hooks"
import { getGroupCashBalance } from "../lib/firebase/client/db/getGroupCashBalance"
import { getHoldingData } from "../lib/firebase/client/db/getHoldingData"
import { getLogoColor } from "../lib/firebase/client/db/getLogoColor"
import tw from "../lib/tailwind"
import { iexQuote } from "../utils/iexQuote"
import { shadowStyle } from "../utils/shadowStyle"
import { ChatWithGroupFooter } from "./ChatWithGroupFooter"
import Donut, { DonutSector } from "./DonutChart"
import GroupPieChart from "./GroupPieChart"
import StockCard from "./StockCard"
import TextDivider from "./TextDivider"

export interface IGroupColumnCard {
  groupName: string
  style?: any
}

export interface Holding {
  ISIN: string
  symbol: string
  shortName: string
  avgPrice: number
  qty: number
  logoColor?: string
}

export default function GroupColumnCard({ groupName, style }: IGroupColumnCard) {
  const { user } = useAuth()

  const [cashBalance, setCashBalance] = useState<number>(undefined)
  const [holdings, setHoldings] = useState<QueryDocumentSnapshot[]>(undefined)
  const [holdingInfo, setHoldingInfo] = useState([])
  const [currentPrices, setCurrentPrices] = useState({})
  const [mounted, setMounted] = useState(false)
  const [donutSectors, setDonutSectors] = useState<DonutSector[]>([])

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    let unsubscribe
    if (groupName) unsubscribe = getGroupCashBalance(groupName, setCashBalance)
    return () => unsubscribe
  }, [groupName])

  useEffect(() => {
    let unsubscribe
    if (groupName) unsubscribe = getHoldingData(groupName, setHoldings)
    return () => unsubscribe
  }, [groupName])

  useEffect(() => {
    setHoldingInfo(
      holdings?.map((doc): Holding => {
        const { symbol, assetRef, shortName, avgPrice, qty, logoColor } = doc.data()
        return {
          ISIN: assetRef?.id || assetRef.split("/").pop(),
          symbol,
          shortName,
          avgPrice,
          qty,
          logoColor,
        }
      })
    )
  }, [holdings])

  useEffect(() => {
    const updatePriceState = async () => {
      holdingInfo &&
        Promise.all(
          holdingInfo?.map(async ({ symbol }) => {
            try {
              const { iexRealtimePrice = null, latestPrice = null } = await iexQuote(
                symbol,
                user?.token
              )
              if (iexRealtimePrice || latestPrice) {
                setCurrentPrices((previousState) => ({
                  ...previousState,
                  [symbol]: iexRealtimePrice || latestPrice,
                }))
              }
            } catch (e) {
              console.error(e)
            }
          })
        )
    }
    mounted && updatePriceState()
  }, [holdingInfo, mounted, user?.token])

  useEffect(() => {
    // - update donutSectors when a new price is available
    const updateDonutSectors = (newPriceKeys) => {
      const sectors = holdingInfo
        .filter(({ symbol }) => newPriceKeys.includes(symbol))
        ?.map(({ symbol, qty, logoColor }) => {
          return {
            symbol,
            color: logoColor,
            value: currentPrices[symbol] * qty,
          }
        })
      setDonutSectors((s) => [...s, ...sectors])
    }
    const currentPriceKeysNotInDonutSectors = Object.keys(currentPrices).filter(
      (key) => !donutSectors.some((s) => s.symbol === key)
    )
    mounted &&
      currentPriceKeysNotInDonutSectors.length &&
      updateDonutSectors(currentPriceKeysNotInDonutSectors)
  }, [currentPrices, holdingInfo, mounted])

  useEffect(() => console.log(donutSectors), [donutSectors])

  return (
    <View style={tw`flex-col mb-4`}>
      <View
        style={tw.style("flex-col items-center p-4 bg-white rounded-t-2xl min-h-max", {
          ...shadowStyle("lg"),
          ...style,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        })}
      >
        <GroupPieChart
          groupName={groupName}
          holdingData={holdingInfo}
          currentPrices={currentPrices}
          cashBalance={cashBalance}
        />
        {donutSectors?.length === holdings?.length && (
          <Donut
            sectors={donutSectors}
            textColor={tw`text-brand-black dark:text-brand-gray`.color as string}
          />
        )}
        <TextDivider lineStyles={undefined}>
          {holdings?.length > 0
            ? `${holdings?.length} Investments`
            : "No Investments Yet"}
        </TextDivider>
        <View style={tw`w-11/12`}>
          <FlatList
            data={holdingInfo}
            keyExtractor={(item) => item.symbol}
            renderItem={({ item: holding }) => (
              <StockCard
                holding={holding}
                latestPrice={currentPrices?.[holding?.symbol]}
              />
            )}
          />
        </View>
      </View>
      <ChatWithGroupFooter groupName={groupName} />
    </View>
  )
}

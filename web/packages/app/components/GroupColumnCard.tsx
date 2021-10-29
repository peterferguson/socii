import { QueryDocumentSnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { FlatList, View, Text, Pressable } from "react-native"
import { useAuth } from "../hooks"
import { getGroupCashBalance } from "../lib/firebase/client/db/getGroupCashBalance"
import { getHoldingData } from "../lib/firebase/client/db/getHoldingData"
import tw from "../lib/tailwind"
import { Skeleton } from "@motify/skeleton"
import { iexQuote } from "../utils/iexQuote"
import { shadowStyle } from "../utils/shadowStyle"
import { ChatWithGroupFooter } from "./ChatWithGroupFooter"
import Donut, { DonutSector } from "./DonutChart"

import StockCard from "./StockCard"
import TextDivider from "./TextDivider"
import { useRouter } from "../navigation/use-router"

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
  const router = useRouter()

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

  const portfolioValue = holdingInfo
    ?.map(({ symbol, qty }) => currentPrices?.[symbol] * qty)
    .reduce((a, b) => a + b, 0)

  const gain =
    ((portfolioValue -
      holdingInfo
        ?.map(({ avgPrice, qty }) => avgPrice * qty)
        .reduce((a, b) => a + b, 0)) *
      100) /
    portfolioValue

  const donutRadius = 80
  const donutTextColor = tw`text-brand-black dark:text-brand-gray`.color as string

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
        <View
          style={tw.style(
            "w-88 sm:w-full items-center justify-center flex-col m-0 sm:m-4 mb-2 sm:mb-4",
            style
          )}
        >
          <Pressable onPress={() => router.push(`/groups/${groupName}`)}>
            <Text
              style={tw.style(
                "text-4xl text-center text-brand-black z-10 top-2 font-poppins-600",
                "umami--click--group-pie-chart-title"
              )}
            >
              {groupName}
            </Text>
          </Pressable>
        </View>
        {donutSectors?.length === holdings?.length ? (
          <View style={tw`p-2`}>
            <Donut sectors={donutSectors} textColor={donutTextColor} />
            <View
              style={[
                tw.style(`flex-col items-center -mt-36 mb-12`, {
                  fontSize: donutRadius / 4,
                  color: donutTextColor,
                }),
              ]}
            >
              <Text style={tw`text-center text-tiny mt-1 font-poppins-200 uppercase`}>
                portfolio
              </Text>
              <Text style={tw`text-center text-lg`}>{`$${donutSectors
                .reduce((acc, sector) => acc + sector.value, 0)
                .toFixed(2)}`}</Text>
              <Text
                style={tw.style(
                  `text-center text-tiniest font-poppins-200 uppercase`,
                  gain > 0 ? "text-teal-500" : gain < 0 ? "text-red-500" : "bg-brand"
                )}
              >
                {gain.toFixed(2)}%
              </Text>
              <View
                style={tw.style(`bg-brand-black my-2 w-8/12`, {
                  borderBottomWidth: 0.25,
                })}
              />
              <Text style={tw`text-center text-tiny font-poppins-200 uppercase`}>
                cash
              </Text>
              <Text style={tw`text-center text-lg `}>{`$${cashBalance.toFixed(
                2
              )}`}</Text>
            </View>
          </View>
        ) : (
          <View style={tw`my-4`}>
            <Skeleton
              colorMode={tw.prefixMatch("dark") ? "dark" : "light"}
              radius="round"
              height={160}
              width={160}
            />
          </View>
        )}
        <TextDivider lineStyles={undefined}>
          {holdings?.length > 0
            ? `${holdings?.length} Investments`
            : "No Investments Yet"}
        </TextDivider>
        <View style={tw`w-11/12 my-2`}>
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

import { QueryDocumentSnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { Dimensions, Pressable, Text, View } from "react-native"
import { useIexPrice } from "../hooks/useIexPrice"
import { getGroupCashBalance } from "../lib/firebase/db/getGroupCashBalance"
import { getHoldingData } from "../lib/firebase/db/getHoldingData"
import tw from "../lib/tailwind"
import { useRouter } from "../navigation/use-router"
import { shadowStyle } from "../utils/shadowStyle"
import CardDonutChart from "./CardDonutChart"
import { ChatWithGroupFooter } from "./ChatWithGroup"
import { DonutSector } from "./DonutChart"
import { Holding, IGroupColumnCard } from "./GroupColumnCard"

export default ({ groupName, style }: IGroupColumnCard) => {
  const [cashBalance, setCashBalance] = useState<number>(undefined)
  const [holdings, setHoldings] = useState<QueryDocumentSnapshot[]>(undefined)
  const [holdingInfo, setHoldingInfo] = useState([])
  const [mounted, setMounted] = useState(false)
  const [donutSectors, setDonutSectors] = useState<DonutSector[]>([])

  useEffect(() => setMounted(true), [])

  // TODO: Share more code between this component and GroupColumnCard
  useEffect(() => {
    let unsubscribe
    if (groupName) unsubscribe = getGroupCashBalance(groupName, setCashBalance)
    return () => unsubscribe?.()
  }, [groupName])

  useEffect(() => {
    let unsubscribe
    if (groupName) unsubscribe = getHoldingData(groupName, setHoldings)
    return () => unsubscribe?.()
  }, [groupName])

  useEffect(
    () =>
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
      ),
    [holdings]
  )

  const { prices: currentPrices } = useIexPrice(holdingInfo?.map(h => h.symbol))

  useEffect(() => {
    // - update donutSectors when a new price is available
    const updateDonutSectors = newPriceKeys => {
      const sectors = holdingInfo
        .filter(({ symbol }) => newPriceKeys.includes(symbol))
        ?.map(({ symbol, qty, logoColor }) => {
          return {
            symbol,
            color: logoColor,
            value: currentPrices[symbol] * qty,
          }
        })
      setDonutSectors(s => [...s, ...sectors])
    }
    const currentPriceKeysNotInDonutSectors = Object.keys(currentPrices).filter(
      key => !donutSectors.some(s => s.symbol === key)
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
        style={tw.style("flex-col items-center p-4 bg-white rounded-t-2xl", {
          ...shadowStyle("lg"),
          ...style,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        })}
      >
        <CardTitle title={groupName} style={style} />
        <CardDonutChart
          holdings={holdings}
          sectors={donutSectors}
          radius={donutRadius}
          textColor={donutTextColor}
          gain={gain}
          cashBalance={cashBalance}
        />
        {/* TODO: Show top gainer after divider */}
        {/* <TextDivider lineStyles={undefined}>
          {holdings?.length > 0
            ? `${holdings?.length} Investments`
            : "No Investments Yet"}
        </TextDivider> */}
      </View>
      <ChatWithGroupFooter groupName={groupName} />
    </View>
  )
}

const { width: WINDOW_WIDTH } = Dimensions.get("window")

const CARD_WIDTH = WINDOW_WIDTH - 64

const CardTitle = ({ title, style }) => {
  const router = useRouter()
  return (
    <View
      style={tw.style("items-center justify-center flex-col m-0 sm:m-4 mb-2 sm:mb-4", {
        ...style,
        width: CARD_WIDTH,
      })}
    >
      <Pressable onPress={() => router.push(`/groups/${title}`)}>
        <Text
          style={tw.style(
            "text-4xl text-center text-brand-black z-10 top-2 font-poppins-600",
            "umami--click--group-pie-chart-title"
          )}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  )
}

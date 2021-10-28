import React from "react"
import { Pressable, View, Text } from "react-native"
import tw from "../lib/tailwind"
import { useRouter } from "../navigation/use-router"
import AssetLogo from "./AssetLogo"
import { Holding } from "./GroupColumnCard"

interface IStockCard {
  holding: Holding
  latestPrice: number
}

export default function StockCard({ holding, latestPrice }: IStockCard) {
  const { symbol, shortName, qty, logoColor, ISIN } = holding
  const pnl = (100 * (latestPrice - holding.avgPrice)) / latestPrice
  const router = useRouter()

  // TODO: Remove the hard coding of this card width
  return (
    <View style={tw`flex-row items-center justify-between py-1`}>
      <View
        style={tw.style(
          "flex-row items-center m-1 bg-white",
          "umami--click--stock-card",
          `umami--click--${symbol}-stock-card`
        )}
      >
        <Pressable onPress={() => router.push(`/stocks/${symbol}`)}>
          <AssetLogo asset={symbol} isin={ISIN} height="40" width="40" />
        </Pressable>
        <View style={tw`items-start my-1 pl-2 pr-4 min-w-[70px]`}>
          <Text
            style={tw.style(`text-base tracking-wider uppercase font-poppins-400`, {
              color: logoColor,
            })}
          >
            {symbol}
          </Text>
          <Text
            style={tw`overflow-hidden font-poppins-200 tracking-wider uppercase text-brand-shade-darkest text-tiny`}
          >
            {shortName}
          </Text>
        </View>
      </View>
      <View style={tw`flex-col items-center justify-center w-20 mr-4`}>
        <Text
          style={tw`overflow-hidden text-base font-semibold tracking-wider text-black uppercase overflow-ellipsis`}
        >
          {latestPrice ? `$${(latestPrice * qty).toFixed(2)}` : null}
        </Text>
        {pnl ? (
          <View
            style={tw`px-2 rounded-full w-full ${
              pnl > 0 ? "bg-teal-200" : pnl < 0 ? "bg-red-200" : "bg-brand"
            }`}
          >
            <Text
              style={tw`text-gray-700 text-tiny sm:text-xs font-poppins-500 text-center`}
            >
              {pnl.toFixed(2)}%
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  )
}

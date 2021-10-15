import { Price } from "../models/Price"
import { pnlTextColor } from "../utils/pnlTextColor"
import React from "react"
import { View, Text } from "react-native"
import tw from "../lib/tailwind"
import TickerLogo from "./TickerLogo"

const PriceCard: React.FC<{
  symbol: string
  shortName: string
  price: Price
  isPriceLoading: boolean
}> = ({ symbol, shortName, price, isPriceLoading }) => (
  <View
    style={tw`p-4 mt-4 mb-2 bg-white shadow-lg sm:mt-2 rounded-2xl dark:bg-gray-800`}
  >
    <View style={tw`flex items-center`}>
      <TickerLogo symbol={symbol} height="64px" width="64px" />
      <View style={tw`flex flex-col`}>
        <Text
          style={tw`mb-2 ml-2 text-base font-semibold tracking-wider text-gray-700 uppercase dark:text-white`}
        >
          {symbol}
        </Text>
        <Text
          style={tw`ml-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-white`}
        >
          {shortName}
        </Text>
      </View>
    </View>
    <View style={tw`flex flex-col justify-start`}>
      {isPriceLoading ? (
        <View
          style={tw`w-32 h-12 my-4 text-4xl font-semibold text-left text-gray-700 animate-pulse dark:text-gray-100" `}
        />
      ) : (
        <Text
          style={tw`my-4 text-4xl font-semibold text-left text-gray-700 dark:text-gray-100`}
        >
          <Text style={tw`text-sm`}>$</Text>
          {(price?.iexRealtimePrice || price?.latestPrice)?.toFixed(2)}
        </Text>
      )}
      <Text
        style={tw`flex items-center text-sm pb-0.5 ${pnlTextColor(
          price?.changePercent
        )}`}
      >
        {/* {price?.changePercent > 0 ? <FaCaretUp /> : <FaCaretDown />} */}
        <Text style={tw`pr-1`}>{(price?.changePercent * 100)?.toFixed(2)}%</Text>
        <Text style={tw`text-gray-400  text-tiny -pb-0.5`}>on the day</Text>
      </Text>
    </View>
  </View>
)

export default PriceCard

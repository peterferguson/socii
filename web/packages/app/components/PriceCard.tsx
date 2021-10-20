import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import React from "react"
import { Text, View } from "react-native"
import tw from "../lib/tailwind"
import { pnlTextColor } from "../utils/pnlTextColor"
import AssetLogo from "./AssetLogo"

dayjs.extend(calendar)

const PriceCard: React.FC<{
  asset: string
  shortName: string
  price: number
  changePercent: number
  timestamp: number
}> = ({ asset, shortName, price, changePercent, timestamp }) => (
  <View
    style={tw`p-4 mt-4 mx-4 mb-2 bg-white shadow-lg sm:mt-2 rounded-2xl dark:bg-gray-800`}
  >
    <View style={tw`flex-row items-center`}>
      <AssetLogo asset={asset} height="64px" width="64px" />
      <View style={tw`flex flex-col`}>
        <Text
          style={tw`mb-2 ml-2 text-base font-poppins-700 tracking-wider text-gray-700 uppercase dark:text-white`}
        >
          {asset}
        </Text>
        <Text
          style={tw`ml-2 text-xs font-poppins-600 tracking-wider text-gray-500 uppercase dark:text-white`}
        >
          {shortName}
        </Text>
      </View>
    </View>
    <View style={tw`flex flex-row justify-between align-baseline`}>
      {/* TODO: loading skeleton */}

      <View style={tw`flex-col items-start pl-1`}>
        <View style={tw`flex-row items-center pl-1`}>
          <View style={tw`pt-2`}>
            <Text style={tw`text-sm`}>$</Text>
          </View>
          <Text
            style={tw`mt-4 mb-2 text-4xl font-semibold text-left text-gray-700 dark:text-gray-100`}
          >
            {price?.toFixed(2) || null}
          </Text>
        </View>
        <View>
          <Text style={tw`text-gray-400 text-tiny`}>
            {dayjs(timestamp * 1000).calendar()}
          </Text>
        </View>
      </View>
      <View style={tw`px-1 mt-[3.25rem]`}>
        <Text style={tw`${pnlTextColor(changePercent)} text-base`}>
          {(changePercent * 100)?.toFixed(2)}%
        </Text>
      </View>
    </View>
  </View>
)

export default PriceCard

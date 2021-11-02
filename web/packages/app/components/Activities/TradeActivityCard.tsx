import { Timestamp } from "@firebase/firestore"
import { pnlTextColor } from "../../utils/pnlTextColor"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import updateLocale from "dayjs/plugin/updateLocale"
import React, { useMemo } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import { useTickerPrice } from "../../hooks/useTickerPrice"
import tw from "../../lib/tailwind"
import AssetLogo from "../AssetLogo"
dayjs.extend(calendar)
dayjs.extend(updateLocale)

dayjs.updateLocale("en", {
  calendar: {
    lastDay: "[Yesterday at] LT",
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    lastWeek: "[last] dddd [at] LT",
    nextWeek: "dddd [at] LT",
    sameElse: "L",
  },
  formats: {
    L: "DD/MM/YYYY",
  },
})

// TODO
// - Add live update for change on each trade
// - Tidy + add group trade specific items to the cards

export const TradeActivityCard: React.FC<{
  symbol: string
  isin: string
  messageId: string
  side: string
  qty: number
  price: number
  notional: number
  timestamp?: Timestamp
  activityType?: string
  executionStatus?: string
}> = ({
  symbol,
  isin,
  qty,
  messageId,
  side,
  price,
  notional,
  timestamp,
  activityType,
  executionStatus,
}) => {
  const {
    price: { latestPrice },
  } = useTickerPrice(symbol)

  const priceChange = useMemo(
    () => (100 * (latestPrice - price)) / latestPrice,
    [latestPrice, price]
  )

  return (
    <TouchableOpacity key={messageId} style={tw`flex-row items-center p-3 rounded-xl`}>
      <AssetLogo asset={symbol} isin={isin} width="48" height="48" />
      <View style={tw`ml-4`}>
        <Text style={tw`font-medium text-gray-500 text-tiniest leading-5`}>
          {qty} shares
        </Text>
        <Text style={tw`text-sm font-medium uppercase font-poppins-300 leading-5`}>
          {side} {symbol}
        </Text>

        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-gray-500 text-tiniest capitalize leading-5`}>
            {activityType === "JNLS" ? "Reward" : executionStatus.replace(/_/g, " ")}
            {/* TODO: Implement better executionStatus names i.e. Filled etc */}
          </Text>
          <Text style={tw`text-gray-500 text-tiniest uppercase leading-5 mx-0.5`}>
            •
          </Text>
          <Text style={tw`leading-4 text-gray-500 text-tiniest`}>
            {dayjs(new Date(timestamp.seconds * 1000)).calendar()}
          </Text>
        </View>
      </View>
      <View style={tw`absolute right-0 mr-4 flex-col items-end justify-center`}>
        <Text style={tw.style("text-sm text-center")}>${notional.toFixed(2)}</Text>
        <Text style={tw.style("text-tiny", pnlTextColor(priceChange))}>
          {priceChange > 0 ? "+" : ""}
          {priceChange.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  )
}

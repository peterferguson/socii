import React from "react"
import { View } from "react-native"
import { DollarCircle, Hashtag, ArrowDown } from "iconsax-react-native"
import tw from "app/lib/tailwind"

export const OrderTypes = (tickerSymbol, side) => {
  const capitalSide = side === "buy" ? "Buy" : "Sell"
  return [
    {
      Icon: () => (
        <View style={tw`p-2 rounded-full bg-brand-lightTeal mr-1.5 sm:mr-2`}>
          <DollarCircle size={25} variant="Outline" />
        </View>
      ),
      name: `${capitalSide} specific cash amount`,
      description: `${capitalSide} as little as $1 of ${tickerSymbol} shares`,
      actionName: "SELECT_CASH_ORDER",
    },
    {
      Icon: () => (
        <View style={tw`p-2 rounded-full bg-brand/30 mr-1.5 sm:mr-2`}>
          <Hashtag size={25} variant="Outline" />
        </View>
      ),
      name: `${capitalSide} specific amount of shares`,
      description: `${capitalSide} as little as 0.000000001 ${tickerSymbol} shares`,
      actionName: "SELECT_SHARE_ORDER",
    },
    {
      Icon: () => (
        <View style={tw`p-2 bg-pink-200 rounded-full mr-1.5 sm:mr-2`}>
          <ArrowDown size={25} variant="Outline" />
        </View>
      ),
      name: `${capitalSide} if ${tickerSymbol} reaches a certain price or lower`,
      description: `${capitalSide} ${tickerSymbol} using a limit order. No fractionals and at least 1 share`,
      actionName: "SELECT_LIMIT_ORDER",
    },
  ]
}

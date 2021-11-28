import React from "react"
import { View } from "react-native"
import { Share, MoneySend, ArrowCircleDown2 } from "iconsax-react-native"
import tw from "app/lib/tailwind"

export const Actions = tickerSymbol => [
  {
    Icon: () => (
      <View style={tw`rounded-full bg-brand-lightTeal p-2`}>
        <ArrowCircleDown2 size={25} variant="Outline" color={tw.color(`teal-700`)} />
      </View>
    ),
    name: `Buy ${tickerSymbol}`,
    description: `Buy as little as $1 of ${tickerSymbol} shares`,
    actionName: "CHOOSE_BUY",
  },
  {
    Icon: () => (
      <View style={tw`rounded-full bg-red-300 p-2`}>
        <MoneySend size={25} variant="Outline" color={tw.color(`red-700`)} />
      </View>
    ),

    name: `Sell ${tickerSymbol}`,
    description: `Sell as little as 0.000000001 ${tickerSymbol} shares`,
    actionName: "CHOOSE_SELL",
  },
  {
    Icon: () => (
      <View style={tw`rounded-full bg-blue-300 p-2`}>
        <Share size={25} variant="Bold" color={tw.color(`blue-700`)}/>
      </View>
    ),
    name: `Share ${tickerSymbol} with a group`,
    description: `Tell your friends about ${tickerSymbol}`,
    actionName: "CHOOSE_SHARE",
  },
]

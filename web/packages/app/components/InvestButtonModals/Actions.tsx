import React from "react"
import { View } from "react-native"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { HiShare } from "react-icons/hi"
import tw from "../../lib/tailwind"

export const Actions = (tickerSymbol) => [
  {
    icon: () => (
      <View style={tw`rounded-full bg-brand-lightTeal mr-1.5 sm:mr-2`}>
        <FaArrowUp style={tw`w-6 h-6 text-teal-400`} />
      </View>
    ),
    name: `Buy ${tickerSymbol}`,
    description: `
    Buy as little as $1 of ${tickerSymbol} shares
    `,
    actionName: "CHOOSE_BUY",
  },
  {
    icon: () => (
      <View style={tw`rounded-full bg-brand/30 mr-1.5 sm:mr-2`}>
        <FaArrowDown style={tw`w-6 h-6 text-brand-cyan-vivid`} />
      </View>
    ),

    name: `Sell ${tickerSymbol}`,
    description: `
    Sell as little as 0.000000001 ${tickerSymbol} shares
    `,
    actionName: "CHOOSE_SELL",
  },
  {
    icon: () => (
      <View style={tw`rounded-full bg-brand-light-secondary mr-1.5 sm:mr-2`}>
        <HiShare style={tw`w-6 h-6 text-brand`}/>
      </View>
    ),
    name: `Share ${tickerSymbol} with a group`,
    description: `
    Tell your friends about ${tickerSymbol}
    `,
    actionName: "CHOOSE_SHARE",
  },
]

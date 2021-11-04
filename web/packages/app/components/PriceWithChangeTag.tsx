import React from "react"
import { Text, View } from "react-native"
import tw from "../lib/tailwind"
import SkeletonText from "./SkeletonText"
import VerticalSpacer from "./VerticalSpacer"

const PriceWithChangeTag = ({ latestPrice, qty, pnl }) => (
  <>
    <Text
      style={tw`overflow-hidden text-base font-semibold tracking-wider text-black uppercase overflow-ellipsis`}
    >
      ${(latestPrice * qty).toFixed(2)}
    </Text>
    <View
      style={tw`px-2 rounded-full w-full ${
        pnl > 0 ? "bg-teal-200" : pnl < 0 ? "bg-red-200" : "bg-brand"
      }`}
    >
      <Text style={tw`text-gray-700 text-tiny sm:text-xs font-poppins-500 text-center`}>
        {pnl.toFixed(2)}%
      </Text>
    </View>
  </>
)

export const PriceWithChangeTagSkeleton = () => (
  <>
    <SkeletonText width={tw`w-20`.width as number} height={tw`h-3`.height as number} />
    <VerticalSpacer height={8} />
    <SkeletonText width={tw`w-20`.width as number} height={tw`h-3`.height as number} />
  </>
)

export default PriceWithChangeTag

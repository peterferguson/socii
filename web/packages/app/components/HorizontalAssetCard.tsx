import { Price } from "../models/Price"
import { pnlBackgroundColor } from "../utils/pnlBackgroundColor"
import tw from "../lib/tailwind"
import React from "react"
import AssetLogo from "./AssetLogo"
import { View, Text, Pressable } from "react-native"
import { useRouter } from "../navigation/use-router"

interface IHorizontalAssetCard {
  cardRef?: React.MutableRefObject<any>
  isin: string
  logoColor: string
  symbol: string
  shortName: string
  price: Price
}

const HorizontalAssetCard = ({
  cardRef,
  isin,
  symbol,
  logoColor,
  shortName,
  price,
}: IHorizontalAssetCard) => {
  const pnlColor = pnlBackgroundColor(price?.changePercent)
  const pnlTextColor = pnlColor.replace("200", "600").replace("bg", "text")

  const router = useRouter()

  return (
    <View
      ref={cardRef ? cardRef : null}
      style={tw`w-11/12 h-auto max-w-sm mx-auto my-2`}
    >
      <View
        style={tw`flex flex-row h-20 p-2 overflow-hidden bg-white rounded-lg shadow-2xl`}
      >
        <View style={tw`items-center justify-center flex w-20 m-auto rounded-full`}>
          <AssetLogo isin={isin} asset={symbol} height="48" width="48" />
        </View>
        <View style={tw`flex-col flex-grow my-auto`}>
          <Pressable onPress={() => router.push(`/stocks/${symbol}`)}>
            <Text
              style={{
                ...tw`text-sm tracking-wider text-gray-400 uppercase font-poppins-600`,
                color: logoColor,
              }}
            >
              {symbol}
            </Text>
          </Pressable>
          <Pressable onPress={() => router.push(`/stocks/${symbol}`)}>
            <Text
              style={tw`flex text-xs tracking-wider text-gray-600 font-poppins-400`}
            >
              {shortName}
            </Text>
          </Pressable>
        </View>
        <View style={tw`flex flex-col items-center justify-center w-20`}>
          <Text
            style={tw`overflow-hidden text-sm tracking-wider font-open-sans-600 text-gray-600 uppercase overflow-ellipsis`}
          >
            ${(price?.iexRealtimePrice || price?.latestPrice)?.toFixed(2)}
          </Text>
          <View style={tw`${pnlColor} px-2 py-0.5 rounded-full w-full`}>
            <Text
              style={tw`text-black text-tiny sm:text-xs font-open-sans-600 text-center ${pnlTextColor}`}
            >
              M: {(price?.changePercent * 100)?.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export const HorizontalAssetCardSkeleton = ({}) => (
  <View style={tw.style("w-11/12 h-auto max-w-sm mx-auto my-2 ")}>
    <View style={tw`flex h-20 p-2 overflow-hidden bg-white rounded-lg shadow-2xl`}>
      <View style={tw`items-center justify-center flex-none w-20 m-auto rounded-full`}>
        <View
          style={tw`flex items-center justify-center font-semibold text-gray-500 rounded-full shadow-lg bg-gray-50 h-14 w-14 text-tiny `}
        />
        <View style={tw`flex-col flex-grow my-auto`}>
          <Text
            style={tw`text-xs font-semibold tracking-wider text-gray-400 uppercase font-poppins-400`}
          >
            Asset Asset
          </Text>
          <Text
            style={tw`flex tracking-wider text-gray-600 text-tiny font-poppins-400`}
          >
            Company Name
          </Text>
        </View>
        <View style={tw`flex flex-col items-center justify-center w-20`}>
          <Text
            style={tw`overflow-hidden font-semibold tracking-wider text-gray-600 uppercase text-tiny overflow-ellipsis`}
          >
            Price
          </Text>
          <Text
            style={tw`inline-block w-full px-2 font-semibold text-center text-black rounded-full text-tiny sm:text-xs`}
          >
            %
          </Text>
        </View>
      </View>
    </View>
  </View>
)

export default HorizontalAssetCard

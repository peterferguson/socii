import Feather from "@expo/vector-icons/build/Feather"
import React from "react"
import { Pressable, Text, useWindowDimensions, View } from "react-native"
import { RecommendationData, useRecommendations } from "../hooks/useRecommendations"
import tw from "../lib/tailwind"
import { useRouter } from "../navigation/use-router"
import AssetLogo from "./AssetLogo"

const StockRecommendations: React.FC<{ symbol: string }> = ({ symbol }) => {
  const { recommendations } = useRecommendations(symbol)
  return (
    <View style={tw`w-full px-4 font-poppins-400 `}>
      <Text style={tw`text-xl text-white pl-2`}>People also viewed</Text>
      <View
        style={{
          ...tw`p-4 mt-4 bg-white dark:bg-brand-black shadow-lg rounded-2xl flex flex-row justify-evenly items-center`,
          minHeight: "15%",
        }}
      >
        {recommendations &&
          Object.values(recommendations).map(
            (recommendation: RecommendationData, i) => (
              <RecommendationItem item={recommendation} key={`recommendation-${i}`} />
            )
          )}
      </View>
    </View>
  )
}

const RecommendationItem: React.FC<{ item: RecommendationData }> = ({
  item: {
    pnlColor,
    ISIN,
    logoColor,
    regularMarketChangePercent,
    alpaca: { symbol },
  },
}) => {
  const { width } = useWindowDimensions()
  const router = useRouter()
  const is1Col = width < 640

  return (
    <Pressable style={tw`mx-2`} onPress={() => router.push(`/stocks/${symbol}`)}>
      <View style={tw`flex flex-col items-center justify-center`}>
        <View style={tw`flex-shrink-0`}>
          <View style={tw`flex flex-col items-center`}>
            <View style={tw`rounded-full ${!is1Col && pnlColor.replace("text", "bg")}`}>
              <View style={tw`bg-white rounded-full `}>
                <AssetLogo asset={symbol} width={"48"} height={"48"} isin={ISIN} />
              </View>
            </View>
            <Text
              style={{
                ...tw`text-base font-medium`,
                color: logoColor,
              }}
            >
              {symbol}
            </Text>
          </View>
          <View style={tw`text-xs mx-0.5 flex flex-row items-center p-0.5`}>
            <Feather
              name={pnlColor.includes("red") ? "arrow-up" : "arrow-down"}
              color={tw`pnlColor`.color as string}
            />
            <Text style={tw`text-xs font-medium ${pnlColor}`}>
              {(regularMarketChangePercent * 100).toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default StockRecommendations

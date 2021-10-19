import Feather from "@expo/vector-icons/build/Feather"
import React from "react"
import { FlatList, Text, useWindowDimensions, View, Pressable } from "react-native"
import { RecommendationData, useRecommendations } from "../hooks/useRecommendations"
import tw from "../lib/tailwind"
import { useRouter } from "../navigation/use-router"
import TickerLogo from "./TickerLogo"

const StockRecommendations: React.FC<{ symbol: string }> = ({ symbol }) => {
  const { recommendations } = useRecommendations(symbol)
  return (
    <View style={tw`w-full px-4 font-poppins-400 lg:w-2/5`}>
      <Text style={tw`text-xl text-white pl-2`}>People also viewed</Text>
      <View
        style={{
          ...tw`p-4 mt-4 bg-white dark:bg-brand-black shadow-lg rounded-2xl flex flex-row justify-evenly items-center`,
          minHeight: "17.5%",
        }}
      >
        {recommendations &&
          Object.values(recommendations).map((recommendation: RecommendationData) => (
            <RecommendationItem item={recommendation} />
          ))}
      </View>
    </View>
  )
}

const RecommendationItem: React.FC<{ item: RecommendationData }> = ({
  item: recommendation,
}) => {
  const { width } = useWindowDimensions()
  const router = useRouter()
  const is1Col = width < 640
  const symbol = recommendation.alpaca.symbol
  const pnlColor = tw`${recommendation?.pnlColor}`.color as string

  return (
    <Pressable style={tw`my-2 mx-2`} onPress={() => router.push(`/stocks/${symbol}`)}>
      <View style={tw`flex flex-col items-center justify-center`}>
        <View style={tw`flex-shrink-0`}>
          <View style={tw`flex flex-col items-center`}>
            <View
              style={tw`rounded-full p-0.5 ${
                !is1Col && recommendation?.pnlColor.replace("text", "bg")
              }`}
            >
              <View style={tw`bg-white rounded-full p-0.5`}>
                <TickerLogo
                  symbol={symbol}
                  width={is1Col ? "40" : "48"}
                  height={is1Col ? "40" : "48"}
                  isin={recommendation?.ISIN}
                />
              </View>
            </View>
            <Text
              style={{
                ...tw`text-base font-medium`,
                color: recommendation?.logoColor,
              }}
            >
              {symbol}
            </Text>
          </View>
          <View style={tw`text-xs mx-0.5 flex flex-row items-center p-0.5`}>
            <Feather
              name={
                recommendation?.pnlColor.includes("red") ? "arrow-up" : "arrow-down"
              }
              color={pnlColor}
            />
            <Text style={tw`text-xs font-medium ${recommendation?.pnlColor}`}>
              {(recommendation?.regularMarketChangePercent * 100).toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default StockRecommendations

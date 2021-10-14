import Feather from "@expo/vector-icons/build/Feather"
import React from "react"
import { FlatList, Text, useWindowDimensions, View } from "react-native"
import { RecommendationData, useRecommendations } from "../hooks/useRecommendations"
import tw from "../lib/tailwind"
import TickerLogo from "./TickerLogo"

const StockRecommendations: React.FC<{ symbol: string }> = ({ symbol }) => {
  const { recommendations } = useRecommendations(symbol)
  return (
    <View style={tw`w-full m-2 font-primary lg:w-2/5`}>
      <Text style={tw`text-xl text-white pl-2`}>People also viewed</Text>
      <View
        style={{
          ...tw`m-4 p-4 bg-white dark:bg-brand-black shadow-lg rounded-2xl items-center`,
        }}
      >
        {recommendations && (
          <FlatList
            data={Object.values(recommendations)}
            renderItem={({ item: recommendation }) => (
              <RecommendationItem item={recommendation} />
            )}
            keyExtractor={(item) => item.ISIN}
            horizontal={true}
          />
        )}
      </View>
    </View>
  )
}

const RecommendationItem: React.FC<{ item: RecommendationData }> = ({
  item: recommendation,
}) => {
  const { width } = useWindowDimensions()
  const is1Col = width < 640

  const pnlColor = tw`${recommendation?.pnlColor}`.color as string

  return (
    <View style={tw`my-2 mx-2`}>
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
                  tickerSymbol={recommendation.alpaca.symbol}
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
              {recommendation.alpaca.symbol}
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
    </View>
  )
}

export default StockRecommendations

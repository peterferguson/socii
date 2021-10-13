import { TabBarIcon } from "app/navigation/tab-bar-icon"
import React from "react"
import { FlatList, Text, useWindowDimensions, View, SafeAreaView } from "react-native"
import { RecommendationData, useRecommendations } from "../hooks/useRecommendations"
import tw from "../lib/tailwind"
import TickerLogo from "./TickerLogo"

const StockRecommendations: React.FC<{ symbol: string }> = ({ symbol }) => {
  const { recommendations } = useRecommendations(symbol)
  return (
    <View style={tw`w-full mt-2 font-primary lg:w-2/5`}>
      <Text style={tw`text-xl text-white mb-4`}>People also viewed</Text>
      <SafeAreaView
        style={{
          ...tw`w-full p-4 bg-white shadow-lg rounded-2xl flex flex-row justify-center 
          items-center`,
          flex: 1,
        }}
      >
        {recommendations && (
          <FlatList
            data={Object.entries(recommendations)}
            renderItem={RecommendationItem}
            keyExtractor={([recommendation]) => recommendation}
          />
        )}
      </SafeAreaView>
    </View>
  )
}

const RecommendationItem: React.FC<{ item: [string, RecommendationData] }> = ({
  item: [recommendation, data],
}) => {
  const { width } = useWindowDimensions()
  const is1Col = width < 640
  console.log(recommendation)
  console.log(data)

  return (
    <View key={recommendation} style={tw`my-2`}>
      <View style={tw`flex flex-col items-center justify-center`}>
        <View style={tw`flex-shrink-0`}>
          <View style={tw`flex flex-col items-center`}>
            <View
              style={tw.style(
                "rounded-full p-0.5",
                !is1Col && data?.pnlColor.replace("text", "bg")
              )}
            >
              <View style={tw`bg-white rounded-full p-0.5`}>
                <TickerLogo
                  tickerSymbol={recommendation}
                  width={is1Col ? "32" : "48"}
                  height={is1Col ? "32" : "48"}
                  isin={data?.ISIN}
                />
              </View>
            </View>
            <Text
              style={{
                ...tw`text-base font-medium`,
                color: data?.logoColor,
              }}
            >
              {recommendation}
            </Text>
          </View>
          <View
            style={tw.style(
              "text-xs inline-flex space-x-0.5 sm:space-x-2",
              data?.pnlColor
            )}
          >
            <Text style={tw`text-xs font-medium`}>
              {data?.pnlColor.includes("red") ? (
                <TabBarIcon name="arrow-up" color={"#ffff3e"} />
              ) : (
                <TabBarIcon name="arrow-down" color={"#dfdc"} />
              )}
            </Text>
            <Text style={tw`text-xs font-medium`}>
              {(data?.regularMarketChangePercent * 100).toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default StockRecommendations

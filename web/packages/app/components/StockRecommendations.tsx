import React from "react"
import TickerLogo from "./TickerLogo"
import { TabBarIcon } from "app/navigation/tab-bar-icon"
import tw from "../lib/tailwind"
import { useWindowDimensions, View, Text } from "react-native"
import { useRecommendations } from "../hooks/useRecommendations"

const StockRecommendations: React.FC<{ symbol: string }> = ({ symbol }) => {
  const { recommendations } = useRecommendations(symbol)
  console.log("stock recommendations", recommendations)
  // const recommendations = {
  //   AAPL: { pnlColor: "#40E0D0", regularMarketChangePercent: 0.47, logoColor: "#3fbaeb" },
  //   FB: { pnlColor: "#40E0D0", regularMarketChangePercent: 0.02, logoColor: "#3fbaeb" },
  //   NFLX: { pnlColor: "#40E0D0", regularMarketChangePercent: 0.25, logoColor: "#3fbaeb" },
  //   GOOG: { pnlColor: "#40E0D0", regularMarketChangePercent: 0.08, logoColor: "#3fbaeb" },
  // }
  const { width } = useWindowDimensions()
  const is1Col = width < 640
  return (
    <View style={tw`w-full mt-2 text-xl space-y-4 font-primary lg:w-2/5`}>
      <Text>People also viewed</Text>
      <View
        style={tw`w-full p-4 bg-white shadow-lg rounded-2xl flex flex-row justify-center items-center`}
      >
        {recommendations &&
          Object.entries(recommendations).map(([recommendation, data]) => (
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
                      <View style={tw`block bg-white rounded-full p-0.5`}>
                        <TickerLogo
                          tickerSymbol={recommendation}
                          width={is1Col ? "32" : "48"}
                          height={is1Col ? "32" : "48"}
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
          ))}
      </View>
    </View>
  )
}

export default StockRecommendations

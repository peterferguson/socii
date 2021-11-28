import Feather from "@expo/vector-icons/build/Feather"
import React from "react"
import { Pressable, Text, useWindowDimensions, View } from "react-native"
import { RecommendationData, Recommendations } from "../hooks/useRecommendations"
import tw from "app/lib/tailwind"
import { useRouter } from "../navigation/use-router"
import { shadowStyle } from "../utils/shadowStyle"
import AssetLogo from "./AssetLogo"
import { CenteredColumn } from "./Centered"

const StockRecommendations: React.FC<{ recommendations: Recommendations }> = ({
  recommendations,
}) => {
  return (
    <View style={tw`w-full px-4 my-2`}>
      <Text
        style={tw`text-xl font-poppins-400 text-brand-black dark:text-brand-gray pl-2`}
      >
        People also viewed
      </Text>
      <View
        style={{
          ...tw`p-4 mt-2 bg-white dark:bg-brand-black rounded-2xl flex flex-row justify-evenly items-center`,
          ...shadowStyle("lg"),
          minHeight: "10%",
        }}
      >
        {recommendations &&
          Object.values(recommendations).map(
            (recommendation: RecommendationData, i) => (
              <RecommendationItem
                key={`recommendation-${i}`}
                symbol={recommendation.alpaca.symbol}
                pnlColor={recommendation.pnlColor}
                isin={recommendation.ISIN}
                logoColor={recommendation.logoColor}
                regularMarketChangePercent={recommendation.regularMarketChangePercent}
              />
            )
          )}
      </View>
    </View>
  )
}

const RecommendationItem: React.FC<{
  symbol: string
  pnlColor: string
  isin: string
  logoColor: string
  regularMarketChangePercent: number
}> = ({ symbol, pnlColor, isin, logoColor, regularMarketChangePercent }) => {
  const { width } = useWindowDimensions()
  const router = useRouter()
  const is1Col = width < 640

  return (
    <Pressable style={tw`mx-2`} onPress={() => router.push(`/stocks/${symbol}`)}>
      <CenteredColumn>
        <View style={tw`flex-shrink-0`}>
          <CenteredColumn>
            <View style={tw`rounded-full ${!is1Col && pnlColor.replace("text", "bg")}`}>
              <View style={tw`bg-white rounded-full `}>
                <AssetLogo
                  key={symbol}
                  asset={symbol}
                  width={"48"}
                  height={"48"}
                  isin={isin}
                />
              </View>
            </View>
            <Text style={{ ...tw`text-sm font-poppins-500`, color: logoColor }}>
              {symbol}
            </Text>
          </CenteredColumn>
          <View style={tw`mx-0.5 flex flex-row items-center p-0.5`}>
            <Feather
              name={pnlColor.includes("red") ? "arrow-up" : "arrow-down"}
              color={tw.color(pnlColor.replace("text-", ""))}
            />
            <Text style={tw`text-tiny font-medium ${pnlColor}`}>
              {(regularMarketChangePercent * 100).toFixed(2)}%
            </Text>
          </View>
        </View>
      </CenteredColumn>
    </Pressable>
  )
}

export default StockRecommendations

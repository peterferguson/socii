import React from "react"
import { SafeAreaView } from "react-native"
import StockRecommendations from "../components/StockRecommendations"
import tw from "../lib/tailwind"

export default function HomeScreen() {
  return (
    <SafeAreaView style={tw`h-full w-full`}>
      <StockRecommendations symbol={"TSLA"} />
    </SafeAreaView>
  )
}

import React from "react"
import { SafeAreaView } from "react-native"
import StockRecommendations from "../components/StockRecommendations"
import tw from "../lib/tailwind"

export default function EnterScreen() {
  return (
    <SafeAreaView style={tw`h-full w-full`}>
      <StockRecommendations symbol={"TSLA"} />
    </SafeAreaView>
  )
}

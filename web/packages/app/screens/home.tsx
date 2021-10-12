import React from "react"
import { ScrollView } from "react-native"
import StockRecommendations from "../components/StockRecommendations"
import tw from "../lib/tailwind"

export default function HomeScreen() {
  return (
    <ScrollView style={tw`h-full w-full`}>
      <StockRecommendations symbol={"TSLA"} />
    </ScrollView>
  )
}

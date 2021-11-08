import React from "react"
import { SafeAreaView, View } from "react-native"
import { EnterCard } from "../components"
import { useAuth } from "../hooks/useAuth"
import tw from "../lib/tailwind"

export default function EnterScreen() {
  const { user } = useAuth()

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View
        style={tw`relative flex items-center justify-center min-h-full px-4 py-12 sm:px-6`}
      >
        {user ? (
          <View style={tw`text-center items-center justify-center flex-1`} />
        ) : (
          <EnterCard />
        )}
      </View>
    </SafeAreaView>
  )
}

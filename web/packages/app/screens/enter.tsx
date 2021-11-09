import React from "react"
import { SafeAreaView, View, Image, StyleSheet } from "react-native"
import { EnterCard } from "../components"
import { useAuth } from "../hooks/useAuth"
import tw from "../lib/tailwind"

export default function EnterScreen() {
  const { user } = useAuth()

  React.useEffect(() => {
    console.log("EnterScreen", StyleSheet.absoluteFillObject)
  }, [])

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`items-center justify-center min-h-full px-4 py-12 sm:px-6`}>
        <Image
          source={require("../../expo/assets/adaptive-icon.png")}
          // @ts-ignore
          style={tw.style(`absolute opacity-40 inset-y-48`, {
            transform: [{ rotate: "60deg" }],
          })}
          blurRadius={50}
        />
        <Image
          source={require("../../expo/assets/adaptive-icon.png")}
          style={tw.style(`absolute opacity-40 -inset-y-48 `)}
          blurRadius={50}
        />
        {user ? (
          <View style={tw`text-center items-center justify-center flex-1`} />
        ) : (
          <EnterCard />
        )}
      </View>
    </SafeAreaView>
  )
}

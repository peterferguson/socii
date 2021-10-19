import React from "react"
import { SafeAreaView, View } from "react-native"
import { EnterCard } from "../components/EnterCard"
import tw from "../lib/tailwind"

// - The unauthenticated user flow is handled differently than before.
// - We will now have a separate stack navigator for the unauthenticated user flow.
// - Thus we will not use the redirection logic from before.

export default function EnterScreen() {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View
        style={tw`relative flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8`}
      >
        <View style={tw`absolute inset-0 z-0 bg-black/10`} />
        <View
          style={tw`relative w-full h-full max-w-md p-40 shadow-lg -bottom-1 max-h-lg space-y-8 bg-gradient-to-tr from-brand to-brand-teal transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl`}
        />
        <EnterCard signinWith={() => {}} />
      </View>
    </SafeAreaView>
  )
}

import React from "react"
import { Text, View, Pressable } from "react-native"
import tw from "../lib/tailwind"

export const CategoryCard = ({ shortName, emoji, router }) => (
  <Pressable
    key={`category-${shortName}`}
    onPress={() => router.push(`/stocks/categories/${shortName}`)}
    style={{
      ...tw`flex items-center mx-1 rounded-2xl border border-gray-300 text-gray-600 h-28 p-6 bg-white dark:bg-brand-black`,
      minHeight: 112,
    }}
  >
    <View style={tw`flex-1 flex-col items-center justify-center w-10`}>
      <View style={tw`rounded-full`}>
        <Text style={tw`text-center text-lg mb-8`}>{emoji}</Text>
      </View>
      <Text style={tw`text-tiny text-center font-poppins-400 w-14`}>{shortName}</Text>
    </View>
  </Pressable>
)

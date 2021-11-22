import tw from "app/lib/tailwind"
import { ArrowRight2 } from "iconsax-react-native"
import React from "react"
import { Pressable, Text, View } from "react-native"

// TODO: Generalise this to be a reusable component
export const RoundButton = ({ onPress, label }) => (
  <Pressable
    style={tw`justify-center w-full px-4 py-2 bg-teal-200 border border-transparent rounded-full`}
    onPress={onPress}
  >
    <Text style={tw`text-lg text-center font-poppins-500 uppercase text-teal-700`}>{label}</Text>
    <View style={tw`absolute right-4`}>
      <ArrowRight2 size="20" color={tw`text-teal-700`.color as string} />
    </View>
  </Pressable>
)

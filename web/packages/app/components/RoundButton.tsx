import tw from "app/lib/tailwind"
import { ArrowRight2 } from "iconsax-react-native"
import React from "react"
import { Pressable, Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

// TODO: Generalise this to be a reusable component
export const RoundButton = ({ onPress, label }) => (
  <View style={tw`rounded-full overflow-hidden`}>
    <LinearGradient
      colors={[tw.color("teal-200"), tw.color("teal-100")]}
      style={tw.style(`justify-center w-full px-4 py-2`)}
    >
      <Pressable style={tw`justify-center w-full px-4 py-2`} onPress={onPress}>
        <Text
          style={tw`text-lg text-center font-poppins-500 uppercase text-teal-700 border border-transparent`}
        >
          {label}
        </Text>
        <View style={tw`absolute -right-1`}>
          <ArrowRight2 size="20" color={tw`text-teal-700`.color as string} />
        </View>
      </Pressable>
    </LinearGradient>
  </View>
)

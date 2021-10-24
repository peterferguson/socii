import Logo from "./Logos/SociiText"
import React from "react"
import { Pressable, Text, View } from "react-native"
import tw from "../lib/tailwind"
import Google from "./Logos/Google"

export const EnterCard = ({ signinWith }) => (
  <View style={tw`absolute z-10 w-full max-w-md p-10 bg-white rounded-xl`}>
    <View style={tw`flex flex-col items-center justify-center text-center`}>
      <Text style={tw`mt-6 -mb-8 text-4xl text-brand-black font-poppins-500`}>
        Welcome to
      </Text>
      <Logo width={120} height={120} />
      <Text style={tw`-mt-4 mb-3 text-base text-gray-600 font-poppins-300`}>
        Please link your google account
      </Text>
    </View>
    <View style={tw`flex flex-col items-center justify-center rounded-full mx-auto`}>
      <Pressable
        style={tw`w-8/12 p-1 border border-gray-200 rounded-full`}
        onPress={() => signinWith("stocks")}
      >
        <View style={tw`pl-3 p-2 flex-row items-center w-full rounded-full`}>
          <Google {...tw`mr-3 w-5 h-5"`} />
          <Text style={tw`text-xs font-poppins-300 text-brand-black`}>
            Connect with Google
          </Text>
        </View>
      </Pressable>
    </View>
  </View>
)

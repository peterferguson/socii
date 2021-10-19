import Google from "./Logos/Google"
import Logo from "./Logos/Socii"
import React from "react"
import { Pressable, Text, View } from "react-native"
import tw from "../lib/tailwind"

export const EnterCard = ({ signinWith }) => (
  <View style={tw`absolute z-10 w-full max-w-md p-10 bg-white space-y-8 rounded-xl`}>
    <View style={tw`flex flex-col items-center justify-center text-center`}>
      <Text style={tw`mt-6 text-4xl font-semibold text-gray-900 font-primary`}>
        Welcome to
      </Text>
      <Logo style={tw`text-5xl`} />
      <Text style={tw`mt-2 text-base text-gray-600 font-primary`}>
        Please link your account with one of the following providers:
      </Text>
    </View>
    <View style={tw`flex flex-col items-center justify-center mx-auto space-y-6`}>
      <Text
        style={tw`flex items-center justify-center w-full mx-auto bg-white rounded-full cursor-pointer h-11`}
      >
        <Pressable
          style={tw`w-8/12 p-1 text-xs font-thin text-black bg-white border border-gray-200 rounded-full sm:text-sm grid grid-cols-7 place-items-center h-11 hover:shadow-lg transition ease-in duration-300`}
          onPress={() => signinWith("")}
        >
          <Google
            style={{ ...tw` ml-1 text-white sm:w-8 sm:h-8"`, height: 16, width: 16 }}
          />
          <Text style={tw`col-span-4 col-start-3`}>Connect with Google</Text>
        </Pressable>
      </Text>
    </View>
  </View>
)

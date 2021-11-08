import { useGoogleSignInPopUp } from "app/hooks/useGoogleSignInPopUp"
import React from "react"
import { Pressable, Text, View } from "react-native"
import tw from "../lib/tailwind"
import Google from "./Logos/Google"

export const LoginWithGoogle = () => {
  const signinWithGoogle = useGoogleSignInPopUp()

  return (
    <Pressable
      style={tw`w-8/12 p-1 border border-gray-200 rounded-full`}
      onPress={() => signinWithGoogle()}
    >
      <View style={tw`pl-3 p-2 flex-row items-center w-full rounded-full`}>
        <Google {...tw`mr-3 w-5 h-5"`} />
        <Text style={tw`text-xs font-poppins-300 text-brand-black`}>
          Connect with Google
        </Text>
      </View>
    </Pressable>
  )
}

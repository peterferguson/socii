import Logo from "./Logos/SociiText"
import React from "react"
import { Text, View } from "react-native"
import tw from "../lib/tailwind"
import { LoginWithGoogle } from "./LoginWithGoogle"
import { CenteredColumn } from "./Centered"
import LoginWithApple from "./LoginWithApple"

const EnterCard = () => (
  <View style={tw`absolute z-10 w-full max-w-md p-10 bg-white rounded-xl`}>
    <CenteredColumn>
      <Text style={tw`mt-6 -mb-8 text-4xl text-brand-black font-poppins-500`}>
        Welcome to
      </Text>
      <Logo width={120} height={120} />
      <Text style={tw`-mt-4 mb-3 text-base text-gray-600 font-poppins-300`}>
        Please link your google account
      </Text>
    </CenteredColumn>
    <CenteredColumn style={tw`rounded-full mx-auto`}>
      {LoginWithApple ? <LoginWithApple /> : <LoginWithGoogle />}
    </CenteredColumn>
  </View>
)

export default EnterCard

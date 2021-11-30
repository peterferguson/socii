import React from "react"
import { Text, View } from "react-native"
import tw from "app/lib/tailwind"
import { CenteredColumn } from "./Centered"
import { LoginOptions, LoginOptionsButtonType } from "./LoginOptions"
import Logo from "./Logos/SociiText"

const EnterCard = () => (
  <View style={tw`absolute z-10 w-full max-w-md p-10 bg-white rounded-xl`}>
    <CenteredColumn>
      <Text style={tw`mt-6 -mb-8 text-4xl text-brand-black font-poppins-500`}>
        Welcome to
      </Text>
      <Logo width={120} height={120} />
      <Text style={tw`-mt-4 mb-3 text-base text-center text-gray-600 font-poppins-300`}>
        Please connect with one of the following providers
      </Text>
    </CenteredColumn>
    <LoginOptions buttonType={LoginOptionsButtonType.SIGN_IN} />
  </View>
)

export default EnterCard

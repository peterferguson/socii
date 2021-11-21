import { useModal } from "app/hooks/"
import tw from "app/lib/tailwind"
import React from "react"
import { Pressable, Text, View } from "react-native"
import { shadowStyle } from "../utils/shadowStyle"

const InvestButton: React.FC<any> = ({ backgroundColor, onPress }) => {
  // TODO: On user not logged in show login modal instead of redirecting to login page
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor,
          ...tw`h-14 my-2 mx-4 rounded-2xl sm:rounded-xl`,
          ...shadowStyle("md"),
        }}
      >
        <View style={tw`flex-1 flex-row justify-center items-center`}>
          <Text style={{ ...tw`text-4xl text-white` }}>Invest</Text>
        </View>
      </Pressable>
    </View>
  )
}
// FIXME
// ! Cannot get the text center alignment to work when using poppins fonts

export default InvestButton

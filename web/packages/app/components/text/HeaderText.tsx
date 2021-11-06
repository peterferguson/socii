import React from "react"
import { Text, TextStyle } from "react-native"
import tw from "../../lib/tailwind"

const HeaderText = ({ text, style }: { text: string; style?: TextStyle }) => (
  <Text style={{ ...tw`text-brand-black font-poppins-400 text-2xl`, ...style }}>
    {text}
  </Text>
)

export default HeaderText

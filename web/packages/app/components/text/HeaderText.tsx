import React from "react"
import { Text, TextStyle } from "react-native"
import tw from "app/lib/tailwind"

const HeaderText = ({ text, style }: { text: string; style?: TextStyle }) => (
  <Text style={tw.style(`text-brand-black font-poppins-500 text-3xl`, style)}>
    {text}
  </Text>
)

export default HeaderText

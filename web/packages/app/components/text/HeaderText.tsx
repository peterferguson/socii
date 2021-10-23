import React from "react"
import { Text, TextStyle } from "react-native"
import tw from "../../lib/tailwind"

const HeaderText = ({ text, style }: { text: string; style?: TextStyle }) => (
  <Text style={{ ...tw`text-brand font-poppins-500 text-lg`, ...style }}>{text}</Text>
)

export default HeaderText

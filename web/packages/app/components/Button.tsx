import React from "react"
import { ViewStyle, TextStyle, Text, TouchableOpacity } from "react-native"
import tw from "app/lib/tailwind"

interface ButtonProps {
  label: string
  labelStyle?: TextStyle
  style?: ViewStyle
  onPress: () => void
}

const Button = ({
  label,
  labelStyle = tw`text-center p-3 font-poppins-400 text-xs text-brand-gray dark:text-brand-black`,
  style = tw.style(`bg-brand-black flex-row items-center justify-center my-1 p-1`, {
    borderRadius: 16,
  }),
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  )
}

export default Button

import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import HeaderText from "../Text/HeaderText"

const HeaderTitle: React.FC<{
  title: string
  text?: string
  containerStyle?: ViewStyle
  textStyle?: TextStyle
}> = ({ title, text, containerStyle, textStyle }) => {
  if (!text) text = title

  return (
    <View style={containerStyle}>
      <HeaderText text={text} style={textStyle} />
    </View>
  )
}
export default HeaderTitle

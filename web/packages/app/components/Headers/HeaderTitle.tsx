import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import HeaderText from "../Text/HeaderText"

const HeaderTitle: React.FC<{
  headerTitle: string
  text?: string
  containerStyle?: ViewStyle
  textStyle?: TextStyle
}> = ({ headerTitle, text, containerStyle, textStyle }) => {
  if (!text) text = headerTitle

  return (
    <View style={containerStyle}>
      <HeaderText text={text} style={textStyle} />
    </View>
  )
}
export default HeaderTitle

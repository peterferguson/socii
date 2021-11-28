import { Text, View } from "react-native"
import tw from "app/lib/tailwind"

interface ITextDividerProps {
  children: React.ReactNode
  textStyles?: any
  lineStyles?: any
  borderColor?: string
}

const TextDivider = ({
  children,
  lineStyles,
  borderColor = "black",
  textStyles = {},
}) => {
  const borderStyle = tw.style(`flex-1 my-2 ${children && "mx-1"}`, {
    height: 0.5,
    backgroundColor: borderColor,
    ...lineStyles,
  })
  return (
    <View style={tw`flex-row items-center`}>
      <View style={borderStyle} />
      <View>
        {children && (
          <Text style={{ textAlign: "center", ...textStyles }}>{children}</Text>
        )}
      </View>
      <View style={borderStyle} />
    </View>
  )
}
export default TextDivider

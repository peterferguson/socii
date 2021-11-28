import { Text } from "react-native"

export default function TruncatedText(props) {
  const { children, ellipsizeMode = "tail", numberOfLines = 1 } = props
  return (
    <Text ellipsizeMode={ellipsizeMode} numberOfLines={numberOfLines} {...props}>
      {children || ""}
    </Text>
  )
}

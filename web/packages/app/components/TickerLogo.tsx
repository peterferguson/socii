import React from "react"
import { View, Text } from "react-native"
import tw from "../lib/tailwind"

interface ITickerLogoProps {
  tickerSymbol: string
  isin?: string
  className?: string
  width?: string
  height?: string
}

const DEFAULT_HEIGHT_AND_WIDTH = "56px"

const TickerLogo: React.FC<ITickerLogoProps> = ({
  height,
  width,
  className,
  isin,
  tickerSymbol,
}) => {
  return (
    <View
      style={tw`flex items-center justify-center font-semibold text-gray-500 bg-gray-50 rounded-full shadow-lg h-14 w-14 text-tiny ${className}`}
    >
      <Text>{tickerSymbol}</Text>
    </View>
  )
}

export default TickerLogo

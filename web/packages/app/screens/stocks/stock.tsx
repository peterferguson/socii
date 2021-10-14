import React from "react"
import { Text } from "react-native"

import { createParam } from "app/navigation/use-param"
import type { StockScreenProps } from "app/navigation/types"

type Query = {
  symbol: string
}

const { useParam } = createParam<Query>()

export default function StockScreen({ navigation, route }: StockScreenProps) {
  const [symbol, _] = useParam("symbol")
  // - as with useState we can set the symbol with the second param
  // - this will be useful when we want to set the symbol from the recommendations

  return <Text style={{ color: "white" }}>Stock {symbol}</Text>
}

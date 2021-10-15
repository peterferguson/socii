import type { StockScreenProps } from "app/navigation/types"
import { createParam } from "app/navigation/use-param"
import React from "react"
import { View } from "react-native"
import InvestButton from "../../components/InvestButton"
import PriceCard from "../../components/PriceCard"
import StockRecommendations from "../../components/StockRecommendations"
import { useTickerData } from "../../hooks/useTickerData"

type Query = {
  symbol: string
}

const { useParam } = createParam<Query>()

export default function StockScreen({ navigation, route }: StockScreenProps) {
  // const [symbol, _] = useParam("symbol")
  const { symbol } = route.params
  // - as with useState we can set the symbol with the second param
  // - this will be useful when we want to set the symbol from the recommendations

  // - This will be useful for dynamically updating the heading title
  // useEffect(() => {
  //   navigation.setParams({ headerTitle: symbol })
  // }, [])

  const [data] = useTickerData([symbol])
  const tickerData = data?.[symbol]

  return (
    <View>
      <PriceCard
        symbol={symbol}
        shortName={symbol}
        price={undefined}
        isPriceLoading={true}
      />
      <InvestButton logoColor={tickerData?.logoColor} />
      <StockRecommendations symbol={symbol} />
    </View>
  )
}

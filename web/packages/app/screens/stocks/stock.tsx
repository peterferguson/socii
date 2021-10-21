import type { StockScreenProps } from "app/navigation/types"
import { createParam } from "app/navigation/use-param"
import React, { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated"
import { useVector, Vector } from "react-native-redash"
import ChartCard from "../../components/ChartCard/ChartCard"
import InvestButton from "../../components/InvestButton"
import PriceCard from "../../components/PriceCard"
import StockRecommendations from "../../components/StockRecommendations"
import { useAssetData } from "../../hooks/useAssetData"
import { usePrevious } from "../../hooks/usePrevious"
import { useTimeseries } from "../../hooks/useTimeseries"
import { Asset } from "../../models/Asset"
import { OHLCTimeseries } from "../../models/OHLCTimseries"
import { buildGraph, GraphData, SIZE } from "../../utils/buildGraph"
import { IntervalEnum, PeriodEnum } from "../../utils/getYahooTimeseries"

type Query = {
  asset: string
}

const { useParam } = createParam<Query>()

type TabLabel = keyof typeof PeriodEnum

export type Graphs = {
  [label in TabLabel]+?: {
    graphData: GraphData
    timeseries: OHLCTimeseries
  }
}

export default function StockScreen({ navigation, route }: StockScreenProps) {
  // const [asset, _] = useParam("asset")
  // - as with useState we can set the asset with the second param
  // - this will be useful when we want to set the asset from the recommendations
  // - This will be useful for dynamically updating the heading title
  // useEffect(() => {
  //   navigation.setParams({ headerTitle: asset })
  // }, [])

  const { asset: symbol } = route.params

  const asset = useAssetData([symbol])[symbol]

  const [graphs, setGraphs] = useState<Graphs>({
    "1D": { graphData: null, timeseries: null },
    "7D": { graphData: null, timeseries: null },
    "1M": { graphData: null, timeseries: null },
    "6M": { graphData: null, timeseries: null },
    "1Y": { graphData: null, timeseries: null },
    MAX: { graphData: null, timeseries: null },
  })

  const activeTab = useSharedValue<TabLabel>("1D")
  const translation = useVector()

  const { timeseries } = useTimeseries({
    assets: [symbol],
    period: PeriodEnum[activeTab.value],
    interval:
      IntervalEnum[
        activeTab.value === "1D"
          ? "5m"
          : activeTab.value.includes("D")
          ? "30m"
          : activeTab.value.includes("MAX")
          ? "1M"
          : "1D"
      ],
  })

  useEffect(() => {
    if (timeseries.length)
      setGraphs((prevTabs) => ({
        ...prevTabs,
        [activeTab.value]: {
          timeseries,
          // @ts-ignore
          // - here we are using a single timeseries so ignoring this
          graphData: buildGraph(timeseries),
        },
      }))
  }, [activeTab.value, timeseries])

  // const { minTimestamp, maxTimestamp, minPrice, maxPrice } =
  //   graphs[activeTab.value].graphData || {}

  // // TODO: get the length of the graph so that we can use the interpolation to plot the actual price & timestamp!
  // // TODO: need to know when the graph is being dragged so we can go back to the initial values after animation
  // const price = useDerivedValue(() =>
  //   interpolate(translation.y.value, [0, SIZE], [maxPrice, minPrice], Extrapolate.CLAMP)
  // )
  // const timestamp = useDerivedValue(() =>
  //   interpolate(
  //     translation.x.value,
  //     [0, SIZE],
  //     [minTimestamp, maxTimestamp],
  //     Extrapolate.CLAMP
  //   )
  // )

  // const changePercent = useDerivedValue(() => {
  //   const firstPrice = graphs[activeTab.value].timeseries?.[0].close
  //   return (price.value - firstPrice) / firstPrice
  // })

  // useEffect(() => console.log("price", price.value), [price.value])
  // useEffect(() => console.log("timestamp", timestamp.value), [timestamp.value])
  // useEffect(
  //   () => console.log("changePercent", changePercent.value),
  //   [changePercent.value]
  // )

  // useEffect(
  //   () => console.log("translation", translation.x.value),
  //   [translation.x.value]
  // )
  // useEffect(
  //   () => console.log("translation", translation.y.value),
  //   [translation.y.value]
  // )

  return (
    <View style={{ flex: 1 }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 24 }}>
          <AnimatedPriceCard
            symbol={symbol}
            isin={asset?.ISIN}
            shortName={asset?.shortName}
            graphData={graphs[activeTab.value].graphData}
            translation={translation}
            priceForComparison={graphs[activeTab.value].timeseries?.[0].close}
          />
          {/* <PriceCard
            symbol={symbol}
            isin={asset?.ISIN}
            shortName={asset?.shortName}
            price={price.value}
            changePercent={changePercent.value}
            timestamp={timestamp.value}
          /> */}
          <InvestButton logoColor={asset?.logoColor} />
          <ChartCard
            graphs={graphs}
            translation={translation}
            activeGraph={activeTab}
            logoColor={asset?.logoColor}
          />
          <StockRecommendations symbol={symbol} />
        </View>
      </ScrollView>
    </View>
  )
}

const AnimatedPriceCard: React.FC<{
  symbol: string
  isin: string
  shortName: string
  graphData: GraphData
  translation: Vector<Animated.SharedValue<number>>
  priceForComparison: number
}> = ({ symbol, isin, shortName, graphData, translation, priceForComparison }) => {
  const { minTimestamp, maxTimestamp, minPrice, maxPrice } = graphData || {}

  // TODO: get the length of the graph so that we can use the interpolation to plot the actual price & timestamp!
  // TODO: need to know when the graph is being dragged so we can go back to the initial values after animation
  const price = useDerivedValue(() =>
    interpolate(translation.y.value, [0, SIZE], [maxPrice, minPrice], Extrapolate.CLAMP)
  )
  const timestamp = useDerivedValue(() =>
    interpolate(
      translation.x.value,
      [0, SIZE],
      [minTimestamp, maxTimestamp],
      Extrapolate.CLAMP
    )
  )

  const changePercent = useDerivedValue(
    () => (price.value - priceForComparison) / priceForComparison
  )

  useEffect(() => console.log("price", price.value), [price.value])
  useEffect(() => console.log("timestamp", timestamp.value), [timestamp.value])
  useEffect(
    () => console.log("changePercent", changePercent.value),
    [changePercent.value]
  )

  useEffect(
    () => console.log("translation", translation.x.value),
    [translation.x.value]
  )
  useEffect(
    () => console.log("translation", translation.y.value),
    [translation.y.value]
  )

  return (
    <PriceCard
      symbol={symbol}
      isin={isin}
      shortName={shortName}
      price={price.value}
      changePercent={changePercent.value}
      timestamp={timestamp.value}
    />
  )
}

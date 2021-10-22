import type { StockScreenProps } from "app/navigation/types"
import { createParam } from "app/navigation/use-param"
import React, { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import {
  Extrapolate,
  interpolate,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated"
import { useVector } from "react-native-redash"
import ChartCard from "../../components/ChartCard/ChartCard"
import InvestButton from "../../components/InvestButton"
import PriceCard from "../../components/PriceCard"
import StockRecommendations from "../../components/StockRecommendations"
import { useAssetData } from "../../hooks/useAssetData"
import { usePrevious } from "../../hooks/usePrevious"
import { useRecommendations } from "../../hooks/useRecommendations"
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

interface AssetData {
  [symbol: string]: Asset
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

  const asset = useAssetData([symbol])
  const { recommendations } = useRecommendations(symbol)

  const [assets, setAssets] = useState<AssetData>({ ...asset, ...recommendations })

  useEffect(
    () => setAssets((a) => ({ ...a, ...asset, ...recommendations })),
    [asset, recommendations]
  )

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

  const prevTab = usePrevious(activeTab)
  const transition = useSharedValue(0)

  const handleTabPress = (label: TabLabel) => () => {
    prevTab.value = activeTab.value
    transition.value = 0
    activeTab.value = label
    transition.value = withTiming(1)
  }

  const graphData = graphs[activeTab.value].graphData
  const priceForComparison = graphs[activeTab.value].timeseries?.[0].close

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
  }, [timeseries, activeTab.value])

  const { minTimestamp, maxTimestamp, minPrice, maxPrice } = graphData || {}

  // TODO: get the length of the graph so that we can use the interpolation to plot the actual price & timestamp!
  // TODO: need to know when the graph is being dragged so we can go back to the initial values after animation
  const price = useDerivedValue(
    () =>
      interpolate(
        translation.y.value,
        [0, SIZE],
        [maxPrice, minPrice],
        Extrapolate.CLAMP
      )[(translation.y.value, maxPrice, minPrice)]
  )
  const timestamp = useDerivedValue(
    () =>
      interpolate(
        translation.x.value,
        [0, SIZE],
        [minTimestamp, maxTimestamp],
        Extrapolate.CLAMP
      )[(translation.x.value, minTimestamp, maxTimestamp)]
  )

  const changePercent = useDerivedValue(
    () => priceForComparison && (price.value - priceForComparison) / priceForComparison,
    [(price.value, priceForComparison)]
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
    <View style={{ flex: 1 }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 24 }}>
          <PriceCard
            key={symbol}
            symbol={symbol}
            isin={assets[symbol]?.ISIN}
            shortName={assets?.[symbol]?.shortName}
            price={price.value}
            changePercent={changePercent.value}
            timestamp={timestamp.value}
          />
          <InvestButton logoColor={assets[symbol]?.logoColor} />
          <ChartCard
            {...{
              graphs,
              translation,
              prevTab,
              activeTab,
              transition,
              logoColor: assets[symbol]?.logoColor,
              handleTabPress,
            }}
          />
          <StockRecommendations recommendations={recommendations} />
        </View>
      </ScrollView>
    </View>
  )
}

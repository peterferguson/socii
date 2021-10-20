import type { StockScreenProps } from "app/navigation/types"
import { createParam } from "app/navigation/use-param"
import React, { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import {
  Extrapolate,
  interpolate,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated"
import { useVector } from "react-native-redash"
import ChartCard from "../../components/ChartCard/ChartCard"
import InvestButton from "../../components/InvestButton"
import PriceCard from "../../components/PriceCard"
import StockRecommendations from "../../components/StockRecommendations"
import { useAssetData } from "../../hooks/useAssetData"
import { useTimeseries } from "../../hooks/useTimeseries"
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
  const { asset } = route.params

  // - This will be useful for dynamically updating the heading title
  // useEffect(() => {
  //   navigation.setParams({ headerTitle: asset })
  // }, [])

  const [data] = useAssetData([asset])
  const assetData = data?.[asset]
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

  const { timeseries, isLoading, isError } = useTimeseries({
    assets: [asset],
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
    if (!isLoading && !isError) {
      setGraphs((prevTabs) => ({
        ...prevTabs,
        [activeTab.value]: {
          timeseries,
          // @ts-ignore
          // - here we are using a single timeseries so ignoring this
          graphData: buildGraph(timeseries),
        },
      }))
    }
  }, [activeTab.value, timeseries, isLoading, isError])

  const { minTimestamp, maxTimestamp, minPrice, maxPrice } =
    graphs[activeTab.value].graphData || {}

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

  const changePercent = useDerivedValue(() => {
    const firstPrice = graphs[activeTab.value].timeseries?.[0].close
    return (price.value - firstPrice) / firstPrice
  })

  return (
    <View style={{ flex: 1 }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 24 }}>
          <PriceCard
            asset={asset}
            shortName={assetData?.shortName}
            price={price.value}
            changePercent={changePercent.value}
            timestamp={timestamp.value}
          />
          <InvestButton logoColor={assetData?.logoColor} />
          <ChartCard
            asset={asset}
            graphs={graphs}
            translation={translation}
            activeGraph={activeTab}
            logoColor={assetData?.logoColor}
          />
          <StockRecommendations asset={asset} />
        </View>
      </ScrollView>
    </View>
  )
}

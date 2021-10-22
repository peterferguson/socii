import type { StockScreenProps } from "app/navigation/types"
import { createParam } from "app/navigation/use-param"
import React, { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import { useSharedValue, withTiming } from "react-native-reanimated"
import { useVector } from "react-native-redash"
import ChartCard from "../../components/ChartCard/ChartCard"
import InvestButton from "../../components/InvestButton"
import PriceCard from "../../components/PriceCard/PriceCard"
import StockRecommendations from "../../components/StockRecommendations"
import { useAssetData } from "../../hooks/useAssetData"
import { usePrevious } from "../../hooks/usePrevious"
import { useRecommendations } from "../../hooks/useRecommendations"
import { useTimeseries } from "../../hooks/useTimeseries"
import { Asset } from "../../models/Asset"
import { OHLCTimeseries } from "../../models/OHLCTimseries"
import { buildGraph, GraphData } from "../../utils/buildGraph"
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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 24 }}>
          <PriceCard
            key={symbol}
            symbol={symbol}
            isin={assets[symbol]?.ISIN}
            shortName={assets?.[symbol]?.shortName}
            graphData={graphs[activeTab.value].graphData}
            translation={translation}
            priceForComparison={graphs[activeTab.value].timeseries?.[0].close}
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

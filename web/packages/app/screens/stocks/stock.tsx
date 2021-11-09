import type { StockScreenProps } from "app/navigation/types"
import { createParam } from "app/navigation/use-param"
import React, { useEffect, useRef, useState } from "react"
import { ScrollView, View } from "react-native"
import { runOnJS, useDerivedValue, useSharedValue } from "react-native-reanimated"
import { useVector } from "react-native-redash"
import ChartCard from "../../components/ChartCard/ChartCard"
import { TabLabel } from "../../components/ChartCard/constants"
import InvestButton from "../../components/InvestButton"
import PriceCard from "../../components/PriceCard"
import StockRecommendations from "../../components/StockRecommendations"
import { useAssetData } from "../../hooks/useAssetData"
import { useGraph } from "../../hooks/useGraph"
import { usePrevious } from "../../hooks/usePrevious"
import { useRecommendations } from "../../hooks/useRecommendations"
import { Asset } from "../../models/Asset"
import { IntervalEnum, PeriodEnum } from "../../utils/getYahooTimeseries"

type Query = { asset: string }

const { useParam } = createParam<Query>()

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

  const { assetSymbol: symbol } = route.params

  const scrollRef = useRef()
  const prevSymbol = usePrevious(symbol)

  const asset = useAssetData([symbol])
  const { recommendations } = useRecommendations(symbol)

  const [assets, setAssets] = useState<AssetData>({ ...asset, ...recommendations })

  useEffect(
    () => setAssets(a => ({ ...a, ...asset, ...recommendations })),
    [asset, recommendations, asset[symbol]]
  )

  const prevTab = useSharedValue<TabLabel>("1D")
  const activeTab = useSharedValue<TabLabel>("1D")
  const translation = useVector()

  const transition = useSharedValue(0)

  const prevPeriod = useDerivedValue(() => PeriodEnum[prevTab.value])
  const period = useDerivedValue(() => PeriodEnum[activeTab.value])
  // TODO: IF the market has just opened we need minute data
  // ! If the data is too short our animation will fail
  const interval = useDerivedValue(
    () =>
      IntervalEnum[
        activeTab.value === "1D"
          ? "2m"
          : activeTab.value === "6M"
          ? "1H"
          : activeTab.value.match(/\d[W|M|D]/)
          ? "30m"
          : activeTab.value.includes("MAX")
          ? "1W"
          : "1D"
      ]
  )

  const { graphs, fetchingGraph } = useGraph(symbol, period.value, interval.value)

  useEffect(
    () =>
      // @ts-ignore
      prevSymbol !== symbol && scrollRef.current?.scrollTo({ y: 0, animated: true }),
    []
  )

  // - The shared value will not trigger a re-render ... we need the page to re-render
  // - when the period changes so we can get the latest data. Using some state to force
  // - the re-render.
  // ! This is bad practice and should be refactored
  const [currentTab, setCurrentTab] = useState("1D")

  // - This is a hack to force the re-render of the page
  useDerivedValue(() => {
    console.log("prevTab", prevTab.value, "activeTab", activeTab.value)

    if (currentTab !== activeTab.value) runOnJS(setCurrentTab)(activeTab.value)
    return prevTab.value !== activeTab.value
  })

  return (
    <View style={{ flex: 1 }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} ref={scrollRef}>
        <View style={{ marginBottom: 24 }}>
          <PriceCard
            key={symbol}
            symbol={symbol}
            isin={assets[symbol]?.ISIN}
            shortName={assets?.[symbol]?.shortName}
            graphData={graphs[period.value]?.graphData}
            translation={translation}
            priceForComparison={graphs[period.value]?.timeseries?.[0].close}
          />
          <InvestButton logoColor={assets[symbol]?.logoColor} symbol={symbol} />
          <ChartCard
            {...{
              lastGraph: graphs[prevPeriod.value],
              currentGraph: graphs[period.value],
              translation,
              prevTab,
              fetchingGraph,
              activeTab,
              transition,
              logoColor: assets[symbol]?.logoColor,
              key: `stock-${symbol}-${period.value}`,
            }}
          />
          <StockRecommendations recommendations={recommendations} />
        </View>
      </ScrollView>
    </View>
  )
}

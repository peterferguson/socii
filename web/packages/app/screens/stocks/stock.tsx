import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { InvestButtonContext, InvestButtonEvent } from "app/lib/machines/constants"
import { useMachine } from "@xstate/react"
import {
  ChartCard,
  InvestButton,
  PriceCard,
  SignUpFirstModal,
  StockRecommendations,
} from "app/components"
import { TabLabel } from "app/components/ChartCard/constants"
import { InvestButtonModals } from "app/components/InvestButtonModals/InvestButtonModals"
import {
  useAssets,
  useAssetData,
  useAuth,
  useGraph,
  useModal,
  usePrevious,
  useRecommendations,
} from "app/hooks"
import { stockInvestButtonMachine } from "app/lib/machines/stockInvestButtonMachine"
import { Asset } from "app/models/Asset"
import type { StockScreenProps } from "app/navigation/types"
import { createParam } from "app/navigation/use-param"
import { IntervalEnum, PeriodEnum } from "app/utils/getYahooTimeseries"
import React, { useEffect, useRef, useState } from "react"
import { ScrollView, View } from "react-native"
import Animated, {
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated"
import { AssetsProvider } from "app/contexts/AssetsProvider"
import { useVector } from "react-native-redash"

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

  const scrollRef = useRef<ScrollView>()
  const prevSymbol = usePrevious(symbol)

  const asset = useAssets()

  React.useEffect(() => console.log("asset", asset), [asset])

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

  useEffect(() => {
    prevSymbol !== symbol && scrollRef.current.scrollTo({ y: 0, animated: true })
  }, [])

  // - The shared value will not trigger a re-render ... we need the page to re-render
  // - when the period changes so we can get the latest data. Using some state to force
  // - the re-render.
  // ! This is bad practice and should be refactored
  const [currentTab, setCurrentTab] = useState("1D")

  // - This is a hack to force the re-render of the page
  useDerivedValue(() => {
    if (currentTab !== activeTab.value) runOnJS(setCurrentTab)(activeTab.value)
    return prevTab.value !== activeTab.value
  })

  const { user } = useAuth()
  // - State machine for the invest button
  const [state, send] = useMachine<InvestButtonContext, InvestButtonEvent>(
    stockInvestButtonMachine as any // TODO: fix this typing
  )
  const modalRef = React.useRef<BottomSheetModal>(null)

  const { handlePresent } = useModal(modalRef)

  // - When the user navigates away from the page, we want to reset the state machine
  useEffect(() => {
    send("RESET")
  }, [route.path])

  return (
    <Animated.View style={{ flex: 1 }}>
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
          <InvestButton
            backgroundColor={assets[symbol]?.logoColor}
            onPress={send("CLICK") && handlePresent}
          />
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
      {user ? (
        <InvestButtonModals
          modalRef={modalRef}
          state={state}
          send={send}
          symbol={symbol}
        />
      ) : (
        <SignUpFirstModal modalRef={modalRef} />
      )}
    </Animated.View>
  )
}

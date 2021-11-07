import React from "react"
import { View } from "react-native"
import Animated from "react-native-reanimated"
import { Vector } from "react-native-redash"
import { Graph } from "../../hooks/useGraph"
import tw from "../../lib/tailwind"
import { shadowStyle } from "../../utils/shadowStyle"
import { Chart } from "./Chart"
import { ChartTabButton } from "./ChartTabButton"
import { ChartTabRow } from "./ChartTabRow"
import { TabLabel, tabs } from "./constants"
export interface IAssetPageLineChartProps {
  logoColor: string
  translation: Vector<Animated.SharedValue<number>>
  fetchingGraph: boolean
  lastGraph: Graph
  currentGraph: Graph
  prevTab: Animated.SharedValue<TabLabel>
  activeTab: Animated.SharedValue<TabLabel>
  transition: Animated.SharedValue<number>
}

const ChartCard: React.FC<IAssetPageLineChartProps> = ({
  logoColor,
  translation,
  fetchingGraph,
  lastGraph,
  currentGraph,
  prevTab,
  activeTab,
  transition,
}) => {
  return (
    <View
      style={{
        ...tw`my-2 mx-4 bg-white min-h-[400px] rounded-2xl flex flex-1 flex-col 
              justify-center items-center`,
        ...shadowStyle("md"),
      }}
    >
      <Chart
        {...{
          lastGraph,
          currentGraph,
          fetchingGraph,
          transition,
          logoColor,
          translation,
        }}
      />
      <ChartTabRow logoColor={logoColor} activeTab={activeTab}>
        {tabs.map(tabLabel => (
          <ChartTabButton
            {...{
              prevTab,
              activeTab,
              transition,
              logoColor,
              label: tabLabel,
              key: tabLabel,
            }}
          />
        ))}
      </ChartTabRow>
    </View>
  )
}

export default ChartCard

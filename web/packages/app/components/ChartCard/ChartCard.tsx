import React from "react"
import { View } from "react-native"
import tw from "../../lib/tailwind"
import { shadowStyle } from "../../utils/shadowStyle"
import { Chart } from "./Chart"
import { ChartTabButton } from "./ChartTabButton"
import { ChartTabRow } from "./ChartTabRow"
import { IAssetPageLineChartProps, TabLabel } from "./constants"

const ChartCard: React.FC<IAssetPageLineChartProps> = ({
  logoColor,
  translation,
  graphs,
  prevTab,
  activeTab,
  transition,
  handleTabPress,
}) => {
  return (
    <View
      style={{
        ...tw`my-2 mx-4 bg-white min-h-[400px] rounded-2xl flex flex-1 flex-col 
              justify-center items-center`,
        ...shadowStyle("md"),
      }}
    >
      <Chart {...{ graphs, prevTab, activeTab, transition, logoColor, translation }} />
      <ChartTabRow logoColor={logoColor} activeTab={activeTab}>
        {(Object.keys(graphs) as TabLabel[]).map((label) => (
          <ChartTabButton
            key={label}
            {...{ label, activeTab, logoColor, handlePress: handleTabPress(label) }}
          />
        ))}
      </ChartTabRow>
    </View>
  )
}

export default ChartCard

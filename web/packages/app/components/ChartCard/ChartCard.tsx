import {
  //   ChartDot,
  ChartPath,
  ChartPathProvider,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts"
import ChartDot from "../ChartDot"
import React, { useEffect, useState } from "react"
import { useWindowDimensions, View } from "react-native"
import tw from "../../lib/tailwind"
import { OHLCTimeseries } from "../../models/OHLCTimseries"
import {
  getYahooTimeseries,
  IntervalEnum,
  PeriodEnum,
} from "../../utils/getYahooTimeseries"
import TimespanSelector from "../TimespanSelector"

interface ITickerPageLineChartProps {
  symbol: string
  timeseries: OHLCTimeseries
  color: string
}

const ChartCard: React.FC<ITickerPageLineChartProps> = ({
  symbol,
  timeseries,
  color,
}) => {
  const [graphs, setGraphs] = useState({
    "1D": { [symbol]: { timeseries, points: null } },
    "7D": {},
    "1M": {},
    "6M": {},
    "1Y": {},
    MAX: {},
  })
  const [activeTab, setActiveTab] = useState("1D")
  const { width: SIZE } = useWindowDimensions()

  // TODO: refactor into custom hook
  useEffect(() => {
    if (!graphs[activeTab]?.[symbol]?.timeseries?.length)
      getYahooTimeseries({
        tickers: [symbol],
        period: PeriodEnum[activeTab],
        interval:
          IntervalEnum[
            activeTab === "1D"
              ? "5m"
              : activeTab.includes("D")
              ? "30m"
              : activeTab.includes("MAX")
              ? "1W"
              : "1D"
          ],
      }).then((ts) =>
        setGraphs((prevTabs) => ({
          ...prevTabs,
          [activeTab]: {
            [symbol]: {
              timseries: ts[symbol],
              points: monotoneCubicInterpolation({
                data: ts[symbol]?.map((d) => ({
                  x: d.timestamp,
                  y: d.close,
                })),
                includeExtremes: true,
                range: 100,
              }),
            },
          },
        }))
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, symbol])

  return (
    <View
      style={tw`my-2 p-4 mx-4 bg-white min-h-[400px] rounded-2xl flex flex-col justify-center items-center`}
    >
      <ChartPathProvider
        data={{
          points: graphs[activeTab]?.[symbol]?.points,
          smoothingStrategy: "bezier",
        }}
      >
        <ChartPath
          height={(2 * SIZE) / 3}
          stroke={color}
          strokeWidth={3}
          selectedStrokeWidth={3}
          width={(21 * SIZE) / 24}
          hapticsEnabled={true}
          hitSlop={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ChartDot style={{ backgroundColor: color }} />
        <TimespanSelector
          backgroundColor={color}
          height={(1 * SIZE) / 12}
          items={Object.keys(graphs)}
          onSelect={(tab) => setActiveTab(tab)}
          style={tw`pb-2`}
        />
      </ChartPathProvider>
    </View>
  )
}

export default ChartCard

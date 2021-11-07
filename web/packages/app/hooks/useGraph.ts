import { useState, useEffect } from "react"

import { OHLCTimeseries } from "../models/OHLCTimseries"
import { GraphData, buildGraph } from "../utils/buildGraph"
import { IntervalEnum, PeriodEnum } from "../utils/getYahooTimeseries"
import { useTimeseries } from "./useTimeseries"

type TabLabel = keyof typeof PeriodEnum

export type Graph = { graphData: GraphData; timeseries: OHLCTimeseries }

export type Graphs = { [label in TabLabel]+?: Graph }

const emptyGraph = { graphData: null, timeseries: null }

export const useGraph = (
  symbol: string,
  period: PeriodEnum,
  interval: IntervalEnum
): {
  graphs: Graphs
  isTimeseriesLoading: boolean
  fetchingGraph: boolean
  isError: Error
} => {
  const [graphs, setGraphs] = useState<Graphs>({ [period]: emptyGraph })
  const [fetchingGraph, setFetchingGraph] = useState<boolean>(true)

  const {
    timeseries,
    isLoading: isTimeseriesLoading,
    isError,
  } = useTimeseries({
    assets: [symbol],
    period: period,
    interval: interval,
  })

  console.log("timeseries length", timeseries.length)

  useEffect(() => {
    if (!isTimeseriesLoading && !isError) {
      setGraphs(prevTabs => ({
        ...prevTabs,
        [period]: {
          timeseries,
          graphData: buildGraph(timeseries as OHLCTimeseries),
        },
      }))
      setFetchingGraph(false)
    }
  }, [timeseries, period, isTimeseriesLoading, isError])

  return { graphs, isTimeseriesLoading, isError, fetchingGraph }
}

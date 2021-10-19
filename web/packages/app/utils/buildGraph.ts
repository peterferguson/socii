import * as shape from "d3-shape"
import { scaleLinear } from "d3-scale"
import { Dimensions } from "react-native"
import { parse, Path } from "react-native-redash"
import { OHLCTimeseries } from "../models/OHLCTimseries"

export const SIZE = Dimensions.get("window").width - 96

export interface GraphData {
  minTimestamp: number
  maxTimestamp: number
  minPrice: number
  maxPrice: number
  percentChange: number
  path: Path
}

export const buildGraph = (timeseries: OHLCTimeseries): GraphData => {
  const POINTS = timeseries.length
  const priceList = timeseries.slice(0, POINTS)
  const formattedValues = priceList.map(
    (ohlc) => [ohlc.close, ohlc.timestamp / 1000] as [number, number]
  )

  const prices = formattedValues.map((value) => value[0])
  const dates = formattedValues.map((value) => value[1])

  const minTimestamp = Math.min(...dates)
  const maxTimestamp = Math.max(...dates)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  const scaleX = scaleLinear().domain([minTimestamp, maxTimestamp]).range([0, SIZE])
  const scaleY = scaleLinear().domain([minPrice, maxPrice]).range([SIZE, 0])

  return {
    minTimestamp,
    maxTimestamp,
    minPrice,
    maxPrice,
    percentChange:
      (timeseries[timeseries.length - 1]?.close - timeseries[0]?.close) /
      timeseries[0]?.close,
    path: parse(
      shape
        .line()
        .x(([, x]) => scaleX(x) as number)
        .y(([y]) => scaleY(y) as number)
        (formattedValues) as string
        // .curve(shape.curveBasis)(formattedValues) as string
    ),
  }
}

import * as shape from "d3-shape"
import { scaleLinear } from "d3-scale"
import { Dimensions } from "react-native"
import { parse, Path } from "react-native-redash"
import { OHLCTimeseries } from "../models/OHLCTimseries"

export const SIZE = Dimensions.get("window").width

const POINTS = 100 // - number of points to display

export interface GraphData {
  minPrice: number
  maxPrice: number
  percentChange: number
  path: Path
}

export const buildGraph = (timeseries: OHLCTimeseries): GraphData => {
  if (!timeseries.length)
    return {
      minPrice: 0,
      maxPrice: 0,
      percentChange: 0,
      path: parse(""),
    }
  const priceList = timeseries.slice(0, POINTS)
  const formattedValues = priceList.map(
    (ohlc) => [ohlc.close, ohlc.timestamp / 1000] as [number, number]
  )

  const dates = formattedValues.map((value) => value[0])
  const prices = formattedValues.map((value) => value[1])

  const scaleX = scaleLinear()
    .domain([Math.min(...dates), Math.max(...dates)])
    .range([0, SIZE])
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const scaleY = scaleLinear().domain([minPrice, maxPrice]).range([SIZE, 0])

  return {
    minPrice,
    maxPrice,
    percentChange:
      timeseries[timeseries.length - 1]?.close -
      timeseries[0]?.close / timeseries[0]?.close,
    path: parse(
      shape
        .line()
        .x(([, x]) => scaleX(x) as number)
        .y(([y]) => scaleY(y) as number)
        .curve(shape.curveBasis)(formattedValues) as string
    ),
  }
}

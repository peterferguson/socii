import { useWindowSize } from "@hooks/useWindowSize"
import { tailwindColorMap } from "@lib/constants"
import { TimeseriesTick } from "@models/TimeseriesTick"
import { pctChange } from "@utils/pctChange"
import { pnlBackgroundColor } from "@utils/pnlBackgroundColor"
import React, { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { AreaSeries, Crosshair, FlexibleXYPlot, LineSeries, XAxis } from "react-vis"

interface ITickerPageLineChart {
  timeseries: TimeseriesTick[]
  crosshairIndexValue: number
  color: string
  setCrosshairIndexValue: React.Dispatch<React.SetStateAction<number>>
  widthScale?: number
  heightScale?: number
}

const TickerPageLineChart: React.FC<ITickerPageLineChart> = ({
  timeseries,
  color,
  crosshairIndexValue,
  setCrosshairIndexValue,
  widthScale = 0.65,
  heightScale = 0.6,
}) => {
  const [width, height] = useWindowSize()
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const [crosshairValue, setCrosshairValue] = useState<TimeseriesTick>()
  const [pctChangeValue, setPctChangeValue] = useState<number>(0.0)

  useEffect(() => {
    timeseries?.length &&
      crosshairValue?.y &&
      setPctChangeValue(pctChange(crosshairValue?.y, timeseries?.[0].y))
  }, [crosshairValue, timeseries])

  const lineSeriesProps = {
    animation: false,
    color: color ?? "#0fa9e6",
    opacityType: "literal",
    strokeWidth: 2,
    data: timeseries,
    onNearestX: (data: TimeseriesTick, { index }) => {
      setCrosshairValue(data)
      setCrosshairIndexValue(index)
    },
  }

  // TODO: Add reactive area sizing based on the index of the crosshair and update color based on pnl
  const areaSeriesProps = {
    animation: true,
    color: tailwindColorMap[pnlBackgroundColor(pctChangeValue)],
    opacity: 0.75,
    data: timeseries.slice(0, 1 + crosshairIndexValue),
  }

  return (
    <div className="flex items-center justify-center mx-auto">
      <FlexibleXYPlot
        onMouseLeave={() => {
          setCrosshairValue(undefined)
          setCrosshairIndexValue(timeseries.length - 1)
        }}
        height={height * heightScale}
        width={width * widthScale}
        xType="time"
        margin={{ left: 25, bottom: 75, top: 10 }}
      >
        {!is1Col && (
          <XAxis
            tickLabelAngle={-75}
            tickFormat={(d: Date) => d.toLocaleDateString()}
          />
        )}
        <LineSeries {...lineSeriesProps} />
        {crosshairValue && <AreaSeries {...areaSeriesProps} />}
        {crosshairValue && !is1Col && (
          <Crosshair
            values={[crosshairValue]}
            titleFormat={(t: TimeseriesTick[]) => ({
              title: "Date",
              value: new Date(t?.[0].x).toLocaleDateString(),
            })}
            itemsFormat={(t: TimeseriesTick[]) => [
              { title: "Close price", value: t?.[0].y },
            ]}
          />
        )}
      </FlexibleXYPlot>
    </div>
  )
}

export default React.memo(TickerPageLineChart)

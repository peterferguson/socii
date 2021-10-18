import { useWindowSize } from "@hooks/useWindowSize"
import { tailwindColorMap } from "@lib/constants"
import { TimeseriesTick } from "@models/TimeseriesTick"
import { pnlBackgroundColor } from "@utils/pnlBackgroundColor"
import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { AreaSeries, Crosshair, FlexibleXYPlot, LineSeries, XAxis } from "react-vis"

interface ITickerPageLineChart {
  timeseries: TimeseriesTick[]
  crosshairIndexValue: number
  color: string
  highlightedChange: number
  setCrosshairIndexValue: React.Dispatch<React.SetStateAction<number>>
  widthScale?: number
  heightScale?: number
}

const TickerPageLineChart: React.FC<ITickerPageLineChart> = ({
  timeseries,
  color,
  highlightedChange,
  crosshairIndexValue,
  setCrosshairIndexValue,
  widthScale = 0.65,
  heightScale = 0.6,
}) => {
  const [width, height] = useWindowSize()
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const [crosshairValue, setCrosshairValue] = useState<TimeseriesTick>()

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
    color: tailwindColorMap[pnlBackgroundColor(highlightedChange)],
    opacity: 0.75,
    data: timeseries.slice(crosshairIndexValue),
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
        margin={{ left: 25, bottom: is1Col ? 50 : 25, top: is1Col ? 5 : 25 }}
      >
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
              { title: "Close price", value: (t?.[0].y).toFixed(2) },
            ]}
          />
        )}
      </FlexibleXYPlot>
    </div>
  )
}

export default React.memo(TickerPageLineChart)

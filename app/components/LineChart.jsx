import { tailwindColorMap } from "@lib/constants"
import { useWindowSize } from "@lib/hooks"
import { pctChange, pnlBackgroundColor } from "@utils/helper"
import React, { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { AreaSeries, Crosshair, FlexibleXYPlot, LineSeries, XAxis } from "react-vis"
import "react-vis/dist/style.css"

export default function LineChart({
  timeseries,
  crosshairIndexValue,
  setCrosshairIndexValue,
  widthScale = 0.65,
  heightScale = 0.6,
}) {
  const [width, height] = useWindowSize()
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const [crosshairValue, setCrosshairValue] = useState(false)
  const [pctChangeValue, setPctChangeValue] = useState(0.0)

  useEffect(() => {
    setPctChangeValue(pctChange(timeseries?.[0].y, crosshairValue.y).toFixed(2))
  }, [crosshairValue, timeseries])

  const lineSeriesProps = {
    animation: true,
    color: "#0fa9e6",
    opacityType: "literal",
    strokeWidth: 2,
    data: timeseries,
    onNearestX: (data, { index }) => {
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
          setCrosshairValue(false)
          setCrosshairIndexValue(0)
        }}
        height={height * heightScale}
        width={width * widthScale}
        xType="time"
        margin={{ left: 10, bottom: 75, top: 10 }}
      >
        {!is1Col && (
          <XAxis tickLabelAngle={-75} tickFormat={(d) => d.toLocaleDateString()} />
        )}
        <LineSeries {...lineSeriesProps} />
        {crosshairValue && <AreaSeries {...areaSeriesProps} />}
        {crosshairValue && !is1Col && (
          <Crosshair
            values={[crosshairValue]}
            titleFormat={(d) => ({
              title: "Date",
              value: new Date(d?.[0].x).toLocaleDateString(),
            })}
            itemsFormat={(d) => [{ title: "Close price", value: d?.[0].y }]}
          />
        )}
      </FlexibleXYPlot>
    </div>
  )
}

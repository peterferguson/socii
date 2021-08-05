import { tailwindColorMap } from "@lib/constants"
import { OHLC } from "@models/OHLC"
import React, { useEffect, useRef, useState } from "react"
import { Crosshair, FlexibleXYPlot, LineSeries } from "react-vis"

export interface IChartCardChart {
  data: OHLC
  pnlColor: string
}

export const ChartCardChart: React.FC<IChartCardChart> = ({
  data,
  pnlColor,
}: IChartCardChart) => {
  const middleDivRef = useRef(null)
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)
  const [crosshairValue, setCrosshairValue] = useState(false)

  // TODO: Convert this into a useElementSize() hook from https://usehooks-typescript.com/react-hook/use-element-size
  useEffect(() => {
    if (middleDivRef.current) {
      setHeight(middleDivRef.current.offsetHeight)
      setWidth(middleDivRef.current.offsetWidth)
    }
  }, [middleDivRef])

  const strokeWidth = 2
  const lineSeriesProps = {
    animation: true,
    opacityType: "literal",
    color: tailwindColorMap[pnlColor],
    strokeWidth,
    onNearestX: (d) => setCrosshairValue(d),
    data: data?.map((d) => {
      return {
        x: d.timestamp instanceof Date ? d.timestamp : new Date(d.timestamp),
        y: d.close,
      }
    }),
  }

  return (
    <div className="flex-grow w-2/4 mx-auto" ref={middleDivRef}>
      <FlexibleXYPlot
        height={height}
        width={width}
        className="mx-auto"
        margin={{ bottom: 0, left: 10, right: 10 }}
        onMouseLeave={() => setCrosshairValue(false)}
      >
        <LineSeries {...lineSeriesProps} />
        {crosshairValue && (
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

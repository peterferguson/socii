import { tailwindColorMap } from "@lib/constants"
import { OHLCTimeseries } from "@models/OHLCTimseries"
import React, { useEffect, useRef, useState } from "react"
import { FlexibleXYPlot, LineSeries } from "react-vis"

import dynamic from "next/dynamic"
import { TimeseriesTick } from "@models/TimeseriesTick"

const Crosshair = dynamic(() => import("react-vis").then((mod) => mod.Crosshair), {
  ssr: false,
}) as any

export interface IChartCardChart {
  data: OHLCTimeseries
  pnlColor: string
}

export const ChartCardChart: React.FC<IChartCardChart> = ({ data, pnlColor }) => {
  const middleDivRef = useRef(null)
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)
  const [crosshairValue, setCrosshairValue] = useState<TimeseriesTick>()

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
        onMouseLeave={() => setCrosshairValue(undefined)}
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

import { usePortfolioHistory } from "@hooks/usePortfolioHistory"
import { useWindowSize } from "@hooks/useWindowSize"
import { TimeseriesTick } from "@models/TimeseriesTick"
import { getEvenSpacedByOrderOfMagnitude } from "@utils/getEvenSpacedByOrderOfMagnitude"
import dayjs from "dayjs"
import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"
import {
  ChartLabel,
  Crosshair,
  FlexibleXYPlot,
  LineSeries,
  XAxis,
  YAxis,
} from "react-vis"

const PortfolioHistoryLineChart = ({ widthScale = 0.65, heightScale = 0.6 }) => {
  const [width, height] = useWindowSize()
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const [crosshairValue, setCrosshairValue] = useState<TimeseriesTick>()

  const { timeseries } = usePortfolioHistory()

  const lineSeriesProps = {
    animation: false,
    color: "#0fa9e6",
    opacityType: "literal",
    strokeWidth: 2,
    data: timeseries?.equity,
    curve: "curveMonotoneX",
    onNearestX: (data: TimeseriesTick) => setCrosshairValue(data),
  }

  const yDomain = getEvenSpacedByOrderOfMagnitude(timeseries?.equity.map(({ y }) => y))

  // TODO: add dashed line for the starting equity

  return timeseries ? (
    <div className="flex items-center justify-center mx-auto overscroll-x-contain">
      <FlexibleXYPlot
        onMouseLeave={() => setCrosshairValue(undefined)}
        height={height * heightScale}
        width={width * widthScale}
        xType="time"
        yDomain={[yDomain[0], yDomain[yDomain.length - 1]]}
        margin={{ left: 60, bottom: 75, top: 50 }}
      >
        {!is1Col && (
          <XAxis
            tickLabelAngle={-75}
            tickFormat={(d) => dayjs(d).format("DD/MM/YYYY")}
          />
        )}
        <YAxis hideLine tickValues={yDomain} />
        <ChartLabel
          text="Equity"
          includeMargin={false}
          xPercent={0}
          yPercent={0.06}
          style={{ textAnchor: "end" }}
        />
        <LineSeries {...lineSeriesProps} />
        {crosshairValue && (
          <Crosshair
            values={[crosshairValue]}
            titleFormat={(d) => ({
              title: "Date",
              value: new Date(d?.[0].x).toLocaleString(),
            })}
            itemsFormat={(d) => [{ title: "Equity", value: (d?.[0].y).toFixed(2) }]}
          />
        )}
      </FlexibleXYPlot>
    </div>
  ) : null // TODO: add loading state
}

export default PortfolioHistoryLineChart

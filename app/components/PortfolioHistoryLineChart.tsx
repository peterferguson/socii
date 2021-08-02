import { useWindowSize } from "@hooks/useWindowSize"
import { getQuartiles } from "@utils/quartiles"
import dayjs from "dayjs"
import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { Crosshair, FlexibleXYPlot, LineSeries, XAxis, YAxis } from "react-vis"
import { usePortfolioHistory } from "../hooks/usePortfolioHistory"

const PortfolioHistoryLineChart = ({ widthScale = 0.65, heightScale = 0.6 }) => {
  const [width, height] = useWindowSize()
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const [crosshairValue, setCrosshairValue] = useState(false)

  const [_history, timeseries] = usePortfolioHistory()

  const lineSeriesProps = {
    animation: true,
    color: "#0fa9e6",
    opacityType: "literal",
    strokeWidth: 2,
    data: timeseries?.equity,
    onNearestX: (data) => setCrosshairValue(data),
  }

  console.log(getQuartiles(timeseries?.equity.map((tick) => tick.y)))

  return timeseries ? (
    <div className="flex items-center justify-center mx-auto">
      <FlexibleXYPlot
        // onMouseLeave={() => setCrosshairValue(false)}
        height={height * heightScale}
        width={width * widthScale}
        xType="time"
        margin={{ left: 10, bottom: 75, top: 10 }}
      >
        {!is1Col && (
          <XAxis
            tickLabelAngle={-75}
            tickFormat={(d) => dayjs(d).format("DD/MM/YYYY")}
          />
        )}
        <YAxis
          hideLine
          tickValues={getQuartiles(timeseries?.equity.map((tick) => tick.y))}
          title="Equity"
          titleAngle={90}
        />
        <LineSeries {...lineSeriesProps} />
        {crosshairValue && (
          <Crosshair
            values={[crosshairValue]}
            titleFormat={(d) => ({
              title: "Date",
              value: new Date(d?.[0].x).toLocaleString(),
            })}
            itemsFormat={(d) => [{ title: "Equity", value: d?.[0].y }]}
          />
        )}
      </FlexibleXYPlot>
    </div>
  ) : null
}

export default PortfolioHistoryLineChart

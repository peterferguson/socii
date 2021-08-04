import LineChart from "@components/LineChart"
import { tailwindColorMap } from "@lib/constants"
import { pctChange } from "@utils/pctChange"
import { pnlTextColor } from "@utils/pnlTextColor"
import React, { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"

export default function Chart({ timeseries, price, color }) {
  const is1Col = !useMediaQuery({ minWidth: 640 })

  const [crosshairIndexValue, setCrosshairIndexValue] = useState(0)
  // const [gainColor, setGainColor] = useState("text-gray-400")

  // - Deserialize the timeseries data
  timeseries = timeseries?.map((d) => ({
    x: d.timestamp instanceof Date ? d.timestamp : new Date(d.timestamp),
    y: d.close,
  }))

  const latestClose = price.price
  const highlightedClose = timeseries?.[crosshairIndexValue]?.y
  let movingMonthlyClose = highlightedClose

  try {
    movingMonthlyClose = timeseries?.[crosshairIndexValue + 21]?.y
  } catch (err) {
    null
  }

  // const movingMonthlyPctChange = pctChange(highlightedClose, movingMonthlyClose)

  // const lastMonthPctChange = pctChange(latestClose, timeseries?.[21]?.y)

  // * Show the pct change of highlighted value versus today
  const highlightedChange = pctChange(latestClose, highlightedClose).toFixed(2)

  // useEffect(
  //   () => setGainColor(tailwindColorMap[pnlTextColor(lastMonthPctChange)]),
  //   [lastMonthPctChange]
  // )

  return (
    <div className="flex items-center justify-center w-full h-2/3 ">
      <div className="w-full p-2 m-4 bg-white shadow-lg rounded-xl">
        <div className="flex justify-between w-full h-20">
          <div className="flex-grow"></div>
          <div className="flex-none p-2 sm:p-4">
            <span className="z-10 text-lg leading-4 sm:text-4xl">
              ${highlightedClose}
              {highlightedChange && (
                <p className={`flex text-tiny ${pnlTextColor(highlightedChange)}`}>
                  {`(${highlightedChange})%`}
                </p>
              )}
              <p className="flex text-gray-300 text-tiny">
                {`on ${timeseries[crosshairIndexValue].x.toLocaleDateString()}`}
              </p>
            </span>
          </div>
        </div>
        {timeseries ? (
          <LineChart
            crosshairIndexValue={crosshairIndexValue}
            color={color}
            setCrosshairIndexValue={setCrosshairIndexValue}
            timeseries={timeseries}
            heightScale={is1Col ? 0.35 : 0.6}
            widthScale={is1Col ? 0.8 : 0.65}
          />
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  )
}

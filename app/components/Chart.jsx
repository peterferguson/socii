import LineChart from "@components/LineChart"
import { pnlTextColor } from "@utils/pnlTextColor"
import React from "react"
import { useMediaQuery } from "react-responsive"

export default function Chart({
  timeseries,
  crosshairIndexValue,
  setCrosshairIndexValue,
  highlightedChange,
  highlightedClose,
  color,
}) {
  const is1Col = !useMediaQuery({ minWidth: 640 })
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

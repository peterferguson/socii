import { FlexibleXYPlot, LineSeries, Crosshair } from "react-vis"
import "react-vis/dist/style.css"
import React, { useRef, useEffect, useState } from "react"
import { tailwindColorMap } from "@lib/constants"
import { pctChange } from "@utils/helper"
import Link from "next/link"

export default function ChartCard({ logoUrl, tickerSymbol, shortName, data }) {
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)
  const [crosshairValue, setCrosshairValue] = useState(false)
  const strokeWidth = 2

  const middleDivRef = useRef(null)

  // TODO: Convert this into a useContainerSize hook
  useEffect(() => {
    if (middleDivRef.current) {
      setHeight(middleDivRef.current.offsetHeight)
      setWidth(middleDivRef.current.offsetWidth)
    }
  }, [middleDivRef])

  const closeDelta = pctChange(data?.[0].close, data[data.length - 1].close)

  const pnlColor =
    closeDelta > 0 ? "bg-teal-200" : closeDelta < 0 ? "bg-red-200" : "bg-brand"

  const lineSeriesProps = {
    animation: true,
    opacityType: "literal",
    color: tailwindColorMap[pnlColor],
    strokeWidth,
    onNearestX: (d) => setCrosshairValue(d),
    data: data.map((d) => {
      return {
        x: d.timestamp instanceof Date ? d.timestamp : new Date(d.timestamp),
        y: d.close,
      }
    }),
  }
  return (
    <>
      <div className="max-w-sm w-11/12 sm:w-1/2 lg:w-1/3 h-auto m-1">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden flex h-20 p-2">
          <div className="flex-none mx-auto justify-center rounded-full w-20">
            <Link href={`stock/${tickerSymbol}`}>
              <a>
                <img
                  className="shadow-lg rounded-full h-10 w-10 mx-auto"
                  src={logoUrl}
                  alt={`${tickerSymbol} logo`}
                />
              </a>
            </Link>
            <Link href={`stock/${tickerSymbol}`}>
              <a>
                <div className="text-center text-gray-600 uppercase text-tiny font-semibold tracking-wider">
                  {shortName}
                </div>
              </a>
            </Link>
            <Link href={`stock/${tickerSymbol}`}>
              <a>
                <div className="text-center text-gray-600 uppercase text-tiny font-semibold tracking-wider">
                  {tickerSymbol}
                </div>
              </a>
            </Link>
          </div>
          <div className="flex-grow mx-auto w-2/4" ref={middleDivRef}>
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
          <div className="flex flex-col items-center justify-center w-20">
            <div className="text-gray-600 uppercase text-sm font-semibold tracking-wider overflow-ellipsis overflow-hidden">
              ${data?.[0].close}
            </div>
            <div
              className={`${pnlColor} text-black text-tiny sm:text-xs px-2 rounded-full font-semibold w-full text-center inline-block`}
            >
              M: {closeDelta.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

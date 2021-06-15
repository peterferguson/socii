import { tailwindColorMap } from "@lib/constants"
import { pctChange } from "@utils/helper"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { Crosshair, FlexibleXYPlot, LineSeries } from "react-vis"
import "react-vis/dist/style.css"

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
      <div className="w-11/12 h-auto max-w-sm m-1 sm:w-1/2 lg:w-1/3">
        <div className="flex h-20 p-2 overflow-hidden bg-white rounded-lg shadow-2xl">
          <div className="justify-center flex-none w-20 mx-auto rounded-full">
            <Link href={`stock/${tickerSymbol}`}>
              <a>
                <Image
                  className="w-10 h-10 mx-auto rounded-full shadow-lg"
                  src={logoUrl}
                  alt={`${tickerSymbol} logo`}
                />
              </a>
            </Link>
            <Link href={`stock/${tickerSymbol}`}>
              <a>
                <div className="font-semibold tracking-wider text-center text-gray-600 uppercase text-tiny">
                  {shortName}
                </div>
              </a>
            </Link>
            <Link href={`stock/${tickerSymbol}`}>
              <a>
                <div className="font-semibold tracking-wider text-center text-gray-600 uppercase text-tiny">
                  {tickerSymbol}
                </div>
              </a>
            </Link>
          </div>
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
          <div className="flex flex-col items-center justify-center w-20">
            <div className="overflow-hidden text-sm font-semibold tracking-wider text-gray-600 uppercase overflow-ellipsis">
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

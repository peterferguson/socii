import { FlexibleXYPlot, LineSeries, Crosshair } from "react-vis";
import "react-vis/dist/style.css";
import { useRef, useEffect, useState } from "react";
import { pctChange } from "@utils/helper";

export default function ChartCard({
  logoUrl,
  tickerSymbol,
  shortName,
  data,
}) {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [crosshairValue, setCrosshairValue] = useState(false);
  const strokeWidth = 2;

  const middleDivRef = useRef(null);

  useEffect(() => {
    if (middleDivRef.current) {
      setHeight(middleDivRef.current.offsetHeight);
      setWidth(middleDivRef.current.offsetWidth);
    }
  }, [middleDivRef]);
  
  const closeDelta = pctChange(data[0].close, data[data.length - 1].close);

  const profitabilityColor =
    closeDelta > 0 ? "bg-teal-200" : closeDelta < 0 ? "bg-red-200" : "bg-brand";

  const tailwindColorMap = {
    "bg-teal-200": "#99F6E4",
    "bg-red-200": "#FECACA",
    "bg-brand": "#0fa9e6",
  };

  const lineSeriesProps = {
    animation: true,
    opacityType: "literal",
    color: tailwindColorMap[profitabilityColor],
    strokeWidth,
    onNearestX: (d) => setCrosshairValue(d),
    data: data.map((d) => {
      return {
        x: d.timestamp instanceof Date ? d.timestamp : new Date(d.timestamp),
        y: d.close,
      };
    }),
  };
  return (
    <>
      <div className="max-w-sm w-full sm:w-1/2 lg:w-1/3 h-auto m-1">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden flex h-20 p-2">
          <div className="flex-none mx-auto justify-center rounded-full w-20">
            <img
              className="shadow-lg rounded-full h-10 w-10 mx-auto"
              src={logoUrl}
              alt={`${tickerSymbol} logo`}
            />
            <div className="text-center text-gray-600 uppercase text-tiny font-semibold tracking-wider">
              {shortName}
            </div>
            <div className="text-center text-gray-600 uppercase text-tiny font-semibold tracking-wider">
              {tickerSymbol}
          </div>
            </div>
          <div
            className="flex-grow mx-auto w-2/4"
            ref={middleDivRef}
          >
            <FlexibleXYPlot
              height={height}
              width={width}
              className="mx-auto"
              margin={{bottom: 0, left: 10, right: 10}} 
              onMouseLeave={() => setCrosshairValue(false)}
            >
              <LineSeries {...lineSeriesProps} />
              {crosshairValue && (
                <Crosshair
                  values={[crosshairValue]}
                  titleFormat={(d) => ({
                    title: "Date",
                    value: new Date(d[0].x).toLocaleDateString(),
                  })}
                  itemsFormat={(d) => [{ title: "Close price", value: d[0].y }]}
                />
              )}
            </FlexibleXYPlot>
          </div>
          <div className="flex flex-col items-center justify-center w-20">
            <div className="text-gray-600 uppercase text-sm font-semibold tracking-wider overflow-ellipsis overflow-hidden">
              ${data[0].close}
            </div>
            <div
              className={`${profitabilityColor} text-black text-tiny sm:text-xs px-2 rounded-full font-semibold w-full text-center inline-block`}
            >
              M: {closeDelta.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

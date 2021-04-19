import { FlexibleXYPlot, LineSeries } from "react-vis";
import "react-vis/dist/style.css";
import { useRef, useEffect, useState } from "react";

export default function ChartCard({
  logoUrl,
  tickerSymbol,
  shortName,
  data,
  className,
}) {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const strokeWidth = 2;

  const middleDivRef = useRef(null);

  useEffect(() => {
    if (middleDivRef.current) {
      setHeight(middleDivRef.current.offsetHeight);
      setWidth(middleDivRef.current.offsetWidth);
    }
  }, [middleDivRef]);

  const closeDelta = data[0].close - data[data.length - 1].close;
  const profitabilityColor =
    closeDelta > 0 ? "bg-teal-200" : closeDelta < 0 ? "bg-red-200" : "bg-brand";

  const lineSeriesProps = {
    animation: true,
    opacityType: "literal",
    // color: profitabilityColor,
    strokeWidth,
    data: data.map((d) => {
      return {
        x: d.date instanceof Date ? d.date : new Date(d.date),
        y: d.close,
      };
    }),
    className: `${className} ${profitabilityColor}`,
  };
  return (
    <>
      <div className="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden flex">
          <div className="bg-cover bg-center w-10 h-10 rounded-full m-4">
            <img
              className="shadow-lg rounded-full h-auto w-10"
              src={logoUrl}
              alt={`${tickerSymbol} logo`}
            />
            <div className="text-gray-600 uppercase text-xs font-semibold tracking-wider overflow-ellipsis overflow-hidden">
              {tickerSymbol} &bull; {shortName}
            </div>
          </div>
          <div
            className="flex-auto justify-center items-center w-10 h-10 rounded-full m-4"
            ref={middleDivRef}
          >
            <FlexibleXYPlot height={height} width={width}>
              <LineSeries {...lineSeriesProps} />
            </FlexibleXYPlot>
          </div>
          <div className="text-gray-600 uppercase text-xs font-semibold tracking-wider overflow-ellipsis overflow-hidden">
            ${data[0].close}
          </div>
        </div>
      </div>
    </>
  );
}

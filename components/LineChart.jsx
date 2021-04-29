import {
  FlexibleXYPlot,
  XAxis,
  LineSeries,
  AreaSeries,
  Crosshair,
} from "react-vis";
import { useWindowSize } from "@lib/hooks";
import "react-vis/dist/style.css";
import { useState } from "react";
import { tailwindColorMap } from "@lib/constants";

export default function LineChart({ timeseries, setCrosshairIndexValue }) {
  const [width, height] = useWindowSize();

  const [crosshairValue, setCrosshairValue] = useState(false);

  const lineSeriesProps = {
    animation: true,
    color: "#0fa9e6",
    opacityType: "literal",
    strokeWidth: 2,
    data: timeseries,
    onNearestX: (data, { index }) => {
      setCrosshairValue(data);
      setCrosshairIndexValue(index);
    },
  };

  // const areaSeriesProps = {
  //   animation: true,
  //   color: tailwindColorMap[],
  //   curve: "curveNatural",
  //   opacityType: "literal",
  //   strokeWidth: 2,
  //   data: timeseries,
  // };

  return (
    <div className="flex mx-auto items-center justify-center">
      <FlexibleXYPlot
        onMouseLeave={() => setCrosshairIndexValue(0)}
        height={height * 0.6}
        width={width * 0.8}
        xType="time"
        margin={{ left: 10, bottom: 75, top: 10 }}
      >
        <XAxis
          tickLabelAngle={-75}
          tickFormat={(d) => d.toLocaleDateString()}
        />
        <LineSeries {...lineSeriesProps} />
        {/* {crosshairValue && <AreaSeries {...areaSeriesProps} />} */}
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
  );
}

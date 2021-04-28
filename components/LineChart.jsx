import { FlexibleXYPlot, XAxis, YAxis, LineSeries, Crosshair } from "react-vis";
import { useState } from "react";
import { useWindowSize } from "@lib/hooks";
import "react-vis/dist/style.css";

export default function LineChart(props) {
  const [width, height] = useWindowSize();
  const [crosshairValue, setCrosshairValue] = useState(false);
  const strokeWidth = 2;

  const lineSeriesProps = {
    animation: true,
    color: "#0fa9e6",
    opacityType: "literal",
    strokeWidth,
    data: props.data.map((d) => {
      return {
        x: typeof d.timestamp != "Date" ? new Date(d.timestamp) : d.timestamp,
        y: d.close,
      };
    }),
    onNearestX: (d) => setCrosshairValue(d),
    // style: { fill: "none" },
    className: { ...props.className },
  };

  return (
    <>
      <FlexibleXYPlot
        onMouseLeave={() => setCrosshairValue(false)}
        height={height * 0.6}
        width={width * 0.7}
        xType="time"
        margin={{ left: 75, bottom: 75, right: 75, top: 10 }}
      >
        <XAxis
          tickLabelAngle={-75}
          tickFormat={(d) => {
            return d.toLocaleDateString();
          }}
        />
        {/* <YAxis /> */}
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
    </>
  );
}

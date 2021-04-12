import { FlexibleXYPlot, XAxis, YAxis, LineSeries, Crosshair } from "react-vis";
import { useState } from "react";
import "react-vis/dist/style.css";

export default function LineChart(props) {
  const [crosshairValue, setCrosshairValue] = useState(false);
  const strokeWidth = 2;

  const lineSeriesProps = {
    animation: true,
    // className: "mark-series-example",
    color: props.colorType === "typeA" ? "#0D676C" : "#B52F93",
    colorRange: props.colorRanges[props.colorType],
    opacityType: "literal",
    strokeWidth,
    data: props.data.map((d) => {
      return {
        x: typeof d.date != "Date" ? new Date(d.date) : d.date,
        y: d.close,
      };
    }),
    onNearestX: (d) => setCrosshairValue(d),
    style: { fill: "none" },
  };

  
  return (
    <>
      <FlexibleXYPlot
        onMouseLeave={() => setCrosshairValue(false)}
        height={600}
        // width={800}
        xType="time"
        margin={{ left: 75, bottom: 75 }}
      >
        <XAxis
          tickLabelAngle={-75}
          tickFormat={(d) => {
            return d.toLocaleDateString();
          }}
        />
        <YAxis />
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

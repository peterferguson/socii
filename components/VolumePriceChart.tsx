import { storage } from "@lib/firebase";

import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
  VerticalBarSeries,
  Crosshair,
} from "react-vis";
import { useState } from "react";
import "react-vis/dist/style.css";

export default function VolumePriceChart(props) {
  const [colorType, setColorType] = useState("typeA");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [crosshairValue, setCrosshairValue] = useState(false);

  const colorRanges = {
    typeA: ["#59E4EC", "#0D676C"],
    typeB: ["#EFC1E3", "#B52F93"],
  };

  const nextType = {
    typeA: "typeB",
    typeB: "typeA",
  };

  const lineSeriesProps = {
    animation: true,
    // className: "mark-series-example",
    color: colorType === "typeA" ? "#0D676C" : "#B52F93",
    colorRange: colorRanges[colorType],
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

  const barSeriesProps = {
    animation: true,
    className: "vertical-bar-series-example",
    color: colorType === "typeA" ? "#59E4EC" : "#EFC1E3",
    data: props.data.map((d) => {
      return {
        x: typeof d.date != "Date" ? new Date(d.date) : d.date,
        y: d.volumne,
      };
    }),
    // onNearestX: (d) => setCrosshairValue(d),
  };

  return (
    <div className="canvas-wrapper">
      <div className="canvas-example-controls">
        <div>
          <h1 color={colorType === "typeA" ? "#0D676C" : "#B52F93"}>
            {`Ticker: ${props.tickerSymbol}`}
          </h1>
        </div>
        <ShowcaseButton
          className="push-left"
          onClick={() => setColorType(nextType[colorType])}
          buttonContent={`TOGGLE COLOR to ${nextType[colorType]}`}
        />
        <ShowcaseButton
          onClick={() => setStrokeWidth(strokeWidth === 1 ? 2 : 1)}
          buttonContent={"TOGGLE STROKEWIDTH"}
        />
      </div>
      <XYPlot
        onMouseLeave={() => setCrosshairValue(false)}
        width={900}
        height={600}
        xType="time"
        margin={{ left: 100, bottom: 100 }}
      >
        <XAxis
          tickLabelAngle={-75}
          tickFormat={function tickFormat(d) {
            return d.toLocaleDateString();
          }}
        />
        <YAxis />
        <LineSeries {...lineSeriesProps} />
        <VerticalBarSeries {...barSeriesProps} />
        {crosshairValue && (
          <Crosshair
            values={[crosshairValue]}
            titleFormat={(d) => ({
              title: "Date",
              value: new Date(d[0].date).toLocaleDateString(),
            })}
            itemsFormat={(d) => [{ title: "Close price", value: d[0].close }]}
          />
        )}
      </XYPlot>
    </div>
  );
}
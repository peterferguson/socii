import ShowcaseButton from "@components/ShowcaseButton";
import { XYPlot, XAxis, YAxis, LineSeries, Crosshair } from "react-vis";
import { useState } from "react";
import "react-vis/dist/style.css";

export default function LineChart(props) {
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
        x: typeof d.date != 'Date' ? new Date(d.date) : d.date,
        y: d.close
      }
    }),
    onNearestX: (d) => setCrosshairValue(d),
    style: { fill: "none" },
  };


  return (
    <div className="canvas-wrapper">
      <div className="canvas-example-controls">
        <div>
          <h1 color={colorType === "typeA" ? "#0D676C" : "#B52F93"}>
            {`Ticker: ${props.tickerSymbol}`}
          </h1>
            <ShowcaseButton
              className="card"
              onClick={() => setColorType(nextType[colorType])}
              buttonContent={`Toggle Color`}
              />
              </div>
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
        {crosshairValue && (
          <Crosshair
            values={[crosshairValue]}
            titleFormat={(d) => ({
              title: "Date",
              value: new Date(d[0].x).toLocaleDateString(),
            })}
            itemsFormat={(d) => [
              { title: "Close price", value: d[0].y },
            ]}
          />
        )}
      </XYPlot>
    </div>
  );
}

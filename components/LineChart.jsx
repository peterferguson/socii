import ShowcaseButton from "@components/ShowcaseButton";
import { XYPlot, XAxis, YAxis, LineSeries, Crosshair } from "react-vis";
import { useState } from "react";
import "react-vis/dist/style.css";

export default function LineChart(props) {
  const [colorType, setColorType] = useState("typeA");
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [crosshairValue, setCrosshairValue] = useState(false);

  const colorRanges = {
    typeA: ["#59E4EC", "#0D676C"],
    typeB: ["#EFC1E3", "#B52F93"],
  };

  const nextType = {
    typeA: "typeB",
    typeB: "typeA",
  };

  const getQuartiles = (someArray) => {
    const length = someArray.length;
    if (length < 4) return someArray;
    const values = [...someArray].sort((a, b) => a.y - b.y); //copy array fast and sort

    return [0.25, 0.5, 0.75].map((i) => {
      return length % 4 === 0
        ? (values[length * i].y + values[length * i + 1].y) / 2
        : values[Math.floor(length * i + 1)].y;
    });
  };

  const [q1, m, q3] = getQuartiles(props.data);
  const lineSeriesProps = {
    animation: true,
    className: "mark-series-example",
    sizeRange: [q1, q3],
    color: colorType === "typeA" ? "#0D676C" : "#B52F93",
    colorRange: colorRanges[colorType],
    opacityType: "literal",
    strokeWidth,
    data: props.data,
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

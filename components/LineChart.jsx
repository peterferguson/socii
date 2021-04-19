import { FlexibleXYPlot, XAxis, YAxis, LineSeries, Crosshair } from "react-vis";
import { useState, useLayoutEffect } from "react";
import "react-vis/dist/style.css";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};


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
        height={height*0.6}
        width={width*0.7}
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

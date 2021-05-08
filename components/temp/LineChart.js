import { curveCatmullRom } from "d3-shape";
import { XYPlot, XAxis, YAxis, ChartLabel, LineSeries } from "react-vis";

export default function LineChart() {
  return (
    <>
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-800">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Performance
                </h6>
                <h2 className="text-white text-xl font-semibold">
                  Portfolio Value
                </h2>
              </div>
            </div>
          </div>
          <div className="p-4 flex-auto">
            {/* Chart */}
            <div  className="relative" style={{ height: "350px" }}>
              <XYPlot width={300} height={350}>
                <XAxis />
                <YAxis />
                <ChartLabel
                  text="X Axis"
                  className="alt-x-label"
                  includeMargin={false}
                  xPercent={0.025}
                  yPercent={1.01}
                />

                <ChartLabel
                  text="Y Axis"
                  className="alt-y-label"
                  includeMargin={false}
                  xPercent={0.06}
                  yPercent={0.06}
                  style={{
                    transform: "rotate(-90)",
                    textAnchor: "end",
                  }}
                />
                <LineSeries
                  className="first-series"
                  data={[
                    { x: 1, y: 3 },
                    { x: 2, y: 5 },
                    { x: 3, y: 15 },
                    { x: 4, y: 12 },
                  ]}
                />
                <LineSeries className="second-series" data={null} />
                <LineSeries
                  className="third-series"
                  curve={"curveMonotoneX"}
                  data={[
                    { x: 1, y: 10 },
                    { x: 2, y: 4 },
                    { x: 3, y: 2 },
                    { x: 4, y: 15 },
                  ]}
                />
                <LineSeries
                  className="fourth-series"
                  curve={curveCatmullRom.alpha(0.5)}
                  data={[
                    { x: 1, y: 7 },
                    { x: 2, y: 11 },
                    { x: 3, y: 9 },
                    { x: 4, y: 2 },
                  ]}
                />
              </XYPlot>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

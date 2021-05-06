// import React from "react";

// import { Chart, Tooltip, CategoryScale, LinearScale, Title } from 'chart.js';
// Chart.register(Tooltip, CategoryScale, LinearScale, Title);

// export default function LineChart() {
//   React.useEffect(() => {
//     var config = {
//       type: "line",
//       data: {
//         labels: [
//           "January",
//           "February",
//           "March",
//           "April",
//           "May",
//           "June",
//           "July",
//         ],
//         datasets: [
//           {
//             label: new Date().getFullYear(),
//             backgroundColor: "#4c51bf",
//             borderColor: "#4c51bf",
//             data: [65, 78, 66, 44, 56, 67, 75],
//             fill: false,
//           },
//           {
//             label: new Date().getFullYear() - 1,
//             fill: false,
//             backgroundColor: "#ed64a6",
//             borderColor: "#ed64a6",
//             data: [40, 68, 86, 74, 56, 60, 87],
//           },
//         ],
//       },
//       options: {
//         maintainAspectRatio: false,
//         responsive: true,
//         title: {
//           display: false,
//           text: "Sales Charts",
//           fontColor: "white",
//         },
//         legend: {
//           labels: {
//             fontColor: "white",
//           },
//           align: "end",
//           position: "bottom",
//         },
//         tooltips: {
//           mode: "index",
//           intersect: false,
//         },
//         hover: {
//           mode: "nearest",
//           intersect: true,
//         },
//         scales: {
//           xAxes: [
//             {
//               ticks: {
//                 fontColor: "rgba(255,255,255,.7)",
//               },
//               display: true,
//               scaleLabel: {
//                 display: false,
//                 labelString: "Month",
//                 fontColor: "white",
//               },
//               gridLines: {
//                 display: false,
//                 borderDash: [2],
//                 borderDashOffset: [2],
//                 color: "rgba(33, 37, 41, 0.3)",
//                 zeroLineColor: "rgba(0, 0, 0, 0)",
//                 zeroLineBorderDash: [2],
//                 zeroLineBorderDashOffset: [2],
//               },
//             },
//           ],
//           yAxes: [
//             {
//               ticks: {
//                 fontColor: "rgba(255,255,255,.7)",
//               },
//               display: true,
//               scaleLabel: {
//                 display: false,
//                 labelString: "Value",
//                 fontColor: "white",
//               },
//               gridLines: {
//                 borderDash: [3],
//                 borderDashOffset: [3],
//                 drawBorder: false,
//                 color: "rgba(255, 255, 255, 0.15)",
//                 zeroLineColor: "rgba(33, 37, 41, 0)",
//                 zeroLineBorderDash: [2],
//                 zeroLineBorderDashOffset: [2],
//               },
//             },
//           ],
//         },
//       },
//     };
//     var ctx = document.getElementById("line-chart").getContext("2d");
//     window.myLine = new Chart(ctx, config);
//   }, []);
//   return (
//     <>
//       <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
//         <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-800">
//           <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
//             <div className="flex flex-wrap items-center">
//               <div className="relative w-full max-w-full flex-grow flex-1">
//                 <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
//                   Overview
//                 </h6>
//                 <h2 className="text-white text-xl font-semibold">
//                   Sales value
//                 </h2>
//               </div>
//             </div>
//           </div>
//           <div className="p-4 flex-auto">
//             {/* Chart */}
//             <div className="relative" style={{ height: "350px" }}>
//               <canvas id="line-chart"></canvas>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React from 'react';
import {curveCatmullRom} from 'd3-shape';

import {
  XYPlot,
  XAxis,
  YAxis,
  ChartLabel,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries
} from 'react-vis';

export default class LineChart extends React.Component {
  render() {
    return (
      <div>
        <XYPlot width={300} height={300}>
          <HorizontalGridLines />
          <VerticalGridLines />
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
              transform: 'rotate(-90)',
              textAnchor: 'end'
            }}
            />
          <LineSeries
            className="first-series"
            data={[{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}]}
          />
          <LineSeries className="second-series" data={null} />
          <LineSeries
            className="third-series"
            curve={'curveMonotoneX'}
            data={[{x: 1, y: 10}, {x: 2, y: 4}, {x: 3, y: 2}, {x: 4, y: 15}]}
            strokeDasharray={'7, 3'}
          />
          <LineSeries
            className="fourth-series"
            curve={curveCatmullRom.alpha(0.5)}
            style={{
              // note that this can not be translated to the canvas version
              strokeDasharray: '2 2'
            }}
            data={[{x: 1, y: 7}, {x: 2, y: 11}, {x: 3, y: 9}, {x: 4, y: 2}]}
          />
        </XYPlot>
      </div>
    );
  }
}
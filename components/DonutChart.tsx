import { useState } from "react";
import { RadialChart, Hint } from "react-vis";
import { useWindowSize } from "@lib/hooks";
import "react-vis/dist/style.css";

export default function DonutChart({
  data,
  scaling,
  radius,
  className,
  text,
  scaleToWindow = false,
  skeleton = false,
}) {
  const [value, setValue] = useState(false);

  var width = 350;
  var height = 300;

  if (scaleToWindow) {
    [width, height] = useWindowSize();
  }

  const chartProps = {
    data,
    className,
    width,
    height,
    innerRadius: radius * scaling,
    radius: radius * 1.4 * scaling,
    getAngle: (d) => d.theta,
    onValueMouseOver: (v) => setValue(v),
    onSeriesMouseOut: () => setValue(false),
    padAngle: 0.02,
    colorType: skeleton ? "literal" : "linear",
  };

  return (
    <RadialChart {...chartProps}>
      <div className="font-poppins text-xl -mt-44 mx-auto w-full text-center text-gray-600 z-1">
        {text.main}
        <div className="font-poppins text-lg mx-auto">
          {text.sub}
        </div>
      </div>
      {value !== false && skeleton === false && <Hint value={value} />}
    </RadialChart>
  );
}

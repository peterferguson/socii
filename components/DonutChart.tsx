import { useState } from "react";
import { RadialChart, Hint } from "react-vis";
import { useWindowSize } from "@lib/hooks";
import "react-vis/dist/style.css";
import { pnlTextColor } from "@utils/helper";

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


  // TODO: Add skeleton ternary for the portfolio header
  return (
    <RadialChart {...chartProps}>
      <div className="font-poppins text-xl -mt-46 mx-auto w-full text-center text-gray-600 z-1">
        <div className="uppercase text-tiny leading-4 ">portfolio</div>
        {text.main}
        <div className={`font-poppins text-lg mx-auto ${pnlTextColor(parseFloat(text.sub))}`}>
          {text.sub}
        </div>
      </div>
      {value !== false && skeleton === false && <Hint value={value} />}
    </RadialChart>
  );
}

import { useState } from "react";
import { RadialChart, Hint } from "react-vis";
import { useWindowSize } from "@lib/hooks";
import "react-vis/dist/style.css";

export default function SimpleRadialChart({
  data,
  scaling,
  radius,
  className,
}) {
  const [value, setValue] = useState(false);

  return (
    <RadialChart
      className={`ml-2 ${className}`}
      innerRadius={radius * scaling}
      radius={radius * 1.4 * scaling}
      getAngle={(d) => d.theta}
      data={data}
      onValueMouseOver={(v) => setValue(v)}
      onSeriesMouseOut={() => setValue(false)}
      width={400}
      height={300}
      padAngle={0.02}
    >
      <div className="font-poppins text-x -mt-44 mx-auto w-full text-center text-black z-1">
        Price
        <div className="font-poppins text-lg">%pct</div>
      </div>
      {value !== false && <Hint value={value} />}
    </RadialChart>
  );
}

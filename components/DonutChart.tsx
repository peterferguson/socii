
import { useState } from "react";
import { RadialChart, Hint } from "react-vis";
import "react-vis/dist/style.css"

export default function SimpleRadialChart() {
  const [value, setValue] = useState(false);
  return (
    <RadialChart
      innerRadius={100}
      radius={140}
      getAngle={(d) => d.theta}
      data={[
        { theta: 1 },
      ]}
      onValueMouseOver={(v) => setValue(v)}
      onSeriesMouseOut={() => setValue(false)}
      width={300}
      height={300}
      padAngle={0.04}
    >
      {value !== false && <Hint value={value} />}
    </RadialChart>
  );
}

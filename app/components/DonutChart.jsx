import { pnlTextColor } from "@utils/pnlTextColor"
import { useWindowSize } from "@hooks"
import React, { useState } from "react"
import { Hint, RadialChart } from "react-vis"
import "react-vis/dist/style.css"

function DonutChart({
  data,
  scaling,
  radius,
  className,
  text,
  scaleToWindow = false,
  skeleton = false,
}) {
  const [value, setValue] = useState(false)
  let [width, height] = useWindowSize()
  if (!scaleToWindow) {
    width = 350
    height = 300
  }

  const chartProps = {
    data,
    className,
    width,
    height,
    innerRadius: radius * scaling,
    radius: radius * 1.2 * scaling,
    getAngle: (d) => d.theta,
    onValueMouseOver: (v) => setValue(v),
    onSeriesMouseOut: () => setValue(false),
    padAngle: 0.02,
    colorType: skeleton ? "literal" : "linear",
  }

  // TODO: Add skeleton ternary for the portfolio header
  return (
    <>
      {data && (
        <RadialChart {...chartProps}>
          <div className="w-full mx-auto text-xl text-center text-gray-600 font-primary -mt-52 z-1">
            <div className="uppercase text-tiny leading-4 ">portfolio</div>
            {text.main}
            <div
              className={`font-primary text-lg mx-auto ${pnlTextColor(
                parseFloat(text.sub)
              )}`}
            >
              <div className="w-5/12 h-1 my-3 border-gray-200 ml-[6.5rem] border-b-[0.5px]" />
              <div className="uppercase text-tiny leading-4 ">gain</div>

              {text.sub}
            </div>
          </div>
          {value !== false && skeleton === false && <Hint value={value} />}
        </RadialChart>
      )}
    </>
  )
}

export default React.memo(DonutChart)

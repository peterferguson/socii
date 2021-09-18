import { pnlTextColor } from "@utils/pnlTextColor"
import { useWindowSize } from "@hooks"
import React, { useEffect, useState } from "react"
import { Hint, RadialChart } from "react-vis"
import "react-vis/dist/style.css"
import Tooltip from "./Tooltip"

// - unlikely to have more than 15 colors needed for the chart
const colors = [
  "#ff72b4", // - brand pink
  "#f778c2",
  "#ed7ecf",
  "#e185db",
  "#d38be5",
  "#c592ed",
  "#b598f4",
  "#a59ef9",
  "#94a4fb",
  "#83a9fc",
  "#72adfc",
  "#62b1f9",
  "#53b5f6",
  "#47b7f1",
  "#3fbaeb", // - brand color
]

const getInwardAlternatingColors = (index) => {
  // * 0, -1, 1, -2, 2, ...
  const ordinal = 0.25 * (-1 + (1 - 2 * (index + 1)) * (-1) ** (index + 1))
  return colors.slice(ordinal)[0]
}

function DonutChart({
  data,
  scaling,
  radius,
  className,
  text,
  scaleToWindow = false,
  skeleton = false,
}) {
  const [value, setValue] = useState(undefined)

  const [chartData, setChartData] = useState(
    data?.map((d, index) => {
      return { ...d, color: getInwardAlternatingColors(index) }
    })
  )
  let [width, height] = useWindowSize()
  if (!scaleToWindow) {
    width = 350
    height = 300
  }

  const positiveGain = parseFloat(text.gain) > 0 ? true : false
  const gainColor = pnlTextColor(parseFloat(text.gain))

  const [cashInPortfolio, setCashInPortfolio] = useState(false)
  const toggleCashInPortfolio = () => setCashInPortfolio(!cashInPortfolio)

  // TODO: refactor the usage of text & also generalise this component
  useEffect(() => {
    const portfolioValue = parseFloat(text.portfolio?.slice(1))
    const cashValue = parseFloat(text.cash?.slice(1))

    if (cashInPortfolio) {
      setChartData((prevData) =>
        prevData
          ?.map((d) => ({
            ...d,
            theta: (d.theta * portfolioValue) / (cashValue + portfolioValue),
          }))
          .concat([
            {
              theta: cashValue / (cashValue + portfolioValue),
              label: "Cash",
              isCash: true,
              color: getInwardAlternatingColors(data?.length),
            },
          ])
      )
    }
    if (!cashInPortfolio && chartData?.slice().pop()?.isCash) {
      // - remove cash from data & update return pct values to equity
      setChartData((prevData) =>
        prevData?.slice(0, -1)?.map((d) => ({
          ...d,
          theta: (d.theta * (portfolioValue + cashValue)) / portfolioValue,
        }))
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashInPortfolio])

  const chartProps = {
    className,
    width,
    height,
    innerRadius: radius * scaling,
    radius: radius * 1.2 * scaling,
    getAngle: (d) => d.theta,
    onValueMouseOver: (v) => {
      const newValue = {
        Name: v.label,
        [`${v.isCash ? "Cash" : "Portfolio"} %`]: (v.theta * 100).toFixed(2),
      }
      if (v?.subLabel) newValue.Symbol = v.subLabel
      setValue(newValue)
    },
    onSeriesMouseOut: () => setValue(undefined),
    onSeriesTouchEnd: () => setValue(undefined),
    padAngle: 0.02,
    colorType: "literal",
  }

  // TODO: Add skeleton ternary for the portfolio header
  return (
    <>
      {data && (
        <RadialChart {...chartProps} data={chartData}>
          <div className="absolute w-full mx-auto text-xl text-center text-gray-600 top-[5.5rem] font-primary z-1">
            <div className="uppercase text-tiniest leading-4 ">portfolio</div>
            {text.portfolio}
            <div
              className={`absolute text-tiny leading-4 ${gainColor} inset-0 inset-y-11`}
            >
              {positiveGain ? "+" : "-"}
              {text.gain}
            </div>
            <div
              className="mx-auto text-lg cursor-pointer font-primary"
              onClick={toggleCashInPortfolio}
            >
              <div className="w-5/12 h-1 my-5 mb-3 border-gray-200 ml-[6.5rem] border-b-[0.5px]" />
              <Tooltip
                text={cashInPortfolio ? "Remove Cash From Chart" : "Add Cash To Chart"}
                className="absolute inset-x-[6.5rem] w-2/5 inset-y-20"
              >
                <div className="uppercase text-tiny leading-4">Cash</div>
                {text.cash}
              </Tooltip>
            </div>
          </div>
          {value !== undefined && skeleton === false && <Hint value={value} />}
        </RadialChart>
      )}
    </>
  )
}

export default React.memo(DonutChart)

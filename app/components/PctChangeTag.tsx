import { pnlBackgroundColor } from "@utils/pnlBackgroundColor"
import { pnlTextColor } from "@utils/pnlTextColor"
import React from "react"
import PnlArrow from "./PnlArrow"

const PctChangeTag = ({
  pctChange,
  bgColorIntensity = "200",
  textColorIntensity = "500",
}) => {
  const pnlBgColor = pnlBackgroundColor(pctChange).replace("200", bgColorIntensity)
  const pnlTxtColor = pnlTextColor(pctChange).replace("200", textColorIntensity)
  const pnlColors = `${pnlBgColor} ${pnlTxtColor}`

  return (
    <>
      {pctChange !== null && (
        <div
          className={`ml-1 ${pnlColors} text-xs font-semibold inline-block py-1 px-2 rounded-full uppercase mt-1`}
        >
          <div className="flex flex-row items-center justify-between">
            <PnlArrow change={pctChange} />
            <span className="ml-0.5">{(100 * pctChange).toFixed(2)}%</span>
          </div>
        </div>
      )}
    </>
  )
}
export default React.memo(PctChangeTag)

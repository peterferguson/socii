import { pnlBackgroundColor } from "@utils/pnlBackgroundColor"
import React from "react"

// TODO: Send this the correct data. It should be what that stocks contributed to the portfolios overall gain.

const GainPctBar = ({ gainPct }) => {
  const gainColor = pnlBackgroundColor(gainPct)
  return (
    <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
      <div className="flex items-center space-x-1">
        <span className="">{gainPct * 100}%</span>
        <div className="w-full">
          <div className="flex h-2 overflow-hidden bg-red-200 rounded text-tiny">
            <div
              style={{ width: `${gainPct * 100}%` }}
              className={`flex flex-col justify-center text-center text-white ${gainColor}`}
            />
          </div>
        </div>
      </div>
    </td>
  )
}

export default GainPctBar

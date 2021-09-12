import { usePositions } from "@hooks/usePositions"
import React from "react"
import StockTableBody from "./StockTableBody"
import StockTableHeader from "./StockTableHeader"

// - callback to be used in positions array map
const addPctOfTotalGain = (position, _idx, positions) => ({
  ...position,
  gainPct:
    (parseFloat(position.unrealizedPl) * 100) /
    positions.map((p) => parseFloat(p.unrealizedPl)).reduce((a, b) => a + b, 0),
})

const StockTable = ({ stockTableMeta, title = "Holdings Breakdown" }) => {
  const { positions } = usePositions()
  console.log(positions?.map(addPctOfTotalGain))

  return (
    <StockTableTitle title={title}>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <StockTableHeader headings={Object.keys(stockTableMeta)} />
          {positions && (
            <StockTableBody
              positions={positions.map(addPctOfTotalGain)}
              meta={stockTableMeta}
            />
          )}
        </table>
      </div>
    </StockTableTitle>
  )
}
const StockTableTitle = ({ title, children }) => (
  <div className="w-full mb-12 xl:mb-0 no-scrollbar">
    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white shadow-lg rounded-2xl">
      <div className="px-4 py-3 mb-0 border-0 rounded-t">
        <div className="flex flex-wrap items-center">
          <div className="relative flex-1 flex-grow w-full max-w-full">
            <h3 className="text-base font-semibold text-blueGray-700">{title}</h3>
          </div>
        </div>
      </div>
      {children}
    </div>
  </div>
)
export default StockTable

import React from "react"
import usePositions from "@hooks/usePositions"

const StockTable = ({ stockTableMeta, title = "Holdings Breakdown" }) => {
  // const positions = usePositions()
  const positions = [
    {
      asset_id: "904837e3-3b76-47ec-b432-046db621571b",
      symbol: "AAPL",
      exchange: "NASDAQ",
      asset_class: "us_equity",
      avg_entry_price: "100.0",
      qty: "5",
      side: "long",
      market_value: "600.0",
      cost_basis: "500.0",
      unrealized_pl: "100.0",
      unrealized_plpc: "0.20",
      unrealized_intraday_pl: "10.0",
      unrealized_intraday_plpc: "0.0084",
      current_price: "120.0",
      lastday_price: "119.0",
      change_today: "0.0084",
    },
  ]
  return (
    <div className="w-full px-4 mb-12 xl:mb-0">
      <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white shadow-lg rounded-2xl">
        <div className="px-4 py-3 mb-0 border-0 rounded-t">
          <div className="flex flex-wrap items-center">
            <div className="relative flex-1 flex-grow w-full max-w-full">
              <h3 className="text-base font-semibold text-blueGray-700">{title}</h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            {positions ? (
              <>
                <StockTableHeader headings={Object.keys(stockTableMeta)} />
                <StockTableBody positions={positions} meta={stockTableMeta} />
              </>
            ) : (
              // Add a loader if there are no positions
              <div>loading...</div>
            )}
          </table>
        </div>
      </div>
    </div>
  )
}

const StockTableHeader = ({ headings }) => (
  <thead>
    <tr>
      {headings.map((heading, i) => (
        <th
          key={`heading-${i}-${heading}`}
          className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap"
        >
          {heading}
        </th>
      ))}
    </tr>
  </thead>
)

const StockTableBody = ({ positions, meta }) => (
  <tbody>
    {positions.map((position, i) => (
      <tr key={`position-${i}`}>
        {Object.values(meta).map((row, j) => (
          <row.Component
            key={`position-${j}`}
            position={position}
            attr={row.alpacaAttr}
          />
        ))}
      </tr>
    ))}
  </tbody>
)

export default StockTable

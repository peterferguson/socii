import React from "react"

const StockTable = ({ positions, stockTableMeta, title = "Holdings Breakdown" }) => (
  <div className="w-full px-4 mb-12 xl:w-8/12 xl:mb-0">
    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg">
      <div className="px-4 py-3 mb-0 border-0 rounded-t">
        <div className="flex flex-wrap items-center">
          <div className="relative flex-1 flex-grow w-full max-w-full px-4">
            <h3 className="text-base font-semibold text-blueGray-700">{title}</h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        {/* Projects table */}
        <table className="items-center w-full bg-transparent border-collapse">
          <StockTableHeader headings={Object.keys(stockTableMeta)} />
          <StockTableBody positions={positions} meta={stockTableMeta} />
        </table>
      </div>
    </div>
  </div>
)

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

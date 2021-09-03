import React from "react"

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
export default StockTableHeader

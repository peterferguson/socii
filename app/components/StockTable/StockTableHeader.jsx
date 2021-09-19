import React from "react"

const StockTableHeader = ({ headings }) => (
  <thead>
    <tr>
      {headings.map((heading, i) => (
        <th
          key={`heading-${i}-${heading}`}
          className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle border border-l-0 border-r-0 border-gray-100 border-solid bg-gray-50 whitespace-nowrap"
        >
          {heading}
        </th>
      ))}
    </tr>
  </thead>
)
export default StockTableHeader

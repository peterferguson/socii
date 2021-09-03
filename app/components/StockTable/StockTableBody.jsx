import React from "react"

const StockTableBody = ({ positions, meta }) => (
  <tbody>
    {positions?.map((position, i) => (
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

export default StockTableBody

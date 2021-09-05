import React from "react"
import { useMediaQuery } from "react-responsive"

const StockTableBody = ({ positions, meta }) => {
  const is1Col = !useMediaQuery({ minWidth: 640 })
  return (
    <tbody>
      {positions?.map((position, i) => (
        <tr key={`position-${i}`} className="relative">
          {Object.values(meta).map((row, j) => (
            <row.Component
              key={`position-${j}`}
              position={position}
              attr={row.alpacaAttr}
              is1Col={is1Col}
            />
          ))}
        </tr>
      ))}
    </tbody>
  )
}
export default StockTableBody

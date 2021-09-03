import { GainPctBar } from "@components/GainPctBar"
import TickerLogo from "@components/TickerLogo"
import React from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

export const StockTableMeta = {
  Asset: {
    alpacaAttr: "symbol",
    Component: ({ position, attr, is1Col }) =>
      !is1Col ? (
        <TickerLogo tickerSymbol={position[attr]} width="20" height="20" />
      ) : (
        <td
          key={`position-${attr}`}
          className="p-4 px-6 text-center align-middle border-t-0 border-l-0 border-r-0 text-tiny font-primary whitespace-nowrap"
        >
          {position[attr]}
        </td>
      ),
  },
  Equity: {
    alpacaAttr: "marketValue",
    Component: ({ position, attr }) => (
      <td
        key={`position-${attr}`}
        className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
      >
        ${parseFloat(position[attr])?.toFixed(2)}
      </td>
    ),
  },
  Shares: {
    alpacaAttr: "qty",
    Component: ({ position, attr }) => (
      <td
        key={`position-${attr}`}
        className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
      >
        {parseFloat(position[attr])?.toFixed(2)}
      </td>
    ),
  },
  Gain: {
    alpacaAttr: "unrealizedPl",
    Component: ({ position, attr }) => (
      <td
        key={`position-${attr}`}
        className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
      >
        <div className="flex items-center">
          ${parseFloat(position[attr])?.toFixed(2)}
          {position[attr] > 0 ? (
            <FaArrowUp className="ml-2 mb-0.5 text-emerald-500" />
          ) : (
            <FaArrowDown className="ml-2 text-red-500 mb-0.5" />
          )}
        </div>
      </td>
    ),
  },
  "Gain %": {
    alpacaAttr: "unrealizedPlpc",
    Component: ({ position, attr, is1Col }) =>
      !is1Col ? (
        <GainPctBar
          key={`position-${attr}`}
          gainPct={parseFloat(position[attr])?.toFixed(2)}
        />
      ) : (
        <td
          key={`position-${attr}`}
          className="p-4 px-6 text-center align-middle border-t-0 border-l-0 border-r-0 text-tiny font-primary whitespace-nowrap"
        >
          {parseFloat(position[attr])?.toFixed(2)}
        </td>
      ),
  },
}

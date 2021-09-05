import { GainPctBar } from "@components/GainPctBar"
import TickerLogo from "@components/TickerLogo"
import React from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

export const StockTableMeta = {
  Asset: {
    alpacaAttr: "symbol",
    Component: ({ position, attr }) => (
      <td
        key={`position-${attr}`}
        className="flex items-center justify-center p-2 text-tiny"
      >
        <TickerLogo
          tickerSymbol={position[attr]}
          className="absolute w-5 h-5 left-2 top-1.5 sm:left-4 standalone:hidden" // TODO: standalone positioning
        />
        <div className="ml-4 standalone:ml-0">{position[attr]}</div>
      </td>
    ),
  },
  Equity: {
    alpacaAttr: "marketValue",
    Component: ({ position, attr }) => (
      <td
        key={`position-${attr}`}
        className="p-4 px-6 align-middle border-t-0 border-l-0 border-r-0 text-tiny whitespace-nowrap"
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
        className="p-4 px-6 align-middle border-t-0 border-l-0 border-r-0 text-tiny whitespace-nowrap"
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
        className="p-4 px-6 align-middle border-t-0 border-l-0 border-r-0 text-tiny whitespace-nowrap"
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
    alpacaAttr: "gainPct",
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

import { GainPctBar } from "@components/GainPctBar"
import { tickerToISIN } from "@lib/firebase/client/db"
import { logoUrl } from "@utils/logoUrl"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

export const StockTableMeta = {
  Asset: {
    alpacaAttr: "symbol",
    Component: ({ position, attr }) => {
      const [logoURL, setLogoURL] = useState(null)
      tickerToISIN(position[attr]).then((isin) => setLogoURL(logoUrl(isin)))
      return (
        <th className="flex items-center p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
          {logoURL ? (
            <Image
              src={logoURL}
              width="32px"
              height="32px"
              className="object-cover mx-auto rounded-full"
            />
          ) : (
            <Link href={`/stocks/${position?.[attr] || ""}`}>
              <div className="flex items-center justify-center w-6 h-6 mx-auto font-semibold text-gray-500 bg-gray-100 rounded-full shadow-lg text-tiny">
                {position[attr]}
              </div>
            </Link>
          )}
          <span className="ml-3">{position[attr]}</span>
        </th>
      )
    },
  },
  Equity: {
    alpacaAttr: "marketValue",
    Component: ({ position, attr }) => (
      <td
        key={`position-${attr}`}
        className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
      >
        ${position[attr]}
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
        {position[attr]}
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
          ${position[attr]}
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
    Component: ({ position, attr }) => (
      <GainPctBar key={`position-${attr}`} gainPct={position[attr]} />
    ),
  },
}

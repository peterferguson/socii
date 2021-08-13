import { pnlTextColor } from "@utils/pnlTextColor"
import Link from "next/link"
import React from "react"
import { TickerLogo } from "./TickerLogo"

export const AssetCard = ({ tickerSymbol, isin, shortName, price }) => (
  <>
    <header className="flex mb-auto flex-nowrap">
      <TickerLogo tickerSymbol={tickerSymbol} isin={isin} />
      <p className="p-2 truncate">{shortName}</p>
    </header>
    <Link href={`/stocks/${tickerSymbol}`}>
      <a className="relative py-8 mx-3 align-middle grid grid-cols-none">
        <h1 className="text-xl font-bold">{tickerSymbol}</h1>
        <div>
          <div className={`font-bold text-3xl ${pnlTextColor(price?.changePercent)}`}>
            ${price?.iexRealtimePrice?.toFixed(2)}
          </div>
        </div>
      </a>
    </Link>
  </>
)

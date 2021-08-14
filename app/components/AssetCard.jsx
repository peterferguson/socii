import { pnlTextColor } from "@utils/pnlTextColor"
import Link from "next/link"
import React from "react"
import { TickerLogo } from "./TickerLogo"

export const AssetCard = ({ tickerSymbol, isin, shortName, price }) => (
  <>
    <header className="flex mb-auto flex-nowrap">
      <TickerLogo tickerSymbol={tickerSymbol} isin={isin} />
    </header>
    <Link href={`/stocks/${tickerSymbol}`}>
      <a className="py-8 mx-3 grid grid-cols-none">
        <p className="py-1 text-lg tracking-tight font-primary">{shortName}</p>
        <h1 className="py-1 text-xl font-bold tracking-wider">{tickerSymbol}</h1>
        <div>
          <div className={`font-bold text-3xl ${pnlTextColor(price?.changePercent)}`}>
            ${(price?.iexRealtimePrice || price?.latestPrice)?.toFixed(2)}
          </div>
        </div>
      </a>
    </Link>
  </>
)

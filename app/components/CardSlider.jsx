import { AssetCard } from "@components/AssetCard"
import React from "react"

// TODO: Add a isActive state and only navigate on click of the active card

export default function CardSlider({ tickers }) {
  return (
    <section className="flex p-12 overflow-x-scroll no-scrollbar">
      {tickers.map(({ ticker, queryData, price }, i) => {
        return (
          <article
            key={`slider-card-${i}`}
            className="border-l-4 slide-card"
            style={{ borderColor: ticker?.logoColor }}
          >
            <AssetCard
              tickerSymbol={ticker?.tickerSymbol}
              logoUrl={ticker?.logoUrl}
              shortName={ticker?.shortName}
              price={price}
              sectorData={queryData}
            />
          </article>
        )
      })}
    </section>
  )
}

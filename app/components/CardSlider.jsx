import { SectorAssetCard } from "@components/AssetCards"
import React from "react"

export default function CardSlider({ tickers }) {
  return (
    <section className="flex p-12 overflow-x-scroll">
      {tickers.map(({ ticker, queryData, price }, i) => {
        return (
          <article key={`slider-card-${i}`} className="slide-card">
            <SectorAssetCard
              tickerSymbol={ticker.tickerSymbol}
              logoUrl={ticker.logoUrl}
              shortName={ticker.shortName}
              price={price}
              sectorData={queryData}
            />
          </article>
        )
      })}
    </section>
  )
}

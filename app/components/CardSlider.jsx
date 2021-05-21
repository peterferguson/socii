import { AssetCard } from '@components/AssetCards'

export default function CardSlider({ tickerSymbols }) {
  return (
    <section className="flex p-12 overflow-x-scroll bg-gray-50">
      {tickerSymbols.map(({ ticker, timeseries, sector }) => {
        return (
          <article className="slide-card">
            <AssetCard ticker={ticker} timeseries={timeseries} sector={sector} />
          </article>
        )
      })}
    </section>
  )
}

import { pctChange, pnlTextColor } from "@utils/helper";
import Link from "next/link";

export default function CardSlider({ tickerSymbols }) {
  const pnlColors = tickerSymbols.map(({ timeseries }) =>
    pnlTextColor(
      pctChange(timeseries[0].close, timeseries[timeseries.length - 1].close)
    )
  );
  return (
    <section className="flex p-12 overflow-x-scroll bg-gray-50">
      {tickerSymbols.map(({ ticker, timeseries, sector }, index) => {
        return (
          <article className="slide-card">
            <Link href={`/stock/${ticker.tickerSymbol}`}>
              <a href={ticker.tickerSymbol}>
                <header className="flex flex-nowrap mb-auto">
                  <img
                    className="flex-none w-12 rounded"
                    src={ticker.logoUrl}
                    alt={`${ticker.tickerSymbol} logo`}
                  />
                  <p className="truncate p-2">{ticker.shortName}</p>
                </header>
              </a>
            </Link>
            <Link href={`/stock/${ticker.tickerSymbol}`}>
              <div className="py-8 mx-3 grid align-middle relative grid-cols-none">
                <h1 className="font-bold text-xl">{ticker.tickerSymbol}</h1>

                <div className="bpx-border">
                  <div className={`font-bold text-3xl ${pnlColors[index]}`}>
                    ${timeseries[timeseries.length - 1].close}
                  </div>
                  {/* Market Cap: {sector.marketCapitalization}
                Revenue Per Share TTM: {sector.revenuePerShareTTM}
                Quarterly Earnings Growth YOY ={" "}
                {sector.quarterlyEarningsGrowthYOY}
                Quarterly Revenue Growth YOY ={" "}
            {sector.quarterlyRevenueGrowthYOY} */}
                </div>
              </div>
            </Link>
            <div className="flex flex-col justify -mt-2 mb-8 pt-2 pb-4 leading-8">
              <a
                className="font-bold w-36 h-8 align-middle text-tiny truncate text-gray-400 uppercase border-2 rounded-3xl px-3"
                href={ticker.tickerSymbol}
              >
                {sector.sector}
              </a>
              <a
                className="font-bold w-36 h-8 align-middle text-tiny truncate text-gray-400 uppercase border-2 rounded-3xl px-3"
                href={ticker.tickerSymbol}
              >
                {sector.industry}
              </a>
            </div>
          </article>
        );
      })}
    </section>
  );
}

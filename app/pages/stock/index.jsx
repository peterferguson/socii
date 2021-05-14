import ChartCard from "@components/ChartCard";
import CardSlider from "@components/CardSlider";
import RightChevron from "@icons/rightChevron.svg";
import { firestore } from "@lib/firebase";
import { logoUrl, stockProps, isBrowser } from "@utils/helper";
import {
  TradingViewStockFundamentals,
  TradingViewStockTickerQuotes,
  TradingViewStockTickerTape,
} from "@components/TradingViewChart";

import Link from "next/link";

export default function StockDisplay({ tickerSymbols }) {
  // TODO: on click of chevron create a new view with only the popular stocks
  // TODO: large screen vertical cards - small horizontal cards
  const tickerViewSymbols = {
    symbols: tickerSymbols.map(({ ticker }) => {
      return {
        proName: `${ticker.exchange}:${ticker.tickerSymbol}`,
        title: ticker.tickerSymbol,
      };
    }),
  };
  return (
    <>
      <div className="flex flex-col">
        {isBrowser && (
          <>
            <TradingViewStockTickerQuotes />
            <TradingViewStockTickerTape tickerSymbols={tickerViewSymbols} />
          </>
        )}
      </div>
      <div>
        <Link href="/stock/popular">
          <div
            className="flex font-bold uppercase text-3xl font-work-sans px-4 pt-8 mb-4 \
                        cursor-pointer text-brand-dark"
          >
            Popular Stocks
            <div className="flex-grow" />
            <RightChevron className="mt-0.5 h-8 cursor-pointer" />
          </div>
        </Link>
        <CardSlider tickerSymbols={tickerSymbols} />
        <div className="bg-gray-50 flex flex-col items-center min-h-screen mt-8">
          {tickerSymbols.map(({ ticker, timeseries }) => {
            return (
              <ChartCard
                key={ticker.tickerSymbol}
                logoUrl={logoUrl(ticker.ISIN)}
                tickerSymbol={ticker.tickerSymbol}
                shortName={ticker.shortName}
                data={timeseries}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  // * Get ticker name from firestore
  const tickerQuery = firestore
    .collection("tickers")
    .where("isPopular", "==", true)
    .limit(5);
  return await stockProps(tickerQuery, "industry");
}

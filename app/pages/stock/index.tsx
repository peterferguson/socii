import ChartCard from "@components/ChartCard";
import CardSlider from "@components/CardSlider";
import RightChevron from "@icons/rightChevron.svg";
import Link from "next/link";
import { firestore } from "@lib/firebase";
import { stockProps } from "@utils/helper";

export default function StockDisplay({ tickerSymbols }) {
  // TODO: on click of chevron create a new view with only the popular stocks
  // TODO: large screen vertical cards - small horizontal cards
  return (
    <div>
      <Link href="/stock/popular">
        <div className="flex font-bold uppercase text-3xl font-work-sans px-4 pt-4 mb-4 \
                        cursor-pointer text-brand-dark">
          Popular Stocks
          <div className="flex-grow" />
          <RightChevron className="mt-0.5 h-8 cursor-pointer" />
        </div>
      </Link>
      <CardSlider tickerSymbols={tickerSymbols} />
      <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen">
        {tickerSymbols.map(({ ticker, timeseries }) => {
          return (
            <ChartCard
              logoUrl={logoUrl(ticker.ISIN)}
              tickerSymbol={ticker.tickerSymbol}
              shortName={ticker.shortName}
              data={timeseries}
              />
          );
        })}
      </div>
    </div>
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

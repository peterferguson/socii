import ChartCard from "@components/ChartCard";
import { firestore } from "@lib/firebase";

export default function StockDisplay({ tickerSymbols }) {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen">
      {tickerSymbols.map(({ ticker, timeseries }) => {
        return (
          <ChartCard
            logoUrl={ticker.logoUrl}
            tickerSymbol={ticker.tickerSymbol}
            shortName={ticker.shortName}
            data={timeseries}
          />
        );
      })}
    </div>
  );
}

export async function getStaticProps(context) {
  // * Get ticker name from firestore
  const tickerRef = firestore
    .collection("tickers")
    .where("isPopular", "==", true)
    .limit(10);

  const tickerDocs = await tickerRef.get();

  var tickerSymbols = [];

  for await (const tickerDoc of tickerDocs.docs) {
    // * Get ticker company data
    var ticker = await tickerDoc.data();
    ticker["timestamp"] = JSON.stringify(ticker.timestamp.toDate());
    ticker["timeseriesLastUpdated"] = JSON.stringify(
      ticker.timeseriesLastUpdated.toDate()
    );

    // * Get timeseries data
    const timeseriesRef = tickerDoc.ref
      .collection("timeseries")
      .orderBy("timestamp", "desc")
      .limit(30);

    var timeseriesDocs = (await timeseriesRef.get()).docs;

    const timeseries = timeseriesDocs.map((doc) => {
      return { ...doc.data(), timestamp: parseInt(doc.id) * 1000 };
    });

    tickerSymbols.push({ ticker, timeseries });
  }

  return {
    props: {
      tickerSymbols,
    },
  };
}

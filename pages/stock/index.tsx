import ChartCard from "@components/ChartCard";
import CardSlider from "@components/CardSlider";
import { firestore } from "@lib/firebase";

export default function StockDisplay({ tickerSymbols }) {
  return (
    <div className="bg-brand-light">
      <div className="font-bold uppercase text-3xl text-black px-4 pt-4 bg-gray-50">Popular Stocks</div>
      <CardSlider tickerSymbols={tickerSymbols}/>
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
    </div>
  );
}

export async function getStaticProps(context) {
  // * Get ticker name from firestore
  const tickerRef = firestore
    .collection("tickers")
    .where("isPopular", "==", true)
    .limit(5);

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
    
    // * Get sector & industry data
    const sectorRef = tickerDoc.ref
    .collection("data")
    .where("industry", ">", "''")
    .orderBy("industry", "asc")
    .limit(1);
    
    var sector = (await sectorRef.get()).docs[0].data();
    
    sector = { ...sector, lastUpdate: sector.lastUpdate.toMillis() };

    tickerSymbols.push({ ticker, timeseries, sector });
  }

  return {
    props: {
      tickerSymbols,
    },
  };
}

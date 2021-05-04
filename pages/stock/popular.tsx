import { AssetCard } from "@components/AssetCards";
import { firestore } from "@lib/firebase";

export default function Popular({ tickerSymbols }) {
  // TODO: on click of chevron create a new view with only the popular stocks
  // TODO: large screen vertical cards - small horizontal cards
  return (
    <div>
      <div className="flex mx-auto h-1/4 items-center justify-center">
        <div className="flex font-bold uppercase text-6xl font-work-sans text-brand-dark px-4 pt-4 m-12">
          Popular Stocks
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center">
        <div className="flex flex-wrap items-center justify-center min-h-screen">
          {tickerSymbols.map(({ ticker, timeseries, sector }) => {
            return (
              <div className="flex flex-col mx-auto my-4 bg-white p-4 rounded-lg shadow-lg w-52 sm:w-64">
                <AssetCard
                  ticker={ticker}
                  timeseries={timeseries}
                  sector={sector}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  // * Get ticker name from firestore
  const tickerRef = firestore
    .collection("tickers")
    .where("isPopular", "==", true);

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
      .limit(2);

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

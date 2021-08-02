import { firestore } from "@lib/firebase/client/firebase"

export const getTickerData = async (tickerSymbol) => {
  // - set the rate for the currency pair in local storage
  const tickerQuery = firestore
    .collectionGroup("data")
    .where("symbol", "==", tickerSymbol)
    .limit(1)
  // const [snapshot, loading, error] = useCollectionOnce(query, options);
  const tickerDoc = (await tickerQuery.get()).docs?.[0]
  const ISIN = tickerDoc.ref.path.split("/")[1]
  return { ...tickerDoc.data(), ISIN }
}

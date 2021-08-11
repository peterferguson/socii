import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { firestore } from "../firebase"

export const getLastMarketDay = async () => {
  const marketDayQuery = query(
    collection(firestore, `marketCalendar`),
    orderBy("date", "desc"),
    limit(1)
  )
  const marketDayDoc = (await getDocs(marketDayQuery)).docs?.pop()
  return marketDayDoc.data()
}

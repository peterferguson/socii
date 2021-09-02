import { MarketDay } from "@socii/shared/alpaca/models"
import { doc, setDoc } from "firebase/firestore"
import { firestore } from "."

export const setMarketDay = async (marketDay: MarketDay) => {
  const date = marketDay.date.replace(/-/g, "")
  const marketDayRef = doc(firestore, `marketCalendar/${date}`)
  await setDoc(marketDayRef, { ...marketDay, date: parseInt(date) })
  console.log(`Market day ${JSON.stringify(marketDay)} set`)
}

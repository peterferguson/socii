import { config, CalendarApi, MarketDay } from "@socii/shared/alpaca/index"
import { setMarketDay } from "@lib/firebase/client/db/setMarketDay"
import { getLastMarketDay } from "@lib/firebase/client/db/getLastMarketDay"

export const lastMarketDay = async () => {
  let lastDay = (await getLastMarketDay()) as MarketDay

  if (!lastDay) {
    const calendarClient = new CalendarApi(
      config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
    )

    const oneWeek = 60 * 60 * 24 * 1000 * 7 // - 1 week in ms
    const todayDateStr = new Date().toISOString().slice(0, 10)
    const startDateStr = new Date(new Date().getTime() - oneWeek)
      .toISOString()
      .slice(0, 10)

    const calendar = await calendarClient.calendarGet(startDateStr, todayDateStr)

    lastDay = calendar.filter(day => day.date !== todayDateStr).pop()

    await setMarketDay(lastDay)
  }

  return lastDay
}

import { config, CalendarApi } from "@alpaca/index"

export const lastMarketDay = async () => {
  const calendarClient = new CalendarApi(
    config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
  )

  const oneWeek = 60 * 60 * 24 * 1000 * 7 // - 1 week in ms
  const todayDateStr = new Date().toISOString().slice(0, 10)
  const startDateStr = new Date(new Date().getTime() - oneWeek)
    .toISOString()
    .slice(0, 10)

  const calendar = await calendarClient.calendarGet(startDateStr, todayDateStr)

  return calendar.filter((day) => day.date !== todayDateStr).pop()
}

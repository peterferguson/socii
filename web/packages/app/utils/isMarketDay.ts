import { config, CalendarApi } from "@socii/shared/alpaca/index"

export const isMarketDay = async (date: Date | string | number) => {
  const calendarClient = new CalendarApi(
    config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
  )

  // - convert to a Date object
  const timestamp: Date =
    typeof date === "string"
      ? new Date(date)
      : typeof date === "number"
      ? new Date(date / 1e10 < 1 ? date * 1000 : date)
      : date

  // - ensure it is market hours
  timestamp.setHours(16)

  const oneDay = 60 * 60 * 24 * 1000 // - 1 day in ms
  const timestampDateStr = timestamp.toISOString().slice(0, 10)
  const endDateStr = new Date(timestamp.getTime() + oneDay).toISOString().slice(0, 10)
  const calendar = await calendarClient.calendarGet(timestampDateStr, endDateStr)

  return (
    calendar.filter(day => day.date === timestamp.toISOString().slice(0, 10)).length > 0
  )
}

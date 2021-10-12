import dayjs from "dayjs"
import { isNumeric } from "./isNumeric"
import { lastMarketDay } from "./lastMarketDay"

export const newerThanLastMarketDay = async (
  date: Date | string | number
): Promise<boolean> => {
  if (typeof date === "string" && isNumeric(date)) date = parseInt(date)

  // - convert to a Date object
  const timestamp: Date =
    typeof date === "string"
      ? new Date(date)
      : typeof date === "number"
      ? new Date(date / 1e10 < 1 ? date * 1000 : date)
      : date

  const lastMarketDateStr = (await lastMarketDay()).date
  const timestampDate = dayjs(timestamp)
  const timestampDateMinusOne = dayjs(timestamp).subtract(1, "days")

  return (
    timestampDate.isAfter(lastMarketDateStr, "day") ||
    timestampDateMinusOne.isAfter(lastMarketDateStr, "day")
  )
}

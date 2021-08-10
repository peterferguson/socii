import { lastMarketDay } from "./lastMarketDay"

export const isLastMarketDay = async (
  date: Date | string | number
): Promise<boolean> => {
  // - convert to a Date object
  const timestamp: Date =
    typeof date === "string"
      ? new Date(date)
      : typeof date === "number"
      ? new Date(date / 1e10 < 1 ? date * 1000 : date)
      : date

  return (await lastMarketDay()).date === timestamp.toISOString().slice(0, 10)
}

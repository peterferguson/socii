import { ClockResponse } from "@socii/shared/alpaca/models/ClockResponse"

export const isMarketOpen = async (): Promise<boolean> => {
  console.log("Checking if market is open")
  return ((await (await fetch("/api/alpaca/clock")).json()) as ClockResponse)?.isOpen
}

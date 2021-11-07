import { ClockResponse } from "@socii/alpaca/models/ClockResponse"
import { fetcher } from "./fetcher"

export const isMarketOpen = async (): Promise<boolean> => {
  console.log("Checking if market is open")
  return (fetcher("/api/alpaca/clock") as ClockResponse)?.isOpen
}

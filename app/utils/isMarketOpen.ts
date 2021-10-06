import { ClockResponse } from "@socii/shared/alpaca/models/ClockResponse"

export const isMarketOpen = async (): Promise<boolean> => {
  return ((await fetch("/api/alpaca/clock")).json() as ClockResponse)?.isOpen
}

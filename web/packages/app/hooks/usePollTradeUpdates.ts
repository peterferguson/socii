import { useInterval } from "../hooks/"
import { updateTradeEvents } from "../utils/updateTradeEvents"
import { useMarketClock } from "./useMarketClock"

export const usePollTradeUpdates = (
  delay = 3 * 1000 // - use null to pause polling
) => {
  const { isMarketOpen } = useMarketClock()
  useInterval(() => isMarketOpen && updateTradeEvents(), delay)
}

import { PortfolioHistory } from "@socii/alpaca/models/PortfolioHistory"
import { useAuth } from "../hooks/useAuth"
import { PortfolioHistoryTimeseries } from "../models/PortfolioHistoryTimeseries"
import { fetcher } from "../utils/fetcher"
import { portfolioHistoryToTimeseries } from "../utils/portfolioHistoryToTimeseries"
import { useEffect, useState } from "react"
import useSWR from "swr"

export const usePortfolioHistory = () => {
  const { user } = useAuth()
  const [timeseries, setTimeseries] = useState<PortfolioHistoryTimeseries>(undefined)

  const { data: history, error } = useSWR<PortfolioHistory>(
    user?.token && user?.alpacaAccountId
      ? ["/api/alpaca/portfolio", user?.token, user?.alpacaAccountId]
      : null,
    (url, token, alpacaId) => {
      const res = fetcher(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ accountId: alpacaId }),
      })
      return res
    },
    { refreshInterval: 3600 * 1000, refreshWhenOffline: false }
  )

  useEffect(
    () =>
      history &&
      setTimeseries(portfolioHistoryToTimeseries(PortfolioHistory.from(history))),
    [history]
  )

  return { history, timeseries, error }
}

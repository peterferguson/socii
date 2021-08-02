import { PortfolioHistory } from "@alpaca/models"
import { useAuth } from "@hooks"
import { fetcher } from "@utils/fetcher"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { PortfolioHistoryTimeseries } from "@models/PortfolioHistoryTimeseries"
import { portfolioHistoryToTimeseries } from "@utils/portfolioHistoryToTimeseries"

export const usePortfolioHistory = () => {
  const { user } = useAuth()
  const [timeseries, setTimeseries] = useState<PortfolioHistoryTimeseries>(undefined)

  const alpacaId = "933ab506-9e30-3001-8230-50dc4e12861c" // - user?.alpacaID

  const { data: history, error } = useSWR<PortfolioHistory>(
    user?.token && alpacaId ? ["/api/alpaca/portfolio", user?.token, alpacaId] : null,
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

  useEffect(() => {
    if (history)
      setTimeseries(portfolioHistoryToTimeseries(PortfolioHistory.from(history)))
  }, [history])

  return { history, timeseries, error }
}

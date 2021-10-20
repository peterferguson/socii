import { useAuth } from "../hooks/useAuth"
import { Position } from "../models/alpaca"
import { fetcher } from "../utils/fetcher"
import useSWR from "swr"

export const usePositions = () => {
  const { user } = useAuth()

  const { data: positions, error } = useSWR<Position[]>(
    user?.token && user?.alpacaAccountId
      ? ["/api/alpaca/positions", user.token, user.alpacaAccountId]
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
  return { positions, error }
}

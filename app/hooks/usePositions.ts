import { Position } from "@alpaca/models"
import { useAuth } from "@hooks"
import { fetcher } from "@utils/fetcher"
import useSWR from "swr"

export const usePositions = () => {
  const { user } = useAuth()
  const alpacaId = "933ab506-9e30-3001-8230-50dc4e12861c" // - user?.alpacaID

  const { data: positions, error } = useSWR<Position[]>(
    user?.token && alpacaId ? ["/api/alpaca/positions", user.token, alpacaId] : null,
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
  return positions
}

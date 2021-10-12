import { useAuth } from "@hooks"
import { OrderObject } from "@models/alpaca"
import { fetcher } from "@utils/fetcher"
import useSWR from "swr"

export const useOrders = () => {
  const { user } = useAuth()

  const { data: orders, error } = useSWR<OrderObject[]>(
    user?.token && user?.alpacaAccountId
      ? ["/api/alpaca/orders", user.token, user?.alpacaAccountId]
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
  return { orders, error }
}

import { useAuth } from "../hooks/useAuth"
import { TransferResource } from "alpaca"
import { fetcher } from "../utils/fetcher"
import useSWR from "swr"

// ? Could extend this to allow posting transfers from the frontend too
// TODO: Add deposit mechanism which leverages this (or similar) hook to post transfers
export const useTransfers = () => {
  const { user } = useAuth()

  const { data: transfers, error } = useSWR<TransferResource[]>(
    user?.token && user?.alpacaAccountId
      ? ["/api/alpaca/funding", user?.token, user?.alpacaAccountId]
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

  return { transfers: transfers ? transfers : [], error }
}

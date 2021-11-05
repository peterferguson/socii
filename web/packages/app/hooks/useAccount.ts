import { useAuth } from "./useAuth"
import { AccountExtended } from "@socii/alpaca/models/AccountExtended"
import { TradingAccount } from "@socii/alpaca/models/TradingAccount"
import { fetcher } from "../utils/fetcher"
import { useEffect, useState } from "react"
import useSWR from "swr"

export const useAccount = (trading: boolean = false) => {
  const { user } = useAuth()
  const [account, setAccount] = useState<AccountExtended | TradingAccount>(undefined)

  const { data, error } = useSWR(
    user?.token && user?.alpacaAccountId
      ? [
          "/api/alpaca/accounts",
          user?.token,
          user?.alpacaAccountId,
          trading ? "trading" : "regular",
        ]
      : null,
    (url, token, alpacaId, type) => {
      const res = fetcher(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ accountId: alpacaId, type }),
      })
      return res
    },
    { refreshInterval: 3600 * 1000, refreshWhenOffline: false }
  )

  useEffect(
    () =>
      data &&
      setAccount(
        trading
          ? (TradingAccount.from(data) as TradingAccount)
          : (AccountExtended.from(data) as AccountExtended)
      ),
    [data, trading]
  )

  return { account, error }
}

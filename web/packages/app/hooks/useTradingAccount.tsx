import { TradingAccount } from "@socii/shared/alpaca"
import { useAccount } from "./useAccount"

interface IUseTradingAccount {
  account: TradingAccount
  error: any
}

export const useTradingAccount = () => useAccount(true) as IUseTradingAccount

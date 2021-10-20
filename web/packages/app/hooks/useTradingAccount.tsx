import { TradingAccount } from "alpaca"
import { useAccount } from "./useAccount"

interface IUseTradingAccount {
  account: TradingAccount
  error: any
}

export const useTradingAccount = () => useAccount(true) as IUseTradingAccount

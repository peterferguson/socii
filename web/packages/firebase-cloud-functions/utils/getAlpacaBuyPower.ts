import { logger } from "firebase-functions"
import { config, AccountsApi } from "../shared/alpaca/index.js"

export const getAlpacaBuyPower = async (accountId: string) => {
  // * Ensure all investors have can afford the trade in their alpaca account
  const client = new AccountsApi(
    config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
  )

  logger.log(`Getting trade account data for ${accountId}`)

  const { buyingPower, cash, cashWithdrawable, daytradeCount, daytradingBuyingPower } =
    await client.getTradingAccount(accountId)

  return {
    buyingPower: parseFloat(buyingPower),
    cash: parseFloat(cash),
    cashWithdrawable: parseFloat(cashWithdrawable),
    daytradeCount,
    daytradingBuyingPower: parseFloat(daytradingBuyingPower),
  }
}

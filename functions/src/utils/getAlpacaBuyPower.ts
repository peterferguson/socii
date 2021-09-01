// import { TradingApi, config } from "../alpaca/broker/client/ts/index"
import { config, AccountsApi } from "../../../app/alpaca"

export const getAlpacaBuyPower = async (accountId: string) => {
  // * Ensure all investors have can afford the trade in their alpaca account
  const client = new AccountsApi(
    config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
  )

  const { buyingPower, cash, cashWithdrawable, daytradeCount, daytradingBuyingPower } =
    await client.getTradingAccount(accountId)

  return {
    buyingPower,
    cash,
    cashWithdrawable,
    daytradeCount,
    daytradingBuyingPower,
  }
}

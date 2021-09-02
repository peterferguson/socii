//  ! Run with `npx ts-node -O '{"module":"commonjs"}' pages/api/alpaca/requests/accounts.rest.ts`
require("dotenv").config({ path: "./.env.local" })
import { config, AccountsApi } from "@socii/shared/alpaca/index"
const accountClient = new AccountsApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)

try {
  // - delte bank
  accountClient.deleteRecipientBank(
    process.env.ALPACA_TEST_ACCOUNT,
    "8bd3f280-0e6c-4769-8b1c-acbab057c299"
  )
  // - get bank accounts
  accountClient
    .getRecipientBanks(process.env.ALPACA_TEST_ACCOUNT, "ACTIVE", "Testing Bank")
    .then((r) => console.log(r))
} catch (e) {
  console.log(e)
}

//  ! Run with `npx ts-node -O '{"module":"commonjs"}' __tests__/utils/requests/activities.rest.ts`
require("dotenv").config({ path: "./.env.local" })

import { AccountsApi, config } from "@socii/shared/alpaca/index"
const accountClient = new AccountsApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)

accountClient
  .accountsActivitiesGet("", "", "", "desc", "114e918e-2caf-4fa0-aabf-3fb1d53564d8")
  .then(console.log)
  .catch(console.error)

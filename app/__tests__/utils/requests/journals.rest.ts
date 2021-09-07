//  ! Run with `npx ts-node -O '{"module":"commonjs"}' __tests__/utils/requests/journals.rest.ts`
require("dotenv").config({ path: "./.env.local" })

import { config, JournalData, JournalsApi } from "@socii/shared/alpaca/index"
const journals = new JournalsApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)

const journal = JournalData.from({
  entry_type: "JNLC",
  from_account: process.env.ALPACA_FIRM_ACCOUNT,
  to_account: "114e918e-2caf-4fa0-aabf-3fb1d53564d8",
  amount: 1000,
})

console.log(journal)

journals.postJournals(journal).then(console.log).catch(console.error)

//  ! Run with `npx ts-node -O '{"module":"commonjs"}' pages/api/alpaca/requests/assets.rest.ts`
require("dotenv").config({ path: "./.env.local" })

import { config, JournalData, JournalsApi } from "../../../alpaca/index"
const journals = new JournalsApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)

const journal = JournalData.from({
  entry_type: "JNLC",
  from_account: process.env.ALPACA_FIRM_ACCOUNT,
  to_account: process.env.ALPACA_TEST_ACCOUNT,
  amount: 1000,
})

console.log(journal)

journals.postJournals(journal).then(console.log).catch(console.error)

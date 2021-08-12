//  ! Run with `npx ts-node -O '{"module":"commonjs"}' pages/api/alpaca/requests/ach.rest.ts`
require("dotenv").config({ path: "./.env.local" })
import { config, AccountsApi } from "../../../alpaca/index"
const accountClient = new AccountsApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)

try {
  // // - create a ach relationship
  // accountClient
  //   .postAchRelationships(process.env.ALPACA_TEST_ACCOUNT, {
  //     accountOwnerName: "Elon Muskett",
  //     bankAccountType: "SAVINGS",
  //     bankAccountNumber: "32132231abc",
  //     bankRoutingNumber: "121000359",
  //     nickname: "FUNDING MONEY",
  //   })
  //   .then((r) => console.log(r))

  // // - delete an ach relationship
  // accountClient.deleteAchRelationship(
  //   process.env.ALPACA_TEST_ACCOUNT,
  //   "dc621f70-86c8-4456-9b82-33ec3f1c1c26"
  // )

  // - get ach relationships
  accountClient
    .getAchRelationships(process.env.ALPACA_TEST_ACCOUNT)
    .then((r) => console.log(r))
} catch (e) {
  console.log(e)
}

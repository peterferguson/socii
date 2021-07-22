// README Funding tests rely on data which must match that of accounts found in the broker
// this should be updated as we move to a specific test broker rather than our own accounts

import { handleFunding } from "@pages/api/alpaca/funding"
import { nextApiHandlerTest } from "@tests/utils/nextApiHandlerTest"
import { performance } from "perf_hooks"

/*
 - Aspects of each API endpoint to test 
  1. Status code
  2. Correct payload yields correct response
  3. Correct response headers
  4. Performance check (responsed in a reasonable time)
*/

const fundingTest = nextApiHandlerTest(handleFunding, "/api/alpaca/funding")

describe("/api/alpaca/funding", () => {
  it(
    "Check if an account has been succesfully funded (send transfer)",
    fundingTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          accountId: process.env.ALPACA_FIRM_ACCOUNT,
          transferData: {
            transferType: "ach",
            relationshipId: "4140bbf6-49e1-4340-9b84-b9a8c6b38b89",
            amount: "500",
            direction: "INCOMING",
          },
        }),
      })
      const finishTime = performance.now()

      expect(res.status).toBe(200)
      expect(await res.json()).toMatchObject({
        id: expect.any(String),
        relationshipId: "4140bbf6-49e1-4340-9b84-b9a8c6b38b89",
        accountId: "2bd90dfc-949d-4601-b262-4f4cd201fa27",
        type: "ach",
        status: "QUEUED",
        amount: "500",
        direction: "INCOMING",
      })
      expect(finishTime - startTime).toBeLessThanOrEqual(10000) // - runs in one second ** correct time
      console.log(finishTime - startTime)
    })
  )
  it(
    "Check all transfers for an account",
    fundingTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId: process.env.ALPACA_FIRM_ACCOUNT }),
      })
      const finishTime = performance.now()

      expect(res.status).toBe(200)
      expect(await res.json()).toBeInstanceOf(Array)
      expect(finishTime - startTime).toBeLessThanOrEqual(10000) // - runs in one second ** correct time
      console.log(finishTime - startTime)
    })
  )
})

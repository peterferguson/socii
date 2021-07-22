// README Funding tests rely on data which must match that of accounts found in the broker
// this should be updated as we move to a specific test broker rather than our own accounts

/* 
 ! SANDBOX ONLY SUPPORTS ACH TRANSFERS AT THE MOMENT
*/

import { handleFunding } from "@pages/api/alpaca/funding"
import { TransferResource } from "@alpaca"
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

let fundingId: string = ""

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
            relationshipId: process.env.ALPACA_FIRM_ACCOUNT_ACH,
            amount: "500",
            direction: "INCOMING",
          },
        }),
      })
      const finishTime = performance.now()
      
      const fundingResponse: TransferResource = TransferResource.from(await res.json())
      fundingId = fundingResponse.id

      expect(res.status).toBe(200)
      expect(fundingResponse).toMatchObject({
        id: expect.any(String),
        relationshipId: process.env.ALPACA_FIRM_ACCOUNT_ACH,
        accountId: process.env.ALPACA_FIRM_ACCOUNT,
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

      const queryResponse: Array<TransferResource> = await res.json()

      expect(res.status).toBe(200)
      expect(queryResponse).toBeInstanceOf(Array)
      const filteredQueryResponse = queryResponse.filter(
        (transfer) => transfer.id === fundingId
      )
      // TODO: Test the correct ids are set
      // expect(filteredQueryResponse).toHaveLength(1)
      expect(finishTime - startTime).toBeLessThanOrEqual(10000) // - runs in one second ** correct time
      console.log(finishTime - startTime)
    })
  )
})

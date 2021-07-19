// README Funding tests rely on data which must match that of accounts found in the broker
// this should be updated as we move to a specific test broker rather than our own accounts

import { nextApiHandlerTest } from "@tests/utils/nextApiHandlerTest"
import  { handleFunding }  from "@pages/api/alpaca/funding"
import { AssetResource, TransferData , TransferResource } from "@alpaca/models"
import { performance } from "perf_hooks"

/*
 - Aspects of each API endpoint to test 
  1. Status code
  2. Correct payload yields correct response
  3. Correct response headers
  4. Performance check (responsed in a reasonable time)
*/

const transfer = new TransferData

const fundingTest = nextApiHandlerTest(handleFunding, "/api/alpaca/funding")

describe.skip("/api/alpaca/funding", () => {
  it(
    "check if an account has been succesfully funded",
    fundingTest(async ({ fetch }) => {


        //TODO - make nicer
        const accountId = "2bd90dfc-949d-4601-b262-4f4cd201fa27"
        transfer.transferType = "ach"
        transfer.relationshipId = "4140bbf6-49e1-4340-9b84-b9a8c6b38b89"
        transfer.amount = "500"
        transfer.direction = "INCOMING"

      const startTime = performance.now()
      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: {accountId , transfer},
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

//   it(
//     "queries an asset by id, specifically Allstate",
//     fundingTest(async ({ fetch }) => {
//       const startTime = performance.now()
//       const res = await fetch({
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({ id: "9a5b42b3-46ae-40f7-9a79-253d476cced8" }),
//       })
//       const finishTime = performance.now()

//       expect(res.status).toBe(200)
//       expect(await res.json()).toMatchObject<AssetResource>({
//         id: "9a5b42b3-46ae-40f7-9a79-253d476cced8",
//         symbol: expect.stringContaining("ALL"),
//         name: expect.stringContaining("Allstate"),
//       })
//       expect(finishTime - startTime).toBeLessThanOrEqual(1000) // - runs in one second
//       console.log(finishTime - startTime)
//     })
//   )

//   it(
//     "returns a list of AssetResources",
//     fundingTest(async ({ fetch }) => {
//       const startTime = performance.now()
//       const res = await fetch({
//         method: "GET",
//         headers: { "content-type": "application/json" },
//       })
//       const finishTime = performance.now()

//       console.log(finishTime - startTime)
//       expect(res.status).toBe(200)
//       const response = await res.json()
//       // expect(response).toMatchSnapshot() // ! Changes too often
//       expect(response).toBeInstanceOf(Array)
//       expect(Object.keys(response[0])).toEqual(
//         AssetResource.getAttributeTypeMap().map(({ name }) => name)
//       )
//       expect(AssetResource.from(response[0]) instanceof AssetResource).toBe(true)
//       // expect(
//       //   response
//       //     .map((asset) => AssetResource.from(asset))
//       //     .every((asset) => asset instanceof AssetResource)
//       // ).toBe(true)
//       expect(finishTime - startTime).toBeLessThanOrEqual(1500) // - runs in 1.5 seconds
//     })
//   )
})

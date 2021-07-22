import { handleAch } from "@api/alpaca/ach"
import { ACHRelationshipResource } from "@alpaca"
import { nextApiHandlerTest } from "@tests/utils/nextApiHandlerTest"
import { performance } from "perf_hooks"
import { achRelationship as achData } from "@tests/utils/mockAchRelationship"

/*
 - Aspects of each API endpoint to test 
  1. Status code
  2. Correct payload yields correct response
  3. Correct response headers
  4. Performance check (responsed in a reasonable time)
*/

const achTest = nextApiHandlerTest(handleAch, "/api/alpaca/ach")
let achRelationshipId: string = ""
let accountId: string = process.env.ALPACA_TEST_ACCOUNT

describe("/api/alpaca/ach", () => {
  it(
    "check if the test bank resource is connected to the account, querying it by name `name`",
    achTest(async ({ fetch }) => {
      const startTime = performance.now()

      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId }),
      })
      const finishTime = performance.now()
      const responseBody = await res.json()

      expect(res.status).toBe(200)
      expect(responseBody).toBeInstanceOf(Array)

      const filteredArray = responseBody.filter(
        (ach) => ach.nickname === achData.nickname
      )
      if (filteredArray.length > 0) {
        expect(filteredArray.length).toBe(1)
        expect(filteredArray[0]).toMatchObject({ ...achData })
        achRelationshipId = filteredArray[0].id
      }
      expect(finishTime - startTime).toBeLessThanOrEqual(750) // - units: ms
    })
  )

  it(
    "deletes the pre-existing bank account",
    achTest(async ({ fetch }) => {
      if (achRelationshipId) {
        const startTime = performance.now()
        const res = await fetch({
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ accountId }),
        })
        const finishTime = performance.now()

        expect(res.status).toBe(204)
        expect(finishTime - startTime).toBeLessThanOrEqual(750) // - units: ms
      }
    })
  )

  it(
    "check if the test bank resource has been deleted",
    achTest(async ({ fetch }) => {
      const startTime = performance.now()

      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId }),
      })
      const finishTime = performance.now()
      const responseBody = (await res.json()).map(ACHRelationshipResource.from)

      expect(res.status).toBe(200)
      expect(responseBody).toBeInstanceOf(Array)

      const filteredArray = responseBody.filter(
        (ach) => ach.nickname === achData.nickname
      )
      expect(filteredArray.length).toBe(0)
      expect(finishTime - startTime).toBeLessThanOrEqual(750) // - units: ms
    })
  )

  it(
    "adds a bank account to a user account",
    achTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId, achData }),
      })
      const finishTime = performance.now()

      const achResponse: ACHRelationshipResource = ACHRelationshipResource.from(
        await res.json()
      )

      achRelationshipId = achResponse.id

      expect(res.status).toBe(200)
      expect(achResponse).toMatchObject({
        accountId,
        bankAccountType: achData.bankAccountType,
        bankAccountNumber: achData.bankAccountNumber,
        bankRoutingNumber: achData.bankRoutingNumber,
        nickname: achData.nickname,
      })
      expect(finishTime - startTime).toBeLessThanOrEqual(750) // - units: ms
    })
  )

  it(
    "verifies the bank resource is connected to the account, querying it by `name`",
    achTest(async ({ fetch }) => {
      if (!achRelationshipId) throw new Error("achRelationshipId not found")

      const startTime = performance.now()

      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId }),
      })
      const finishTime = performance.now()
      const responseBody = await res.json()

      expect(res.status).toBe(200)
      expect(responseBody).toBeInstanceOf(Array)

      const filteredArray = responseBody.filter((ach) => ach.id === achRelationshipId)
      expect(filteredArray.length).toBe(1)
      expect(filteredArray[0]).toMatchObject({ nickname: achData.nickname })
      expect(finishTime - startTime).toBeLessThanOrEqual(750) // - units: ms
    })
  )

  it(
    "deletes the bank account",
    achTest(async ({ fetch }) => {
      if (!achRelationshipId) throw new Error("achRelationshipId not found")

      const startTime = performance.now()
      const res = await fetch({
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId, achData: { id: achRelationshipId } }),
      })
      const finishTime = performance.now()

      expect(res.status).toBe(204)
      expect(finishTime - startTime).toBeLessThanOrEqual(750) // - units: ms
    })
  )
  it(
    "verifies the bank resource has been deleted from the account, querying it by `name`",
    achTest(async ({ fetch }) => {
      if (!achRelationshipId) throw new Error("achRelationshipId not found")

      const startTime = performance.now()

      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId }),
      })
      const finishTime = performance.now()
      const responseBody = await res.json()

      expect(res.status).toBe(200)
      expect(responseBody).toBeInstanceOf(Array)
      const filteredArray = responseBody.filter((ach) => ach.id === achRelationshipId)
      expect(filteredArray.length).toBe(0)
      expect(finishTime - startTime).toBeLessThanOrEqual(750) // - units: ms
    })
  )
})

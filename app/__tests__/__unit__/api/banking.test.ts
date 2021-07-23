import { handleBanking } from "@api/alpaca/banking"
import { BankResource } from "@alpaca"
import { nextApiHandlerTest } from "@tests/utils/nextApiHandlerTest"
import { performance } from "perf_hooks"
import { bankData } from "@tests/utils/mockBankData"

/*
 - Aspects of each API endpoint to test 
  1. Status code
  2. Correct payload yields correct response
  3. Correct response headers
  4. Performance check (responsed in a reasonable time)
*/

const bankingTest = nextApiHandlerTest(handleBanking, "/api/alpaca/banking")
let bankId: string = ""
let accountId: string = process.env.ALPACA_TEST_ACCOUNT

describe("/api/alpaca/banking", () => {
  it(
    "check if the test bank resource is connected to the account, querying it by name `name`",
    bankingTest(async ({ fetch }) => {
      const startTime = performance.now()

      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId, name: bankData.name }),
      })
      const finishTime = performance.now()
      const responseBody = await res.json()

      expect(res.status).toBe(200)
      expect(responseBody).toBeInstanceOf(Array)

      const filteredArray = responseBody.filter((bank) => bank.name === bankData.name)
      if (filteredArray.length > 0) {
        expect(filteredArray.length).toBe(1)
        expect(filteredArray[0]).toMatchObject({
          name: bankData.name,
          bank_code: bankData.bank_code,
          bank_code_type: bankData.bank_code_type,
          account_number: bankData.account_number,
        })
        bankId = filteredArray[0].id
      }
      expect(finishTime - startTime).toBeLessThanOrEqual(1000) // - units: ms
    })
  )

  it(
    "deletes the pre-existing bank account",
    bankingTest(async ({ fetch }) => {
      if (bankId) {
        const startTime = performance.now()
        const res = await fetch({
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ accountId, bankData: { id: bankId } }),
        })
        const finishTime = performance.now()

        expect(res.status).toBe(204)
        expect(finishTime - startTime).toBeLessThanOrEqual(1000) // - units: ms
      }
    })
  )

  it(
    "check if the test bank resource has been deleted",
    bankingTest(async ({ fetch }) => {
      const startTime = performance.now()

      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId, name: bankData.name }),
      })
      const finishTime = performance.now()
      const responseBody = (await res.json()).map(BankResource.from)

      expect(res.status).toBe(200)
      expect(responseBody).toBeInstanceOf(Array)

      const filteredArray = responseBody.filter((bank) => bank.name === bankData.name)
      expect(filteredArray.length).toBe(0)
      expect(finishTime - startTime).toBeLessThanOrEqual(1000) // - units: ms
    })
  )

  it(
    "adds a bank account to a user account",
    bankingTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId, bankData }),
      })
      const finishTime = performance.now()

      const bankResponse: BankResource = BankResource.from(await res.json())

      bankId = bankResponse.id

      expect(res.status).toBe(200)
      expect(bankResponse).toMatchObject({
        accountNumber: bankData.account_number,
        bankCode: bankData.bank_code,
        bankCodeType: "BIC",
      })
      expect(finishTime - startTime).toBeLessThanOrEqual(1000) // - units: ms
    })
  )

  it(
    "verifies the bank resource is connected to the account, querying it by `name`",
    bankingTest(async ({ fetch }) => {
      if (!bankId) throw new Error("bankId not found")

      const startTime = performance.now()

      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId, name: bankData.name }),
      })
      const finishTime = performance.now()
      const responseBody = await res.json()

      expect(res.status).toBe(200)
      expect(responseBody).toBeInstanceOf(Array)

      const filteredArray = responseBody.filter((bank) => bank.id === bankId)
      expect(filteredArray.length).toBe(1)
      expect(filteredArray[0]).toMatchObject({ name: bankData.name })
      expect(finishTime - startTime).toBeLessThanOrEqual(1000) // - units: ms
    })
  )

  it(
    "deletes the bank account",
    bankingTest(async ({ fetch }) => {
      if (!bankId) throw new Error("bankId not found")

      const startTime = performance.now()
      const res = await fetch({
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId, bankData: { id: bankId } }),
      })
      const finishTime = performance.now()

      expect(res.status).toBe(204)
      expect(finishTime - startTime).toBeLessThanOrEqual(1000) // - units: ms
    })
  )
  it(
    "verifies the bank resource has been deleted from the account, querying it by `name`",
    bankingTest(async ({ fetch }) => {
      if (!bankId) throw new Error("bankId not found")

      const startTime = performance.now()

      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId, name: bankData.name }),
      })
      const finishTime = performance.now()
      const responseBody = await res.json()

      expect(res.status).toBe(200)
      expect(responseBody).toBeInstanceOf(Array)
      const filteredArray = responseBody.filter((bank) => bank.id === bankId)
      expect(filteredArray.length).toBe(0)
      expect(finishTime - startTime).toBeLessThanOrEqual(1000) // - units: ms
    })
  )
})

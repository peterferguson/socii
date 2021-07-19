// README Accounts tests may rely on data which must match that of accounts found in the broker
// this should be updated as we move to a specific test broker rather than our own accounts

import { nextApiHandlerTest } from "@tests/utils/nextApiHandlerTest"
import  { handleAccounts }  from "@pages/api/alpaca/accounts"
import { AccountCreationObject , AccountUpdate } from "@alpaca/models"
import { performance } from "perf_hooks"
//import {testAccount} from "../../../pages/api/alpaca/requests/accounts"
// potentially change extenstion 

/*
 - Aspects of each API endpoint to test 
  1. Status code
  2. Correct payload yields correct response
  3. Correct response headers
  4. Performance check (responsed in a reasonable time)
*/

const testAccount = {
    contact: {
      email_address: "tests6@socii.com",
      phone_number: "+442137981999",
      street_address: ["123 Social Drive"],
      city: "Belfast",
      state: "",
      postal_code: "BT00AA",
      country: "GBR",
    },
    identity: {
      given_name: "TEST",
      family_name: "ACCOUNT",
      date_of_birth: "1995-01-07",
      tax_id: "AA123456C",
      tax_id_type: "GBR_NINO",
      country_of_citizenship: "GBR",
      country_of_birth: "GBR",
      country_of_tax_residence: "GBR",
      funding_source: ["employment_income"],
    },
    disclosures: {
      is_control_person: false,
      is_affiliated_exchange_or_finra: false,
      is_politically_exposed: false,
      immediate_family_exposed: false,
    },
    agreements: [
      {
        agreement: "margin_agreement",
        signed_at: "2020-09-11T18:09:33Z",
        ip_address: "185.13.21.99",
      },
      {
        agreement: "account_agreement",
        signed_at: "2020-09-11T18:13:44Z",
        ip_address: "185.13.21.99",
      },
      {
        agreement: "customer_agreement",
        signed_at: "2020-09-11T18:13:44Z",
        ip_address: "185.13.21.99",
      },
    ],
    documents: [
      {
        document_type: "cip_result",
        content: "VGhlcmUgYXJlIG5vIHdpbGQgYWxwYWNhcy4=",
        mime_type: "application/pdf",
      },
      {
        document_type: "identity_verification",
        document_sub_type: "passport",
        content: "QWxwYWNhcyBjYW5ub3QgbGl2ZSBhbG9uZS4=",
        mime_type: "image/jpeg",
      },
    ],
  }

const testUpdate = {

    contact: {
        "email_address": "tests6@socii.com"
    },
}


console.log(testUpdate)

const accountsTest = nextApiHandlerTest(handleAccounts, "/api/alpaca/accounts")

describe.skip("/api/alpaca/accounts", () => {
  it(
    "check if an account has been succesfully creaated",
    accountsTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(testAccount),
      })
      const finishTime = performance.now()

      expect(res.status).toBe(201)
      expect(await res.json()).toEqual(AccountCreationObject) // potentially more specific?
      //expect(finishTime - startTime).toBeLessThanOrEqual(1000) // - runs in one second
      console.log(finishTime - startTime)
    })
  )
  it(
    "checks if an emil has been updated for an account",
    accountsTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: {
            accountId: "1ccad4f7-336b-4fff-a52c-c422b79cca9e",
            updateBody: testUpdate
        }
    
      })
      const finishTime = performance.now()

      expect(res.status).toBe(204)
      //expect(finishTime - startTime).toBeLessThanOrEqual(1000) // - runs in one second
      console.log(finishTime - startTime)
    })
  )

  it(
    "deletes an account",
    accountsTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId: "47be7a48-13bc-485d-903a-73ea337d156a" }),
      })
      const finishTime = performance.now()
      console.log(finishTime - startTime)

      expect(res.status).toBe(204)
      //expect(finishTime - startTime).toBeLessThanOrEqual(1500) // - runs in 1.5 seconds
    })
  )
})

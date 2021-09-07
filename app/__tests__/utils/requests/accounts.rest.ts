//  ! Run with `npx ts-node -O '{"module":"commonjs"}' pages/api/alpaca/requests/accounts.rest.ts`
require("dotenv").config({ path: "./.env.local" })
import { AccountCreationObject, AccountsApi, config } from "@socii/shared/alpaca/index"
const accountClient = new AccountsApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)

// - create account
// accountClient.accountsPost(testAccount).then(console.log).catch(console.error)
// - delete account
// accountClient
//   .deleteAccount("70a2501b-b31b-4904-80d9-f5c4a2fc66ed")
// .then(console.log).catch(console.error)
// - update account
// accountClient
//   .patchAccount(
//     "70a2501b-b31b-4904-80d9-f5c4a2fc66ed",
//     AccountUpdate.from({ contact: { email_address: "DELETED_peter@socii.app" } })
//   )
//   .then(console.log).catch(console.error)

// - get all accounts
// accountClient.accountsGet().then(console.log).catch(console.error)
// - get accounts activities
// accountClient.accountsActivitiesGet().then(console.log).catch(console.error)

// - get trading account
accountClient
  .getTradingAccount("039e64b6-a4eb-409e-b9dc-17cc7a2dd6ce")
  .then(console.log)
  .catch(console.error)

// const testAccount = AccountCreationObject.from({
//   contact: {
//     email_address: "tests@socii.com",
//     phone_number: "+442137981999",
//     street_address: ["123 Social Drive"],
//     city: "Belfast",
//     state: "",
//     postal_code: "BT00AA",
//     country: "GBR",
//   },
//   identity: {
//     given_name: "TEST",
//     family_name: "ACCOUNT",
//     date_of_birth: "1995-01-07",
//     tax_id: "AA123456C",
//     tax_id_type: "GBR_NINO",
//     country_of_citizenship: "GBR",
//     country_of_birth: "GBR",
//     country_of_tax_residence: "GBR",
//     funding_source: ["employment_income"],
//   },
//   disclosures: {
//     is_control_person: false,
//     is_affiliated_exchange_or_finra: false,
//     is_politically_exposed: false,
//     immediate_family_exposed: false,
//   },
//   agreements: [
//     {
//       agreement: "margin_agreement",
//       signed_at: "2020-09-11T18:09:33Z",
//       ip_address: "185.13.21.99",
//     },
//     {
//       agreement: "account_agreement",
//       signed_at: "2020-09-11T18:13:44Z",
//       ip_address: "185.13.21.99",
//     },
//     {
//       agreement: "customer_agreement",
//       signed_at: "2020-09-11T18:13:44Z",
//       ip_address: "185.13.21.99",
//     },
//   ],
//   documents: [
//     {
//       document_type: "cip_result",
//       content: "VGhlcmUgYXJlIG5vIHdpbGQgYWxwYWNhcy4=",
//       mime_type: "application/pdf",
//     },
//     {
//       document_type: "identity_verification",
//       document_sub_type: "passport",
//       content: "QWxwYWNhcyBjYW5ub3QgbGl2ZSBhbG9uZS4=",
//       mime_type: "image/jpeg",
//     },
//   ],
// })

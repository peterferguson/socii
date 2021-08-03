import { v4 as uuidv4 } from "uuid"
import { mockBankCode } from "./mockBankCode"
export const bankData = {
  name: "Testing Bank",
  bank_code: mockBankCode,
  bank_code_type: "BIC", // - International Bank Identifier Code
  account_number: uuidv4().slice(0, 34),
  country: "GBR",
  state_province: "Northern Ireland",
  postal_code: "BT00BA",
  city: "Belfast",
  street_address: "1 Bank Way",
}

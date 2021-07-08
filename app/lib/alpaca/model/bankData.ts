/**
 * Alpaca Broker API
 * Open brokerage accounts, enable commission-free trading, and manage the ongoing user experience with Alpaca Broker API
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from "./models"

export class BankData {
  "name": string
  "bankCode": string
  "bankCodeType": BankData.BankCodeTypeEnum
  "country"?: string
  "stateProvince"?: string
  "postalCode"?: string
  "city"?: string
  "streetAddress"?: string
  "accountNumber": string

  static discriminator: string | undefined = undefined

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: "name",
      baseName: "name",
      type: "string",
    },
    {
      name: "bankCode",
      baseName: "bank_code",
      type: "string",
    },
    {
      name: "bankCodeType",
      baseName: "bank_code_type",
      type: "BankData.BankCodeTypeEnum",
    },
    {
      name: "country",
      baseName: "country",
      type: "string",
    },
    {
      name: "stateProvince",
      baseName: "state_province",
      type: "string",
    },
    {
      name: "postalCode",
      baseName: "postal_code",
      type: "string",
    },
    {
      name: "city",
      baseName: "city",
      type: "string",
    },
    {
      name: "streetAddress",
      baseName: "street_address",
      type: "string",
    },
    {
      name: "accountNumber",
      baseName: "account_number",
      type: "string",
    },
  ]

  static from(json) {
    return Object.assign(new BankData(), json)
  }

  static getAttributeTypeMap() {
    return BankData.attributeTypeMap
  }
}

export namespace BankData {
  export enum BankCodeTypeEnum {
    Aba = <any>"ABA",
    Bic = <any>"BIC",
  }
}

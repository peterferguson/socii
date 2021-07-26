/**
 * Alpaca Broker API
 * Open brokerage accounts, enable commission-free trading, and manage the ongoing user experience with Alpaca Broker API
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { AccountStatus } from "./AccountStatus"
import { KycResult } from "./KycResult"

export class Account {
  "id"?: string
  "accountNumber"?: string
  "status"?: AccountStatus
  /**
   * Always \"USD\"
   */
  "currency"?: string
  "createdAt"?: Date
  "lastEquity"?: string
  "kycResults"?: KycResult

  static readonly discriminator: string | undefined = undefined

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
    {
      name: "id",
      baseName: "id",
      type: "string",
      format: "uuid",
    },
    {
      name: "accountNumber",
      baseName: "account_number",
      type: "string",
      format: "",
    },
    {
      name: "status",
      baseName: "status",
      type: "AccountStatus",
      format: "",
    },
    {
      name: "currency",
      baseName: "currency",
      type: "string",
      format: "",
    },
    {
      name: "createdAt",
      baseName: "created_at",
      type: "Date",
      format: "date-time",
    },
    {
      name: "lastEquity",
      baseName: "last_equity",
      type: "string",
      format: "decimal",
    },
    {
      name: "kycResults",
      baseName: "kyc_results",
      type: "KycResult",
      format: "",
    },
  ]

  static getAttributeTypeMap() {
    return Account.attributeTypeMap
  }

  static from(json) {
    // - convert baseName to name
    for (const { baseName, name } of this.attributeTypeMap) {
      if (baseName !== name && !(name in json)) {
        Object.assign(json, { [name]: json[baseName] })
        delete json[baseName]
      }
    }
    return Object.assign(new this(), json)
  }

  public constructor() {}
}

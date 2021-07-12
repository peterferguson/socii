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

import { HttpFile } from "../http/http"

export class JournalJNLC {
  /**
   * journal ID
   */
  "id": string
  /**
   * JNLC (constant)
   */
  "entryType": string
  /**
   * account ID the amount goes from
   */
  "fromAccount": string
  "toAccount": string
  /**
   * ID the amount goes to
   */
  "description"?: string
  "settleDate": string
  "status"?: JournalJNLCStatusEnum
  "netAmount": string
  /**
   * max 255 characters
   */
  "transmitterName"?: string
  /**
   * max 255 characters
   */
  "transmitterAccountNumber"?: string
  /**
   * max 255 characters
   */
  "transmitterAddress"?: string
  /**
   * max 255 characters
   */
  "transmitterFinancialInstitution"?: string
  "transmitterTimestamp"?: Date

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
      name: "entryType",
      baseName: "entry_type",
      type: "string",
      format: "",
    },
    {
      name: "fromAccount",
      baseName: "from_account",
      type: "string",
      format: "uuid",
    },
    {
      name: "toAccount",
      baseName: "to_account",
      type: "string",
      format: "uuid",
    },
    {
      name: "description",
      baseName: "description",
      type: "string",
      format: "",
    },
    {
      name: "settleDate",
      baseName: "settle_date",
      type: "string",
      format: "date",
    },
    {
      name: "status",
      baseName: "status",
      type: "JournalJNLCStatusEnum",
      format: "",
    },
    {
      name: "netAmount",
      baseName: "net_amount",
      type: "string",
      format: "decimal",
    },
    {
      name: "transmitterName",
      baseName: "transmitter_name",
      type: "string",
      format: "",
    },
    {
      name: "transmitterAccountNumber",
      baseName: "transmitter_account_number",
      type: "string",
      format: "",
    },
    {
      name: "transmitterAddress",
      baseName: "transmitter_address",
      type: "string",
      format: "",
    },
    {
      name: "transmitterFinancialInstitution",
      baseName: "transmitter_financial_institution",
      type: "string",
      format: "",
    },
    {
      name: "transmitterTimestamp",
      baseName: "transmitter_timestamp",
      type: "Date",
      format: "date-time",
    },
  ]

  static getAttributeTypeMap() {
    return JournalJNLC.attributeTypeMap
  }

  static from(json) {
    // - convert baseName to name
    for (const { baseName, name } of this.attributeTypeMap) {
      if (baseName !== name) {
        Object.assign(json, { [name]: json[baseName] })
        delete json[baseName]
      }
    }
    return Object.assign(new this(), json)
  }

  public constructor() {}
}

export type JournalJNLCStatusEnum =
  | "pending"
  | "canceled"
  | "executed"
  | "queued"
  | "rejected"
  | "deleted"

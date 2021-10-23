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

export class BatchJournalResponse {
  "id": string
  "errorMessage": string
  "entryType": BatchJournalResponseEntryTypeEnum
  "fromAccount": string
  "toAccount": string
  "symbol": string
  "qty": string
  "price": string
  "status": BatchJournalResponseStatusEnum
  "settleDate": string
  "systemDate": string
  "netAmount": string
  "description": string

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
      name: "errorMessage",
      baseName: "error_message",
      type: "string",
      format: "",
    },
    {
      name: "entryType",
      baseName: "entry_type",
      type: "BatchJournalResponseEntryTypeEnum",
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
      name: "symbol",
      baseName: "symbol",
      type: "string",
      format: "",
    },
    {
      name: "qty",
      baseName: "qty",
      type: "string",
      format: "",
    },
    {
      name: "price",
      baseName: "price",
      type: "string",
      format: "",
    },
    {
      name: "status",
      baseName: "status",
      type: "BatchJournalResponseStatusEnum",
      format: "",
    },
    {
      name: "settleDate",
      baseName: "settle_date",
      type: "string",
      format: "",
    },
    {
      name: "systemDate",
      baseName: "system_date",
      type: "string",
      format: "",
    },
    {
      name: "netAmount",
      baseName: "net_amount",
      type: "string",
      format: "",
    },
    {
      name: "description",
      baseName: "description",
      type: "string",
      format: "",
    },
  ]

  static getAttributeTypeMap() {
    return BatchJournalResponse.attributeTypeMap
  }

  static from(json) {
    // - convert baseName to name
    if (json) {
      for (const { baseName, name } of this.attributeTypeMap) {
        if (baseName !== name && !(name in json)) {
          Object.assign(json, { [name]: json[baseName] })
          delete json[baseName]
        }
      }
    }
    return Object.assign(new this(), json)
  }

  public constructor() {}
}

export type BatchJournalResponseEntryTypeEnum = "JNLC"
export type BatchJournalResponseStatusEnum =
  | "pending"
  | "canceled"
  | "executed"
  | "queued"
  | "rejected"
  | "deleted"
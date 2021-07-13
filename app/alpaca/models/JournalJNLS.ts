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

export class JournalJNLS {
  /**
   * journal ID
   */
  "id": string
  /**
   * JNLS (constant)
   */
  "entryType": string
  /**
   * account ID the shares go from
   */
  "fromAccount": string
  /**
   * account ID the shares go to
   */
  "toAccount": string
  "settleDate": string
  "status"?: JournalJNLSStatusEnum
  "symbol": string
  "qty": string
  "price": string

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
      name: "settleDate",
      baseName: "settle_date",
      type: "string",
      format: "date",
    },
    {
      name: "status",
      baseName: "status",
      type: "JournalJNLSStatusEnum",
      format: "",
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
      format: "decimal",
    },
    {
      name: "price",
      baseName: "price",
      type: "string",
      format: "decimal",
    },
  ]

  static getAttributeTypeMap() {
    return JournalJNLS.attributeTypeMap
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

export type JournalJNLSStatusEnum =
  | "pending"
  | "canceled"
  | "executed"
  | "queued"
  | "rejected"
  | "deleted"

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

export class NonTradeActivityAllOf {
  "date"?: string
  "netAmount"?: string
  "description"?: string
  "status"?: NonTradeActivityAllOfStatusEnum
  "symbol"?: string
  "qty"?: string
  "perShareAmount"?: string

  static readonly discriminator: string | undefined = undefined

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
    {
      name: "date",
      baseName: "date",
      type: "string",
      format: "date",
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
    {
      name: "status",
      baseName: "status",
      type: "NonTradeActivityAllOfStatusEnum",
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
      format: "",
    },
    {
      name: "perShareAmount",
      baseName: "per_share_amount",
      type: "string",
      format: "",
    },
  ]

  static getAttributeTypeMap() {
    return NonTradeActivityAllOf.attributeTypeMap
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

export type NonTradeActivityAllOfStatusEnum = "executed" | "correct" | "canceled"

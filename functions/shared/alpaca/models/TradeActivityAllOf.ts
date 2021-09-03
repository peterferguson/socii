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

export class TradeActivityAllOf {
  "transactionTime"?: string
  "type"?: TradeActivityAllOfTypeEnum
  "price"?: string
  "qty"?: string
  "side"?: TradeActivityAllOfSideEnum
  "symbol"?: string
  "leavesQty"?: string
  "orderId"?: string
  "cumQty"?: string
  "orderStatus"?: TradeActivityAllOfOrderStatusEnum

  static readonly discriminator: string | undefined = undefined

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
    {
      name: "transactionTime",
      baseName: "transaction_time",
      type: "string",
      format: "timestamp",
    },
    {
      name: "type",
      baseName: "type",
      type: "TradeActivityAllOfTypeEnum",
      format: "",
    },
    {
      name: "price",
      baseName: "price",
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
      name: "side",
      baseName: "side",
      type: "TradeActivityAllOfSideEnum",
      format: "",
    },
    {
      name: "symbol",
      baseName: "symbol",
      type: "string",
      format: "",
    },
    {
      name: "leavesQty",
      baseName: "leaves_qty",
      type: "string",
      format: "",
    },
    {
      name: "orderId",
      baseName: "order_id",
      type: "string",
      format: "uuid",
    },
    {
      name: "cumQty",
      baseName: "cum_qty",
      type: "string",
      format: "",
    },
    {
      name: "orderStatus",
      baseName: "order_status",
      type: "TradeActivityAllOfOrderStatusEnum",
      format: "",
    },
  ]

  static getAttributeTypeMap() {
    return TradeActivityAllOf.attributeTypeMap
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

export type TradeActivityAllOfTypeEnum = "fill" | "partial_fill"
export type TradeActivityAllOfSideEnum = "buy" | "sell"
export type TradeActivityAllOfOrderStatusEnum =
  | "new"
  | "partially_filled"
  | "filled"
  | "done_for_day"
  | "canceled"
  | "expired"
  | "replaced"
  | "pending_cancel"
  | "pending_replace"
  | "accepted"
  | "pending_new"
  | "accepted_for_bidding"
  | "stopped"
  | "rejected"
  | "suspended"
  | "calculated"
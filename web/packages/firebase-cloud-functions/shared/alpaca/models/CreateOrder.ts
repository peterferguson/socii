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

import { CreateOrderStopLoss } from "./CreateOrderStopLoss"
import { CreateOrderTakeProfit } from "./CreateOrderTakeProfit"

export class CreateOrder {
  "symbol": string
  "qty"?: string
  "notional"?: string
  "side": CreateOrderSideEnum
  "type": CreateOrderTypeEnum
  "timeInForce": CreateOrderTimeInForceEnum
  "limitPrice"?: string
  "stopPrice"?: string
  "trailPrice"?: string
  "trailPercent"?: string
  "extendedHours"?: boolean
  "clientOrderId"?: string
  "orderClass"?: CreateOrderOrderClassEnum
  "takeProfit"?: CreateOrderTakeProfit
  "stopLoss"?: CreateOrderStopLoss
  "commission"?: string

  static readonly discriminator: string | undefined = undefined

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
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
      name: "notional",
      baseName: "notional",
      type: "string",
      format: "decimal",
    },
    {
      name: "side",
      baseName: "side",
      type: "CreateOrderSideEnum",
      format: "",
    },
    {
      name: "type",
      baseName: "type",
      type: "CreateOrderTypeEnum",
      format: "",
    },
    {
      name: "timeInForce",
      baseName: "time_in_force",
      type: "CreateOrderTimeInForceEnum",
      format: "",
    },
    {
      name: "limitPrice",
      baseName: "limit_price",
      type: "string",
      format: "decimal",
    },
    {
      name: "stopPrice",
      baseName: "stop_price",
      type: "string",
      format: "decimal",
    },
    {
      name: "trailPrice",
      baseName: "trail_price",
      type: "string",
      format: "decimal",
    },
    {
      name: "trailPercent",
      baseName: "trail_percent",
      type: "string",
      format: "decimal",
    },
    {
      name: "extendedHours",
      baseName: "extended_hours",
      type: "boolean",
      format: "",
    },
    {
      name: "clientOrderId",
      baseName: "client_order_id",
      type: "string",
      format: "",
    },
    {
      name: "orderClass",
      baseName: "order_class",
      type: "CreateOrderOrderClassEnum",
      format: "",
    },
    {
      name: "takeProfit",
      baseName: "take_profit",
      type: "CreateOrderTakeProfit",
      format: "",
    },
    {
      name: "stopLoss",
      baseName: "stop_loss",
      type: "CreateOrderStopLoss",
      format: "",
    },
    {
      name: "commission",
      baseName: "commission",
      type: "string",
      format: "decimal",
    },
  ]

  static getAttributeTypeMap() {
    return CreateOrder.attributeTypeMap
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

export type CreateOrderSideEnum = "buy" | "sell"
export type CreateOrderTypeEnum =
  | "market"
  | "limit"
  | "stop"
  | "stop_limit"
  | "trailing_stop"
export type CreateOrderTimeInForceEnum = "day" | "gtc" | "opg" | "cls" | "ioc" | "fok"
export type CreateOrderOrderClassEnum = "simple" | "bracket" | "oco" | "oto"

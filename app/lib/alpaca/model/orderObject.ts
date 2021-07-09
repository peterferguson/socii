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

export class OrderObject {
  "id"?: string
  "clientOrderId"?: string
  "createdAt"?: Date
  "updatedAt"?: Date
  "submittedAt"?: Date
  "filledAt"?: Date | null
  "expiredAt"?: Date | null
  "canceledAt"?: Date | null
  "failedAt"?: Date | null
  "replacedAt"?: Date | null
  "replacedBy"?: string | null
  "replaces"?: string | null
  "assetId"?: string
  "symbol"?: string
  "assetClass"?: string
  "notional"?: string | null
  "qty"?: string | null
  "filledQty"?: string
  "filledAvgPrice"?: string | null
  "orderClass"?: OrderObject.OrderClassEnum
  "orderType"?: OrderObject.OrderTypeEnum
  "type"?: OrderObject.TypeEnum
  "side"?: OrderObject.SideEnum
  "timeInForce"?: OrderObject.TimeInForceEnum
  "limitPrice"?: string | null
  "stopPrice"?: string | null
  "status"?: OrderObject.StatusEnum
  "extendedHours"?: boolean
  "legs"?: Array<OrderObject> | null
  "trailPrice"?: string | null
  "trailPercent"?: string | null
  "hwm"?: string | null
  "commission"?: string

  static discriminator: string | undefined = undefined

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: "id",
      baseName: "id",
      type: "string",
    },
    {
      name: "clientOrderId",
      baseName: "client_order_id",
      type: "string",
    },
    {
      name: "createdAt",
      baseName: "created_at",
      type: "Date",
    },
    {
      name: "updatedAt",
      baseName: "updated_at",
      type: "Date",
    },
    {
      name: "submittedAt",
      baseName: "submitted_at",
      type: "Date",
    },
    {
      name: "filledAt",
      baseName: "filled_at",
      type: "Date",
    },
    {
      name: "expiredAt",
      baseName: "expired_at",
      type: "Date",
    },
    {
      name: "canceledAt",
      baseName: "canceled_at",
      type: "Date",
    },
    {
      name: "failedAt",
      baseName: "failed_at",
      type: "Date",
    },
    {
      name: "replacedAt",
      baseName: "replaced_at",
      type: "Date",
    },
    {
      name: "replacedBy",
      baseName: "replaced_by",
      type: "string",
    },
    {
      name: "replaces",
      baseName: "replaces",
      type: "string",
    },
    {
      name: "assetId",
      baseName: "asset_id",
      type: "string",
    },
    {
      name: "symbol",
      baseName: "symbol",
      type: "string",
    },
    {
      name: "assetClass",
      baseName: "asset_class",
      type: "string",
    },
    {
      name: "notional",
      baseName: "notional",
      type: "string",
    },
    {
      name: "qty",
      baseName: "qty",
      type: "string",
    },
    {
      name: "filledQty",
      baseName: "filled_qty",
      type: "string",
    },
    {
      name: "filledAvgPrice",
      baseName: "filled_avg_price",
      type: "string",
    },
    {
      name: "orderClass",
      baseName: "order_class",
      type: "OrderObject.OrderClassEnum",
    },
    {
      name: "orderType",
      baseName: "order_type",
      type: "OrderObject.OrderTypeEnum",
    },
    {
      name: "type",
      baseName: "type",
      type: "OrderObject.TypeEnum",
    },
    {
      name: "side",
      baseName: "side",
      type: "OrderObject.SideEnum",
    },
    {
      name: "timeInForce",
      baseName: "time_in_force",
      type: "OrderObject.TimeInForceEnum",
    },
    {
      name: "limitPrice",
      baseName: "limit_price",
      type: "string",
    },
    {
      name: "stopPrice",
      baseName: "stop_price",
      type: "string",
    },
    {
      name: "status",
      baseName: "status",
      type: "OrderObject.StatusEnum",
    },
    {
      name: "extendedHours",
      baseName: "extended_hours",
      type: "boolean",
    },
    {
      name: "legs",
      baseName: "legs",
      type: "Array<OrderObject>",
    },
    {
      name: "trailPrice",
      baseName: "trail_price",
      type: "string",
    },
    {
      name: "trailPercent",
      baseName: "trail_percent",
      type: "string",
    },
    {
      name: "hwm",
      baseName: "hwm",
      type: "string",
    },
    {
      name: "commission",
      baseName: "commission",
      type: "string",
    },
  ]

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

  static getAttributeTypeMap() {
    return OrderObject.attributeTypeMap
  }
}

// eslint-disable-next-line no-redeclare
export namespace OrderObject {
  export enum OrderClassEnum {
    Simple = <any>"simple",
    Bracket = <any>"bracket",
    Oco = <any>"oco",
    Oto = <any>"oto",
  }
  export enum OrderTypeEnum {
    Market = <any>"market",
    Limit = <any>"limit",
    Stop = <any>"stop",
    StopLimit = <any>"stop_limit",
    TrailingStop = <any>"trailing_stop",
  }
  export enum TypeEnum {
    Market = <any>"market",
    Limit = <any>"limit",
    Stop = <any>"stop",
    StopLimit = <any>"stop_limit",
    TrailingStop = <any>"trailing_stop",
  }
  export enum SideEnum {
    Buy = <any>"buy",
    Sell = <any>"sell",
  }
  export enum TimeInForceEnum {
    Day = <any>"day",
    Gtc = <any>"gtc",
    Opg = <any>"opg",
    Cls = <any>"cls",
    Ioc = <any>"ioc",
    Fok = <any>"fok",
  }
  export enum StatusEnum {
    New = <any>"new",
    PartiallyFilled = <any>"partially_filled",
    Filled = <any>"filled",
    DoneForDay = <any>"done_for_day",
    Canceled = <any>"canceled",
    Expired = <any>"expired",
    Replaced = <any>"replaced",
    PendingCancel = <any>"pending_cancel",
    PendingReplace = <any>"pending_replace",
    Accepted = <any>"accepted",
    PendingNew = <any>"pending_new",
    AcceptedForBidding = <any>"accepted_for_bidding",
    Stopped = <any>"stopped",
    Rejected = <any>"rejected",
    Suspended = <any>"suspended",
    Calculated = <any>"calculated",
  }
}

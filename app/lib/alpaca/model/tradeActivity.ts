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
import { Activity } from "./activity"
import { ActivityType } from "./activityType"
import { TradeActivityAllOf } from "./tradeActivityAllOf"

export class TradeActivity {
  "id"?: string
  "accountId"?: string
  "activityType"?: ActivityType
  "transactionTime"?: string
  "type"?: TradeActivity.TypeEnum
  "price"?: string
  "qty"?: string
  "side"?: TradeActivity.SideEnum
  "symbol"?: string
  "leavesQty"?: string
  "orderId"?: string
  "cumQty"?: string
  "orderStatus"?: TradeActivity.OrderStatusEnum

  static discriminator: string | undefined = undefined

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: "id",
      baseName: "id",
      type: "string",
    },
    {
      name: "accountId",
      baseName: "account_id",
      type: "string",
    },
    {
      name: "activityType",
      baseName: "activity_type",
      type: "ActivityType",
    },
    {
      name: "transactionTime",
      baseName: "transaction_time",
      type: "string",
    },
    {
      name: "type",
      baseName: "type",
      type: "TradeActivity.TypeEnum",
    },
    {
      name: "price",
      baseName: "price",
      type: "string",
    },
    {
      name: "qty",
      baseName: "qty",
      type: "string",
    },
    {
      name: "side",
      baseName: "side",
      type: "TradeActivity.SideEnum",
    },
    {
      name: "symbol",
      baseName: "symbol",
      type: "string",
    },
    {
      name: "leavesQty",
      baseName: "leaves_qty",
      type: "string",
    },
    {
      name: "orderId",
      baseName: "order_id",
      type: "string",
    },
    {
      name: "cumQty",
      baseName: "cum_qty",
      type: "string",
    },
    {
      name: "orderStatus",
      baseName: "order_status",
      type: "TradeActivity.OrderStatusEnum",
    },
  ]

  static from(json) {
    return Object.assign(new TradeActivity(), json)
  }

  static getAttributeTypeMap() {
    return TradeActivity.attributeTypeMap
  }
}

export namespace TradeActivity {
  export enum TypeEnum {
    Fill = <any>"fill",
    PartialFill = <any>"partial_fill",
  }
  export enum SideEnum {
    Buy = <any>"buy",
    Sell = <any>"sell",
  }
  export enum OrderStatusEnum {
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

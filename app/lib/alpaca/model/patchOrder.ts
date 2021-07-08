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

export class PatchOrder {
  "qty"?: string
  "timeInForce"?: PatchOrder.TimeInForceEnum
  "limitPrice"?: string
  "stopPrice"?: string
  "trail"?: string
  "clientOrderId"?: string
  "createdAt": Date
  "updatedAt": Date

  static discriminator: string | undefined = undefined

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: "qty",
      baseName: "qty",
      type: "string",
    },
    {
      name: "timeInForce",
      baseName: "time_in_force",
      type: "PatchOrder.TimeInForceEnum",
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
      name: "trail",
      baseName: "trail",
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
    return PatchOrder.attributeTypeMap
  }
}

export namespace PatchOrder {
  export enum TimeInForceEnum {
    Day = <any>"day",
    Gtc = <any>"gtc",
    Opg = <any>"opg",
    Cls = <any>"cls",
    Ioc = <any>"ioc",
    Fok = <any>"fok",
  }
}

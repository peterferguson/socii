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

export class InlineResponse2002 {
  "timestamp"?: string
  "isOpen"?: boolean
  "nextOpen"?: string
  "nextClose"?: string

  static discriminator: string | undefined = undefined

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: "timestamp",
      baseName: "timestamp",
      type: "string",
    },
    {
      name: "isOpen",
      baseName: "is_open",
      type: "boolean",
    },
    {
      name: "nextOpen",
      baseName: "next_open",
      type: "string",
    },
    {
      name: "nextClose",
      baseName: "next_close",
      type: "string",
    },
  ]

  static from(json) {
    return Object.assign(new InlineResponse2002(), json)
  }

  static getAttributeTypeMap() {
    return InlineResponse2002.attributeTypeMap
  }
}

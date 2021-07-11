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

import { UntypedTransferData } from "./UntypedTransferData"
import { UntypedWireTransferDataAllOf } from "./UntypedWireTransferDataAllOf"
import { HttpFile } from "../http/http"

export class UntypedWireTransferData {
  "amount": string
  "direction": UntypedWireTransferDataDirectionEnum
  "additionalInformation"?: string
  "bankId": string

  static readonly discriminator: string | undefined = undefined

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
    {
      name: "amount",
      baseName: "amount",
      type: "string",
      format: "decimal",
    },
    {
      name: "direction",
      baseName: "direction",
      type: "UntypedWireTransferDataDirectionEnum",
      format: "",
    },
    {
      name: "additionalInformation",
      baseName: "additional_information",
      type: "string",
      format: "",
    },
    {
      name: "bankId",
      baseName: "bank_id",
      type: "string",
      format: "uuid",
    },
  ]

  static getAttributeTypeMap() {
    return UntypedWireTransferData.attributeTypeMap
  }

  public constructor() {}
}

export type UntypedWireTransferDataDirectionEnum = "INCOMING" | "OUTGOING"

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
import { UntypedACHTransferDataAllOf } from "./untypedACHTransferDataAllOf"
import { UntypedTransferData } from "./untypedTransferData"

export class UntypedACHTransferData {
  "amount": string
  "direction": UntypedACHTransferData.DirectionEnum
  "relationshipId": string

  static discriminator: string | undefined = undefined

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: "amount",
      baseName: "amount",
      type: "string",
    },
    {
      name: "direction",
      baseName: "direction",
      type: "UntypedACHTransferData.DirectionEnum",
    },
    {
      name: "relationshipId",
      baseName: "relationship_id",
      type: "string",
    },
  ]

  static from(json) {
    return Object.assign(new UntypedACHTransferData(), json)
  }

  static getAttributeTypeMap() {
    return UntypedACHTransferData.attributeTypeMap
  }
}

export namespace UntypedACHTransferData {
  export enum DirectionEnum {
    Incoming = <any>"INCOMING",
    Outgoing = <any>"OUTGOING",
  }
}

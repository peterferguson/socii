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

export class TransferData {
  "transferType": TransferDataTransferTypeEnum
  "timing"?: TransferDataTimingEnum
  "amount": string
  "direction": TransferDataDirectionEnum
  "relationshipId": string
  "additionalInformation"?: string
  "bankId": string

  static readonly discriminator: string | undefined = "transferType"

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
    {
      name: "transferType",
      baseName: "transfer_type",
      type: "TransferDataTransferTypeEnum",
      format: "",
    },
    {
      name: "timing",
      baseName: "timing",
      type: "TransferDataTimingEnum",
      format: "",
    },
    {
      name: "amount",
      baseName: "amount",
      type: "string",
      format: "decimal",
    },
    {
      name: "direction",
      baseName: "direction",
      type: "TransferDataDirectionEnum",
      format: "",
    },
    {
      name: "relationshipId",
      baseName: "relationship_id",
      type: "string",
      format: "uuid",
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
    return TransferData.attributeTypeMap
  }

  public constructor() {}
}

export type TransferDataTransferTypeEnum = "ach" | "wire"
export type TransferDataTimingEnum = "immediate"
export type TransferDataDirectionEnum = "INCOMING" | "OUTGOING"
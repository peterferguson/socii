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

export class TransferResource {
  "id": string
  "createdAt": Date
  "updatedAt": Date
  "type": TransferResourceTypeEnum
  "status": TransferResourceStatusEnum
  "accountId": string
  "reason"?: string
  "expiresAt": Date
  "amount": string
  "direction": TransferResourceDirectionEnum
  "relationshipId": string
  "additionalInformation"?: string
  "bankId": string

  static readonly discriminator: string | undefined = "type"

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
    {
      name: "id",
      baseName: "id",
      type: "string",
      format: "uuid",
    },
    {
      name: "createdAt",
      baseName: "created_at",
      type: "Date",
      format: "date-time",
    },
    {
      name: "updatedAt",
      baseName: "updated_at",
      type: "Date",
      format: "date-time",
    },
    {
      name: "type",
      baseName: "type",
      type: "TransferResourceTypeEnum",
      format: "",
    },
    {
      name: "status",
      baseName: "status",
      type: "TransferResourceStatusEnum",
      format: "",
    },
    {
      name: "accountId",
      baseName: "account_id",
      type: "string",
      format: "uuid",
    },
    {
      name: "reason",
      baseName: "reason",
      type: "string",
      format: "",
    },
    {
      name: "expiresAt",
      baseName: "expires_at",
      type: "Date",
      format: "date-time",
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
      type: "TransferResourceDirectionEnum",
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
    return TransferResource.attributeTypeMap
  }

  public constructor() {
    this.type = "TransferResource"
  }
}

export type TransferResourceTypeEnum = "ach" | "wire"
export type TransferResourceStatusEnum =
  | "QUEUED"
  | "PENDING"
  | "REJECTED"
  | "APPROVED"
  | "COMPLETE"
export type TransferResourceDirectionEnum = "INCOMING" | "OUTGOING"

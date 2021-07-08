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
import { IdentifiedResource } from "./identifiedResource"
import { TransferResourceAllOf } from "./transferResourceAllOf"

export class TransferResource {
  "id": string
  "createdAt": Date
  "updatedAt": Date
  "type": TransferResource.TypeEnum
  "status": TransferResource.StatusEnum
  "accountId": string
  "reason"?: string | null
  "expiresAt": Date
  "amount": string
  "direction": TransferResource.DirectionEnum
  "relationshipId": string
  "additionalInformation"?: string
  "bankId": string

  static discriminator: string | undefined = "type"

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: "id",
      baseName: "id",
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
      name: "type",
      baseName: "type",
      type: "TransferResource.TypeEnum",
    },
    {
      name: "status",
      baseName: "status",
      type: "TransferResource.StatusEnum",
    },
    {
      name: "accountId",
      baseName: "account_id",
      type: "string",
    },
    {
      name: "reason",
      baseName: "reason",
      type: "string",
    },
    {
      name: "expiresAt",
      baseName: "expires_at",
      type: "Date",
    },
    {
      name: "amount",
      baseName: "amount",
      type: "string",
    },
    {
      name: "direction",
      baseName: "direction",
      type: "TransferResource.DirectionEnum",
    },
    {
      name: "relationshipId",
      baseName: "relationship_id",
      type: "string",
    },
    {
      name: "additionalInformation",
      baseName: "additional_information",
      type: "string",
    },
    {
      name: "bankId",
      baseName: "bank_id",
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
    return TransferResource.attributeTypeMap
  }
}

export namespace TransferResource {
  export enum TypeEnum {
    Ach = <any>"ach",
    Wire = <any>"wire",
  }
  export enum StatusEnum {
    Queued = <any>"QUEUED",
    Pending = <any>"PENDING",
    Rejected = <any>"REJECTED",
    Approved = <any>"APPROVED",
    Complete = <any>"COMPLETE",
  }
  export enum DirectionEnum {
    Incoming = <any>"INCOMING",
    Outgoing = <any>"OUTGOING",
  }
}
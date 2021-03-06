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

export class ACHRelationshipResource {
  "id": string
  "createdAt": Date
  "updatedAt": Date
  "accountOwnerName": string
  "bankAccountType": ACHRelationshipResourceBankAccountTypeEnum
  "bankAccountNumber": string
  "bankRoutingNumber": string
  "nickname"?: string
  "accountId": string
  "status": ACHRelationshipResourceStatusEnum

  static readonly discriminator: string | undefined = undefined

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
      name: "accountOwnerName",
      baseName: "account_owner_name",
      type: "string",
      format: "",
    },
    {
      name: "bankAccountType",
      baseName: "bank_account_type",
      type: "ACHRelationshipResourceBankAccountTypeEnum",
      format: "",
    },
    {
      name: "bankAccountNumber",
      baseName: "bank_account_number",
      type: "string",
      format: "",
    },
    {
      name: "bankRoutingNumber",
      baseName: "bank_routing_number",
      type: "string",
      format: "",
    },
    {
      name: "nickname",
      baseName: "nickname",
      type: "string",
      format: "",
    },
    {
      name: "accountId",
      baseName: "account_id",
      type: "string",
      format: "uuid",
    },
    {
      name: "status",
      baseName: "status",
      type: "ACHRelationshipResourceStatusEnum",
      format: "",
    },
  ]

  static getAttributeTypeMap() {
    return ACHRelationshipResource.attributeTypeMap
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

export type ACHRelationshipResourceBankAccountTypeEnum = "CHECKING" | "SAVINGS"
export type ACHRelationshipResourceStatusEnum =
  | "QUEUED"
  | "APPROVED"
  | "PENDING"
  | "CANCEL_REQUESTED"

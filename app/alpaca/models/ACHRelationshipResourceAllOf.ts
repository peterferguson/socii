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

export class ACHRelationshipResourceAllOf {
  "accountId": string
  "status": ACHRelationshipResourceAllOfStatusEnum

  static readonly discriminator: string | undefined = undefined

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
    {
      name: "accountId",
      baseName: "account_id",
      type: "string",
      format: "uuid",
    },
    {
      name: "status",
      baseName: "status",
      type: "ACHRelationshipResourceAllOfStatusEnum",
      format: "",
    },
  ]

  static getAttributeTypeMap() {
    return ACHRelationshipResourceAllOf.attributeTypeMap
  }

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

  public constructor() {}
}

export type ACHRelationshipResourceAllOfStatusEnum =
  | "QUEUED"
  | "APPROVED"
  | "PENDING"
  | "CANCEL_REQUESTED"
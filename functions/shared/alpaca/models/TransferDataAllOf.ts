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

export class TransferDataAllOf {
  "transferType": TransferDataAllOfTransferTypeEnum
  "timing"?: TransferDataAllOfTimingEnum

  static readonly discriminator: string | undefined = undefined

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
    {
      name: "transferType",
      baseName: "transfer_type",
      type: "TransferDataAllOfTransferTypeEnum",
      format: "",
    },
    {
      name: "timing",
      baseName: "timing",
      type: "TransferDataAllOfTimingEnum",
      format: "",
    },
  ]

  static getAttributeTypeMap() {
    return TransferDataAllOf.attributeTypeMap
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

export type TransferDataAllOfTransferTypeEnum = "ach" | "wire"
export type TransferDataAllOfTimingEnum = "immediate"

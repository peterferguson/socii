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

import { DocumentType } from "./DocumentType"

/**
 * If an account has documents on the application submission, it has the ApplicationDocument model in exchange with DocumentUpload.
 */
export class ApplicationDocument {
  "id": string
  "documentType": DocumentType
  "documentSubType"?: string
  "mimeType": string
  "createdAt": Date

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
      name: "documentType",
      baseName: "document_type",
      type: "DocumentType",
      format: "",
    },
    {
      name: "documentSubType",
      baseName: "document_sub_type",
      type: "string",
      format: "",
    },
    {
      name: "mimeType",
      baseName: "mime_type",
      type: "string",
      format: "",
    },
    {
      name: "createdAt",
      baseName: "created_at",
      type: "Date",
      format: "date-time",
    },
  ]

  static getAttributeTypeMap() {
    return ApplicationDocument.attributeTypeMap
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

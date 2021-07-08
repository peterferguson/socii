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
import { DocumentType } from "./documentType"

/**
 * If an account has documents after the submission, it has the Document model in exchange with DocumentUpload.
 */
export class DocumentUpload {
  "documentType": DocumentType
  "documentSubType"?: string
  "content": string
  "mimeType": string

  static discriminator: string | undefined = undefined

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: "documentType",
      baseName: "document_type",
      type: "DocumentType",
    },
    {
      name: "documentSubType",
      baseName: "document_sub_type",
      type: "string",
    },
    {
      name: "content",
      baseName: "content",
      type: "string",
    },
    {
      name: "mimeType",
      baseName: "mime_type",
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
    return DocumentUpload.attributeTypeMap
  }
}
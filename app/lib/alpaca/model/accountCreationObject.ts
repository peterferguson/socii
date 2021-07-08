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
import { Agreement } from "./agreement"
import { Contact } from "./contact"
import { Disclosures } from "./disclosures"
import { DocumentUpload } from "./documentUpload"
import { Identity } from "./identity"
import { TrustedContact } from "./trustedContact"

export class AccountCreationObject {
  "contact"?: Contact
  "identity"?: Identity
  "disclosures"?: Disclosures
  /**
   * The client has to present Alpaca Account Agreement and Margin Agreement to the end user, and have them read full sentences.
   */
  "agreements"?: Array<Agreement>
  "documents"?: Array<DocumentUpload>
  "trustedContact"?: TrustedContact

  static discriminator: string | undefined = undefined

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: "contact",
      baseName: "contact",
      type: "Contact",
    },
    {
      name: "identity",
      baseName: "identity",
      type: "Identity",
    },
    {
      name: "disclosures",
      baseName: "disclosures",
      type: "Disclosures",
    },
    {
      name: "agreements",
      baseName: "agreements",
      type: "Array<Agreement>",
    },
    {
      name: "documents",
      baseName: "documents",
      type: "Array<DocumentUpload>",
    },
    {
      name: "trustedContact",
      baseName: "trusted_contact",
      type: "TrustedContact",
    },
  ]

  static from(json) {
    return Object.assign(new AccountCreationObject(), json)
  }

  static getAttributeTypeMap() {
    return AccountCreationObject.attributeTypeMap
  }
}

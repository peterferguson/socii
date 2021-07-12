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

import { Contact } from "./Contact"
import { Disclosures } from "./Disclosures"
import { Identity } from "./Identity"
import { TrustedContact } from "./TrustedContact"

export class AccountUpdate {
  "contact"?: Contact
  "identity"?: Identity
  "disclosures"?: Disclosures
  "trustedContact"?: TrustedContact

  static readonly discriminator: string | undefined = undefined

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
    {
      name: "contact",
      baseName: "contact",
      type: "Contact",
      format: "",
    },
    {
      name: "identity",
      baseName: "identity",
      type: "Identity",
      format: "",
    },
    {
      name: "disclosures",
      baseName: "disclosures",
      type: "Disclosures",
      format: "",
    },
    {
      name: "trustedContact",
      baseName: "trustedContact",
      type: "TrustedContact",
      format: "",
    },
  ]

  static getAttributeTypeMap() {
    return AccountUpdate.attributeTypeMap
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

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

import { HttpFile } from "../http/http"

/**
 * This model input is optional. However, the client should make reasonable effort to obtain the trusted contact information. See more details in [FINRA Notice 17-11](https://www.finra.org/sites/default/files/Regulatory-Notice-17-11.pdf)
 */
export class TrustedContact {
  "givenName": string
  "familyName": string
  /**
   * at least one of `email_address`, `phone_number` or `street_address` is required
   */
  "emailAddress"?: string
  /**
   * at least one of `email_address`, `phone_number` or `street_address` is required
   */
  "phoneNumber"?: string
  /**
   * at least one of `email_address`, `phone_number` or `street_address` is required
   */
  "streetAddress"?: Array<string>
  /**
   * required if `street_address` is set
   */
  "city"?: string
  /**
   * required if `street_address` is set
   */
  "state"?: string
  /**
   * required if `street_address` is set
   */
  "postalCode"?: string
  /**
   * [ISO 3166-1 alpha-3](https://www.iso.org/iso-3166-country-codes.html). required if `street_address` is set
   */
  "country"?: string

  static readonly discriminator: string | undefined = undefined

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
    {
      name: "givenName",
      baseName: "given_name",
      type: "string",
      format: "",
    },
    {
      name: "familyName",
      baseName: "family_name",
      type: "string",
      format: "",
    },
    {
      name: "emailAddress",
      baseName: "email_address",
      type: "string",
      format: "email",
    },
    {
      name: "phoneNumber",
      baseName: "phone_number",
      type: "string",
      format: "",
    },
    {
      name: "streetAddress",
      baseName: "street_address",
      type: "Array<string>",
      format: "",
    },
    {
      name: "city",
      baseName: "city",
      type: "string",
      format: "",
    },
    {
      name: "state",
      baseName: "state",
      type: "string",
      format: "",
    },
    {
      name: "postalCode",
      baseName: "postal_code",
      type: "string",
      format: "",
    },
    {
      name: "country",
      baseName: "country",
      type: "string",
      format: "",
    },
  ]

  static getAttributeTypeMap() {
    return TrustedContact.attributeTypeMap
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

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

export class InlineResponse2006 {
  "clientId"?: string
  "name"?: string
  "description"?: string
  "url"?: string
  /**
   * URL of Terms of Use
   */
  "termsOfUse"?: string
  /**
   * URL of Privacy Policy
   */
  "privacyPolicy"?: string
  "status"?: InlineResponse2006StatusEnum
  "redirectUri"?: Array<string>
  "liveTradingApproved"?: boolean

  static readonly discriminator: string | undefined = undefined

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
    {
      name: "clientId",
      baseName: "client_id",
      type: "string",
      format: "",
    },
    {
      name: "name",
      baseName: "name",
      type: "string",
      format: "",
    },
    {
      name: "description",
      baseName: "description",
      type: "string",
      format: "",
    },
    {
      name: "url",
      baseName: "url",
      type: "string",
      format: "",
    },
    {
      name: "termsOfUse",
      baseName: "terms_of_use",
      type: "string",
      format: "",
    },
    {
      name: "privacyPolicy",
      baseName: "privacy_policy",
      type: "string",
      format: "",
    },
    {
      name: "status",
      baseName: "status",
      type: "InlineResponse2006StatusEnum",
      format: "",
    },
    {
      name: "redirectUri",
      baseName: "redirect_uri",
      type: "Array<string>",
      format: "",
    },
    {
      name: "liveTradingApproved",
      baseName: "live_trading_approved",
      type: "boolean",
      format: "",
    },
  ]

  static getAttributeTypeMap() {
    return InlineResponse2006.attributeTypeMap
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

export type InlineResponse2006StatusEnum = "ACTIVE" | "DISABLED"

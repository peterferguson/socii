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

export class InlineObject {
  /**
   * OAuth client ID
   */
  "clientId"?: string
  /**
   * OAuth client secret
   */
  "clientSecret"?: string
  /**
   * redirect URI for the OAuth flow
   */
  "redirectUri"?: string
  /**
   * scopes requested by the OAuth flow
   */
  "scope"?: string
  /**
   * end-user account ID
   */
  "accountId"?: string

  static discriminator: string | undefined = undefined

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: "clientId",
      baseName: "client_id",
      type: "string",
    },
    {
      name: "clientSecret",
      baseName: "client_secret",
      type: "string",
    },
    {
      name: "redirectUri",
      baseName: "redirect_uri",
      type: "string",
    },
    {
      name: "scope",
      baseName: "scope",
      type: "string",
    },
    {
      name: "accountId",
      baseName: "account_id",
      type: "string",
    },
  ]

  static from(json) {
    return Object.assign(new InlineObject(), json)
  }

  static getAttributeTypeMap() {
    return InlineObject.attributeTypeMap
  }
}

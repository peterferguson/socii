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

export class JournalData {
  "entryType": JournalData.EntryTypeEnum
  "fromAccount": string
  "toAccount": string
  /**
   * Required for JNLC. The dollar amount to move. It has to be a positive value.
   */
  "amount"?: string
  /**
   * Required for JNLS.
   */
  "symbol"?: string
  /**
   * Required for JNLS. The number of shares to move. It has to be a positive value.
   */
  "qty"?: string

  static discriminator: string | undefined = undefined

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: "entryType",
      baseName: "entry_type",
      type: "JournalData.EntryTypeEnum",
    },
    {
      name: "fromAccount",
      baseName: "from_account",
      type: "string",
    },
    {
      name: "toAccount",
      baseName: "to_account",
      type: "string",
    },
    {
      name: "amount",
      baseName: "amount",
      type: "string",
    },
    {
      name: "symbol",
      baseName: "symbol",
      type: "string",
    },
    {
      name: "qty",
      baseName: "qty",
      type: "string",
    },
  ]

  static from(json) {
    return Object.assign(new JournalData(), json)
  }

  static getAttributeTypeMap() {
    return JournalData.attributeTypeMap
  }
}

export namespace JournalData {
  export enum EntryTypeEnum {
    Jnlc = <any>"JNLC",
    Jnls = <any>"JNLS",
  }
}

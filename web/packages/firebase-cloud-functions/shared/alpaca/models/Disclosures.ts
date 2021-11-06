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

/**
 * Disclosures fields denote if the account owner falls under each category defined by FINRA rule. The client has to ask questions for the end user and the values should reflect their answers.  If one of the answers is true (yes), the account goes into ACTION_REQUIRED status.
 */
export class Disclosures {
  "employmentStatus"?: DisclosuresEmploymentStatusEnum
  "employerName"?: string
  "employerAddress"?: string
  "employmentPosition"?: string
  "isControlPerson": boolean
  "isAffiliatedExchangeOrFinra": boolean
  "isPoliticallyExposed": boolean
  "immediateFamilyExposed": boolean

  static readonly discriminator: string | undefined = undefined

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
    {
      name: "employmentStatus",
      baseName: "employment_status",
      type: "DisclosuresEmploymentStatusEnum",
      format: "",
    },
    {
      name: "employerName",
      baseName: "employer_name",
      type: "string",
      format: "",
    },
    {
      name: "employerAddress",
      baseName: "employer_address",
      type: "string",
      format: "",
    },
    {
      name: "employmentPosition",
      baseName: "employment_position",
      type: "string",
      format: "",
    },
    {
      name: "isControlPerson",
      baseName: "is_control_person",
      type: "boolean",
      format: "",
    },
    {
      name: "isAffiliatedExchangeOrFinra",
      baseName: "is_affiliated_exchange_or_finra",
      type: "boolean",
      format: "",
    },
    {
      name: "isPoliticallyExposed",
      baseName: "is_politically_exposed",
      type: "boolean",
      format: "",
    },
    {
      name: "immediateFamilyExposed",
      baseName: "immediate_family_exposed",
      type: "boolean",
      format: "",
    },
  ]

  static getAttributeTypeMap() {
    return Disclosures.attributeTypeMap
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

export type DisclosuresEmploymentStatusEnum =
  | "unemployed"
  | "employed"
  | "student"
  | "retired"

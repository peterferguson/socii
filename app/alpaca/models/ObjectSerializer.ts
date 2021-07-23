export * from "./Account"
export * from "./AccountCreationObject"
export * from "./AccountExtended"
export * from "./AccountStatus"
export * from "./AccountUpdate"
export * from "./ACHRelationshipData"
export * from "./ACHRelationshipResource"
export * from "./ACHRelationshipResourceAllOf"
export * from "./Activity"
export * from "./ActivityItem"
export * from "./ActivityType"
export * from "./Agreement"
export * from "./ApplicationDocument"
export * from "./AssetResource"
export * from "./BankData"
export * from "./BankResource"
export * from "./BankResourceAllOf"
export * from "./BatchJournalRequest"
export * from "./BatchJournalRequestEntries"
export * from "./BatchJournalResponse"
export * from "./ClockResponse"
export * from "./Contact"
export * from "./CreateOrder"
export * from "./CreateOrderStopLoss"
export * from "./CreateOrderTakeProfit"
export * from "./Disclosures"
export * from "./DocumentType"
export * from "./DocumentUpload"
export * from "./IdentifiedResource"
export * from "./Identity"
export * from "./InlineObject"
export * from "./InlineObject1"
export * from "./TradingAccount"
export * from "./InlineResponse2003"
export * from "./InlineResponse2004"
export * from "./InlineResponse2005"
export * from "./InlineResponse2006"
export * from "./InlineResponse2007"
export * from "./InlineResponse2008"
export * from "./InlineResponse207"
export * from "./JournalData"
export * from "./JournalJNLC"
export * from "./JournalJNLS"
export * from "./JournalResource"
export * from "./KycResult"
export * from "./MarketDay"
export * from "./ModelError"
export * from "./NonTradeActivity"
export * from "./NonTradeActivityAllOf"
export * from "./OrderObject"
export * from "./PatchOrder"
export * from "./Position"
export * from "./TradeActivity"
export * from "./TradeActivityAllOf"
export * from "./TransferData"
export * from "./TransferDataAllOf"
export * from "./TransferResource"
export * from "./TransferResourceAllOf"
export * from "./TrustedContact"
export * from "./UntypedACHTransferData"
export * from "./UntypedACHTransferDataAllOf"
export * from "./UntypedTransferData"
export * from "./UntypedWireTransferData"
export * from "./UntypedWireTransferDataAllOf"

import { Account } from "./Account"
import { AccountCreationObject } from "./AccountCreationObject"
import { AccountExtended } from "./AccountExtended"
import { AccountUpdate } from "./AccountUpdate"
import { ACHRelationshipData } from "./ACHRelationshipData"
import { ACHRelationshipResource } from "./ACHRelationshipResource"
import { ACHRelationshipResourceAllOf } from "./ACHRelationshipResourceAllOf"
import { Activity } from "./Activity"
import { ActivityItem } from "./ActivityItem"
import { Agreement } from "./Agreement"
import { ApplicationDocument } from "./ApplicationDocument"
import { AssetResource } from "./AssetResource"
import { BankData } from "./BankData"
import { BankResource } from "./BankResource"
import { BankResourceAllOf } from "./BankResourceAllOf"
import { BatchJournalRequest } from "./BatchJournalRequest"
import { BatchJournalRequestEntries } from "./BatchJournalRequestEntries"
import { BatchJournalResponse } from "./BatchJournalResponse"
import { ClockResponse } from "./ClockResponse"
import { Contact } from "./Contact"
import { CreateOrder } from "./CreateOrder"
import { CreateOrderStopLoss } from "./CreateOrderStopLoss"
import { CreateOrderTakeProfit } from "./CreateOrderTakeProfit"
import { Disclosures } from "./Disclosures"
import { DocumentUpload } from "./DocumentUpload"
import { IdentifiedResource } from "./IdentifiedResource"
import { Identity } from "./Identity"
import { InlineObject } from "./InlineObject"
import { InlineObject1 } from "./InlineObject1"
import { TradingAccount } from "./TradingAccount"
import { InlineResponse2003 } from "./InlineResponse2003"
import { InlineResponse2004 } from "./InlineResponse2004"
import { InlineResponse2005 } from "./InlineResponse2005"
import { InlineResponse2006 } from "./InlineResponse2006"
import { InlineResponse2007 } from "./InlineResponse2007"
import { InlineResponse2008 } from "./InlineResponse2008"
import { InlineResponse207 } from "./InlineResponse207"
import { JournalData } from "./JournalData"
import { JournalJNLC } from "./JournalJNLC"
import { JournalJNLS } from "./JournalJNLS"
import { JournalResource } from "./JournalResource"
import { KycResult } from "./KycResult"
import { MarketDay } from "./MarketDay"
import { ModelError } from "./ModelError"
import { NonTradeActivity } from "./NonTradeActivity"
import { NonTradeActivityAllOf } from "./NonTradeActivityAllOf"
import { OrderObject } from "./OrderObject"
import { PatchOrder } from "./PatchOrder"
import { Position } from "./Position"
import { TradeActivity } from "./TradeActivity"
import { TradeActivityAllOf } from "./TradeActivityAllOf"
import { TransferData } from "./TransferData"
import { TransferDataAllOf } from "./TransferDataAllOf"
import { TransferResource } from "./TransferResource"
import { TransferResourceAllOf } from "./TransferResourceAllOf"
import { TrustedContact } from "./TrustedContact"
import { UntypedACHTransferData } from "./UntypedACHTransferData"
import { UntypedACHTransferDataAllOf } from "./UntypedACHTransferDataAllOf"
import { UntypedTransferData } from "./UntypedTransferData"
import { UntypedWireTransferData } from "./UntypedWireTransferData"
import { UntypedWireTransferDataAllOf } from "./UntypedWireTransferDataAllOf"

/* tslint:disable:no-unused-variable */
let primitives = [
  "string",
  "boolean",
  "double",
  "integer",
  "long",
  "float",
  "number",
  "any",
]

const supportedMediaTypes: { [mediaType: string]: number } = {
  "application/json": Infinity,
  "application/octet-stream": 0,
}

let enumsMap: Set<string> = new Set<string>([
  "ACHRelationshipDataBankAccountTypeEnum",
  "ACHRelationshipResourceBankAccountTypeEnum",
  "ACHRelationshipResourceStatusEnum",
  "ACHRelationshipResourceAllOfStatusEnum",
  "AccountStatus",
  "ActivityItemTypeEnum",
  "ActivityItemSideEnum",
  "ActivityItemOrderStatusEnum",
  "ActivityItemStatusEnum",
  "ActivityType",
  "AgreementAgreementEnum",
  "BankDataBankCodeTypeEnum",
  "BankResourceBankCodeTypeEnum",
  "BankResourceStatusEnum",
  "BankResourceAllOfStatusEnum",
  "BatchJournalRequestEntryTypeEnum",
  "BatchJournalResponseEntryTypeEnum",
  "BatchJournalResponseStatusEnum",
  "CreateOrderSideEnum",
  "CreateOrderTypeEnum",
  "CreateOrderTimeInForceEnum",
  "CreateOrderOrderClassEnum",
  "DisclosuresEmploymentStatusEnum",
  "DocumentType",
  "IdentityTaxIdTypeEnum",
  "IdentityFundingSourceEnum",
  "InlineResponse2006StatusEnum",
  "JournalDataEntryTypeEnum",
  "JournalJNLCStatusEnum",
  "JournalJNLSStatusEnum",
  "JournalResourceStatusEnum",
  "NonTradeActivityStatusEnum",
  "NonTradeActivityAllOfStatusEnum",
  "OrderObjectOrderClassEnum",
  "OrderObjectOrderTypeEnum",
  "OrderObjectTypeEnum",
  "OrderObjectSideEnum",
  "OrderObjectTimeInForceEnum",
  "OrderObjectStatusEnum",
  "PatchOrderTimeInForceEnum",
  "TradeActivityTypeEnum",
  "TradeActivitySideEnum",
  "TradeActivityOrderStatusEnum",
  "TradeActivityAllOfTypeEnum",
  "TradeActivityAllOfSideEnum",
  "TradeActivityAllOfOrderStatusEnum",
  "TransferDataTransferTypeEnum",
  "TransferDataTimingEnum",
  "TransferDataDirectionEnum",
  "TransferDataAllOfTransferTypeEnum",
  "TransferDataAllOfTimingEnum",
  "TransferResourceTypeEnum",
  "TransferResourceStatusEnum",
  "TransferResourceDirectionEnum",
  "TransferResourceAllOfTypeEnum",
  "TransferResourceAllOfStatusEnum",
  "UntypedACHTransferDataDirectionEnum",
  "UntypedTransferDataDirectionEnum",
  "UntypedWireTransferDataDirectionEnum",
])

let typeMap: { [index: string]: any } = {
  ACHRelationshipData: ACHRelationshipData,
  ACHRelationshipResource: ACHRelationshipResource,
  ACHRelationshipResourceAllOf: ACHRelationshipResourceAllOf,
  Account: Account,
  AccountCreationObject: AccountCreationObject,
  AccountExtended: AccountExtended,
  AccountUpdate: AccountUpdate,
  Activity: Activity,
  ActivityItem: ActivityItem,
  Agreement: Agreement,
  ApplicationDocument: ApplicationDocument,
  AssetResource: AssetResource,
  BankData: BankData,
  BankResource: BankResource,
  BankResourceAllOf: BankResourceAllOf,
  BatchJournalRequest: BatchJournalRequest,
  BatchJournalRequestEntries: BatchJournalRequestEntries,
  BatchJournalResponse: BatchJournalResponse,
  Contact: Contact,
  CreateOrder: CreateOrder,
  CreateOrderStopLoss: CreateOrderStopLoss,
  CreateOrderTakeProfit: CreateOrderTakeProfit,
  Disclosures: Disclosures,
  DocumentUpload: DocumentUpload,
  IdentifiedResource: IdentifiedResource,
  Identity: Identity,
  InlineObject: InlineObject,
  InlineObject1: InlineObject1,
  TradingAccount: TradingAccount,
  MarketDay: MarketDay,
  ClockResponse: ClockResponse,
  InlineResponse2003: InlineResponse2003,
  InlineResponse2004: InlineResponse2004,
  InlineResponse2005: InlineResponse2005,
  InlineResponse2006: InlineResponse2006,
  InlineResponse2007: InlineResponse2007,
  InlineResponse2008: InlineResponse2008,
  InlineResponse207: InlineResponse207,
  JournalData: JournalData,
  JournalJNLC: JournalJNLC,
  JournalJNLS: JournalJNLS,
  JournalResource: JournalResource,
  KycResult: KycResult,
  ModelError: ModelError,
  NonTradeActivity: NonTradeActivity,
  NonTradeActivityAllOf: NonTradeActivityAllOf,
  OrderObject: OrderObject,
  PatchOrder: PatchOrder,
  Position: Position,
  TradeActivity: TradeActivity,
  TradeActivityAllOf: TradeActivityAllOf,
  TransferData: TransferData,
  TransferDataAllOf: TransferDataAllOf,
  TransferResource: TransferResource,
  TransferResourceAllOf: TransferResourceAllOf,
  TrustedContact: TrustedContact,
  UntypedACHTransferData: UntypedACHTransferData,
  UntypedACHTransferDataAllOf: UntypedACHTransferDataAllOf,
  UntypedTransferData: UntypedTransferData,
  UntypedWireTransferData: UntypedWireTransferData,
  UntypedWireTransferDataAllOf: UntypedWireTransferDataAllOf,
}

export class ObjectSerializer {
  public static findCorrectType(data: any, expectedType: string) {
    if (data == undefined) {
      return expectedType
    } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
      return expectedType
    } else if (expectedType === "Date") {
      return expectedType
    } else {
      if (enumsMap.has(expectedType)) {
        return expectedType
      }

      if (!typeMap[expectedType]) {
        return expectedType // w/e we don't know the type
      }

      // Check the discriminator
      let discriminatorProperty = typeMap[expectedType].discriminator
      if (discriminatorProperty == null) {
        return expectedType // the type does not have a discriminator. use it.
      } else {
        if (data[discriminatorProperty]) {
          var discriminatorType = data[discriminatorProperty]
          if (typeMap[discriminatorType]) {
            return discriminatorType // use the type given in the discriminator
          } else {
            return expectedType // discriminator did not map to a type
          }
        } else {
          return expectedType // discriminator was not present (or an empty string)
        }
      }
    }
  }

  public static serialize(data: any, type: string, format: string) {
    if (data == undefined) {
      return data
    } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
      return data
    } else if (type.lastIndexOf("Array<", 0) === 0) {
      // string.startsWith pre es6
      let subType: string = type.replace("Array<", "") // Array<Type> => Type>
      subType = subType.substring(0, subType.length - 1) // Type> => Type
      let transformedData: any[] = []
      for (let index in data) {
        let date = data[index]
        transformedData.push(ObjectSerializer.serialize(date, subType, format))
      }
      return transformedData
    } else if (type === "Date") {
      if (format == "date") {
        let month = data.getMonth() + 1
        month = month < 10 ? "0" + month.toString() : month.toString()
        let day = data.getDate()
        day = day < 10 ? "0" + day.toString() : day.toString()

        return data.getFullYear() + "-" + month + "-" + day
      } else {
        return data.toISOString()
      }
    } else {
      if (enumsMap.has(type)) {
        return data
      }
      if (!typeMap[type]) {
        // in case we dont know the type
        return data
      }

      // Get the actual type of this object
      type = this.findCorrectType(data, type)

      // get the map for the correct type.
      let attributeTypes = typeMap[type].getAttributeTypeMap()
      let instance: { [index: string]: any } = {}
      for (let index in attributeTypes) {
        let attributeType = attributeTypes[index]
        instance[attributeType.baseName] = ObjectSerializer.serialize(
          data[attributeType.name] ?? data[attributeType.baseName],
          attributeType.type,
          attributeType.format
        )
      }
      return instance
    }
  }

  public static deserialize(data: any, type: string, format: string) {
    // polymorphism may change the actual type.
    type = ObjectSerializer.findCorrectType(data, type)
    if (data == undefined) {
      return data
    } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
      return data
    } else if (type.lastIndexOf("Array<", 0) === 0) {
      // string.startsWith pre es6
      let subType: string = type.replace("Array<", "") // Array<Type> => Type>
      subType = subType.substring(0, subType.length - 1) // Type> => Type
      let transformedData: any[] = []
      for (let index in data) {
        let date = data[index]
        transformedData.push(ObjectSerializer.deserialize(date, subType, format))
      }
      return transformedData
    } else if (type === "Date") {
      return new Date(data)
    } else {
      if (enumsMap.has(type)) {
        // is Enum
        return data
      }

      if (!typeMap[type]) {
        // dont know the type
        return data
      }
      let instance = new typeMap[type]()
      let attributeTypes = typeMap[type].getAttributeTypeMap()
      for (let index in attributeTypes) {
        let attributeType = attributeTypes[index]
        instance[attributeType.name] = ObjectSerializer.deserialize(
          data[attributeType.baseName] ?? data[attributeType.name],
          attributeType.type,
          attributeType.format
        )
      }
      return instance
    }
  }

  /**
   * Normalize media type
   *
   * We currently do not handle any media types attributes, i.e. anything
   * after a semicolon. All content is assumed to be UTF-8 compatible.
   */
  public static normalizeMediaType(mediaType: string | undefined): string | undefined {
    if (mediaType === undefined) {
      return undefined
    }
    return mediaType.split(";")[0].trim().toLowerCase()
  }

  /**
   * From a list of possible media types, choose the one we can handle best.
   *
   * The order of the given media types does not have any impact on the choice
   * made.
   */
  public static getPreferredMediaType(mediaTypes: Array<string>): string {
    /** According to OAS 3 we should default to json */
    if (!mediaTypes) {
      return "application/json"
    }

    const normalMediaTypes = mediaTypes.map(this.normalizeMediaType)
    let selectedMediaType: string | undefined = undefined
    let selectedRank: number = -Infinity
    for (const mediaType of normalMediaTypes) {
      if (supportedMediaTypes[mediaType!] > selectedRank) {
        selectedMediaType = mediaType
        selectedRank = supportedMediaTypes[mediaType!]
      }
    }

    if (selectedMediaType === undefined) {
      throw new Error(
        "None of the given media types are supported: " + mediaTypes.join(", ")
      )
    }

    return selectedMediaType!
  }

  /**
   * Convert data to a string according the given media type
   */
  public static stringify(data: any, mediaType: string): string {
    if (mediaType === "application/json") {
      return JSON.stringify(data)
    }

    throw new Error(
      "The mediaType " + mediaType + " is not supported by ObjectSerializer.stringify."
    )
  }

  /**
   * Parse data from a string according to the given media type
   */
  public static parse(rawData: string, mediaType: string | undefined) {
    if (mediaType === undefined) {
      throw new Error("Cannot parse content. No Content-Type defined.")
    }

    if (mediaType === "application/json") {
      return JSON.parse(rawData)
    }

    throw new Error(
      "The mediaType " + mediaType + " is not supported by ObjectSerializer.parse."
    )
  }
}

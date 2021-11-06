"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSerializer = void 0;
__exportStar(require("./Account"), exports);
__exportStar(require("./AccountCreationObject"), exports);
__exportStar(require("./AccountExtended"), exports);
__exportStar(require("./AccountStatus"), exports);
__exportStar(require("./AccountUpdate"), exports);
__exportStar(require("./ACHRelationshipData"), exports);
__exportStar(require("./ACHRelationshipResource"), exports);
__exportStar(require("./ACHRelationshipResourceAllOf"), exports);
__exportStar(require("./Activity"), exports);
__exportStar(require("./ActivityItem"), exports);
__exportStar(require("./ActivityType"), exports);
__exportStar(require("./Agreement"), exports);
__exportStar(require("./ApplicationDocument"), exports);
__exportStar(require("./AssetResource"), exports);
__exportStar(require("./BankData"), exports);
__exportStar(require("./BankResource"), exports);
__exportStar(require("./BankResourceAllOf"), exports);
__exportStar(require("./BatchJournalRequest"), exports);
__exportStar(require("./BatchJournalRequestEntries"), exports);
__exportStar(require("./BatchJournalResponse"), exports);
__exportStar(require("./ClockResponse"), exports);
__exportStar(require("./Contact"), exports);
__exportStar(require("./CreateOrder"), exports);
__exportStar(require("./CreateOrderStopLoss"), exports);
__exportStar(require("./CreateOrderTakeProfit"), exports);
__exportStar(require("./Disclosures"), exports);
__exportStar(require("./DocumentType"), exports);
__exportStar(require("./DocumentUpload"), exports);
__exportStar(require("./IdentifiedResource"), exports);
__exportStar(require("./Identity"), exports);
__exportStar(require("./InlineObject"), exports);
__exportStar(require("./InlineObject1"), exports);
__exportStar(require("./TradingAccount"), exports);
__exportStar(require("./InlineResponse2003"), exports);
__exportStar(require("./InlineResponse2004"), exports);
__exportStar(require("./InlineResponse2005"), exports);
__exportStar(require("./InlineResponse2006"), exports);
__exportStar(require("./InlineResponse2007"), exports);
__exportStar(require("./InlineResponse2008"), exports);
__exportStar(require("./InlineResponse207"), exports);
__exportStar(require("./JournalData"), exports);
__exportStar(require("./JournalJNLC"), exports);
__exportStar(require("./JournalJNLS"), exports);
__exportStar(require("./JournalResource"), exports);
__exportStar(require("./KycResult"), exports);
__exportStar(require("./MarketDay"), exports);
__exportStar(require("./ModelError"), exports);
__exportStar(require("./NonTradeActivity"), exports);
__exportStar(require("./NonTradeActivityAllOf"), exports);
__exportStar(require("./OrderObject"), exports);
__exportStar(require("./PatchOrder"), exports);
__exportStar(require("./Position"), exports);
__exportStar(require("./TradeActivity"), exports);
__exportStar(require("./TradeActivityAllOf"), exports);
__exportStar(require("./TransferData"), exports);
__exportStar(require("./TransferDataAllOf"), exports);
__exportStar(require("./TransferResource"), exports);
__exportStar(require("./TransferResourceAllOf"), exports);
__exportStar(require("./TrustedContact"), exports);
__exportStar(require("./UntypedACHTransferData"), exports);
__exportStar(require("./UntypedACHTransferDataAllOf"), exports);
__exportStar(require("./UntypedTransferData"), exports);
__exportStar(require("./UntypedWireTransferData"), exports);
__exportStar(require("./UntypedWireTransferDataAllOf"), exports);
const Account_1 = require("./Account");
const AccountCreationObject_1 = require("./AccountCreationObject");
const AccountExtended_1 = require("./AccountExtended");
const AccountUpdate_1 = require("./AccountUpdate");
const ACHRelationshipData_1 = require("./ACHRelationshipData");
const ACHRelationshipResource_1 = require("./ACHRelationshipResource");
const ACHRelationshipResourceAllOf_1 = require("./ACHRelationshipResourceAllOf");
const Activity_1 = require("./Activity");
const ActivityItem_1 = require("./ActivityItem");
const Agreement_1 = require("./Agreement");
const ApplicationDocument_1 = require("./ApplicationDocument");
const AssetResource_1 = require("./AssetResource");
const BankData_1 = require("./BankData");
const BankResource_1 = require("./BankResource");
const BankResourceAllOf_1 = require("./BankResourceAllOf");
const BatchJournalRequest_1 = require("./BatchJournalRequest");
const BatchJournalRequestEntries_1 = require("./BatchJournalRequestEntries");
const BatchJournalResponse_1 = require("./BatchJournalResponse");
const ClockResponse_1 = require("./ClockResponse");
const Contact_1 = require("./Contact");
const CreateOrder_1 = require("./CreateOrder");
const CreateOrderStopLoss_1 = require("./CreateOrderStopLoss");
const CreateOrderTakeProfit_1 = require("./CreateOrderTakeProfit");
const Disclosures_1 = require("./Disclosures");
const DocumentUpload_1 = require("./DocumentUpload");
const IdentifiedResource_1 = require("./IdentifiedResource");
const Identity_1 = require("./Identity");
const InlineObject_1 = require("./InlineObject");
const InlineObject1_1 = require("./InlineObject1");
const TradingAccount_1 = require("./TradingAccount");
const InlineResponse2003_1 = require("./InlineResponse2003");
const InlineResponse2004_1 = require("./InlineResponse2004");
const InlineResponse2005_1 = require("./InlineResponse2005");
const InlineResponse2006_1 = require("./InlineResponse2006");
const InlineResponse2007_1 = require("./InlineResponse2007");
const InlineResponse2008_1 = require("./InlineResponse2008");
const InlineResponse207_1 = require("./InlineResponse207");
const JournalData_1 = require("./JournalData");
const JournalJNLC_1 = require("./JournalJNLC");
const JournalJNLS_1 = require("./JournalJNLS");
const JournalResource_1 = require("./JournalResource");
const KycResult_1 = require("./KycResult");
const MarketDay_1 = require("./MarketDay");
const ModelError_1 = require("./ModelError");
const NonTradeActivity_1 = require("./NonTradeActivity");
const NonTradeActivityAllOf_1 = require("./NonTradeActivityAllOf");
const OrderObject_1 = require("./OrderObject");
const PatchOrder_1 = require("./PatchOrder");
const Position_1 = require("./Position");
const TradeActivity_1 = require("./TradeActivity");
const TradeActivityAllOf_1 = require("./TradeActivityAllOf");
const TransferData_1 = require("./TransferData");
const TransferDataAllOf_1 = require("./TransferDataAllOf");
const TransferResource_1 = require("./TransferResource");
const TransferResourceAllOf_1 = require("./TransferResourceAllOf");
const TrustedContact_1 = require("./TrustedContact");
const UntypedACHTransferData_1 = require("./UntypedACHTransferData");
const UntypedACHTransferDataAllOf_1 = require("./UntypedACHTransferDataAllOf");
const UntypedTransferData_1 = require("./UntypedTransferData");
const UntypedWireTransferData_1 = require("./UntypedWireTransferData");
const UntypedWireTransferDataAllOf_1 = require("./UntypedWireTransferDataAllOf");
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
];
const supportedMediaTypes = {
    "application/json": Infinity,
    "application/octet-stream": 0,
};
let enumsMap = new Set([
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
]);
let typeMap = {
    ACHRelationshipData: ACHRelationshipData_1.ACHRelationshipData,
    ACHRelationshipResource: ACHRelationshipResource_1.ACHRelationshipResource,
    ACHRelationshipResourceAllOf: ACHRelationshipResourceAllOf_1.ACHRelationshipResourceAllOf,
    Account: Account_1.Account,
    AccountCreationObject: AccountCreationObject_1.AccountCreationObject,
    AccountExtended: AccountExtended_1.AccountExtended,
    AccountUpdate: AccountUpdate_1.AccountUpdate,
    Activity: Activity_1.Activity,
    ActivityItem: ActivityItem_1.ActivityItem,
    Agreement: Agreement_1.Agreement,
    ApplicationDocument: ApplicationDocument_1.ApplicationDocument,
    AssetResource: AssetResource_1.AssetResource,
    BankData: BankData_1.BankData,
    BankResource: BankResource_1.BankResource,
    BankResourceAllOf: BankResourceAllOf_1.BankResourceAllOf,
    BatchJournalRequest: BatchJournalRequest_1.BatchJournalRequest,
    BatchJournalRequestEntries: BatchJournalRequestEntries_1.BatchJournalRequestEntries,
    BatchJournalResponse: BatchJournalResponse_1.BatchJournalResponse,
    Contact: Contact_1.Contact,
    CreateOrder: CreateOrder_1.CreateOrder,
    CreateOrderStopLoss: CreateOrderStopLoss_1.CreateOrderStopLoss,
    CreateOrderTakeProfit: CreateOrderTakeProfit_1.CreateOrderTakeProfit,
    Disclosures: Disclosures_1.Disclosures,
    DocumentUpload: DocumentUpload_1.DocumentUpload,
    IdentifiedResource: IdentifiedResource_1.IdentifiedResource,
    Identity: Identity_1.Identity,
    InlineObject: InlineObject_1.InlineObject,
    InlineObject1: InlineObject1_1.InlineObject1,
    TradingAccount: TradingAccount_1.TradingAccount,
    MarketDay: MarketDay_1.MarketDay,
    ClockResponse: ClockResponse_1.ClockResponse,
    InlineResponse2003: InlineResponse2003_1.InlineResponse2003,
    InlineResponse2004: InlineResponse2004_1.InlineResponse2004,
    InlineResponse2005: InlineResponse2005_1.InlineResponse2005,
    InlineResponse2006: InlineResponse2006_1.InlineResponse2006,
    InlineResponse2007: InlineResponse2007_1.InlineResponse2007,
    InlineResponse2008: InlineResponse2008_1.InlineResponse2008,
    InlineResponse207: InlineResponse207_1.InlineResponse207,
    JournalData: JournalData_1.JournalData,
    JournalJNLC: JournalJNLC_1.JournalJNLC,
    JournalJNLS: JournalJNLS_1.JournalJNLS,
    JournalResource: JournalResource_1.JournalResource,
    KycResult: KycResult_1.KycResult,
    ModelError: ModelError_1.ModelError,
    NonTradeActivity: NonTradeActivity_1.NonTradeActivity,
    NonTradeActivityAllOf: NonTradeActivityAllOf_1.NonTradeActivityAllOf,
    OrderObject: OrderObject_1.OrderObject,
    PatchOrder: PatchOrder_1.PatchOrder,
    Position: Position_1.Position,
    TradeActivity: TradeActivity_1.TradeActivity,
    TradeActivityAllOf: TradeActivityAllOf_1.TradeActivityAllOf,
    TransferData: TransferData_1.TransferData,
    TransferDataAllOf: TransferDataAllOf_1.TransferDataAllOf,
    TransferResource: TransferResource_1.TransferResource,
    TransferResourceAllOf: TransferResourceAllOf_1.TransferResourceAllOf,
    TrustedContact: TrustedContact_1.TrustedContact,
    UntypedACHTransferData: UntypedACHTransferData_1.UntypedACHTransferData,
    UntypedACHTransferDataAllOf: UntypedACHTransferDataAllOf_1.UntypedACHTransferDataAllOf,
    UntypedTransferData: UntypedTransferData_1.UntypedTransferData,
    UntypedWireTransferData: UntypedWireTransferData_1.UntypedWireTransferData,
    UntypedWireTransferDataAllOf: UntypedWireTransferDataAllOf_1.UntypedWireTransferDataAllOf,
};
class ObjectSerializer {
    static findCorrectType(data, expectedType) {
        if (data == undefined) {
            return expectedType;
        }
        else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        }
        else if (expectedType === "Date") {
            return expectedType;
        }
        else {
            if (enumsMap.has(expectedType)) {
                return expectedType;
            }
            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }
            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            }
            else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if (typeMap[discriminatorType]) {
                        return discriminatorType; // use the type given in the discriminator
                    }
                    else {
                        return expectedType; // discriminator did not map to a type
                    }
                }
                else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }
    static serialize(data, type, format) {
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) {
            // string.startsWith pre es6
            let subType = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType, format));
            }
            return transformedData;
        }
        else if (type === "Date") {
            if (format == "date") {
                let month = data.getMonth() + 1;
                month = month < 10 ? "0" + month.toString() : month.toString();
                let day = data.getDate();
                day = day < 10 ? "0" + day.toString() : day.toString();
                return data.getFullYear() + "-" + month + "-" + day;
            }
            else {
                return data.toISOString();
            }
        }
        else {
            if (enumsMap.has(type)) {
                return data;
            }
            if (!typeMap[type]) {
                // in case we dont know the type
                return data;
            }
            // Get the actual type of this object
            type = this.findCorrectType(data, type);
            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance = {};
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name] ?? data[attributeType.baseName], attributeType.type, attributeType.format);
            }
            return instance;
        }
    }
    static deserialize(data, type, format) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) {
            // string.startsWith pre es6
            let subType = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType, format));
            }
            return transformedData;
        }
        else if (type === "Date") {
            return new Date(data);
        }
        else {
            if (enumsMap.has(type)) {
                // is Enum
                return data;
            }
            if (!typeMap[type]) {
                // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName] ?? data[attributeType.name], attributeType.type, attributeType.format);
            }
            return instance;
        }
    }
    /**
     * Normalize media type
     *
     * We currently do not handle any media types attributes, i.e. anything
     * after a semicolon. All content is assumed to be UTF-8 compatible.
     */
    static normalizeMediaType(mediaType) {
        if (mediaType === undefined) {
            return undefined;
        }
        return mediaType.split(";")[0].trim().toLowerCase();
    }
    /**
     * From a list of possible media types, choose the one we can handle best.
     *
     * The order of the given media types does not have any impact on the choice
     * made.
     */
    static getPreferredMediaType(mediaTypes) {
        /** According to OAS 3 we should default to json */
        if (!mediaTypes) {
            return "application/json";
        }
        const normalMediaTypes = mediaTypes.map(this.normalizeMediaType);
        let selectedMediaType = undefined;
        let selectedRank = -Infinity;
        for (const mediaType of normalMediaTypes) {
            if (supportedMediaTypes[mediaType] > selectedRank) {
                selectedMediaType = mediaType;
                selectedRank = supportedMediaTypes[mediaType];
            }
        }
        if (selectedMediaType === undefined) {
            throw new Error("None of the given media types are supported: " + mediaTypes.join(", "));
        }
        return selectedMediaType;
    }
    /**
     * Convert data to a string according the given media type
     */
    static stringify(data, mediaType) {
        if (mediaType === "application/json") {
            return JSON.stringify(data);
        }
        throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.stringify.");
    }
    /**
     * Parse data from a string according to the given media type
     */
    static parse(rawData, mediaType) {
        if (mediaType === undefined) {
            throw new Error("Cannot parse content. No Content-Type defined.");
        }
        if (mediaType === "application/json") {
            return JSON.parse(rawData);
        }
        throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.parse.");
    }
}
exports.ObjectSerializer = ObjectSerializer;
//# sourceMappingURL=ObjectSerializer.js.map
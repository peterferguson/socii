"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalJNLC = void 0;
class JournalJNLC {
    /**
     * journal ID
     */
    "id";
    /**
     * JNLC (constant)
     */
    "entryType";
    /**
     * account ID the amount goes from
     */
    "fromAccount";
    "toAccount";
    /**
     * ID the amount goes to
     */
    "description";
    "settleDate";
    "status";
    "netAmount";
    /**
     * max 255 characters
     */
    "transmitterName";
    /**
     * max 255 characters
     */
    "transmitterAccountNumber";
    /**
     * max 255 characters
     */
    "transmitterAddress";
    /**
     * max 255 characters
     */
    "transmitterFinancialInstitution";
    "transmitterTimestamp";
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            name: "id",
            baseName: "id",
            type: "string",
            format: "uuid",
        },
        {
            name: "entryType",
            baseName: "entry_type",
            type: "string",
            format: "",
        },
        {
            name: "fromAccount",
            baseName: "from_account",
            type: "string",
            format: "uuid",
        },
        {
            name: "toAccount",
            baseName: "to_account",
            type: "string",
            format: "uuid",
        },
        {
            name: "description",
            baseName: "description",
            type: "string",
            format: "",
        },
        {
            name: "settleDate",
            baseName: "settle_date",
            type: "string",
            format: "date",
        },
        {
            name: "status",
            baseName: "status",
            type: "JournalJNLCStatusEnum",
            format: "",
        },
        {
            name: "netAmount",
            baseName: "net_amount",
            type: "string",
            format: "decimal",
        },
        {
            name: "transmitterName",
            baseName: "transmitter_name",
            type: "string",
            format: "",
        },
        {
            name: "transmitterAccountNumber",
            baseName: "transmitter_account_number",
            type: "string",
            format: "",
        },
        {
            name: "transmitterAddress",
            baseName: "transmitter_address",
            type: "string",
            format: "",
        },
        {
            name: "transmitterFinancialInstitution",
            baseName: "transmitter_financial_institution",
            type: "string",
            format: "",
        },
        {
            name: "transmitterTimestamp",
            baseName: "transmitter_timestamp",
            type: "Date",
            format: "date-time",
        },
    ];
    static getAttributeTypeMap() {
        return JournalJNLC.attributeTypeMap;
    }
    static from(json) {
        // - convert baseName to name
        if (json) {
            for (const { baseName, name } of this.attributeTypeMap) {
                if (baseName !== name && !(name in json)) {
                    Object.assign(json, { [name]: json[baseName] });
                    delete json[baseName];
                }
            }
        }
        return Object.assign(new this(), json);
    }
    constructor() { }
}
exports.JournalJNLC = JournalJNLC;
//# sourceMappingURL=JournalJNLC.js.map
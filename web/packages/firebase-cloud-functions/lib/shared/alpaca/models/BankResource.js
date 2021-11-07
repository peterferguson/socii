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
exports.BankResource = void 0;
class BankResource {
    "id";
    "createdAt";
    "updatedAt";
    "name";
    "bankCode";
    "bankCodeType";
    "country";
    "stateProvince";
    "postalCode";
    "city";
    "streetAddress";
    "accountNumber";
    "accountId";
    "status";
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            name: "id",
            baseName: "id",
            type: "string",
            format: "uuid",
        },
        {
            name: "createdAt",
            baseName: "created_at",
            type: "Date",
            format: "date-time",
        },
        {
            name: "updatedAt",
            baseName: "updated_at",
            type: "Date",
            format: "date-time",
        },
        {
            name: "name",
            baseName: "name",
            type: "string",
            format: "",
        },
        {
            name: "bankCode",
            baseName: "bank_code",
            type: "string",
            format: "",
        },
        {
            name: "bankCodeType",
            baseName: "bank_code_type",
            type: "BankResourceBankCodeTypeEnum",
            format: "",
        },
        {
            name: "country",
            baseName: "country",
            type: "string",
            format: "",
        },
        {
            name: "stateProvince",
            baseName: "state_province",
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
            name: "city",
            baseName: "city",
            type: "string",
            format: "",
        },
        {
            name: "streetAddress",
            baseName: "street_address",
            type: "string",
            format: "",
        },
        {
            name: "accountNumber",
            baseName: "account_number",
            type: "string",
            format: "",
        },
        {
            name: "accountId",
            baseName: "account_id",
            type: "string",
            format: "uuid",
        },
        {
            name: "status",
            baseName: "status",
            type: "BankResourceStatusEnum",
            format: "",
        },
    ];
    static getAttributeTypeMap() {
        return BankResource.attributeTypeMap;
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
exports.BankResource = BankResource;
//# sourceMappingURL=BankResource.js.map
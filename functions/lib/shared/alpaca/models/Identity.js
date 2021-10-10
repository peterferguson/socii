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
exports.Identity = void 0;
/**
 * Identity is the model to provide account owner’s identity information.
 */
class Identity {
    "givenName";
    "familyName";
    "dateOfBirth";
    "taxId";
    "taxIdType";
    /**
     * [ISO 3166-1 alpha-3](https://www.iso.org/iso-3166-country-codes.html).
     */
    "countryOfCitizenship";
    /**
     * [ISO 3166-1 alpha-3](https://www.iso.org/iso-3166-country-codes.html).
     */
    "countryOfBirth";
    /**
     * [ISO 3166-1 alpha-3](https://www.iso.org/iso-3166-country-codes.html).
     */
    "countryOfTaxResidence";
    "fundingSource";
    "annualIncomeMin";
    "annualIncomeMax";
    "liquidNetWorthMin";
    "liquidNetWorthMax";
    "totalNetWorthMin";
    "totalNetWorthMax";
    /**
     * any extra information used for KYC purposes
     */
    "extra";
    static discriminator = undefined;
    static attributeTypeMap = [
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
            name: "dateOfBirth",
            baseName: "date_of_birth",
            type: "string",
            format: "date",
        },
        {
            name: "taxId",
            baseName: "tax_id",
            type: "string",
            format: "",
        },
        {
            name: "taxIdType",
            baseName: "tax_id_type",
            type: "IdentityTaxIdTypeEnum",
            format: "",
        },
        {
            name: "countryOfCitizenship",
            baseName: "country_of_citizenship",
            type: "string",
            format: "",
        },
        {
            name: "countryOfBirth",
            baseName: "country_of_birth",
            type: "string",
            format: "",
        },
        {
            name: "countryOfTaxResidence",
            baseName: "country_of_tax_residence",
            type: "string",
            format: "",
        },
        {
            name: "fundingSource",
            baseName: "funding_source",
            type: "Array<IdentityFundingSourceEnum>",
            format: "",
        },
        {
            name: "annualIncomeMin",
            baseName: "annual_income_min",
            type: "number",
            format: "",
        },
        {
            name: "annualIncomeMax",
            baseName: "annual_income_max",
            type: "number",
            format: "",
        },
        {
            name: "liquidNetWorthMin",
            baseName: "liquid_net_worth_min",
            type: "number",
            format: "",
        },
        {
            name: "liquidNetWorthMax",
            baseName: "liquid_net_worth_max",
            type: "number",
            format: "",
        },
        {
            name: "totalNetWorthMin",
            baseName: "total_net_worth_min",
            type: "number",
            format: "",
        },
        {
            name: "totalNetWorthMax",
            baseName: "total_net_worth_max",
            type: "number",
            format: "",
        },
        {
            name: "extra",
            baseName: "extra",
            type: "any",
            format: "",
        },
    ];
    static getAttributeTypeMap() {
        return Identity.attributeTypeMap;
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
exports.Identity = Identity;
//# sourceMappingURL=Identity.js.map
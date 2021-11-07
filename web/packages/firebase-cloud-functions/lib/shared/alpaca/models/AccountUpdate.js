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
exports.AccountUpdate = void 0;
class AccountUpdate {
    "contact";
    "identity";
    "disclosures";
    "trustedContact";
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            name: "contact",
            baseName: "contact",
            type: "Contact",
            format: "",
        },
        {
            name: "identity",
            baseName: "identity",
            type: "Identity",
            format: "",
        },
        {
            name: "disclosures",
            baseName: "disclosures",
            type: "Disclosures",
            format: "",
        },
        {
            name: "trustedContact",
            baseName: "trustedContact",
            type: "TrustedContact",
            format: "",
        },
    ];
    static getAttributeTypeMap() {
        return AccountUpdate.attributeTypeMap;
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
exports.AccountUpdate = AccountUpdate;
//# sourceMappingURL=AccountUpdate.js.map
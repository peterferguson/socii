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
exports.ClockResponse = void 0;
class ClockResponse {
    "timestamp";
    "isOpen";
    "nextOpen";
    "nextClose";
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            name: "timestamp",
            baseName: "timestamp",
            type: "string",
            format: "",
        },
        {
            name: "isOpen",
            baseName: "is_open",
            type: "boolean",
            format: "",
        },
        {
            name: "nextOpen",
            baseName: "next_open",
            type: "string",
            format: "",
        },
        {
            name: "nextClose",
            baseName: "next_close",
            type: "string",
            format: "",
        },
    ];
    static getAttributeTypeMap() {
        return ClockResponse.attributeTypeMap;
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
exports.ClockResponse = ClockResponse;
//# sourceMappingURL=ClockResponse.js.map
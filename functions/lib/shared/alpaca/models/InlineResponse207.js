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
exports.InlineResponse207 = void 0;
class InlineResponse207 {
    "id";
    "status";
    "body";
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            name: "id",
            baseName: "id",
            type: "string",
            format: "",
        },
        {
            name: "status",
            baseName: "status",
            type: "number",
            format: "",
        },
        {
            name: "body",
            baseName: "body",
            type: "OrderObject",
            format: "",
        },
    ];
    static getAttributeTypeMap() {
        return InlineResponse207.attributeTypeMap;
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
exports.InlineResponse207 = InlineResponse207;
//# sourceMappingURL=InlineResponse207.js.map
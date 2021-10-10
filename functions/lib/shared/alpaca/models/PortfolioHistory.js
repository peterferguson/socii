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
exports.PortfolioHistory = void 0;
class PortfolioHistory {
    "timestamp";
    /**
     * equity value of the account in dollar amount as of the end of each time window
     */
    "equity";
    /**
     * profit/loss in dollar from the base value
     */
    "profitLoss";
    /**
     * profit/loss in percentage from the base value
     */
    "profitLossPct";
    /**
     * basis in dollar of the profit loss calculation
     */
    "baseValue";
    /**
     * time window size of each data element
     */
    "timeframe";
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            name: "timestamp",
            baseName: "timestamp",
            type: "Array<number>",
            format: "",
        },
        {
            name: "equity",
            baseName: "equity",
            type: "Array<number>",
            format: "",
        },
        {
            name: "profitLoss",
            baseName: "profit_loss",
            type: "Array<number>",
            format: "",
        },
        {
            name: "profitLossPct",
            baseName: "profit_loss_pct",
            type: "Array<number>",
            format: "",
        },
        {
            name: "baseValue",
            baseName: "base_value",
            type: "number",
            format: "",
        },
        {
            name: "timeframe",
            baseName: "timeframe",
            type: "string",
            format: "",
        },
    ];
    static getAttributeTypeMap() {
        return PortfolioHistory.attributeTypeMap;
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
exports.PortfolioHistory = PortfolioHistory;
//# sourceMappingURL=PortfolioHistory.js.map
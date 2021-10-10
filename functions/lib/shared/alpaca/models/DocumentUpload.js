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
exports.DocumentUpload = void 0;
/**
 * If an account has documents after the submission, it has the Document model in exchange with DocumentUpload.
 */
class DocumentUpload {
    "documentType";
    "documentSubType";
    "content";
    "mimeType";
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            name: "documentType",
            baseName: "document_type",
            type: "DocumentType",
            format: "",
        },
        {
            name: "documentSubType",
            baseName: "document_sub_type",
            type: "string",
            format: "",
        },
        {
            name: "content",
            baseName: "content",
            type: "string",
            format: "base64",
        },
        {
            name: "mimeType",
            baseName: "mime_type",
            type: "string",
            format: "",
        },
    ];
    static getAttributeTypeMap() {
        return DocumentUpload.attributeTypeMap;
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
exports.DocumentUpload = DocumentUpload;
//# sourceMappingURL=DocumentUpload.js.map
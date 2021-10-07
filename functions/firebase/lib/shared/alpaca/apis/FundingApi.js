"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundingApiResponseProcessor = exports.FundingApiRequestFactory = void 0;
const http_1 = require("../http/http");
const ObjectSerializer_1 = require("../models/ObjectSerializer");
const util_1 = require("../util");
const baseapi_1 = require("./baseapi");
const exception_1 = require("./exception");
/**
 * no description
 */
class FundingApiRequestFactory extends baseapi_1.BaseAPIRequestFactory {
    /**
     * Delete an existing ACH relationship
     * @param accountId Account identifier.
     * @param achRelationshipId ACH relationship identifier
     */
    async deleteAchRelationship(accountId, achRelationshipId, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling deleteAchRelationship.");
        }
        // verify required parameter 'achRelationshipId' is not null or undefined
        if (achRelationshipId === null || achRelationshipId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter achRelationshipId was null or undefined when calling deleteAchRelationship.");
        }
        // Path Params
        const localVarPath = "/accounts/{account_id}/ach_relationships/{ach_relationship_id}"
            .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
            .replace("{" + "ach_relationship_id" + "}", encodeURIComponent(String(achRelationshipId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["BasicAuth"];
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }
        return requestContext;
    }
    /**
     * Delete a Bank Relationship for an account
     * @param accountId Account identifier.
     * @param bankId
     */
    async deleteRecipientBank(accountId, bankId, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling deleteRecipientBank.");
        }
        // verify required parameter 'bankId' is not null or undefined
        if (bankId === null || bankId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter bankId was null or undefined when calling deleteRecipientBank.");
        }
        // Path Params
        const localVarPath = "/accounts/{account_id}/recipient_banks/{bank_id}"
            .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
            .replace("{" + "bank_id" + "}", encodeURIComponent(String(bankId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["BasicAuth"];
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }
        return requestContext;
    }
    /**
     * Request to close a transfer
     * @param accountId
     * @param transferId
     */
    async deleteTransfer(accountId, transferId, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling deleteTransfer.");
        }
        // verify required parameter 'transferId' is not null or undefined
        if (transferId === null || transferId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter transferId was null or undefined when calling deleteTransfer.");
        }
        // Path Params
        const localVarPath = "/accounts/{account_id}/transfers/{transfer_id}"
            .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
            .replace("{" + "transfer_id" + "}", encodeURIComponent(String(transferId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["BasicAuth"];
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }
        return requestContext;
    }
    /**
     * Retrieve ACH Relationships for an account
     * @param accountId Account identifier.
     * @param statuses Comma-separated status values
     */
    async getAchRelationships(accountId, statuses, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling getAchRelationships.");
        }
        // Path Params
        const localVarPath = "/accounts/{account_id}/ach_relationships".replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        // Query Params
        if (statuses !== undefined) {
            requestContext.setQueryParam("statuses", ObjectSerializer_1.ObjectSerializer.serialize(statuses, "string", ""));
        }
        // Header Params
        // Form Params
        // Body Params
        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["BasicAuth"];
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }
        return requestContext;
    }
    /**
     * Retrieve bank relationships for an account
     * @param accountId
     * @param status
     * @param bankName
     */
    async getRecipientBanks(accountId, status, bankName, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling getRecipientBanks.");
        }
        // Path Params
        const localVarPath = "/accounts/{account_id}/recipient_banks".replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        // Query Params
        if (status !== undefined) {
            requestContext.setQueryParam("status", ObjectSerializer_1.ObjectSerializer.serialize(status, "string", ""));
        }
        if (bankName !== undefined) {
            requestContext.setQueryParam("bank_name", ObjectSerializer_1.ObjectSerializer.serialize(bankName, "string", ""));
        }
        // Header Params
        // Form Params
        // Body Params
        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["BasicAuth"];
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }
        return requestContext;
    }
    /**
     * You can filter requested transfers by values such as direction and status.
     * Return a list of transfers for an account.
     * @param accountId
     * @param direction
     * @param limit
     * @param offset
     */
    async getTransfers(accountId, direction, limit, offset, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling getTransfers.");
        }
        // Path Params
        const localVarPath = "/accounts/{account_id}/transfers".replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        // Query Params
        if (direction !== undefined) {
            requestContext.setQueryParam("direction", ObjectSerializer_1.ObjectSerializer.serialize(direction, "'INCOMING' | 'OUTGOING'", ""));
        }
        if (limit !== undefined) {
            requestContext.setQueryParam("limit", ObjectSerializer_1.ObjectSerializer.serialize(limit, "number", "int32"));
        }
        if (offset !== undefined) {
            requestContext.setQueryParam("offset", ObjectSerializer_1.ObjectSerializer.serialize(offset, "number", "int32"));
        }
        // Header Params
        // Form Params
        // Body Params
        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["BasicAuth"];
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }
        return requestContext;
    }
    /**
     * Create an ACH Relationship
     * @param accountId Account identifier.
     * @param aCHRelationshipData
     */
    async postAchRelationships(accountId, aCHRelationshipData, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling postAchRelationships.");
        }
        // verify required parameter 'aCHRelationshipData' is not null or undefined
        if (aCHRelationshipData === null || aCHRelationshipData === undefined) {
            throw new baseapi_1.RequiredError("Required parameter aCHRelationshipData was null or undefined when calling postAchRelationships.");
        }
        // Path Params
        const localVarPath = "/accounts/{account_id}/ach_relationships".replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        const contentType = ObjectSerializer_1.ObjectSerializer.getPreferredMediaType(["application/json"]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer_1.ObjectSerializer.stringify(ObjectSerializer_1.ObjectSerializer.serialize(aCHRelationshipData, "ACHRelationshipData", ""), contentType);
        requestContext.setBody(serializedBody);
        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["BasicAuth"];
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }
        return requestContext;
    }
    /**
     * Create a Bank Relationship for an account
     * @param accountId Account identifier.
     * @param bankData
     */
    async postRecipientBanks(accountId, bankData, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling postRecipientBanks.");
        }
        // verify required parameter 'bankData' is not null or undefined
        if (bankData === null || bankData === undefined) {
            throw new baseapi_1.RequiredError("Required parameter bankData was null or undefined when calling postRecipientBanks.");
        }
        // Path Params
        const localVarPath = "/accounts/{account_id}/recipient_banks".replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        const contentType = ObjectSerializer_1.ObjectSerializer.getPreferredMediaType(["application/json"]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer_1.ObjectSerializer.stringify(ObjectSerializer_1.ObjectSerializer.serialize(bankData, "BankData", ""), contentType);
        requestContext.setBody(serializedBody);
        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["BasicAuth"];
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }
        return requestContext;
    }
    /**
     * This operation allows you to fund an account with virtual money in the sandbox environment.
     * Request a new transfer
     * @param accountId
     * @param transferData
     */
    async postTransfers(accountId, transferData, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling postTransfers.");
        }
        // verify required parameter 'transferData' is not null or undefined
        if (transferData === null || transferData === undefined) {
            throw new baseapi_1.RequiredError("Required parameter transferData was null or undefined when calling postTransfers.");
        }
        // Path Params
        const localVarPath = "/accounts/{account_id}/transfers".replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        const contentType = ObjectSerializer_1.ObjectSerializer.getPreferredMediaType(["application/json"]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer_1.ObjectSerializer.stringify(ObjectSerializer_1.ObjectSerializer.serialize(transferData, "TransferData", ""), contentType);
        requestContext.setBody(serializedBody);
        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["BasicAuth"];
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }
        return requestContext;
    }
}
exports.FundingApiRequestFactory = FundingApiRequestFactory;
class FundingApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteAchRelationship
     * @throws ApiException if the response code was not in [200, 299]
     */
    async deleteAchRelationship(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("204", response.httpStatusCode)) {
            return;
        }
        if (util_1.isCodeInRange("404", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(404, body);
        }
        if (util_1.isCodeInRange("422", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(422, body);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "void", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteRecipientBank
     * @throws ApiException if the response code was not in [200, 299]
     */
    async deleteRecipientBank(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("204", response.httpStatusCode)) {
            return;
        }
        if (util_1.isCodeInRange("400", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "Bad Request");
        }
        if (util_1.isCodeInRange("404", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "Bank Not Found");
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "void", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteTransfer
     * @throws ApiException if the response code was not in [200, 299]
     */
    async deleteTransfer(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("204", response.httpStatusCode)) {
            return;
        }
        if (util_1.isCodeInRange("404", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(404, body);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "void", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getAchRelationships
     * @throws ApiException if the response code was not in [200, 299]
     */
    async getAchRelationships(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<ACHRelationshipResource>", "");
            return body;
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<ACHRelationshipResource>", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getRecipientBanks
     * @throws ApiException if the response code was not in [200, 299]
     */
    async getRecipientBanks(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<BankResource>", "");
            return body;
        }
        if (util_1.isCodeInRange("400", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "Bad request. The body in the request is not valid.");
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<BankResource>", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getTransfers
     * @throws ApiException if the response code was not in [200, 299]
     */
    async getTransfers(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<TransferResource>", "");
            return body;
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<TransferResource>", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to postAchRelationships
     * @throws ApiException if the response code was not in [200, 299]
     */
    async postAchRelationships(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "ACHRelationshipResource", "");
            return body;
        }
        if (util_1.isCodeInRange("400", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(400, body);
        }
        if (util_1.isCodeInRange("401", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(401, body);
        }
        if (util_1.isCodeInRange("403", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(403, body);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "ACHRelationshipResource", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to postRecipientBanks
     * @throws ApiException if the response code was not in [200, 299]
     */
    async postRecipientBanks(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "BankResource", "");
            return body;
        }
        if (util_1.isCodeInRange("400", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "Bad Request");
        }
        if (util_1.isCodeInRange("409", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "Conflict");
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "BankResource", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to postTransfers
     * @throws ApiException if the response code was not in [200, 299]
     */
    async postTransfers(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "TransferResource", "");
            return body;
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "TransferResource", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
}
exports.FundingApiResponseProcessor = FundingApiResponseProcessor;
//# sourceMappingURL=FundingApi.js.map
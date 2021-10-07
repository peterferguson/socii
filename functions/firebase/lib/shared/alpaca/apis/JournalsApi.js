"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalsApiResponseProcessor = exports.JournalsApiRequestFactory = void 0;
const http_1 = require("../http/http");
const ObjectSerializer_1 = require("../models/ObjectSerializer");
const util_1 = require("../util");
const baseapi_1 = require("./baseapi");
const exception_1 = require("./exception");
/**
 * no description
 */
class JournalsApiRequestFactory extends baseapi_1.BaseAPIRequestFactory {
    /**
     * You can cancel journals while they are in the pending status. An attempt to cancel already-executed journals will return an error.
     * Cancel a pending journal.
     * @param journalId
     */
    async deleteJournal(journalId, options) {
        let config = options || this.configuration;
        // verify required parameter 'journalId' is not null or undefined
        if (journalId === null || journalId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter journalId was null or undefined when calling deleteJournal.");
        }
        // Path Params
        const localVarPath = "/journals/{journal_id}".replace("{" + "journal_id" + "}", encodeURIComponent(String(journalId)));
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
     * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
     * Subscribe to journal events (SSE).
     * @param since
     * @param until
     * @param sinceId
     * @param untilId
     */
    async eventsJournalsStatusGet(since, until, sinceId, untilId, options) {
        let config = options || this.configuration;
        // Path Params
        const localVarPath = "/events/journals/status";
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        // Query Params
        if (since !== undefined) {
            requestContext.setQueryParam("since", ObjectSerializer_1.ObjectSerializer.serialize(since, "Date", "date-time"));
        }
        if (until !== undefined) {
            requestContext.setQueryParam("until", ObjectSerializer_1.ObjectSerializer.serialize(until, "Date", "date-time"));
        }
        if (sinceId !== undefined) {
            requestContext.setQueryParam("since_id", ObjectSerializer_1.ObjectSerializer.serialize(sinceId, "number", ""));
        }
        if (untilId !== undefined) {
            requestContext.setQueryParam("until_id", ObjectSerializer_1.ObjectSerializer.serialize(untilId, "number", ""));
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
     * Return a list of requested journals.
     * @param after by settle_date
     * @param before by settle_date
     * @param status
     * @param entryType
     * @param toAccount
     * @param fromAccount
     */
    async getJournals(after, before, status, entryType, toAccount, fromAccount, options) {
        let config = options || this.configuration;
        // Path Params
        const localVarPath = "/journals";
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        // Query Params
        if (after !== undefined) {
            requestContext.setQueryParam("after", ObjectSerializer_1.ObjectSerializer.serialize(after, "string", "date"));
        }
        if (before !== undefined) {
            requestContext.setQueryParam("before", ObjectSerializer_1.ObjectSerializer.serialize(before, "string", "date"));
        }
        if (status !== undefined) {
            requestContext.setQueryParam("status", ObjectSerializer_1.ObjectSerializer.serialize(status, "'pending' | 'canceled' | 'executed'", ""));
        }
        if (entryType !== undefined) {
            requestContext.setQueryParam("entry_type", ObjectSerializer_1.ObjectSerializer.serialize(entryType, "'JNLC' | 'JNLS'", ""));
        }
        if (toAccount !== undefined) {
            requestContext.setQueryParam("to_account", ObjectSerializer_1.ObjectSerializer.serialize(toAccount, "string", "uuid"));
        }
        if (fromAccount !== undefined) {
            requestContext.setQueryParam("from_account", ObjectSerializer_1.ObjectSerializer.serialize(fromAccount, "string", "uuid"));
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
     * A journal can be JNLC (move cash) or JNLS (move shares), dictated by `entry_type`. Generally, journal requests are subject to approval and starts from the `pending` status. The status changes are propagated through the Event API. Under certain conditions agreed for the partner, such journal transactions that meet the criteria are executed right away.
     * Request a journal.
     * @param journalData
     */
    async postJournals(journalData, options) {
        let config = options || this.configuration;
        // verify required parameter 'journalData' is not null or undefined
        if (journalData === null || journalData === undefined) {
            throw new baseapi_1.RequiredError("Required parameter journalData was null or undefined when calling postJournals.");
        }
        // Path Params
        const localVarPath = "/journals";
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        const contentType = ObjectSerializer_1.ObjectSerializer.getPreferredMediaType(["application/json"]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer_1.ObjectSerializer.stringify(ObjectSerializer_1.ObjectSerializer.serialize(journalData, "JournalData", ""), contentType);
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
     * Create a batch journal
     * @param batchJournalRequest
     */
    async postJournalsBatch(batchJournalRequest, options) {
        let config = options || this.configuration;
        // verify required parameter 'batchJournalRequest' is not null or undefined
        if (batchJournalRequest === null || batchJournalRequest === undefined) {
            throw new baseapi_1.RequiredError("Required parameter batchJournalRequest was null or undefined when calling postJournalsBatch.");
        }
        // Path Params
        const localVarPath = "/journals/batch";
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        const contentType = ObjectSerializer_1.ObjectSerializer.getPreferredMediaType(["application/json"]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer_1.ObjectSerializer.stringify(ObjectSerializer_1.ObjectSerializer.serialize(batchJournalRequest, "BatchJournalRequest", ""), contentType);
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
exports.JournalsApiRequestFactory = JournalsApiRequestFactory;
class JournalsApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteJournal
     * @throws ApiException if the response code was not in [200, 299]
     */
    async deleteJournal(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("204", response.httpStatusCode)) {
            return;
        }
        if (util_1.isCodeInRange("404", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "The journal is not found. ");
        }
        if (util_1.isCodeInRange("422", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "The journal is not in the pending status. ");
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
     * @params response Response returned by the server for a request to eventsJournalsStatusGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    async eventsJournalsStatusGet(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "InlineResponse2005", "");
            return body;
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "InlineResponse2005", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getJournals
     * @throws ApiException if the response code was not in [200, 299]
     */
    async getJournals(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<JournalResource>", "");
            return body;
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<JournalResource>", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to postJournals
     * @throws ApiException if the response code was not in [200, 299]
     */
    async postJournals(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "JournalResource", "");
            return body;
        }
        if (util_1.isCodeInRange("400", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "string", "");
            throw new exception_1.ApiException(400, body);
        }
        if (util_1.isCodeInRange("403", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "string", "");
            throw new exception_1.ApiException(403, body);
        }
        if (util_1.isCodeInRange("404", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "string", "");
            throw new exception_1.ApiException(404, body);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "JournalResource", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to postJournalsBatch
     * @throws ApiException if the response code was not in [200, 299]
     */
    async postJournalsBatch(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<BatchJournalResponse>", "");
            return body;
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<BatchJournalResponse>", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
}
exports.JournalsApiResponseProcessor = JournalsApiResponseProcessor;
//# sourceMappingURL=JournalsApi.js.map
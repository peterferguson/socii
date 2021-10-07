"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsApiResponseProcessor = exports.EventsApiRequestFactory = void 0;
const http_1 = require("../http/http");
const ObjectSerializer_1 = require("../models/ObjectSerializer");
const util_1 = require("../util");
const baseapi_1 = require("./baseapi");
const exception_1 = require("./exception");
/**
 * no description
 */
class EventsApiRequestFactory extends baseapi_1.BaseAPIRequestFactory {
    /**
     * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
     * Subscribe to account status events (SSE).
     * @param since
     * @param until
     * @param sinceId
     * @param untilId
     */
    async eventsAccountsStatusGet(since, until, sinceId, untilId, options) {
        let config = options || this.configuration;
        // Path Params
        const localVarPath = "/events/accounts/status";
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
}
exports.EventsApiRequestFactory = EventsApiRequestFactory;
class EventsApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to eventsAccountsStatusGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    async eventsAccountsStatusGet(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "InlineResponse2004", "");
            return body;
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "InlineResponse2004", "");
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
}
exports.EventsApiResponseProcessor = EventsApiResponseProcessor;
//# sourceMappingURL=EventsApi.js.map
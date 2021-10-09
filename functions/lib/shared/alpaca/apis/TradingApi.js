"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingApiResponseProcessor = exports.TradingApiRequestFactory = void 0;
const http_1 = require("../http/http");
const ObjectSerializer_1 = require("../models/ObjectSerializer");
const util_1 = require("../util");
const baseapi_1 = require("./baseapi");
const exception_1 = require("./exception");
/**
 * no description
 */
class TradingApiRequestFactory extends baseapi_1.BaseAPIRequestFactory {
    /**
     * Attempts to cancel an open order.
     * Attempts to cancel an open order.
     * @param accountId Account identifier.
     * @param orderId Order identifier.
     */
    async deleteOrder(accountId, orderId, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling deleteOrder.");
        }
        // verify required parameter 'orderId' is not null or undefined
        if (orderId === null || orderId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter orderId was null or undefined when calling deleteOrder.");
        }
        // Path Params
        const localVarPath = "/trading/accounts/{account_id}/orders/{order_id}"
            .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
            .replace("{" + "order_id" + "}", encodeURIComponent(String(orderId)));
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
     * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
     * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
     * @param accountId Account identifier.
     */
    async deleteOrders(accountId, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling deleteOrders.");
        }
        // Path Params
        const localVarPath = "/trading/accounts/{account_id}/orders".replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)));
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
     * Retrieves a single order for the given order_id.
     * Retrieves a single order for the given order_id.
     * @param accountId Account identifier.
     * @param orderId Order identifier.
     */
    async getOrder(accountId, orderId, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling getOrder.");
        }
        // verify required parameter 'orderId' is not null or undefined
        if (orderId === null || orderId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter orderId was null or undefined when calling getOrder.");
        }
        // Path Params
        const localVarPath = "/trading/accounts/{account_id}/orders/{order_id}"
            .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
            .replace("{" + "order_id" + "}", encodeURIComponent(String(orderId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
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
     * Retrieves a list of orders for the account, filtered by the supplied query parameters.
     * Retrieves a list of orders for the account, filtered by the supplied query parameters.
     * @param accountId Account identifier.
     * @param status Status of the orders to list.
     * @param limit The maximum number of orders in response.
     * @param after The response will include only ones submitted after this timestamp (exclusive.)
     * @param until The response will include only ones submitted until this timestamp (exclusive.)
     * @param direction The chronological order of response based on the submission time. asc or desc. Defaults to desc.
     * @param nested If true, the result will roll up multi-leg orders under the legs field of primary order.
     * @param symbols A comma-separated list of symbols to filter by.
     */
    async getOrders(accountId, status, limit, after, until, direction, nested, symbols, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling getOrders.");
        }
        // Path Params
        const localVarPath = "/trading/accounts/{account_id}/orders".replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        // Query Params
        if (status !== undefined) {
            requestContext.setQueryParam("status", ObjectSerializer_1.ObjectSerializer.serialize(status, "'open' | 'closed' | 'all'", ""));
        }
        if (limit !== undefined) {
            requestContext.setQueryParam("limit", ObjectSerializer_1.ObjectSerializer.serialize(limit, "number", ""));
        }
        if (after !== undefined) {
            requestContext.setQueryParam("after", ObjectSerializer_1.ObjectSerializer.serialize(after, "Date", "date-time"));
        }
        if (until !== undefined) {
            requestContext.setQueryParam("until", ObjectSerializer_1.ObjectSerializer.serialize(until, "Date", "date-time"));
        }
        if (direction !== undefined) {
            requestContext.setQueryParam("direction", ObjectSerializer_1.ObjectSerializer.serialize(direction, "'asc' | 'desc'", ""));
        }
        if (nested !== undefined) {
            requestContext.setQueryParam("nested", ObjectSerializer_1.ObjectSerializer.serialize(nested, "boolean", ""));
        }
        if (symbols !== undefined) {
            requestContext.setQueryParam("symbols", ObjectSerializer_1.ObjectSerializer.serialize(symbols, "string", ""));
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
     * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
     * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
     * @param accountId Account identifier.
     * @param orderId Order identifier.
     * @param patchOrder
     */
    async patchOrder(accountId, orderId, patchOrder, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling patchOrder.");
        }
        // verify required parameter 'orderId' is not null or undefined
        if (orderId === null || orderId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter orderId was null or undefined when calling patchOrder.");
        }
        // verify required parameter 'patchOrder' is not null or undefined
        if (patchOrder === null || patchOrder === undefined) {
            throw new baseapi_1.RequiredError("Required parameter patchOrder was null or undefined when calling patchOrder.");
        }
        // Path Params
        const localVarPath = "/trading/accounts/{account_id}/orders/{order_id}"
            .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
            .replace("{" + "order_id" + "}", encodeURIComponent(String(orderId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.PATCH);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        const contentType = ObjectSerializer_1.ObjectSerializer.getPreferredMediaType(["application/json"]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer_1.ObjectSerializer.stringify(ObjectSerializer_1.ObjectSerializer.serialize(patchOrder, "PatchOrder", ""), contentType);
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
     * Create an order for an account.
     * Create an order for an account.
     * @param accountId Account identifier.
     * @param createOrder
     */
    async postOrders(accountId, createOrder, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling postOrders.");
        }
        // verify required parameter 'createOrder' is not null or undefined
        if (createOrder === null || createOrder === undefined) {
            throw new baseapi_1.RequiredError("Required parameter createOrder was null or undefined when calling postOrders.");
        }
        // Path Params
        const localVarPath = "/trading/accounts/{account_id}/orders".replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        const contentType = ObjectSerializer_1.ObjectSerializer.getPreferredMediaType(["application/json"]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer_1.ObjectSerializer.stringify(ObjectSerializer_1.ObjectSerializer.serialize(createOrder, "CreateOrder", ""), contentType);
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
exports.TradingApiRequestFactory = TradingApiRequestFactory;
class TradingApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteOrder
     * @throws ApiException if the response code was not in [200, 299]
     */
    async deleteOrder(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if ((0, util_1.isCodeInRange)("204", response.httpStatusCode)) {
            return;
        }
        if ((0, util_1.isCodeInRange)("400", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(400, body);
        }
        if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
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
     * @params response Response returned by the server for a request to deleteOrders
     * @throws ApiException if the response code was not in [200, 299]
     */
    async deleteOrders(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if ((0, util_1.isCodeInRange)("207", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<InlineResponse207>", "");
            return body;
        }
        if ((0, util_1.isCodeInRange)("400", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(400, body);
        }
        if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(404, body);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<InlineResponse207>", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getOrder
     * @throws ApiException if the response code was not in [200, 299]
     */
    async getOrder(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if ((0, util_1.isCodeInRange)("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "OrderObject", "");
            return body;
        }
        if ((0, util_1.isCodeInRange)("400", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(400, body);
        }
        if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(404, body);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "OrderObject", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getOrders
     * @throws ApiException if the response code was not in [200, 299]
     */
    async getOrders(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if ((0, util_1.isCodeInRange)("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<OrderObject>", "");
            return body;
        }
        if ((0, util_1.isCodeInRange)("400", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(400, body);
        }
        if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(404, body);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<OrderObject>", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchOrder
     * @throws ApiException if the response code was not in [200, 299]
     */
    async patchOrder(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if ((0, util_1.isCodeInRange)("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "OrderObject", "");
            return body;
        }
        if ((0, util_1.isCodeInRange)("400", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(400, body);
        }
        if ((0, util_1.isCodeInRange)("403", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "string", "");
            throw new exception_1.ApiException(403, body);
        }
        if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(404, body);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "OrderObject", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to postOrders
     * @throws ApiException if the response code was not in [200, 299]
     */
    async postOrders(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if ((0, util_1.isCodeInRange)("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "OrderObject", "");
            return body;
        }
        if ((0, util_1.isCodeInRange)("400", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(400, body);
        }
        if ((0, util_1.isCodeInRange)("403", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "string", "");
            throw new exception_1.ApiException(403, body);
        }
        if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Error", "");
            throw new exception_1.ApiException(404, body);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "OrderObject", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
}
exports.TradingApiResponseProcessor = TradingApiResponseProcessor;
//# sourceMappingURL=TradingApi.js.map
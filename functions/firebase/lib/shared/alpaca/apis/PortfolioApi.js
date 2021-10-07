"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioApiResponseProcessor = exports.PortfolioApiRequestFactory = void 0;
const http_1 = require("../http/http");
const models_1 = require("../models");
const util_1 = require("../util");
const baseapi_1 = require("./baseapi");
const exception_1 = require("./exception");
/**
 * no description
 */
class PortfolioApiRequestFactory extends baseapi_1.BaseAPIRequestFactory {
    /**
     * Get timeseries data for equity and profit loss information of the account
     * @param accountId Account identifier.
     * @param period The duration of the data in number + unit, such as 1D
     * @param timeframe The resolution of time window
     * @param dateEnd The date the data is returned up to, in “YYYY-MM-DD” format. Defaults to the current market date (rolls over at the market open if extended_hours is false, otherwise at 7am ET)
     * @param extendedHours If true, include extended hours in the result
     */
    async getPortfolioHistory(accountId, period, timeframe, dateEnd, extendedHours, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling getPortfolioHistory.");
        }
        // Path Params
        const localVarPath = "/trading/accounts/{account_id}/account/portfolio/history".replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        // Query Params
        if (period !== undefined) {
            requestContext.setQueryParam("period", models_1.ObjectSerializer.serialize(period, "string", ""));
        }
        if (timeframe !== undefined) {
            requestContext.setQueryParam("timeframe", models_1.ObjectSerializer.serialize(timeframe, "'1Min' | '5Min' | '15Min' | '1H' | '1D'", ""));
        }
        if (dateEnd !== undefined) {
            requestContext.setQueryParam("date_end", models_1.ObjectSerializer.serialize(dateEnd, "string", ""));
        }
        if (extendedHours !== undefined) {
            requestContext.setQueryParam("extended_hours", models_1.ObjectSerializer.serialize(extendedHours, "boolean", ""));
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
     * List open positions for an account
     * @param accountId Account identifier.
     */
    async getPositions(accountId, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling getPositions.");
        }
        // Path Params
        const localVarPath = "/trading/accounts/{account_id}/positions".replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        // Query Params
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
exports.PortfolioApiRequestFactory = PortfolioApiRequestFactory;
class PortfolioApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getPortfolioHistory
     * @throws ApiException if the response code was not in [200, 299]
     */
    async getPortfolioHistory(response) {
        const contentType = models_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = models_1.ObjectSerializer.deserialize(models_1.ObjectSerializer.parse(await response.body.text(), contentType), "PortfolioHistory", "");
            return body;
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = models_1.ObjectSerializer.deserialize(models_1.ObjectSerializer.parse(await response.body.text(), contentType), "PortfolioHistory", "");
            return body;
        }
        let body = response.body || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getPositions
     * @throws ApiException if the response code was not in [200, 299]
     */
    async getPositions(response) {
        const contentType = models_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = models_1.ObjectSerializer.deserialize(models_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<Position>", "");
            return body;
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = models_1.ObjectSerializer.deserialize(models_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<Position>", "");
            return body;
        }
        let body = response.body || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
}
exports.PortfolioApiResponseProcessor = PortfolioApiResponseProcessor;
//# sourceMappingURL=PortfolioApi.js.map
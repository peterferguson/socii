"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsApiResponseProcessor = exports.AssetsApiRequestFactory = void 0;
const http_1 = require("../http/http");
const ObjectSerializer_1 = require("../models/ObjectSerializer");
const util_1 = require("../util");
const baseapi_1 = require("./baseapi");
const exception_1 = require("./exception");
/**
 * no description
 */
class AssetsApiRequestFactory extends baseapi_1.BaseAPIRequestFactory {
    /**
     * Returns the requested asset, if found
     * Retrieve an asset by UUID
     * @param assetId The UUID of the required asset
     */
    async assetsAssetIdGet(assetId, options) {
        let config = options || this.configuration;
        // verify required parameter 'assetId' is not null or undefined
        if (assetId === null || assetId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter assetId was null or undefined when calling assetsAssetIdGet.");
        }
        // Path Params
        const localVarPath = "/assets/{asset_id}".replace("{" + "asset_id" + "}", encodeURIComponent(String(assetId)));
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
    /**
     * Returns the requested asset, if found
     * Retrieve an asset by symbol
     * @param symbol The symbol of the required asset
     */
    async assetsSymbolGet(symbol, options) {
        let config = options || this.configuration;
        // verify required parameter 'symbol' is not null or undefined
        if (symbol === null || symbol === undefined) {
            throw new baseapi_1.RequiredError("Required parameter symbol was null or undefined when calling assetsSymbolGet.");
        }
        // Path Params
        const localVarPath = "/assets/{symbol}".replace("{" + "symbol" + "}", encodeURIComponent(String(symbol)));
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
    /**
     * Returns all assets
     * Retrieve all assets
     */
    async getAssets(options) {
        let config = options || this.configuration;
        // Path Params
        const localVarPath = "/assets";
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
exports.AssetsApiRequestFactory = AssetsApiRequestFactory;
class AssetsApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to assetsAssetIdGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    async assetsAssetIdGet(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "AssetResource", "");
            return body;
        }
        if (util_1.isCodeInRange("401", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "Unauthorized");
        }
        if (util_1.isCodeInRange("404", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "Asset not found");
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "AssetResource", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + JSON.stringify(body) + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to assetsSymbolGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    async assetsSymbolGet(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "AssetResource", "");
            return body;
        }
        if (util_1.isCodeInRange("401", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "Unauthorized");
        }
        if (util_1.isCodeInRange("404", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "Asset not found");
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "AssetResource", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + JSON.stringify(body) + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getAssets
     * @throws ApiException if the response code was not in [200, 299]
     */
    async getAssets(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<AssetResource>", "");
            return body;
        }
        if (util_1.isCodeInRange("401", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "Unauthorized");
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<AssetResource>", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + JSON.stringify(body) + '"');
    }
}
exports.AssetsApiResponseProcessor = AssetsApiResponseProcessor;
//# sourceMappingURL=AssetsApi.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthApiResponseProcessor = exports.OAuthApiRequestFactory = void 0;
const http_1 = require("../http/http");
const ObjectSerializer_1 = require("../models/ObjectSerializer");
const util_1 = require("../util");
const baseapi_1 = require("./baseapi");
const exception_1 = require("./exception");
/**
 * no description
 */
class OAuthApiRequestFactory extends baseapi_1.BaseAPIRequestFactory {
    /**
     * The operation issues an OAuth code which can be used in the OAuth code flow.
     * Issue a code.
     * @param inlineObject1
     */
    async oauthAuthorizePost(inlineObject1, options) {
        let config = options || this.configuration;
        // verify required parameter 'inlineObject1' is not null or undefined
        if (inlineObject1 === null || inlineObject1 === undefined) {
            throw new baseapi_1.RequiredError("Required parameter inlineObject1 was null or undefined when calling oauthAuthorizePost.");
        }
        // Path Params
        const localVarPath = "/oauth/authorize";
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        const contentType = ObjectSerializer_1.ObjectSerializer.getPreferredMediaType(["application/json"]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer_1.ObjectSerializer.stringify(ObjectSerializer_1.ObjectSerializer.serialize(inlineObject1, "InlineObject1", ""), contentType);
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
     * The endpoint returns the details of OAuth client to display in the authorization page.
     * Returns an OAuth client.
     * @param clientId
     * @param responseType
     * @param redirectUri
     * @param scope
     */
    async oauthClientsClientIdGet(clientId, responseType, redirectUri, scope, options) {
        let config = options || this.configuration;
        // verify required parameter 'clientId' is not null or undefined
        if (clientId === null || clientId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter clientId was null or undefined when calling oauthClientsClientIdGet.");
        }
        // Path Params
        const localVarPath = "/oauth/clients/{client_id}".replace("{" + "client_id" + "}", encodeURIComponent(String(clientId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        // Query Params
        if (responseType !== undefined) {
            requestContext.setQueryParam("response_type", ObjectSerializer_1.ObjectSerializer.serialize(responseType, "'code' | 'token'", ""));
        }
        if (redirectUri !== undefined) {
            requestContext.setQueryParam("redirect_uri", ObjectSerializer_1.ObjectSerializer.serialize(redirectUri, "string", ""));
        }
        if (scope !== undefined) {
            requestContext.setQueryParam("scope", ObjectSerializer_1.ObjectSerializer.serialize(scope, "string", ""));
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
     * This operation issues an access token for an account.
     * Issue a token.
     * @param inlineObject
     */
    async oauthTokenPost(inlineObject, options) {
        let config = options || this.configuration;
        // verify required parameter 'inlineObject' is not null or undefined
        if (inlineObject === null || inlineObject === undefined) {
            throw new baseapi_1.RequiredError("Required parameter inlineObject was null or undefined when calling oauthTokenPost.");
        }
        // Path Params
        const localVarPath = "/oauth/token";
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        const contentType = ObjectSerializer_1.ObjectSerializer.getPreferredMediaType(["application/json"]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer_1.ObjectSerializer.stringify(ObjectSerializer_1.ObjectSerializer.serialize(inlineObject, "InlineObject", ""), contentType);
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
exports.OAuthApiRequestFactory = OAuthApiRequestFactory;
class OAuthApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to oauthAuthorizePost
     * @throws ApiException if the response code was not in [200, 299]
     */
    async oauthAuthorizePost(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "InlineResponse2008", "");
            return body;
        }
        if (util_1.isCodeInRange("401", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "string", "");
            throw new exception_1.ApiException(401, body);
        }
        if (util_1.isCodeInRange("422", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "string", "");
            throw new exception_1.ApiException(422, body);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "InlineResponse2008", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to oauthClientsClientIdGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    async oauthClientsClientIdGet(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "InlineResponse2006", "");
            return body;
        }
        if (util_1.isCodeInRange("401", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "string", "");
            throw new exception_1.ApiException(401, body);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "InlineResponse2006", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to oauthTokenPost
     * @throws ApiException if the response code was not in [200, 299]
     */
    async oauthTokenPost(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (util_1.isCodeInRange("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "InlineResponse2007", "");
            return body;
        }
        if (util_1.isCodeInRange("401", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "string", "");
            throw new exception_1.ApiException(401, body);
        }
        if (util_1.isCodeInRange("422", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "string", "");
            throw new exception_1.ApiException(422, body);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "InlineResponse2007", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
}
exports.OAuthApiResponseProcessor = OAuthApiResponseProcessor;
//# sourceMappingURL=OAuthApi.js.map
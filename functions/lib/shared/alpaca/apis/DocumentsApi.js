"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsApiResponseProcessor = exports.DocumentsApiRequestFactory = void 0;
const http_1 = require("../http/http");
const ObjectSerializer_1 = require("../models/ObjectSerializer");
const util_1 = require("../util");
const baseapi_1 = require("./baseapi");
const exception_1 = require("./exception");
/**
 * no description
 */
class DocumentsApiRequestFactory extends baseapi_1.BaseAPIRequestFactory {
    /**
     * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
     * Download a document file that belongs to an account.
     * @param accountId Account identifier.
     * @param documentId
     */
    async accountsAccountIdDocumentsDocumentIdDownloadGet(accountId, documentId, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling accountsAccountIdDocumentsDocumentIdDownloadGet.");
        }
        // verify required parameter 'documentId' is not null or undefined
        if (documentId === null || documentId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter documentId was null or undefined when calling accountsAccountIdDocumentsDocumentIdDownloadGet.");
        }
        // Path Params
        const localVarPath = "/accounts/{account_id}/documents/{document_id}/download"
            .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
            .replace("{" + "document_id" + "}", encodeURIComponent(String(documentId)));
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
     * You can query account documents such as monthly  statements and trade confirms under an account.
     * Return a list of account documents.
     * @param accountId Account identifier.
     * @param startDate optional date value to filter the list (inclusive).
     * @param endDate optional date value to filter the list (inclusive).
     */
    async accountsAccountIdDocumentsGet(accountId, startDate, endDate, options) {
        let config = options || this.configuration;
        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter accountId was null or undefined when calling accountsAccountIdDocumentsGet.");
        }
        // Path Params
        const localVarPath = "/accounts/{account_id}/documents".replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)));
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        // Query Params
        if (startDate !== undefined) {
            requestContext.setQueryParam("start_date", ObjectSerializer_1.ObjectSerializer.serialize(startDate, "string", "date"));
        }
        if (endDate !== undefined) {
            requestContext.setQueryParam("end_date", ObjectSerializer_1.ObjectSerializer.serialize(endDate, "string", "date"));
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
     * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
     * Download a document file directly
     * @param documentId
     */
    async documentsDocumentIdGet(documentId, options) {
        let config = options || this.configuration;
        // verify required parameter 'documentId' is not null or undefined
        if (documentId === null || documentId === undefined) {
            throw new baseapi_1.RequiredError("Required parameter documentId was null or undefined when calling documentsDocumentIdGet.");
        }
        // Path Params
        const localVarPath = "/documents/{document_id}".replace("{" + "document_id" + "}", encodeURIComponent(String(documentId)));
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
}
exports.DocumentsApiRequestFactory = DocumentsApiRequestFactory;
class DocumentsApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to accountsAccountIdDocumentsDocumentIdDownloadGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    async accountsAccountIdDocumentsDocumentIdDownloadGet(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if ((0, util_1.isCodeInRange)("301", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "Redirect to the pre-signed download link for the document PDF file. ");
        }
        if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "The document is not found.");
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            return;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to accountsAccountIdDocumentsGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    async accountsAccountIdDocumentsGet(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if ((0, util_1.isCodeInRange)("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<InlineResponse2003>", "");
            return body;
        }
        if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "string", "");
            throw new exception_1.ApiException(404, body);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<InlineResponse2003>", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to documentsDocumentIdGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    async documentsDocumentIdGet(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if ((0, util_1.isCodeInRange)("301", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "Redirect to the pre-signed download link for the document PDF file. ");
        }
        if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "The document is not found.");
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            return;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
}
exports.DocumentsApiResponseProcessor = DocumentsApiResponseProcessor;
//# sourceMappingURL=DocumentsApi.js.map
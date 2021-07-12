// TODO: better import syntax?
import { Configuration } from "../configuration"
import { HttpMethod, RequestContext, ResponseContext } from "../http/http"
import { InlineResponse2003 } from "../models/InlineResponse2003"
import { ObjectSerializer } from "../models/ObjectSerializer"
import { isCodeInRange } from "../util"
import { BaseAPIRequestFactory, RequiredError } from "./baseapi"
import { ApiException } from "./exception"


/**
 * no description
 */
export class DocumentsApiRequestFactory extends BaseAPIRequestFactory {
  /**
   * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
   * Download a document file that belongs to an account.
   * @param accountId Account identifier.
   * @param documentId
   */
  public async accountsAccountIdDocumentsDocumentIdDownloadGet(
    accountId: string,
    documentId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling accountsAccountIdDocumentsDocumentIdDownloadGet."
      )
    }

    // verify required parameter 'documentId' is not null or undefined
    if (documentId === null || documentId === undefined) {
      throw new RequiredError(
        "Required parameter documentId was null or undefined when calling accountsAccountIdDocumentsDocumentIdDownloadGet."
      )
    }

    // Path Params
    const localVarPath = "/accounts/{account_id}/documents/{document_id}/download"
      .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
      .replace("{" + "document_id" + "}", encodeURIComponent(String(documentId)))

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * You can query account documents such as monthly  statements and trade confirms under an account.
   * Return a list of account documents.
   * @param accountId Account identifier.
   * @param startDate optional date value to filter the list (inclusive).
   * @param endDate optional date value to filter the list (inclusive).
   */
  public async accountsAccountIdDocumentsGet(
    accountId: string,
    startDate?: string,
    endDate?: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling accountsAccountIdDocumentsGet."
      )
    }

    // Path Params
    const localVarPath = "/accounts/{account_id}/documents".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (startDate !== undefined) {
      requestContext.setQueryParam(
        "start_date",
        ObjectSerializer.serialize(startDate, "string", "date")
      )
    }
    if (endDate !== undefined) {
      requestContext.setQueryParam(
        "end_date",
        ObjectSerializer.serialize(endDate, "string", "date")
      )
    }

    // Header Params

    // Form Params

    // Body Params

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
   * Download a document file directly
   * @param documentId
   */
  public async documentsDocumentIdGet(
    documentId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'documentId' is not null or undefined
    if (documentId === null || documentId === undefined) {
      throw new RequiredError(
        "Required parameter documentId was null or undefined when calling documentsDocumentIdGet."
      )
    }

    // Path Params
    const localVarPath = "/documents/{document_id}".replace(
      "{" + "document_id" + "}",
      encodeURIComponent(String(documentId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }
}

export class DocumentsApiResponseProcessor {
  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to accountsAccountIdDocumentsDocumentIdDownloadGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async accountsAccountIdDocumentsDocumentIdDownloadGet(
    response: ResponseContext
  ): Promise<void> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("301", response.httpStatusCode)) {
      throw new ApiException<string>(
        response.httpStatusCode,
        "Redirect to the pre-signed download link for the document PDF file. "
      )
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      throw new ApiException<string>(
        response.httpStatusCode,
        "The document is not found."
      )
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      return
    }

    let body = response.body || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to accountsAccountIdDocumentsGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async accountsAccountIdDocumentsGet(
    response: ResponseContext
  ): Promise<Array<InlineResponse2003>> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Array<InlineResponse2003> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<InlineResponse2003>",
        ""
      ) as Array<InlineResponse2003>
      return body
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(404, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Array<InlineResponse2003> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<InlineResponse2003>",
        ""
      ) as Array<InlineResponse2003>
      return body
    }

    let body = response.body || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to documentsDocumentIdGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async documentsDocumentIdGet(response: ResponseContext): Promise<void> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("301", response.httpStatusCode)) {
      throw new ApiException<string>(
        response.httpStatusCode,
        "Redirect to the pre-signed download link for the document PDF file. "
      )
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      throw new ApiException<string>(
        response.httpStatusCode,
        "The document is not found."
      )
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      return
    }

    let body = response.body || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }
}

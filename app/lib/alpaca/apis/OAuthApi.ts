// TODO: better import syntax?
import { BaseAPIRequestFactory, RequiredError } from "./baseapi"
import { Configuration } from "../configuration"
import { RequestContext, HttpMethod, ResponseContext, HttpFile } from "../http/http"
import * as FormData from "form-data"
import { ObjectSerializer } from "../models/ObjectSerializer"
import { ApiException } from "./exception"
import { isCodeInRange } from "../util"

import { InlineObject } from "../models/InlineObject"
import { InlineObject1 } from "../models/InlineObject1"
import { InlineResponse2006 } from "../models/InlineResponse2006"
import { InlineResponse2007 } from "../models/InlineResponse2007"
import { InlineResponse2008 } from "../models/InlineResponse2008"

/**
 * no description
 */
export class OAuthApiRequestFactory extends BaseAPIRequestFactory {
  /**
   * The operation issues an OAuth code which can be used in the OAuth code flow.
   * Issue a code.
   * @param inlineObject1
   */
  public async oauthAuthorizePost(
    inlineObject1: InlineObject1,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'inlineObject1' is not null or undefined
    if (inlineObject1 === null || inlineObject1 === undefined) {
      throw new RequiredError(
        "Required parameter inlineObject1 was null or undefined when calling oauthAuthorizePost."
      )
    }

    // Path Params
    const localVarPath = "/oauth/authorize"

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.POST
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params

    // Header Params

    // Form Params

    // Body Params
    const contentType = ObjectSerializer.getPreferredMediaType(["application/json"])
    requestContext.setHeaderParam("Content-Type", contentType)
    const serializedBody = ObjectSerializer.stringify(
      ObjectSerializer.serialize(inlineObject1, "InlineObject1", ""),
      contentType
    )
    requestContext.setBody(serializedBody)

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * The endpoint returns the details of OAuth client to display in the authorization page.
   * Returns an OAuth client.
   * @param clientId
   * @param responseType
   * @param redirectUri
   * @param scope
   */
  public async oauthClientsClientIdGet(
    clientId: string,
    responseType?: "code" | "token",
    redirectUri?: string,
    scope?: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'clientId' is not null or undefined
    if (clientId === null || clientId === undefined) {
      throw new RequiredError(
        "Required parameter clientId was null or undefined when calling oauthClientsClientIdGet."
      )
    }

    // Path Params
    const localVarPath = "/oauth/clients/{client_id}".replace(
      "{" + "client_id" + "}",
      encodeURIComponent(String(clientId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (responseType !== undefined) {
      requestContext.setQueryParam(
        "response_type",
        ObjectSerializer.serialize(responseType, "'code' | 'token'", "")
      )
    }
    if (redirectUri !== undefined) {
      requestContext.setQueryParam(
        "redirect_uri",
        ObjectSerializer.serialize(redirectUri, "string", "")
      )
    }
    if (scope !== undefined) {
      requestContext.setQueryParam(
        "scope",
        ObjectSerializer.serialize(scope, "string", "")
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
   * This operation issues an access token for an account.
   * Issue a token.
   * @param inlineObject
   */
  public async oauthTokenPost(
    inlineObject: InlineObject,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'inlineObject' is not null or undefined
    if (inlineObject === null || inlineObject === undefined) {
      throw new RequiredError(
        "Required parameter inlineObject was null or undefined when calling oauthTokenPost."
      )
    }

    // Path Params
    const localVarPath = "/oauth/token"

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.POST
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params

    // Header Params

    // Form Params

    // Body Params
    const contentType = ObjectSerializer.getPreferredMediaType(["application/json"])
    requestContext.setHeaderParam("Content-Type", contentType)
    const serializedBody = ObjectSerializer.stringify(
      ObjectSerializer.serialize(inlineObject, "InlineObject", ""),
      contentType
    )
    requestContext.setBody(serializedBody)

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }
}

export class OAuthApiResponseProcessor {
  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to oauthAuthorizePost
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async oauthAuthorizePost(
    response: ResponseContext
  ): Promise<InlineResponse2008> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: InlineResponse2008 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2008",
        ""
      ) as InlineResponse2008
      return body
    }
    if (isCodeInRange("401", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(401, body)
    }
    if (isCodeInRange("422", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(422, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: InlineResponse2008 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2008",
        ""
      ) as InlineResponse2008
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
   * @params response Response returned by the server for a request to oauthClientsClientIdGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async oauthClientsClientIdGet(
    response: ResponseContext
  ): Promise<InlineResponse2006> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: InlineResponse2006 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2006",
        ""
      ) as InlineResponse2006
      return body
    }
    if (isCodeInRange("401", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(401, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: InlineResponse2006 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2006",
        ""
      ) as InlineResponse2006
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
   * @params response Response returned by the server for a request to oauthTokenPost
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async oauthTokenPost(response: ResponseContext): Promise<InlineResponse2007> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: InlineResponse2007 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2007",
        ""
      ) as InlineResponse2007
      return body
    }
    if (isCodeInRange("401", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(401, body)
    }
    if (isCodeInRange("422", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(422, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: InlineResponse2007 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2007",
        ""
      ) as InlineResponse2007
      return body
    }

    let body = response.body || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }
}

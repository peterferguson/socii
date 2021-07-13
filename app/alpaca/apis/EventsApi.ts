// TODO: better import syntax?
import { Configuration } from "../configuration"
import { HttpMethod, RequestContext, ResponseContext } from "../http/http"
import { InlineResponse2004 } from "../models/InlineResponse2004"
import { InlineResponse2005 } from "../models/InlineResponse2005"
import { ObjectSerializer } from "../models/ObjectSerializer"
import { isCodeInRange } from "../util"
import { BaseAPIRequestFactory } from "./baseapi"
import { ApiException } from "./exception"


/**
 * no description
 */
export class EventsApiRequestFactory extends BaseAPIRequestFactory {
  /**
   * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
   * Subscribe to account status events (SSE).
   * @param since
   * @param until
   * @param sinceId
   * @param untilId
   */
  public async eventsAccountsStatusGet(
    since?: Date,
    until?: Date,
    sinceId?: number,
    untilId?: number,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // Path Params
    const localVarPath = "/events/accounts/status"

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (since !== undefined) {
      requestContext.setQueryParam(
        "since",
        ObjectSerializer.serialize(since, "Date", "date-time")
      )
    }
    if (until !== undefined) {
      requestContext.setQueryParam(
        "until",
        ObjectSerializer.serialize(until, "Date", "date-time")
      )
    }
    if (sinceId !== undefined) {
      requestContext.setQueryParam(
        "since_id",
        ObjectSerializer.serialize(sinceId, "number", "")
      )
    }
    if (untilId !== undefined) {
      requestContext.setQueryParam(
        "until_id",
        ObjectSerializer.serialize(untilId, "number", "")
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
   * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
   * Subscribe to journal events (SSE).
   * @param since
   * @param until
   * @param sinceId
   * @param untilId
   */
  public async eventsJournalsStatusGet(
    since?: Date,
    until?: Date,
    sinceId?: number,
    untilId?: number,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // Path Params
    const localVarPath = "/events/journals/status"

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (since !== undefined) {
      requestContext.setQueryParam(
        "since",
        ObjectSerializer.serialize(since, "Date", "date-time")
      )
    }
    if (until !== undefined) {
      requestContext.setQueryParam(
        "until",
        ObjectSerializer.serialize(until, "Date", "date-time")
      )
    }
    if (sinceId !== undefined) {
      requestContext.setQueryParam(
        "since_id",
        ObjectSerializer.serialize(sinceId, "number", "")
      )
    }
    if (untilId !== undefined) {
      requestContext.setQueryParam(
        "until_id",
        ObjectSerializer.serialize(untilId, "number", "")
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
}

export class EventsApiResponseProcessor {
  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to eventsAccountsStatusGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async eventsAccountsStatusGet(
    response: ResponseContext
  ): Promise<InlineResponse2004> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: InlineResponse2004 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2004",
        ""
      ) as InlineResponse2004
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: InlineResponse2004 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2004",
        ""
      ) as InlineResponse2004
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
   * @params response Response returned by the server for a request to eventsJournalsStatusGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async eventsJournalsStatusGet(
    response: ResponseContext
  ): Promise<InlineResponse2005> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: InlineResponse2005 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2005",
        ""
      ) as InlineResponse2005
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: InlineResponse2005 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2005",
        ""
      ) as InlineResponse2005
      return body
    }

    let body = response.body || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }
}

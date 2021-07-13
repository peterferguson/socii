// TODO: better import syntax?
import { Configuration } from "../configuration"
import { HttpMethod, RequestContext, ResponseContext } from "../http/http"
import { BatchJournalRequest } from "../models/BatchJournalRequest"
import { BatchJournalResponse } from "../models/BatchJournalResponse"
import { InlineResponse2005 } from "../models/InlineResponse2005"
import { JournalData } from "../models/JournalData"
import { JournalResource } from "../models/JournalResource"
import { ObjectSerializer } from "../models/ObjectSerializer"
import { isCodeInRange } from "../util"
import { BaseAPIRequestFactory, RequiredError } from "./baseapi"
import { ApiException } from "./exception"


/**
 * no description
 */
export class JournalsApiRequestFactory extends BaseAPIRequestFactory {
  /**
   * You can cancel journals while they are in the pending status. An attempt to cancel already-executed journals will return an error.
   * Cancel a pending journal.
   * @param journalId
   */
  public async deleteJournal(
    journalId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'journalId' is not null or undefined
    if (journalId === null || journalId === undefined) {
      throw new RequiredError(
        "Required parameter journalId was null or undefined when calling deleteJournal."
      )
    }

    // Path Params
    const localVarPath = "/journals/{journal_id}".replace(
      "{" + "journal_id" + "}",
      encodeURIComponent(String(journalId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.DELETE
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

  /**
   * Return a list of requested journals.
   * @param after by settle_date
   * @param before by settle_date
   * @param status
   * @param entryType
   * @param toAccount
   * @param fromAccount
   */
  public async getJournals(
    after?: string,
    before?: string,
    status?: "pending" | "canceled" | "executed",
    entryType?: "JNLC" | "JNLS",
    toAccount?: string,
    fromAccount?: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // Path Params
    const localVarPath = "/journals"

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (after !== undefined) {
      requestContext.setQueryParam(
        "after",
        ObjectSerializer.serialize(after, "string", "date")
      )
    }
    if (before !== undefined) {
      requestContext.setQueryParam(
        "before",
        ObjectSerializer.serialize(before, "string", "date")
      )
    }
    if (status !== undefined) {
      requestContext.setQueryParam(
        "status",
        ObjectSerializer.serialize(status, "'pending' | 'canceled' | 'executed'", "")
      )
    }
    if (entryType !== undefined) {
      requestContext.setQueryParam(
        "entry_type",
        ObjectSerializer.serialize(entryType, "'JNLC' | 'JNLS'", "")
      )
    }
    if (toAccount !== undefined) {
      requestContext.setQueryParam(
        "to_account",
        ObjectSerializer.serialize(toAccount, "string", "uuid")
      )
    }
    if (fromAccount !== undefined) {
      requestContext.setQueryParam(
        "from_account",
        ObjectSerializer.serialize(fromAccount, "string", "uuid")
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
   * A journal can be JNLC (move cash) or JNLS (move shares), dictated by `entry_type`. Generally, journal requests are subject to approval and starts from the `pending` status. The status changes are propagated through the Event API. Under certain conditions agreed for the partner, such journal transactions that meet the criteria are executed right away.
   * Request a journal.
   * @param journalData
   */
  public async postJournals(
    journalData: JournalData,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'journalData' is not null or undefined
    if (journalData === null || journalData === undefined) {
      throw new RequiredError(
        "Required parameter journalData was null or undefined when calling postJournals."
      )
    }

    // Path Params
    const localVarPath = "/journals"

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.POST
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    const contentType = ObjectSerializer.getPreferredMediaType(["application/json"])
    requestContext.setHeaderParam("Content-Type", contentType)
    const serializedBody = ObjectSerializer.stringify(
      ObjectSerializer.serialize(journalData, "JournalData", ""),
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
   * Create a batch journal
   * @param batchJournalRequest
   */
  public async postJournalsBatch(
    batchJournalRequest: BatchJournalRequest,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'batchJournalRequest' is not null or undefined
    if (batchJournalRequest === null || batchJournalRequest === undefined) {
      throw new RequiredError(
        "Required parameter batchJournalRequest was null or undefined when calling postJournalsBatch."
      )
    }

    // Path Params
    const localVarPath = "/journals/batch"

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.POST
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    const contentType = ObjectSerializer.getPreferredMediaType(["application/json"])
    requestContext.setHeaderParam("Content-Type", contentType)
    const serializedBody = ObjectSerializer.stringify(
      ObjectSerializer.serialize(batchJournalRequest, "BatchJournalRequest", ""),
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

export class JournalsApiResponseProcessor {
  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to deleteJournal
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async deleteJournal(response: ResponseContext): Promise<void> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("204", response.httpStatusCode)) {
      return
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      throw new ApiException<string>(
        response.httpStatusCode,
        "The journal is not found. "
      )
    }
    if (isCodeInRange("422", response.httpStatusCode)) {
      throw new ApiException<string>(
        response.httpStatusCode,
        "The journal is not in the pending status. "
      )
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: void = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "void",
        ""
      ) as void
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

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to getJournals
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async getJournals(response: ResponseContext): Promise<Array<JournalResource>> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Array<JournalResource> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<JournalResource>",
        ""
      ) as Array<JournalResource>
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Array<JournalResource> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<JournalResource>",
        ""
      ) as Array<JournalResource>
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
   * @params response Response returned by the server for a request to postJournals
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async postJournals(response: ResponseContext): Promise<JournalResource> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: JournalResource = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "JournalResource",
        ""
      ) as JournalResource
      return body
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(400, body)
    }
    if (isCodeInRange("403", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(403, body)
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
      const body: JournalResource = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "JournalResource",
        ""
      ) as JournalResource
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
   * @params response Response returned by the server for a request to postJournalsBatch
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async postJournalsBatch(
    response: ResponseContext
  ): Promise<Array<BatchJournalResponse>> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Array<BatchJournalResponse> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<BatchJournalResponse>",
        ""
      ) as Array<BatchJournalResponse>
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Array<BatchJournalResponse> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<BatchJournalResponse>",
        ""
      ) as Array<BatchJournalResponse>
      return body
    }

    let body = response.body || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }
}

// TODO: better import syntax?
import { Configuration } from "../configuration"
import { HttpMethod, RequestContext, ResponseContext } from "../http/http"
import { CreateOrder } from "../models/CreateOrder"
import { InlineResponse207 } from "../models/InlineResponse207"
import { ObjectSerializer } from "../models/ObjectSerializer"
import { OrderObject } from "../models/OrderObject"
import { PatchOrder } from "../models/PatchOrder"
import { Position } from "../models/Position"
import { isCodeInRange } from "../util"
import { BaseAPIRequestFactory, RequiredError } from "./baseapi"
import { ApiException } from "./exception"

/**
 * no description
 */
export class TradingApiRequestFactory extends BaseAPIRequestFactory {
  /**
   * Attempts to cancel an open order.
   * Attempts to cancel an open order.
   * @param accountId Account identifier.
   * @param orderId Order identifier.
   */
  public async deleteOrder(
    accountId: string,
    orderId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling deleteOrder."
      )
    }

    // verify required parameter 'orderId' is not null or undefined
    if (orderId === null || orderId === undefined) {
      throw new RequiredError(
        "Required parameter orderId was null or undefined when calling deleteOrder."
      )
    }

    // Path Params
    const localVarPath = "/trading/accounts/{account_id}/orders/{order_id}"
      .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
      .replace("{" + "order_id" + "}", encodeURIComponent(String(orderId)))

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
   * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
   * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
   * @param accountId Account identifier.
   */
  public async deleteOrders(
    accountId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling deleteOrders."
      )
    }

    // Path Params
    const localVarPath = "/trading/accounts/{account_id}/orders".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
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
   * Retrieves a single order for the given order_id.
   * Retrieves a single order for the given order_id.
   * @param accountId Account identifier.
   * @param orderId Order identifier.
   */
  public async getOrder(
    accountId: string,
    orderId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling getOrder."
      )
    }

    // verify required parameter 'orderId' is not null or undefined
    if (orderId === null || orderId === undefined) {
      throw new RequiredError(
        "Required parameter orderId was null or undefined when calling getOrder."
      )
    }

    // Path Params
    const localVarPath = "/trading/accounts/{account_id}/orders/{order_id}"
      .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
      .replace("{" + "order_id" + "}", encodeURIComponent(String(orderId)))

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
  public async getOrders(
    accountId: string,
    status?: "open" | "closed" | "all",
    limit?: number,
    after?: Date,
    until?: Date,
    direction?: "asc" | "desc",
    nested?: boolean,
    symbols?: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling getOrders."
      )
    }

    // Path Params
    const localVarPath = "/trading/accounts/{account_id}/orders".replace(
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
    if (status !== undefined) {
      requestContext.setQueryParam(
        "status",
        ObjectSerializer.serialize(status, "'open' | 'closed' | 'all'", "")
      )
    }
    if (limit !== undefined) {
      requestContext.setQueryParam(
        "limit",
        ObjectSerializer.serialize(limit, "number", "")
      )
    }
    if (after !== undefined) {
      requestContext.setQueryParam(
        "after",
        ObjectSerializer.serialize(after, "Date", "date-time")
      )
    }
    if (until !== undefined) {
      requestContext.setQueryParam(
        "until",
        ObjectSerializer.serialize(until, "Date", "date-time")
      )
    }
    if (direction !== undefined) {
      requestContext.setQueryParam(
        "direction",
        ObjectSerializer.serialize(direction, "'asc' | 'desc'", "")
      )
    }
    if (nested !== undefined) {
      requestContext.setQueryParam(
        "nested",
        ObjectSerializer.serialize(nested, "boolean", "")
      )
    }
    if (symbols !== undefined) {
      requestContext.setQueryParam(
        "symbols",
        ObjectSerializer.serialize(symbols, "string", "")
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
   * List open positions for an account
   * @param accountId Account identifier.
   */
  public async getPositions(
    accountId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling getPositions."
      )
    }

    // Path Params
    const localVarPath = "/trading/accounts/{account_id}/positions".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
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

  /**
   * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
   * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
   * @param accountId Account identifier.
   * @param orderId Order identifier.
   * @param patchOrder
   */
  public async patchOrder(
    accountId: string,
    orderId: string,
    patchOrder: PatchOrder,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling patchOrder."
      )
    }

    // verify required parameter 'orderId' is not null or undefined
    if (orderId === null || orderId === undefined) {
      throw new RequiredError(
        "Required parameter orderId was null or undefined when calling patchOrder."
      )
    }

    // verify required parameter 'patchOrder' is not null or undefined
    if (patchOrder === null || patchOrder === undefined) {
      throw new RequiredError(
        "Required parameter patchOrder was null or undefined when calling patchOrder."
      )
    }

    // Path Params
    const localVarPath = "/trading/accounts/{account_id}/orders/{order_id}"
      .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
      .replace("{" + "order_id" + "}", encodeURIComponent(String(orderId)))

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.PATCH
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    const contentType = ObjectSerializer.getPreferredMediaType(["application/json"])
    requestContext.setHeaderParam("Content-Type", contentType)
    const serializedBody = ObjectSerializer.stringify(
      ObjectSerializer.serialize(patchOrder, "PatchOrder", ""),
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
   * Create an order for an account.
   * Create an order for an account.
   * @param accountId Account identifier.
   * @param createOrder
   */
  public async postOrders(
    accountId: string,
    createOrder: CreateOrder,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling postOrders."
      )
    }

    // verify required parameter 'createOrder' is not null or undefined
    if (createOrder === null || createOrder === undefined) {
      throw new RequiredError(
        "Required parameter createOrder was null or undefined when calling postOrders."
      )
    }

    // Path Params
    const localVarPath = "/trading/accounts/{account_id}/orders".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.POST
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    const contentType = ObjectSerializer.getPreferredMediaType(["application/json"])
    requestContext.setHeaderParam("Content-Type", contentType)
    const serializedBody = ObjectSerializer.stringify(
      ObjectSerializer.serialize(createOrder, "CreateOrder", ""),
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

export class TradingApiResponseProcessor {
  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to deleteOrder
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async deleteOrder(response: ResponseContext): Promise<void> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("204", response.httpStatusCode)) {
      return
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(400, body)
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(404, body)
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

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to deleteOrders
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async deleteOrders(
    response: ResponseContext
  ): Promise<Array<InlineResponse207>> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("207", response.httpStatusCode)) {
      const body: Array<InlineResponse207> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<InlineResponse207>",
        ""
      ) as Array<InlineResponse207>
      return body
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(400, body)
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(404, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Array<InlineResponse207> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<InlineResponse207>",
        ""
      ) as Array<InlineResponse207>
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to getOrder
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async getOrder(response: ResponseContext): Promise<OrderObject> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: OrderObject = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "OrderObject",
        ""
      ) as OrderObject
      return body
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(400, body)
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(404, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: OrderObject = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "OrderObject",
        ""
      ) as OrderObject
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to getOrders
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async getOrders(response: ResponseContext): Promise<Array<OrderObject>> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Array<OrderObject> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<OrderObject>",
        ""
      ) as Array<OrderObject>
      return body
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(400, body)
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(404, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Array<OrderObject> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<OrderObject>",
        ""
      ) as Array<OrderObject>
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to getPositions
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async getPositions(response: ResponseContext): Promise<Array<Position>> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Array<Position> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<Position>",
        ""
      ) as Array<Position>
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Array<Position> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<Position>",
        ""
      ) as Array<Position>
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to patchOrder
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async patchOrder(response: ResponseContext): Promise<OrderObject> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: OrderObject = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "OrderObject",
        ""
      ) as OrderObject
      return body
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(400, body)
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
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(404, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: OrderObject = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "OrderObject",
        ""
      ) as OrderObject
      return body
    }

    let body = (await response.body.text()) || ""

    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to postOrders
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async postOrders(response: ResponseContext): Promise<OrderObject> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: OrderObject = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "OrderObject",
        ""
      ) as OrderObject
      return body
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(400, body)
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
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(404, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: OrderObject = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "OrderObject",
        ""
      ) as OrderObject
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }
}

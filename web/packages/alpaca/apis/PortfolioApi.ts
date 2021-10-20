// TODO: better import syntax?
import { Configuration } from "../configuration"
import { HttpMethod, RequestContext, ResponseContext } from "../http/http"
import { ObjectSerializer, PortfolioHistory, Position } from "../models"
import { isCodeInRange } from "../util"
import { BaseAPIRequestFactory, RequiredError } from "./baseapi"
import { ApiException } from "./exception"

/**
 * no description
 */
export class PortfolioApiRequestFactory extends BaseAPIRequestFactory {
  /**
   * Get timeseries data for equity and profit loss information of the account
   * @param accountId Account identifier.
   * @param period The duration of the data in number + unit, such as 1D
   * @param timeframe The resolution of time window
   * @param dateEnd The date the data is returned up to, in “YYYY-MM-DD” format. Defaults to the current market date (rolls over at the market open if extended_hours is false, otherwise at 7am ET)
   * @param extendedHours If true, include extended hours in the result
   */
  public async getPortfolioHistory(
    accountId: string,
    period?: string,
    timeframe?: "1Min" | "5Min" | "15Min" | "1H" | "1D",
    dateEnd?: string,
    extendedHours?: boolean,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling getPortfolioHistory."
      )
    }

    // Path Params
    const localVarPath =
      "/trading/accounts/{account_id}/account/portfolio/history".replace(
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
    if (period !== undefined) {
      requestContext.setQueryParam(
        "period",
        ObjectSerializer.serialize(period, "string", "")
      )
    }
    if (timeframe !== undefined) {
      requestContext.setQueryParam(
        "timeframe",
        ObjectSerializer.serialize(
          timeframe,
          "'1Min' | '5Min' | '15Min' | '1H' | '1D'",
          ""
        )
      )
    }
    if (dateEnd !== undefined) {
      requestContext.setQueryParam(
        "date_end",
        ObjectSerializer.serialize(dateEnd, "string", "")
      )
    }
    if (extendedHours !== undefined) {
      requestContext.setQueryParam(
        "extended_hours",
        ObjectSerializer.serialize(extendedHours, "boolean", "")
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

    // Query Params

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

export class PortfolioApiResponseProcessor {
  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to getPortfolioHistory
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async getPortfolioHistory(
    response: ResponseContext
  ): Promise<PortfolioHistory> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: PortfolioHistory = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "PortfolioHistory",
        ""
      ) as PortfolioHistory
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: PortfolioHistory = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "PortfolioHistory",
        ""
      ) as PortfolioHistory
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

    let body = response.body || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }
}

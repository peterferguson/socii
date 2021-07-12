// TODO: better import syntax?
import { Configuration } from "../configuration"
import { HttpMethod, RequestContext, ResponseContext } from "../http/http"
import { InlineResponse2001 } from "../models/InlineResponse2001"
import { ObjectSerializer } from "../models/ObjectSerializer"
import { isCodeInRange } from "../util"
import { BaseAPIRequestFactory } from "./baseapi"
import { ApiException } from "./exception"


/**
 * no description
 */
export class CalendarApiRequestFactory extends BaseAPIRequestFactory {
  /**
   * Query market calendar
   * @param start The first date to retrieve data for. (Inclusive)
   * @param end The last date to retrieve data for. (Inclusive)
   */
  public async calendarGet(
    start?: string,
    end?: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // Path Params
    const localVarPath = "/calendar"

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (start !== undefined) {
      requestContext.setQueryParam(
        "start",
        ObjectSerializer.serialize(start, "string", "")
      )
    }
    if (end !== undefined) {
      requestContext.setQueryParam("end", ObjectSerializer.serialize(end, "string", ""))
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

export class CalendarApiResponseProcessor {
  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to calendarGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async calendarGet(response: ResponseContext): Promise<InlineResponse2001> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: InlineResponse2001 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2001",
        ""
      ) as InlineResponse2001
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: InlineResponse2001 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2001",
        ""
      ) as InlineResponse2001
      return body
    }

    let body = response.body || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }
}

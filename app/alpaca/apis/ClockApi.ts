// TODO: better import syntax?
import { Configuration } from "../configuration"
import { HttpMethod, RequestContext, ResponseContext } from "../http/http"
import { InlineResponse2002 } from "../models/InlineResponse2002"
import { ObjectSerializer } from "../models/ObjectSerializer"
import { isCodeInRange } from "../util"
import { BaseAPIRequestFactory } from "./baseapi"
import { ApiException } from "./exception"


/**
 * no description
 */
export class ClockApiRequestFactory extends BaseAPIRequestFactory {
  /**
   * Query market clock
   */
  public async clockGet(options?: Configuration): Promise<RequestContext> {
    let config = options || this.configuration

    // Path Params
    const localVarPath = "/clock"

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

export class ClockApiResponseProcessor {
  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to clockGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async clockGet(response: ResponseContext): Promise<InlineResponse2002> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: InlineResponse2002 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2002",
        ""
      ) as InlineResponse2002
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: InlineResponse2002 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2002",
        ""
      ) as InlineResponse2002
      return body
    }

    let body = response.body || ""

    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }
}

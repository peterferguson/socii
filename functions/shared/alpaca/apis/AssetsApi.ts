// TODO: better import syntax?
import { Configuration } from "../configuration"
import { HttpMethod, RequestContext, ResponseContext } from "../http/http"
import { AssetResource } from "../models/AssetResource"
import { ObjectSerializer } from "../models/ObjectSerializer"
import { isCodeInRange } from "../util"
import { BaseAPIRequestFactory, RequiredError } from "./baseapi"
import { ApiException } from "./exception"

/**
 * no description
 */
export class AssetsApiRequestFactory extends BaseAPIRequestFactory {
  /**
   * Returns the requested asset, if found
   * Retrieve an asset by UUID
   * @param assetId The UUID of the required asset
   */
  public async assetsAssetIdGet(
    assetId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'assetId' is not null or undefined
    if (assetId === null || assetId === undefined) {
      throw new RequiredError(
        "Required parameter assetId was null or undefined when calling assetsAssetIdGet."
      )
    }

    // Path Params
    const localVarPath = "/assets/{asset_id}".replace(
      "{" + "asset_id" + "}",
      encodeURIComponent(String(assetId))
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

  /**
   * Returns the requested asset, if found
   * Retrieve an asset by symbol
   * @param symbol The symbol of the required asset
   */
  public async assetsSymbolGet(
    symbol: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'symbol' is not null or undefined
    if (symbol === null || symbol === undefined) {
      throw new RequiredError(
        "Required parameter symbol was null or undefined when calling assetsSymbolGet."
      )
    }

    // Path Params
    const localVarPath = "/assets/{symbol}".replace(
      "{" + "symbol" + "}",
      encodeURIComponent(String(symbol))
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

  /**
   * Returns all assets
   * Retrieve all assets
   */
  public async getAssets(options?: Configuration): Promise<RequestContext> {
    let config = options || this.configuration

    // Path Params
    const localVarPath = "/assets"

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

export class AssetsApiResponseProcessor {
  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to assetsAssetIdGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async assetsAssetIdGet(response: ResponseContext): Promise<AssetResource> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: AssetResource = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "AssetResource",
        ""
      ) as AssetResource
      return body
    }
    if (isCodeInRange("401", response.httpStatusCode)) {
      throw new ApiException<string>(response.httpStatusCode, "Unauthorized")
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      throw new ApiException<string>(response.httpStatusCode, "Asset not found")
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: AssetResource = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "AssetResource",
        ""
      ) as AssetResource
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + JSON.stringify(body) + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to assetsSymbolGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async assetsSymbolGet(response: ResponseContext): Promise<AssetResource> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: AssetResource = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "AssetResource",
        ""
      ) as AssetResource
      return body
    }
    if (isCodeInRange("401", response.httpStatusCode)) {
      throw new ApiException<string>(response.httpStatusCode, "Unauthorized")
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      throw new ApiException<string>(response.httpStatusCode, "Asset not found")
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: AssetResource = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "AssetResource",
        ""
      ) as AssetResource
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + JSON.stringify(body) + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to getAssets
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async getAssets(response: ResponseContext): Promise<Array<AssetResource>> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Array<AssetResource> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<AssetResource>",
        ""
      ) as Array<AssetResource>
      return body
    }
    if (isCodeInRange("401", response.httpStatusCode)) {
      throw new ApiException<string>(response.httpStatusCode, "Unauthorized")
    }
    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Array<AssetResource> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<AssetResource>",
        ""
      ) as Array<AssetResource>
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + JSON.stringify(body) + '"'
    )
  }
}

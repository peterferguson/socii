//@ts-ignore
import { RequestContext } from "../http/http"

/**
 * Interface authentication schemes.
 */
export interface SecurityAuthentication {
  /*
   * @return returns the name of the security authentication as specified in OAI
   */
  getName(): string

  /**
   * Applies the authentication scheme to the request context
   *
   * @params context the request context which should use this authentication scheme
   */
  applySecurityAuthentication(context: RequestContext): void | Promise<void>
}

export interface TokenProvider {
  getToken(): Promise<string> | string
}

/**
 * Applies http authentication to the request context.
 */
export class BasicAuthAuthentication implements SecurityAuthentication {
  /**
   * Configures the http authentication with the required details.
   *
   * @param username username for http basic authentication
   * @param password password for http basic authentication
   */
  public constructor(private username: string, private password: string) {}

  public getName(): string {
    return "BasicAuth"
  }

  public applySecurityAuthentication(context: RequestContext) {
    let comb = this.username + ":" + this.password
    context.setHeaderParam(
      "Authorization",
      "Basic " + Buffer.from(comb).toString("base64")
    )
  }
}

export type AuthMethods = {
  BasicAuth?: SecurityAuthentication
}

export type ApiKeyConfiguration = string
export type HttpBasicConfiguration = { username: string; password: string }
export type HttpBearerConfiguration = { tokenProvider: TokenProvider }
export type OAuth2Configuration = string

export type AuthMethodsConfiguration = {
  BasicAuth?: HttpBasicConfiguration
}

/**
 * Creates the authentication methods from a swagger description.
 *
 */
export function configureAuthMethods(
  config: AuthMethodsConfiguration | undefined
): AuthMethods {
  let authMethods: AuthMethods = {}

  if (!config) {
    return authMethods
  }

  if (config["BasicAuth"]) {
    authMethods["BasicAuth"] = new BasicAuthAuthentication(
      config["BasicAuth"]["username"],
      config["BasicAuth"]["password"]
    )
  }

  return authMethods
}

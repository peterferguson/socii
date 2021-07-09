/* tslint:disable */
/* eslint-disable */
/**
 * Alpaca Broker API
 * Open brokerage accounts, enable commission-free trading, and manage the ongoing user experience with Alpaca Broker API
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    InlineObject,
    InlineObjectFromJSON,
    InlineObjectToJSON,
    InlineObject1,
    InlineObject1FromJSON,
    InlineObject1ToJSON,
    InlineResponse2006,
    InlineResponse2006FromJSON,
    InlineResponse2006ToJSON,
    InlineResponse2007,
    InlineResponse2007FromJSON,
    InlineResponse2007ToJSON,
    InlineResponse2008,
    InlineResponse2008FromJSON,
    InlineResponse2008ToJSON,
} from '../models';

export interface OauthAuthorizePostRequest {
    inlineObject1: InlineObject1;
}

export interface OauthClientsClientIdGetRequest {
    clientId: string;
    responseType?: OauthClientsClientIdGetResponseTypeEnum;
    redirectUri?: string;
    scope?: string;
}

export interface OauthTokenPostRequest {
    inlineObject: InlineObject;
}

/**
 * 
 */
export class OAuthApi extends runtime.BaseAPI {

    /**
     * The operation issues an OAuth code which can be used in the OAuth code flow. 
     * Issue a code.
     */
    async oauthAuthorizePostRaw(requestParameters: OauthAuthorizePostRequest): Promise<runtime.ApiResponse<InlineResponse2008>> {
        if (requestParameters.inlineObject1 === null || requestParameters.inlineObject1 === undefined) {
            throw new runtime.RequiredError('inlineObject1','Required parameter requestParameters.inlineObject1 was null or undefined when calling oauthAuthorizePost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/oauth/authorize`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InlineObject1ToJSON(requestParameters.inlineObject1),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2008FromJSON(jsonValue));
    }

    /**
     * The operation issues an OAuth code which can be used in the OAuth code flow. 
     * Issue a code.
     */
    async oauthAuthorizePost(requestParameters: OauthAuthorizePostRequest): Promise<InlineResponse2008> {
        const response = await this.oauthAuthorizePostRaw(requestParameters);
        return await response.value();
    }

    /**
     * The endpoint returns the details of OAuth client to display in the authorization page. 
     * Returns an OAuth client.
     */
    async oauthClientsClientIdGetRaw(requestParameters: OauthClientsClientIdGetRequest): Promise<runtime.ApiResponse<InlineResponse2006>> {
        if (requestParameters.clientId === null || requestParameters.clientId === undefined) {
            throw new runtime.RequiredError('clientId','Required parameter requestParameters.clientId was null or undefined when calling oauthClientsClientIdGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.responseType !== undefined) {
            queryParameters['response_type'] = requestParameters.responseType;
        }

        if (requestParameters.redirectUri !== undefined) {
            queryParameters['redirect_uri'] = requestParameters.redirectUri;
        }

        if (requestParameters.scope !== undefined) {
            queryParameters['scope'] = requestParameters.scope;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/oauth/clients/{client_id}`.replace(`{${"client_id"}}`, encodeURIComponent(String(requestParameters.clientId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2006FromJSON(jsonValue));
    }

    /**
     * The endpoint returns the details of OAuth client to display in the authorization page. 
     * Returns an OAuth client.
     */
    async oauthClientsClientIdGet(requestParameters: OauthClientsClientIdGetRequest): Promise<InlineResponse2006> {
        const response = await this.oauthClientsClientIdGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * This operation issues an access token for an account. 
     * Issue a token.
     */
    async oauthTokenPostRaw(requestParameters: OauthTokenPostRequest): Promise<runtime.ApiResponse<InlineResponse2007>> {
        if (requestParameters.inlineObject === null || requestParameters.inlineObject === undefined) {
            throw new runtime.RequiredError('inlineObject','Required parameter requestParameters.inlineObject was null or undefined when calling oauthTokenPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/oauth/token`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InlineObjectToJSON(requestParameters.inlineObject),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2007FromJSON(jsonValue));
    }

    /**
     * This operation issues an access token for an account. 
     * Issue a token.
     */
    async oauthTokenPost(requestParameters: OauthTokenPostRequest): Promise<InlineResponse2007> {
        const response = await this.oauthTokenPostRaw(requestParameters);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum OauthClientsClientIdGetResponseTypeEnum {
    Code = 'code',
    Token = 'token'
}

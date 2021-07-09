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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface InlineResponse2006
 */
export interface InlineResponse2006 {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2006
     */
    clientId?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2006
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2006
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2006
     */
    url?: string;
    /**
     * URL of Terms of Use
     * @type {string}
     * @memberof InlineResponse2006
     */
    termsOfUse?: string;
    /**
     * URL of Privacy Policy
     * @type {string}
     * @memberof InlineResponse2006
     */
    privacyPolicy?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2006
     */
    status?: InlineResponse2006StatusEnum;
    /**
     * 
     * @type {Array<string>}
     * @memberof InlineResponse2006
     */
    redirectUri?: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof InlineResponse2006
     */
    liveTradingApproved?: boolean;
}

/**
* @export
* @enum {string}
*/
export enum InlineResponse2006StatusEnum {
    Active = 'ACTIVE',
    Disabled = 'DISABLED'
}

export function InlineResponse2006FromJSON(json: any): InlineResponse2006 {
    return InlineResponse2006FromJSONTyped(json, false);
}

export function InlineResponse2006FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2006 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'clientId': !exists(json, 'client_id') ? undefined : json['client_id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'url': !exists(json, 'url') ? undefined : json['url'],
        'termsOfUse': !exists(json, 'terms_of_use') ? undefined : json['terms_of_use'],
        'privacyPolicy': !exists(json, 'privacy_policy') ? undefined : json['privacy_policy'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'redirectUri': !exists(json, 'redirect_uri') ? undefined : json['redirect_uri'],
        'liveTradingApproved': !exists(json, 'live_trading_approved') ? undefined : json['live_trading_approved'],
    };
}

export function InlineResponse2006ToJSON(value?: InlineResponse2006 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'client_id': value.clientId,
        'name': value.name,
        'description': value.description,
        'url': value.url,
        'terms_of_use': value.termsOfUse,
        'privacy_policy': value.privacyPolicy,
        'status': value.status,
        'redirect_uri': value.redirectUri,
        'live_trading_approved': value.liveTradingApproved,
    };
}



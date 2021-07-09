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
 * @interface InlineResponse2001
 */
export interface InlineResponse2001 {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001
     */
    date?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001
     */
    open?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001
     */
    close?: string;
}

export function InlineResponse2001FromJSON(json: any): InlineResponse2001 {
    return InlineResponse2001FromJSONTyped(json, false);
}

export function InlineResponse2001FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2001 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'date': !exists(json, 'date') ? undefined : json['date'],
        'open': !exists(json, 'open') ? undefined : json['open'],
        'close': !exists(json, 'close') ? undefined : json['close'],
    };
}

export function InlineResponse2001ToJSON(value?: InlineResponse2001 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'date': value.date,
        'open': value.open,
        'close': value.close,
    };
}


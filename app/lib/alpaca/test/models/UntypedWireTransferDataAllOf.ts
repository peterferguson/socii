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
 * @interface UntypedWireTransferDataAllOf
 */
export interface UntypedWireTransferDataAllOf {
    /**
     * 
     * @type {string}
     * @memberof UntypedWireTransferDataAllOf
     */
    additionalInformation?: string;
    /**
     * 
     * @type {string}
     * @memberof UntypedWireTransferDataAllOf
     */
    bankId: string;
}

export function UntypedWireTransferDataAllOfFromJSON(json: any): UntypedWireTransferDataAllOf {
    return UntypedWireTransferDataAllOfFromJSONTyped(json, false);
}

export function UntypedWireTransferDataAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): UntypedWireTransferDataAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'additionalInformation': !exists(json, 'additional_information') ? undefined : json['additional_information'],
        'bankId': json['bank_id'],
    };
}

export function UntypedWireTransferDataAllOfToJSON(value?: UntypedWireTransferDataAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'additional_information': value.additionalInformation,
        'bank_id': value.bankId,
    };
}


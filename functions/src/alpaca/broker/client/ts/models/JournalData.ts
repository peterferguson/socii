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
 * @interface JournalData
 */
export interface JournalData {
    /**
     * 
     * @type {string}
     * @memberof JournalData
     */
    entryType: JournalDataEntryTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof JournalData
     */
    fromAccount: string;
    /**
     * 
     * @type {string}
     * @memberof JournalData
     */
    toAccount: string;
    /**
     * Required for JNLC.
     * The dollar amount to move. It has to be
     * a positive value.
     * @type {string}
     * @memberof JournalData
     */
    amount?: string;
    /**
     * Required for JNLS.
     * @type {string}
     * @memberof JournalData
     */
    symbol?: string;
    /**
     * Required for JNLS.
     * The number of shares to move. It has to be
     * a positive value.
     * @type {string}
     * @memberof JournalData
     */
    qty?: string;
}

/**
* @export
* @enum {string}
*/
export enum JournalDataEntryTypeEnum {
    Jnlc = 'JNLC',
    Jnls = 'JNLS'
}

export function JournalDataFromJSON(json: any): JournalData {
    return JournalDataFromJSONTyped(json, false);
}

export function JournalDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): JournalData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entryType': json['entry_type'],
        'fromAccount': json['from_account'],
        'toAccount': json['to_account'],
        'amount': !exists(json, 'amount') ? undefined : json['amount'],
        'symbol': !exists(json, 'symbol') ? undefined : json['symbol'],
        'qty': !exists(json, 'qty') ? undefined : json['qty'],
    };
}

export function JournalDataToJSON(value?: JournalData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entry_type': value.entryType,
        'from_account': value.fromAccount,
        'to_account': value.toAccount,
        'amount': value.amount,
        'symbol': value.symbol,
        'qty': value.qty,
    };
}


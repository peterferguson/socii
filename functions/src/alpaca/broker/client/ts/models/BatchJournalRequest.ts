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
import {
    BatchJournalRequestEntries,
    BatchJournalRequestEntriesFromJSON,
    BatchJournalRequestEntriesFromJSONTyped,
    BatchJournalRequestEntriesToJSON,
} from './';

/**
 * 
 * @export
 * @interface BatchJournalRequest
 */
export interface BatchJournalRequest {
    /**
     * 
     * @type {string}
     * @memberof BatchJournalRequest
     */
    entryType: BatchJournalRequestEntryTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof BatchJournalRequest
     */
    fromAccount: string;
    /**
     * 
     * @type {string}
     * @memberof BatchJournalRequest
     */
    description?: string;
    /**
     * 
     * @type {Array<BatchJournalRequestEntries>}
     * @memberof BatchJournalRequest
     */
    entries?: Array<BatchJournalRequestEntries>;
}

/**
* @export
* @enum {string}
*/
export enum BatchJournalRequestEntryTypeEnum {
    Jnlc = 'JNLC'
}

export function BatchJournalRequestFromJSON(json: any): BatchJournalRequest {
    return BatchJournalRequestFromJSONTyped(json, false);
}

export function BatchJournalRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): BatchJournalRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entryType': json['entry_type'],
        'fromAccount': json['from_account'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'entries': !exists(json, 'entries') ? undefined : ((json['entries'] as Array<any>).map(BatchJournalRequestEntriesFromJSON)),
    };
}

export function BatchJournalRequestToJSON(value?: BatchJournalRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entry_type': value.entryType,
        'from_account': value.fromAccount,
        'description': value.description,
        'entries': value.entries === undefined ? undefined : ((value.entries as Array<any>).map(BatchJournalRequestEntriesToJSON)),
    };
}



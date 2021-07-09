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
    AccountStatus,
    AccountStatusFromJSON,
    AccountStatusFromJSONTyped,
    AccountStatusToJSON,
    Agreement,
    AgreementFromJSON,
    AgreementFromJSONTyped,
    AgreementToJSON,
    ApplicationDocument,
    ApplicationDocumentFromJSON,
    ApplicationDocumentFromJSONTyped,
    ApplicationDocumentToJSON,
    Contact,
    ContactFromJSON,
    ContactFromJSONTyped,
    ContactToJSON,
    Disclosures,
    DisclosuresFromJSON,
    DisclosuresFromJSONTyped,
    DisclosuresToJSON,
    Identity,
    IdentityFromJSON,
    IdentityFromJSONTyped,
    IdentityToJSON,
    KycResult,
    KycResultFromJSON,
    KycResultFromJSONTyped,
    KycResultToJSON,
    TrustedContact,
    TrustedContactFromJSON,
    TrustedContactFromJSONTyped,
    TrustedContactToJSON,
} from './';

/**
 * 
 * @export
 * @interface AccountExtended
 */
export interface AccountExtended {
    /**
     * 
     * @type {string}
     * @memberof AccountExtended
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof AccountExtended
     */
    accountNumber?: string;
    /**
     * 
     * @type {AccountStatus}
     * @memberof AccountExtended
     */
    status?: AccountStatus;
    /**
     * Always "USD"
     * @type {string}
     * @memberof AccountExtended
     */
    currency?: string;
    /**
     * 
     * @type {Date}
     * @memberof AccountExtended
     */
    createdAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof AccountExtended
     */
    lastEquity?: string;
    /**
     * 
     * @type {KycResult}
     * @memberof AccountExtended
     */
    kycResults?: KycResult;
    /**
     * 
     * @type {Contact}
     * @memberof AccountExtended
     */
    contact?: Contact;
    /**
     * 
     * @type {Identity}
     * @memberof AccountExtended
     */
    identity?: Identity;
    /**
     * 
     * @type {Disclosures}
     * @memberof AccountExtended
     */
    disclosures?: Disclosures;
    /**
     * The client has to present Alpaca Account Agreement and
     * Margin Agreement to the end user, and have them read
     * full sentences.
     * @type {Array<Agreement>}
     * @memberof AccountExtended
     */
    agreements?: Array<Agreement>;
    /**
     * 
     * @type {Array<ApplicationDocument>}
     * @memberof AccountExtended
     */
    documents?: Array<ApplicationDocument>;
    /**
     * 
     * @type {TrustedContact}
     * @memberof AccountExtended
     */
    trustedContact?: TrustedContact;
}

export function AccountExtendedFromJSON(json: any): AccountExtended {
    return AccountExtendedFromJSONTyped(json, false);
}

export function AccountExtendedFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountExtended {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'accountNumber': !exists(json, 'account_number') ? undefined : json['account_number'],
        'status': !exists(json, 'status') ? undefined : AccountStatusFromJSON(json['status']),
        'currency': !exists(json, 'currency') ? undefined : json['currency'],
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'lastEquity': !exists(json, 'last_equity') ? undefined : json['last_equity'],
        'kycResults': !exists(json, 'kyc_results') ? undefined : KycResultFromJSON(json['kyc_results']),
        'contact': !exists(json, 'contact') ? undefined : ContactFromJSON(json['contact']),
        'identity': !exists(json, 'identity') ? undefined : IdentityFromJSON(json['identity']),
        'disclosures': !exists(json, 'disclosures') ? undefined : DisclosuresFromJSON(json['disclosures']),
        'agreements': !exists(json, 'agreements') ? undefined : ((json['agreements'] as Array<any>).map(AgreementFromJSON)),
        'documents': !exists(json, 'documents') ? undefined : ((json['documents'] as Array<any>).map(ApplicationDocumentFromJSON)),
        'trustedContact': !exists(json, 'trusted_contact') ? undefined : TrustedContactFromJSON(json['trusted_contact']),
    };
}

export function AccountExtendedToJSON(value?: AccountExtended | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'account_number': value.accountNumber,
        'status': AccountStatusToJSON(value.status),
        'currency': value.currency,
        'created_at': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'last_equity': value.lastEquity,
        'kyc_results': KycResultToJSON(value.kycResults),
        'contact': ContactToJSON(value.contact),
        'identity': IdentityToJSON(value.identity),
        'disclosures': DisclosuresToJSON(value.disclosures),
        'agreements': value.agreements === undefined ? undefined : ((value.agreements as Array<any>).map(AgreementToJSON)),
        'documents': value.documents === undefined ? undefined : ((value.documents as Array<any>).map(ApplicationDocumentToJSON)),
        'trusted_contact': TrustedContactToJSON(value.trustedContact),
    };
}



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

import { RequestFile } from './models';

export class TransferResourceAllOf {
    'type': TransferResourceAllOf.TypeEnum;
    'status': TransferResourceAllOf.StatusEnum;
    'accountId': string;
    'reason'?: string | null;
    'expiresAt': Date;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "type",
            "baseName": "type",
            "type": "TransferResourceAllOf.TypeEnum"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "TransferResourceAllOf.StatusEnum"
        },
        {
            "name": "accountId",
            "baseName": "account_id",
            "type": "string"
        },
        {
            "name": "reason",
            "baseName": "reason",
            "type": "string"
        },
        {
            "name": "expiresAt",
            "baseName": "expires_at",
            "type": "Date"
        }    ];

    static getAttributeTypeMap() {
        return TransferResourceAllOf.attributeTypeMap;
    }
}

export namespace TransferResourceAllOf {
    export enum TypeEnum {
        Ach = <any> 'ach',
        Wire = <any> 'wire'
    }
    export enum StatusEnum {
        Queued = <any> 'QUEUED',
        Pending = <any> 'PENDING',
        Rejected = <any> 'REJECTED',
        Approved = <any> 'APPROVED',
        Complete = <any> 'COMPLETE'
    }
}
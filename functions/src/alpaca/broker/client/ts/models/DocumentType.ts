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

/**
 * - identity_verification:
 *   identity verification document
 * - address_verification:
 *   address verification document
 * - date_of_birth_verification:
 *   date of birth verification document
 * - tax_id_verification:
 *   tax ID verification document
 * - account_approval_letter:
 *   407 approval letter
 * - cip_result:
 *   initial CIP result
 * @export
 * @enum {string}
 */
export enum DocumentType {
    IdentityVerification = 'identity_verification',
    AddressVerification = 'address_verification',
    DateOfBirthVerification = 'date_of_birth_verification',
    TaxIdVerification = 'tax_id_verification',
    AccountApprovalLetter = 'account_approval_letter',
    CipResult = 'cip_result'
}

export function DocumentTypeFromJSON(json: any): DocumentType {
    return DocumentTypeFromJSONTyped(json, false);
}

export function DocumentTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): DocumentType {
    return json as DocumentType;
}

export function DocumentTypeToJSON(value?: DocumentType | null): any {
    return value as any;
}

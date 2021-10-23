/**
 * Alpaca Broker API
 * Open brokerage accounts, enable commission-free trading, and manage the ongoing user experience with Alpaca Broker API
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * - **SUBMITTED** The application has been submitted and in process. - **ACTION_REQUIRED** The application requires manual action. - **APPROVAL_PENDING** Initial value. The application approval process is in process. - **APPROVED** The account application has been approved, and waiting to be ACTIVE - **REJECTED** The account application is rejected for some reason - **ACTIVE** The account is fully active. Trading and funding are processed under this status. - **DISABLED** The account is disabled after ACTIVE status. - **ACCOUNT_CLOSED** The account is closed.
 */
export type AccountStatus =
  | "SUBMITTED"
  | "ACTION_REQUIRED"
  | "APPROVAL_PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "DISABLED"
  | "ACCOUNT_CLOSED"
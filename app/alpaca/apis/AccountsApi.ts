// TODO: better import syntax?
import { Configuration } from "../configuration"
import { HttpMethod, RequestContext, ResponseContext } from "../http/http"
import { Account } from "../models/Account"
import { AccountCreationObject } from "../models/AccountCreationObject"
import { AccountExtended } from "../models/AccountExtended"
import { AccountUpdate } from "../models/AccountUpdate"
import { ACHRelationshipData } from "../models/ACHRelationshipData"
import { ACHRelationshipResource } from "../models/ACHRelationshipResource"
import { ActivityItem } from "../models/ActivityItem"
import { BankData } from "../models/BankData"
import { BankResource } from "../models/BankResource"
import { DocumentUpload } from "../models/DocumentUpload"
import { InlineResponse200 } from "../models/InlineResponse200"
import { InlineResponse2004 } from "../models/InlineResponse2004"
import { ObjectSerializer } from "../models/ObjectSerializer"
import { TransferData } from "../models/TransferData"
import { TransferResource } from "../models/TransferResource"
import { isCodeInRange } from "../util"
import { BaseAPIRequestFactory, RequiredError } from "./baseapi"
import { ApiException } from "./exception"

/**
 * no description
 */
export class AccountsApiRequestFactory extends BaseAPIRequestFactory {
  /**
   * Upload a document to an already existing account
   * @param accountId Account identifier.
   * @param documentUpload
   */
  public async accountsAccountIdDocumentsUploadPost(
    accountId: string,
    documentUpload: DocumentUpload,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling accountsAccountIdDocumentsUploadPost."
      )
    }

    // verify required parameter 'documentUpload' is not null or undefined
    if (documentUpload === null || documentUpload === undefined) {
      throw new RequiredError(
        "Required parameter documentUpload was null or undefined when calling accountsAccountIdDocumentsUploadPost."
      )
    }

    // Path Params
    const localVarPath = "/accounts/{account_id}/documents/upload".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.POST
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    const contentType = ObjectSerializer.getPreferredMediaType(["application/json"])
    requestContext.setHeaderParam("Content-Type", contentType)
    const serializedBody = ObjectSerializer.stringify(
      ObjectSerializer.serialize(documentUpload, "DocumentUpload", ""),
      contentType
    )
    requestContext.setBody(serializedBody)

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Retrieve specific account activities
   * @param activityType
   * @param date
   * @param until
   * @param after
   * @param direction
   * @param accountId
   * @param pageSize
   * @param pageToken
   */
  public async accountsActivitiesActivityTypeGet(
    activityType:
      | "FILL"
      | "ACATC"
      | "ACATS"
      | "CSD"
      | "CSR"
      | "CSW"
      | "DIV"
      | "DIVCGL"
      | "DIVCGS"
      | "DIVNRA"
      | "DIVROC"
      | "DIVTXEX"
      | "INT"
      | "JNLC"
      | "JNLS"
      | "MA"
      | "NC"
      | "PTC"
      | "REORG"
      | "SSO"
      | "SSP",
    date?: string,
    until?: string,
    after?: string,
    direction?: "asc" | "desc",
    accountId?: string,
    pageSize?: number,
    pageToken?: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'activityType' is not null or undefined
    if (activityType === null || activityType === undefined) {
      throw new RequiredError(
        "Required parameter activityType was null or undefined when calling accountsActivitiesActivityTypeGet."
      )
    }

    // Path Params
    const localVarPath = "/accounts/activities/{activity_type}".replace(
      "{" + "activity_type" + "}",
      encodeURIComponent(String(activityType))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (date !== undefined) {
      requestContext.setQueryParam(
        "date",
        ObjectSerializer.serialize(date, "string", "")
      )
    }
    if (until !== undefined) {
      requestContext.setQueryParam(
        "until",
        ObjectSerializer.serialize(until, "string", "")
      )
    }
    if (after !== undefined) {
      requestContext.setQueryParam(
        "after",
        ObjectSerializer.serialize(after, "string", "")
      )
    }
    if (direction !== undefined) {
      requestContext.setQueryParam(
        "direction",
        ObjectSerializer.serialize(direction, "'asc' | 'desc'", "")
      )
    }
    if (accountId !== undefined) {
      requestContext.setQueryParam(
        "account_id",
        ObjectSerializer.serialize(accountId, "string", "uuid")
      )
    }
    if (pageSize !== undefined) {
      requestContext.setQueryParam(
        "page_size",
        ObjectSerializer.serialize(pageSize, "number", "")
      )
    }
    if (pageToken !== undefined) {
      requestContext.setQueryParam(
        "page_token",
        ObjectSerializer.serialize(pageToken, "string", "")
      )
    }

    // Header Params

    // Form Params

    // Body Params

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Retrieve account activities
   * @param date
   * @param until
   * @param after
   * @param direction
   * @param accountId
   * @param pageSize
   * @param pageToken
   */
  public async accountsActivitiesGet(
    date?: string,
    until?: string,
    after?: string,
    direction?: "asc" | "desc",
    accountId?: string,
    pageSize?: number,
    pageToken?: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // Path Params
    const localVarPath = "/accounts/activities"

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (date !== undefined) {
      requestContext.setQueryParam(
        "date",
        ObjectSerializer.serialize(date, "string", "")
      )
    }
    if (until !== undefined) {
      requestContext.setQueryParam(
        "until",
        ObjectSerializer.serialize(until, "string", "")
      )
    }
    if (after !== undefined) {
      requestContext.setQueryParam(
        "after",
        ObjectSerializer.serialize(after, "string", "")
      )
    }
    if (direction !== undefined) {
      requestContext.setQueryParam(
        "direction",
        ObjectSerializer.serialize(direction, "'asc' | 'desc'", "")
      )
    }
    if (accountId !== undefined) {
      requestContext.setQueryParam(
        "account_id",
        ObjectSerializer.serialize(accountId, "string", "uuid")
      )
    }
    if (pageSize !== undefined) {
      requestContext.setQueryParam(
        "page_size",
        ObjectSerializer.serialize(pageSize, "number", "")
      )
    }
    if (pageToken !== undefined) {
      requestContext.setQueryParam(
        "page_token",
        ObjectSerializer.serialize(pageToken, "string", "")
      )
    }

    // Header Params

    // Form Params

    // Body Params

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Retrieve all accounts
   * @param query The query supports partial match of account number, names, emails, etc.. Items can be space delimited.
   */
  public async accountsGet(
    query?: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // Path Params
    const localVarPath = "/accounts"

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (query !== undefined) {
      requestContext.setQueryParam(
        "query",
        ObjectSerializer.serialize(query, "string", "")
      )
    }

    // Header Params

    // Form Params

    // Body Params

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Create an account
   * @param accountCreationObject
   */
  public async accountsPost(
    accountCreationObject: AccountCreationObject,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountCreationObject' is not null or undefined
    if (accountCreationObject === null || accountCreationObject === undefined) {
      throw new RequiredError(
        "Required parameter accountCreationObject was null or undefined when calling accountsPost."
      )
    }

    // Path Params
    const localVarPath = "/accounts"

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.POST
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    const contentType = ObjectSerializer.getPreferredMediaType(["application/json"])
    requestContext.setHeaderParam("Content-Type", contentType)
    const serializedBody = ObjectSerializer.stringify(
      ObjectSerializer.serialize(accountCreationObject, "AccountCreationObject", ""),
      contentType
    )
    requestContext.setBody(serializedBody)

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Request to close an account
   * @param accountId Account identifier.
   */
  public async deleteAccount(
    accountId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling deleteAccount."
      )
    }

    // Path Params
    const localVarPath = "/accounts/{account_id}".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.DELETE
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Delete an existing ACH relationship
   * @param accountId Account identifier.
   * @param achRelationshipId ACH relationship identifier
   */
  public async deleteAchRelationship(
    accountId: string,
    achRelationshipId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling deleteAchRelationship."
      )
    }

    // verify required parameter 'achRelationshipId' is not null or undefined
    if (achRelationshipId === null || achRelationshipId === undefined) {
      throw new RequiredError(
        "Required parameter achRelationshipId was null or undefined when calling deleteAchRelationship."
      )
    }

    // Path Params
    const localVarPath =
      "/accounts/{account_id}/ach_relationships/{ach_relationship_id}"
        .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
        .replace(
          "{" + "ach_relationship_id" + "}",
          encodeURIComponent(String(achRelationshipId))
        )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.DELETE
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Delete a Bank Relationship for an account
   * @param accountId Account identifier.
   * @param bankId
   */
  public async deleteRecipientBank(
    accountId: string,
    bankId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling deleteRecipientBank."
      )
    }

    // verify required parameter 'bankId' is not null or undefined
    if (bankId === null || bankId === undefined) {
      throw new RequiredError(
        "Required parameter bankId was null or undefined when calling deleteRecipientBank."
      )
    }

    // Path Params
    const localVarPath = "/accounts/{account_id}/recipient_banks/{bank_id}"
      .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
      .replace("{" + "bank_id" + "}", encodeURIComponent(String(bankId)))

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.DELETE
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Request to close a transfer
   * @param accountId
   * @param transferId
   */
  public async deleteTransfer(
    accountId: string,
    transferId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling deleteTransfer."
      )
    }

    // verify required parameter 'transferId' is not null or undefined
    if (transferId === null || transferId === undefined) {
      throw new RequiredError(
        "Required parameter transferId was null or undefined when calling deleteTransfer."
      )
    }

    // Path Params
    const localVarPath = "/accounts/{account_id}/transfers/{transfer_id}"
      .replace("{" + "account_id" + "}", encodeURIComponent(String(accountId)))
      .replace("{" + "transfer_id" + "}", encodeURIComponent(String(transferId)))

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.DELETE
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
   * Subscribe to account status events (SSE).
   * @param since
   * @param until
   * @param sinceId
   * @param untilId
   */
  public async eventsAccountsStatusGet(
    since?: Date,
    until?: Date,
    sinceId?: number,
    untilId?: number,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // Path Params
    const localVarPath = "/events/accounts/status"

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (since !== undefined) {
      requestContext.setQueryParam(
        "since",
        ObjectSerializer.serialize(since, "Date", "date-time")
      )
    }
    if (until !== undefined) {
      requestContext.setQueryParam(
        "until",
        ObjectSerializer.serialize(until, "Date", "date-time")
      )
    }
    if (sinceId !== undefined) {
      requestContext.setQueryParam(
        "since_id",
        ObjectSerializer.serialize(sinceId, "number", "")
      )
    }
    if (untilId !== undefined) {
      requestContext.setQueryParam(
        "until_id",
        ObjectSerializer.serialize(untilId, "number", "")
      )
    }

    // Header Params

    // Form Params

    // Body Params

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * The response is an Account model.
   * Retrieve an account.
   * @param accountId Account identifier.
   */
  public async getAccount(
    accountId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling getAccount."
      )
    }

    // Path Params
    const localVarPath = "/accounts/{account_id}".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Retrieve ACH Relationships for an account
   * @param accountId Account identifier.
   * @param statuses Comma-separated status values
   */
  public async getAchRelationships(
    accountId: string,
    statuses?: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling getAchRelationships."
      )
    }

    // Path Params
    const localVarPath = "/accounts/{account_id}/ach_relationships".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (statuses !== undefined) {
      requestContext.setQueryParam(
        "statuses",
        ObjectSerializer.serialize(statuses, "string", "")
      )
    }

    // Header Params

    // Form Params

    // Body Params

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Retrieve bank relationships for an account
   * @param accountId
   * @param status
   * @param bankName
   */
  public async getRecipientBanks(
    accountId: string,
    status?: string,
    bankName?: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling getRecipientBanks."
      )
    }

    // Path Params
    const localVarPath = "/accounts/{account_id}/recipient_banks".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (status !== undefined) {
      requestContext.setQueryParam(
        "status",
        ObjectSerializer.serialize(status, "string", "")
      )
    }
    if (bankName !== undefined) {
      requestContext.setQueryParam(
        "bank_name",
        ObjectSerializer.serialize(bankName, "string", "")
      )
    }

    // Header Params

    // Form Params

    // Body Params

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * The response is a Trading Account model.
   * Retrieve trading details for an account.
   * @param accountId Account identifier.
   */
  public async getTradingAccount(
    accountId: string,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling getTradingAccount."
      )
    }

    // Path Params
    const localVarPath = "/trading/accounts/{account_id}/account".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * You can filter requested transfers by values such as direction and status.
   * Return a list of transfers for an account.
   * @param accountId
   * @param direction
   * @param limit
   * @param offset
   */
  public async getTransfers(
    accountId: string,
    direction?: "INCOMING" | "OUTGOING",
    limit?: number,
    offset?: number,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling getTransfers."
      )
    }

    // Path Params
    const localVarPath = "/accounts/{account_id}/transfers".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (direction !== undefined) {
      requestContext.setQueryParam(
        "direction",
        ObjectSerializer.serialize(direction, "'INCOMING' | 'OUTGOING'", "")
      )
    }
    if (limit !== undefined) {
      requestContext.setQueryParam(
        "limit",
        ObjectSerializer.serialize(limit, "number", "int32")
      )
    }
    if (offset !== undefined) {
      requestContext.setQueryParam(
        "offset",
        ObjectSerializer.serialize(offset, "number", "int32")
      )
    }

    // Header Params

    // Form Params

    // Body Params

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Update an account
   * @param accountId Account identifier.
   * @param accountUpdate
   */
  public async patchAccount(
    accountId: string,
    accountUpdate: AccountUpdate,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling patchAccount."
      )
    }

    // verify required parameter 'accountUpdate' is not null or undefined
    if (accountUpdate === null || accountUpdate === undefined) {
      throw new RequiredError(
        "Required parameter accountUpdate was null or undefined when calling patchAccount."
      )
    }

    // Path Params
    //console.log("_______" ,  accountId)
    const localVarPath = "/accounts/{account_id}".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.PATCH
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    const contentType = ObjectSerializer.getPreferredMediaType(["application/json"])
    requestContext.setHeaderParam("Content-Type", contentType)
    const serializedBody = ObjectSerializer.stringify(
      ObjectSerializer.serialize(accountUpdate, "AccountUpdate", ""),
      contentType
    )
    requestContext.setBody(serializedBody)

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Create an ACH Relationship
   * @param accountId Account identifier.
   * @param aCHRelationshipData
   */
  public async postAchRelationships(
    accountId: string,
    aCHRelationshipData: ACHRelationshipData,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling postAchRelationships."
      )
    }

    // verify required parameter 'aCHRelationshipData' is not null or undefined
    if (aCHRelationshipData === null || aCHRelationshipData === undefined) {
      throw new RequiredError(
        "Required parameter aCHRelationshipData was null or undefined when calling postAchRelationships."
      )
    }

    // Path Params
    const localVarPath = "/accounts/{account_id}/ach_relationships".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.POST
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    const contentType = ObjectSerializer.getPreferredMediaType(["application/json"])
    requestContext.setHeaderParam("Content-Type", contentType)
    const serializedBody = ObjectSerializer.stringify(
      ObjectSerializer.serialize(aCHRelationshipData, "ACHRelationshipData", ""),
      contentType
    )
    requestContext.setBody(serializedBody)

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * Create a Bank Relationship for an account
   * @param accountId Account identifier.
   * @param bankData
   */
  public async postRecipientBanks(
    accountId: string,
    bankData: BankData,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling postRecipientBanks."
      )
    }

    // verify required parameter 'bankData' is not null or undefined
    if (bankData === null || bankData === undefined) {
      throw new RequiredError(
        "Required parameter bankData was null or undefined when calling postRecipientBanks."
      )
    }

    // Path Params
    const localVarPath = "/accounts/{account_id}/recipient_banks".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.POST
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    const contentType = ObjectSerializer.getPreferredMediaType(["application/json"])
    requestContext.setHeaderParam("Content-Type", contentType)
    const serializedBody = ObjectSerializer.stringify(
      ObjectSerializer.serialize(bankData, "BankData", ""),
      contentType
    )
    requestContext.setBody(serializedBody)

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }

  /**
   * This operation allows you to fund an account with virtual money in the sandbox environment.
   * Request a new transfer
   * @param accountId
   * @param transferData
   */
  public async postTransfers(
    accountId: string,
    transferData: TransferData,
    options?: Configuration
  ): Promise<RequestContext> {
    let config = options || this.configuration

    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new RequiredError(
        "Required parameter accountId was null or undefined when calling postTransfers."
      )
    }

    // verify required parameter 'transferData' is not null or undefined
    if (transferData === null || transferData === undefined) {
      throw new RequiredError(
        "Required parameter transferData was null or undefined when calling postTransfers."
      )
    }

    // Path Params
    const localVarPath = "/accounts/{account_id}/transfers".replace(
      "{" + "account_id" + "}",
      encodeURIComponent(String(accountId))
    )

    // Make Request Context
    const requestContext = config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.POST
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    const contentType = ObjectSerializer.getPreferredMediaType(["application/json"])
    requestContext.setHeaderParam("Content-Type", contentType)
    const serializedBody = ObjectSerializer.stringify(
      ObjectSerializer.serialize(transferData, "TransferData", ""),
      contentType
    )
    requestContext.setBody(serializedBody)

    let authMethod = null
    // Apply auth methods
    authMethod = config.authMethods["BasicAuth"]
    if (authMethod) {
      await authMethod.applySecurityAuthentication(requestContext)
    }

    return requestContext
  }
}

export class AccountsApiResponseProcessor {
  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to accountsAccountIdDocumentsUploadPost
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async accountsAccountIdDocumentsUploadPost(
    response: ResponseContext
  ): Promise<void> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("204", response.httpStatusCode)) {
      return
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(400, body)
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(404, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: void = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "void",
        ""
      ) as void
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to accountsActivitiesActivityTypeGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async accountsActivitiesActivityTypeGet(
    response: ResponseContext
  ): Promise<Array<ActivityItem>> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Array<ActivityItem> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<ActivityItem>",
        ""
      ) as Array<ActivityItem>
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Array<ActivityItem> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<ActivityItem>",
        ""
      ) as Array<ActivityItem>
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to accountsActivitiesGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async accountsActivitiesGet(
    response: ResponseContext
  ): Promise<Array<ActivityItem>> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Array<ActivityItem> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<ActivityItem>",
        ""
      ) as Array<ActivityItem>
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Array<ActivityItem> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<ActivityItem>",
        ""
      ) as Array<ActivityItem>
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to accountsGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async accountsGet(response: ResponseContext): Promise<Array<Account>> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Array<Account> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<Account>",
        ""
      ) as Array<Account>
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Array<Account> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<Account>",
        ""
      ) as Array<Account>
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to accountsPost
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async accountsPost(response: ResponseContext): Promise<Account> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Account = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Account",
        ""
      ) as Account
      return body
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(400, body)
    }
    if (isCodeInRange("422", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(422, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Account = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Account",
        ""
      ) as Account
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to deleteAccount
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async deleteAccount(response: ResponseContext): Promise<void> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("204", response.httpStatusCode)) {
      return
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: void = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "void",
        ""
      ) as void
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to deleteAchRelationship
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async deleteAchRelationship(response: ResponseContext): Promise<void> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("204", response.httpStatusCode)) {
      return
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(404, body)
    }
    if (isCodeInRange("422", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(422, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: void = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "void",
        ""
      ) as void
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to deleteRecipientBank
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async deleteRecipientBank(response: ResponseContext): Promise<void> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("204", response.httpStatusCode)) {
      return
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      throw new ApiException<string>(response.httpStatusCode, "Bad Request")
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      throw new ApiException<string>(response.httpStatusCode, "Bank Not Found")
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: void = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "void",
        ""
      ) as void
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to deleteTransfer
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async deleteTransfer(response: ResponseContext): Promise<void> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("204", response.httpStatusCode)) {
      return
    }
    if (isCodeInRange("404", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(404, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: void = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "void",
        ""
      ) as void
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to eventsAccountsStatusGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async eventsAccountsStatusGet(
    response: ResponseContext
  ): Promise<InlineResponse2004> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: InlineResponse2004 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2004",
        ""
      ) as InlineResponse2004
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: InlineResponse2004 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse2004",
        ""
      ) as InlineResponse2004
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to getAccount
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async getAccount(response: ResponseContext): Promise<AccountExtended> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: AccountExtended = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "AccountExtended",
        ""
      ) as AccountExtended
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: AccountExtended = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "AccountExtended",
        ""
      ) as AccountExtended
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to getAchRelationships
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async getAchRelationships(
    response: ResponseContext
  ): Promise<Array<ACHRelationshipResource>> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Array<ACHRelationshipResource> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<ACHRelationshipResource>",
        ""
      ) as Array<ACHRelationshipResource>
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Array<ACHRelationshipResource> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<ACHRelationshipResource>",
        ""
      ) as Array<ACHRelationshipResource>
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to getRecipientBanks
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async getRecipientBanks(
    response: ResponseContext
  ): Promise<Array<BankResource>> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Array<BankResource> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<BankResource>",
        ""
      ) as Array<BankResource>
      return body
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      throw new ApiException<string>(
        response.httpStatusCode,
        "Bad request. The body in the request is not valid."
      )
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Array<BankResource> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<BankResource>",
        ""
      ) as Array<BankResource>
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to getTradingAccount
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async getTradingAccount(
    response: ResponseContext
  ): Promise<InlineResponse200> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: InlineResponse200 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse200",
        ""
      ) as InlineResponse200
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: InlineResponse200 = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "InlineResponse200",
        ""
      ) as InlineResponse200
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to getTransfers
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async getTransfers(
    response: ResponseContext
  ): Promise<Array<TransferResource>> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Array<TransferResource> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<TransferResource>",
        ""
      ) as Array<TransferResource>
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Array<TransferResource> = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Array<TransferResource>",
        ""
      ) as Array<TransferResource>
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to patchAccount
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async patchAccount(response: ResponseContext): Promise<Account> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: Account = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Account",
        ""
      ) as Account
      return body
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(400, body)
    }
    if (isCodeInRange("422", response.httpStatusCode)) {
      const body: string = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "string",
        ""
      ) as string
      throw new ApiException<string>(422, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: Account = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Account",
        ""
      ) as Account
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to postAchRelationships
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async postAchRelationships(
    response: ResponseContext
  ): Promise<ACHRelationshipResource> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: ACHRelationshipResource = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "ACHRelationshipResource",
        ""
      ) as ACHRelationshipResource
      return body
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(400, body)
    }
    if (isCodeInRange("401", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(401, body)
    }
    if (isCodeInRange("403", response.httpStatusCode)) {
      const body: Error = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "Error",
        ""
      ) as Error
      throw new ApiException<Error>(403, body)
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: ACHRelationshipResource = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "ACHRelationshipResource",
        ""
      ) as ACHRelationshipResource
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to postRecipientBanks
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async postRecipientBanks(response: ResponseContext): Promise<BankResource> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: BankResource = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "BankResource",
        ""
      ) as BankResource
      return body
    }
    if (isCodeInRange("400", response.httpStatusCode)) {
      throw new ApiException<string>(response.httpStatusCode, "Bad Request")
    }
    if (isCodeInRange("409", response.httpStatusCode)) {
      throw new ApiException<string>(response.httpStatusCode, "Conflict")
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: BankResource = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "BankResource",
        ""
      ) as BankResource
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to postTransfers
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async postTransfers(response: ResponseContext): Promise<TransferResource> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"]
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: TransferResource = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "TransferResource",
        ""
      ) as TransferResource
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: TransferResource = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "TransferResource",
        ""
      ) as TransferResource
      return body
    }

    let body = (await response.body.text()) || ""
    throw new ApiException<string>(
      response.httpStatusCode,
      'Unknown API Status Code!\nBody: "' + body + '"'
    )
  }
}

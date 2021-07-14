import {
  AccountsApiRequestFactory,
  AccountsApiResponseProcessor,
} from "../apis/AccountsApi"
import { AssetsApiRequestFactory, AssetsApiResponseProcessor } from "../apis/AssetsApi"
import {
  CalendarApiRequestFactory,
  CalendarApiResponseProcessor,
} from "../apis/CalendarApi"
import { ClockApiRequestFactory, ClockApiResponseProcessor } from "../apis/ClockApi"
import {
  DocumentsApiRequestFactory,
  DocumentsApiResponseProcessor,
} from "../apis/DocumentsApi"
import { EventsApiRequestFactory, EventsApiResponseProcessor } from "../apis/EventsApi"
import {
  FundingApiRequestFactory,
  FundingApiResponseProcessor,
} from "../apis/FundingApi"
import {
  JournalsApiRequestFactory,
  JournalsApiResponseProcessor,
} from "../apis/JournalsApi"
import { OAuthApiRequestFactory, OAuthApiResponseProcessor } from "../apis/OAuthApi"
import {
  TradingApiRequestFactory,
  TradingApiResponseProcessor,
} from "../apis/TradingApi"
import { Configuration } from "../configuration"
import { Account } from "../models/Account"
import { AccountCreationObject } from "../models/AccountCreationObject"
import { AccountExtended } from "../models/AccountExtended"
import { AccountUpdate } from "../models/AccountUpdate"
import { ACHRelationshipData } from "../models/ACHRelationshipData"
import { ACHRelationshipResource } from "../models/ACHRelationshipResource"
import { ActivityItem } from "../models/ActivityItem"
import { AssetResource } from "../models/AssetResource"
import { BankData } from "../models/BankData"
import { BankResource } from "../models/BankResource"
import { BatchJournalRequest } from "../models/BatchJournalRequest"
import { BatchJournalResponse } from "../models/BatchJournalResponse"
import { CreateOrder } from "../models/CreateOrder"
import { DocumentUpload } from "../models/DocumentUpload"
import { InlineObject } from "../models/InlineObject"
import { InlineObject1 } from "../models/InlineObject1"
import { InlineResponse200 } from "../models/InlineResponse200"
import { InlineResponse2001 } from "../models/InlineResponse2001"
import { InlineResponse2002 } from "../models/InlineResponse2002"
import { InlineResponse2003 } from "../models/InlineResponse2003"
import { InlineResponse2004 } from "../models/InlineResponse2004"
import { InlineResponse2005 } from "../models/InlineResponse2005"
import { InlineResponse2006 } from "../models/InlineResponse2006"
import { InlineResponse2007 } from "../models/InlineResponse2007"
import { InlineResponse2008 } from "../models/InlineResponse2008"
import { InlineResponse207 } from "../models/InlineResponse207"
import { JournalData } from "../models/JournalData"
import { JournalResource } from "../models/JournalResource"
import { OrderObject } from "../models/OrderObject"
import { PatchOrder } from "../models/PatchOrder"
import { Position } from "../models/Position"
import { TransferData } from "../models/TransferData"
import { TransferResource } from "../models/TransferResource"
import {
  ObservableAccountsApi,
  ObservableAssetsApi,
  ObservableCalendarApi,
  ObservableClockApi,
  ObservableDocumentsApi,
  ObservableEventsApi,
  ObservableFundingApi,
  ObservableJournalsApi,
  ObservableOAuthApi,
  ObservableTradingApi,
} from "./ObservableAPI"

export class PromiseAccountsApi {
  private api: ObservableAccountsApi

  public constructor(
    configuration: Configuration,
    requestFactory?: AccountsApiRequestFactory,
    responseProcessor?: AccountsApiResponseProcessor
  ) {
    this.api = new ObservableAccountsApi(
      configuration,
      requestFactory,
      responseProcessor
    )
  }

  /**
   * Upload a document to an already existing account
   * @param accountId Account identifier.
   * @param documentUpload
   */
  public accountsAccountIdDocumentsUploadPost(
    accountId: string,
    documentUpload: DocumentUpload,
    options?: Configuration
  ): Promise<void> {
    const result = this.api.accountsAccountIdDocumentsUploadPost(
      accountId,
      documentUpload,
      options
    )
    return result.toPromise()
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
  public accountsActivitiesActivityTypeGet(
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
  ): Promise<Array<ActivityItem>> {
    const result = this.api.accountsActivitiesActivityTypeGet(
      activityType,
      date,
      until,
      after,
      direction,
      accountId,
      pageSize,
      pageToken,
      options
    )
    return result.toPromise()
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
  public accountsActivitiesGet(
    date?: string,
    until?: string,
    after?: string,
    direction?: "asc" | "desc",
    accountId?: string,
    pageSize?: number,
    pageToken?: string,
    options?: Configuration
  ): Promise<Array<ActivityItem>> {
    const result = this.api.accountsActivitiesGet(
      date,
      until,
      after,
      direction,
      accountId,
      pageSize,
      pageToken,
      options
    )
    return result.toPromise()
  }

  /**
   * Retrieve all accounts
   * @param query The query supports partial match of account number, names, emails, etc.. Items can be space delimited.
   */
  public accountsGet(query?: string, options?: Configuration): Promise<Array<Account>> {
    const result = this.api.accountsGet(query, options)
    return result.toPromise()
  }

  /**
   * Create an account
   * @param accountCreationObject
   */
  public accountsPost(
    accountCreationObject: AccountCreationObject,
    options?: Configuration
  ): Promise<Account> {
    const result = this.api.accountsPost(accountCreationObject, options)
    return result.toPromise()
  }

  /**
   * Request to close an account
   * @param accountId Account identifier.
   */
  public deleteAccount(accountId: string, options?: Configuration): Promise<void> {
    const result = this.api.deleteAccount(accountId, options)
    return result.toPromise()
  }

  /**
   * Delete an existing ACH relationship
   * @param accountId Account identifier.
   * @param achRelationshipId ACH relationship identifier
   */
  public deleteAchRelationship(
    accountId: string,
    achRelationshipId: string,
    options?: Configuration
  ): Promise<void> {
    const result = this.api.deleteAchRelationship(accountId, achRelationshipId, options)
    return result.toPromise()
  }

  /**
   * Delete a Bank Relationship for an account
   * @param accountId Account identifier.
   * @param bankId
   */
  public deleteRecipientBank(
    accountId: string,
    bankId: string,
    options?: Configuration
  ): Promise<void> {
    const result = this.api.deleteRecipientBank(accountId, bankId, options)
    return result.toPromise()
  }

  /**
   * Request to close a transfer
   * @param accountId
   * @param transferId
   */
  public deleteTransfer(
    accountId: string,
    transferId: string,
    options?: Configuration
  ): Promise<void> {
    const result = this.api.deleteTransfer(accountId, transferId, options)
    return result.toPromise()
  }

  /**
   * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
   * Subscribe to account status events (SSE).
   * @param since
   * @param until
   * @param sinceId
   * @param untilId
   */
  public eventsAccountsStatusGet(
    since?: Date,
    until?: Date,
    sinceId?: number,
    untilId?: number,
    options?: Configuration
  ): Promise<InlineResponse2004> {
    const result = this.api.eventsAccountsStatusGet(
      since,
      until,
      sinceId,
      untilId,
      options
    )
    return result.toPromise()
  }

  /**
   * The response is an Account model.
   * Retrieve an account.
   * @param accountId Account identifier.
   */
  public getAccount(
    accountId: string,
    options?: Configuration
  ): Promise<AccountExtended> {
    const result = this.api.getAccount(accountId, options)
    return result.toPromise()
  }

  /**
   * Retrieve ACH Relationships for an account
   * @param accountId Account identifier.
   * @param statuses Comma-separated status values
   */
  public getAchRelationships(
    accountId: string,
    statuses?: string,
    options?: Configuration
  ): Promise<Array<ACHRelationshipResource>> {
    const result = this.api.getAchRelationships(accountId, statuses, options)
    return result.toPromise()
  }

  /**
   * Retrieve bank relationships for an account
   * @param accountId
   * @param status
   * @param bankName
   */
  public getRecipientBanks(
    accountId: string,
    status?: string,
    bankName?: string,
    options?: Configuration
  ): Promise<Array<BankResource>> {
    const result = this.api.getRecipientBanks(accountId, status, bankName, options)
    return result.toPromise()
  }

  /**
   * The response is a Trading Account model.
   * Retrieve trading details for an account.
   * @param accountId Account identifier.
   */
  public getTradingAccount(
    accountId: string,
    options?: Configuration
  ): Promise<InlineResponse200> {
    const result = this.api.getTradingAccount(accountId, options)
    return result.toPromise()
  }

  /**
   * You can filter requested transfers by values such as direction and status.
   * Return a list of transfers for an account.
   * @param accountId
   * @param direction
   * @param limit
   * @param offset
   */
  public getTransfers(
    accountId: string,
    direction?: "INCOMING" | "OUTGOING",
    limit?: number,
    offset?: number,
    options?: Configuration
  ): Promise<Array<TransferResource>> {
    const result = this.api.getTransfers(accountId, direction, limit, offset, options)
    return result.toPromise()
  }

  /**
   * Update an account
   * @param accountId Account identifier.
   * @param accountUpdate
   */
  public patchAccount(
    accountId: string,
    accountUpdate: AccountUpdate,
    options?: Configuration
  ): Promise<Account> {
    const result = this.api.patchAccount(accountId, accountUpdate, options)
    return result.toPromise()
  }

  /**
   * Create an ACH Relationship
   * @param accountId Account identifier.
   * @param aCHRelationshipData
   */
  public postAchRelationships(
    accountId: string,
    aCHRelationshipData: ACHRelationshipData,
    options?: Configuration
  ): Promise<ACHRelationshipResource> {
    const result = this.api.postAchRelationships(
      accountId,
      aCHRelationshipData,
      options
    )
    return result.toPromise()
  }

  /**
   * Create a Bank Relationship for an account
   * @param accountId Account identifier.
   * @param bankData
   */
  public postRecipientBanks(
    accountId: string,
    bankData: BankData,
    options?: Configuration
  ): Promise<BankResource> {
    const result = this.api.postRecipientBanks(accountId, bankData, options)
    return result.toPromise()
  }

  /**
   * This operation allows you to fund an account with virtual money in the sandbox environment.
   * Request a new transfer
   * @param accountId
   * @param transferData
   */
  public postTransfers(
    accountId: string,
    transferData: TransferData,
    options?: Configuration
  ): Promise<TransferResource> {
    const result = this.api.postTransfers(accountId, transferData, options)
    return result.toPromise()
  }
}

export class PromiseAssetsApi {
  private api: ObservableAssetsApi

  public constructor(
    configuration: Configuration,
    requestFactory?: AssetsApiRequestFactory,
    responseProcessor?: AssetsApiResponseProcessor
  ) {
    this.api = new ObservableAssetsApi(configuration, requestFactory, responseProcessor)
  }

  /**
   * Returns the requested asset, if found
   * Retrieve an asset by UUID
   * @param assetId The UUID of the required asset
   */
  public assetsAssetIdGet(
    assetId: string,
    options?: Configuration
  ): Promise<AssetResource> {
    const result = this.api.assetsAssetIdGet(assetId, options)
    return result.toPromise()
  }

  /**
   * Returns the requested asset, if found
   * Retrieve an asset by symbol
   * @param symbol The symbol of the required asset
   */
  public assetsSymbolGet(
    symbol: string,
    options?: Configuration
  ): Promise<AssetResource> {
    const result = this.api.assetsSymbolGet(symbol, options)
    return result.toPromise()
  }

  /**
   * Returns all assets
   * Retrieve all assets
   */
  public getAssets(options?: Configuration): Promise<Array<AssetResource>> {
    const result = this.api.getAssets(options)
    return result.toPromise()
  }
}

export class PromiseCalendarApi {
  private api: ObservableCalendarApi

  public constructor(
    configuration: Configuration,
    requestFactory?: CalendarApiRequestFactory,
    responseProcessor?: CalendarApiResponseProcessor
  ) {
    this.api = new ObservableCalendarApi(
      configuration,
      requestFactory,
      responseProcessor
    )
  }

  /**
   * Query market calendar
   * @param start The first date to retrieve data for. (Inclusive)
   * @param end The last date to retrieve data for. (Inclusive)
   */
  public calendarGet(
    start?: string,
    end?: string,
    options?: Configuration
  ): Promise<InlineResponse2001> {
    const result = this.api.calendarGet(start, end, options)
    return result.toPromise()
  }
}

export class PromiseClockApi {
  private api: ObservableClockApi

  public constructor(
    configuration: Configuration,
    requestFactory?: ClockApiRequestFactory,
    responseProcessor?: ClockApiResponseProcessor
  ) {
    this.api = new ObservableClockApi(configuration, requestFactory, responseProcessor)
  }

  /**
   * Query market clock
   */
  public clockGet(options?: Configuration): Promise<InlineResponse2002> {
    const result = this.api.clockGet(options)
    return result.toPromise()
  }
}

export class PromiseDocumentsApi {
  private api: ObservableDocumentsApi

  public constructor(
    configuration: Configuration,
    requestFactory?: DocumentsApiRequestFactory,
    responseProcessor?: DocumentsApiResponseProcessor
  ) {
    this.api = new ObservableDocumentsApi(
      configuration,
      requestFactory,
      responseProcessor
    )
  }

  /**
   * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
   * Download a document file that belongs to an account.
   * @param accountId Account identifier.
   * @param documentId
   */
  public accountsAccountIdDocumentsDocumentIdDownloadGet(
    accountId: string,
    documentId: string,
    options?: Configuration
  ): Promise<void> {
    const result = this.api.accountsAccountIdDocumentsDocumentIdDownloadGet(
      accountId,
      documentId,
      options
    )
    return result.toPromise()
  }

  /**
   * You can query account documents such as monthly  statements and trade confirms under an account.
   * Return a list of account documents.
   * @param accountId Account identifier.
   * @param startDate optional date value to filter the list (inclusive).
   * @param endDate optional date value to filter the list (inclusive).
   */
  public accountsAccountIdDocumentsGet(
    accountId: string,
    startDate?: string,
    endDate?: string,
    options?: Configuration
  ): Promise<Array<InlineResponse2003>> {
    const result = this.api.accountsAccountIdDocumentsGet(
      accountId,
      startDate,
      endDate,
      options
    )
    return result.toPromise()
  }

  /**
   * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
   * Download a document file directly
   * @param documentId
   */
  public documentsDocumentIdGet(
    documentId: string,
    options?: Configuration
  ): Promise<void> {
    const result = this.api.documentsDocumentIdGet(documentId, options)
    return result.toPromise()
  }
}

export class PromiseEventsApi {
  private api: ObservableEventsApi

  public constructor(
    configuration: Configuration,
    requestFactory?: EventsApiRequestFactory,
    responseProcessor?: EventsApiResponseProcessor
  ) {
    this.api = new ObservableEventsApi(configuration, requestFactory, responseProcessor)
  }

  /**
   * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
   * Subscribe to account status events (SSE).
   * @param since
   * @param until
   * @param sinceId
   * @param untilId
   */
  public eventsAccountsStatusGet(
    since?: Date,
    until?: Date,
    sinceId?: number,
    untilId?: number,
    options?: Configuration
  ): Promise<InlineResponse2004> {
    const result = this.api.eventsAccountsStatusGet(
      since,
      until,
      sinceId,
      untilId,
      options
    )
    return result.toPromise()
  }

  /**
   * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
   * Subscribe to journal events (SSE).
   * @param since
   * @param until
   * @param sinceId
   * @param untilId
   */
  public eventsJournalsStatusGet(
    since?: Date,
    until?: Date,
    sinceId?: number,
    untilId?: number,
    options?: Configuration
  ): Promise<InlineResponse2005> {
    const result = this.api.eventsJournalsStatusGet(
      since,
      until,
      sinceId,
      untilId,
      options
    )
    return result.toPromise()
  }
}

export class PromiseFundingApi {
  private api: ObservableFundingApi

  public constructor(
    configuration: Configuration,
    requestFactory?: FundingApiRequestFactory,
    responseProcessor?: FundingApiResponseProcessor
  ) {
    this.api = new ObservableFundingApi(
      configuration,
      requestFactory,
      responseProcessor
    )
  }

  /**
   * Delete an existing ACH relationship
   * @param accountId Account identifier.
   * @param achRelationshipId ACH relationship identifier
   */
  public deleteAchRelationship(
    accountId: string,
    achRelationshipId: string,
    options?: Configuration
  ): Promise<void> {
    const result = this.api.deleteAchRelationship(accountId, achRelationshipId, options)
    return result.toPromise()
  }

  /**
   * Delete a Bank Relationship for an account
   * @param accountId Account identifier.
   * @param bankId
   */
  public deleteRecipientBank(
    accountId: string,
    bankId: string,
    options?: Configuration
  ): Promise<void> {
    const result = this.api.deleteRecipientBank(accountId, bankId, options)
    return result.toPromise()
  }

  /**
   * Request to close a transfer
   * @param accountId
   * @param transferId
   */
  public deleteTransfer(
    accountId: string,
    transferId: string,
    options?: Configuration
  ): Promise<void> {
    const result = this.api.deleteTransfer(accountId, transferId, options)
    return result.toPromise()
  }

  /**
   * Retrieve ACH Relationships for an account
   * @param accountId Account identifier.
   * @param statuses Comma-separated status values
   */
  public getAchRelationships(
    accountId: string,
    statuses?: string,
    options?: Configuration
  ): Promise<Array<ACHRelationshipResource>> {
    const result = this.api.getAchRelationships(accountId, statuses, options)
    return result.toPromise()
  }

  /**
   * Retrieve bank relationships for an account
   * @param accountId
   * @param status
   * @param bankName
   */
  public getRecipientBanks(
    accountId: string,
    status?: string,
    bankName?: string,
    options?: Configuration
  ): Promise<Array<BankResource>> {
    const result = this.api.getRecipientBanks(accountId, status, bankName, options)
    return result.toPromise()
  }

  /**
   * You can filter requested transfers by values such as direction and status.
   * Return a list of transfers for an account.
   * @param accountId
   * @param direction
   * @param limit
   * @param offset
   */
  public getTransfers(
    accountId: string,
    direction?: "INCOMING" | "OUTGOING",
    limit?: number,
    offset?: number,
    options?: Configuration
  ): Promise<Array<TransferResource>> {
    const result = this.api.getTransfers(accountId, direction, limit, offset, options)
    return result.toPromise()
  }

  /**
   * Create an ACH Relationship
   * @param accountId Account identifier.
   * @param aCHRelationshipData
   */
  public postAchRelationships(
    accountId: string,
    aCHRelationshipData: ACHRelationshipData,
    options?: Configuration
  ): Promise<ACHRelationshipResource> {
    const result = this.api.postAchRelationships(
      accountId,
      aCHRelationshipData,
      options
    )
    return result.toPromise()
  }

  /**
   * Create a Bank Relationship for an account
   * @param accountId Account identifier.
   * @param bankData
   */
  public postRecipientBanks(
    accountId: string,
    bankData: BankData,
    options?: Configuration
  ): Promise<BankResource> {
    const result = this.api.postRecipientBanks(accountId, bankData, options)
    return result.toPromise()
  }

  /**
   * This operation allows you to fund an account with virtual money in the sandbox environment.
   * Request a new transfer
   * @param accountId
   * @param transferData
   */
  public postTransfers(
    accountId: string,
    transferData: TransferData,
    options?: Configuration
  ): Promise<TransferResource> {
    const result = this.api.postTransfers(accountId, transferData, options)
    return result.toPromise()
  }
}

export class PromiseJournalsApi {
  private api: ObservableJournalsApi

  public constructor(
    configuration: Configuration,
    requestFactory?: JournalsApiRequestFactory,
    responseProcessor?: JournalsApiResponseProcessor
  ) {
    this.api = new ObservableJournalsApi(
      configuration,
      requestFactory,
      responseProcessor
    )
  }

  /**
   * You can cancel journals while they are in the pending status. An attempt to cancel already-executed journals will return an error.
   * Cancel a pending journal.
   * @param journalId
   */
  public deleteJournal(journalId: string, options?: Configuration): Promise<void> {
    const result = this.api.deleteJournal(journalId, options)
    return result.toPromise()
  }

  /**
   * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
   * Subscribe to journal events (SSE).
   * @param since
   * @param until
   * @param sinceId
   * @param untilId
   */
  public eventsJournalsStatusGet(
    since?: Date,
    until?: Date,
    sinceId?: number,
    untilId?: number,
    options?: Configuration
  ): Promise<InlineResponse2005> {
    const result = this.api.eventsJournalsStatusGet(
      since,
      until,
      sinceId,
      untilId,
      options
    )
    return result.toPromise()
  }

  /**
   * Return a list of requested journals.
   * @param after by settle_date
   * @param before by settle_date
   * @param status
   * @param entryType
   * @param toAccount
   * @param fromAccount
   */
  public getJournals(
    after?: string,
    before?: string,
    status?: "pending" | "canceled" | "executed",
    entryType?: "JNLC" | "JNLS",
    toAccount?: string,
    fromAccount?: string,
    options?: Configuration
  ): Promise<Array<JournalResource>> {
    const result = this.api.getJournals(
      after,
      before,
      status,
      entryType,
      toAccount,
      fromAccount,
      options
    )
    return result.toPromise()
  }

  /**
   * A journal can be JNLC (move cash) or JNLS (move shares), dictated by `entry_type`. Generally, journal requests are subject to approval and starts from the `pending` status. The status changes are propagated through the Event API. Under certain conditions agreed for the partner, such journal transactions that meet the criteria are executed right away.
   * Request a journal.
   * @param journalData
   */
  public postJournals(
    journalData: JournalData,
    options?: Configuration
  ): Promise<JournalResource> {
    const result = this.api.postJournals(journalData, options)
    return result.toPromise()
  }

  /**
   * Create a batch journal
   * @param batchJournalRequest
   */
  public postJournalsBatch(
    batchJournalRequest: BatchJournalRequest,
    options?: Configuration
  ): Promise<Array<BatchJournalResponse>> {
    const result = this.api.postJournalsBatch(batchJournalRequest, options)
    return result.toPromise()
  }
}

export class PromiseOAuthApi {
  private api: ObservableOAuthApi

  public constructor(
    configuration: Configuration,
    requestFactory?: OAuthApiRequestFactory,
    responseProcessor?: OAuthApiResponseProcessor
  ) {
    this.api = new ObservableOAuthApi(configuration, requestFactory, responseProcessor)
  }

  /**
   * The operation issues an OAuth code which can be used in the OAuth code flow.
   * Issue a code.
   * @param inlineObject1
   */
  public oauthAuthorizePost(
    inlineObject1: InlineObject1,
    options?: Configuration
  ): Promise<InlineResponse2008> {
    const result = this.api.oauthAuthorizePost(inlineObject1, options)
    return result.toPromise()
  }

  /**
   * The endpoint returns the details of OAuth client to display in the authorization page.
   * Returns an OAuth client.
   * @param clientId
   * @param responseType
   * @param redirectUri
   * @param scope
   */
  public oauthClientsClientIdGet(
    clientId: string,
    responseType?: "code" | "token",
    redirectUri?: string,
    scope?: string,
    options?: Configuration
  ): Promise<InlineResponse2006> {
    const result = this.api.oauthClientsClientIdGet(
      clientId,
      responseType,
      redirectUri,
      scope,
      options
    )
    return result.toPromise()
  }

  /**
   * This operation issues an access token for an account.
   * Issue a token.
   * @param inlineObject
   */
  public oauthTokenPost(
    inlineObject: InlineObject,
    options?: Configuration
  ): Promise<InlineResponse2007> {
    const result = this.api.oauthTokenPost(inlineObject, options)
    return result.toPromise()
  }
}

export class PromiseTradingApi {
  private api: ObservableTradingApi

  public constructor(
    configuration: Configuration,
    requestFactory?: TradingApiRequestFactory,
    responseProcessor?: TradingApiResponseProcessor
  ) {
    this.api = new ObservableTradingApi(
      configuration,
      requestFactory,
      responseProcessor
    )
  }

  /**
   * Attempts to cancel an open order.
   * Attempts to cancel an open order.
   * @param accountId Account identifier.
   * @param orderId Order identifier.
   */
  public deleteOrder(
    accountId: string,
    orderId: string,
    options?: Configuration
  ): Promise<void> {
    const result = this.api.deleteOrder(accountId, orderId, options)
    return result.toPromise()
  }

  /**
   * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
   * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
   * @param accountId Account identifier.
   */
  public deleteOrders(
    accountId: string,
    options?: Configuration
  ): Promise<Array<InlineResponse207>> {
    const result = this.api.deleteOrders(accountId, options)
    return result.toPromise()
  }

  /**
   * Retrieves a single order for the given order_id.
   * Retrieves a single order for the given order_id.
   * @param accountId Account identifier.
   * @param orderId Order identifier.
   */
  public getOrder(
    accountId: string,
    orderId: string,
    options?: Configuration
  ): Promise<OrderObject> {
    const result = this.api.getOrder(accountId, orderId, options)
    return result.toPromise()
  }

  /**
   * Retrieves a list of orders for the account, filtered by the supplied query parameters.
   * Retrieves a list of orders for the account, filtered by the supplied query parameters.
   * @param accountId Account identifier.
   * @param status Status of the orders to list.
   * @param limit The maximum number of orders in response.
   * @param after The response will include only ones submitted after this timestamp (exclusive.)
   * @param until The response will include only ones submitted until this timestamp (exclusive.)
   * @param direction The chronological order of response based on the submission time. asc or desc. Defaults to desc.
   * @param nested If true, the result will roll up multi-leg orders under the legs field of primary order.
   * @param symbols A comma-separated list of symbols to filter by.
   */
  public getOrders(
    accountId: string,
    status?: "open" | "closed" | "all",
    limit?: number,
    after?: Date,
    until?: Date,
    direction?: "asc" | "desc",
    nested?: boolean,
    symbols?: string,
    options?: Configuration
  ): Promise<Array<OrderObject>> {
    const result = this.api.getOrders(
      accountId,
      status,
      limit,
      after,
      until,
      direction,
      nested,
      symbols,
      options
    )
    return result.toPromise()
  }

  /**
   * List open positions for an account
   * @param accountId Account identifier.
   */
  public getPositions(
    accountId: string,
    options?: Configuration
  ): Promise<Array<Position>> {
    const result = this.api.getPositions(accountId, options)
    return result.toPromise()
  }

  /**
   * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
   * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
   * @param accountId Account identifier.
   * @param orderId Order identifier.
   * @param patchOrder
   */
  public patchOrder(
    accountId: string,
    orderId: string,
    patchOrder: PatchOrder,
    options?: Configuration
  ): Promise<OrderObject> {
    const result = this.api.patchOrder(accountId, orderId, patchOrder, options)
    return result.toPromise()
  }

  /**
   * Create an order for an account.
   * Create an order for an account.
   * @param accountId Account identifier.
   * @param createOrder
   */
  public postOrders(
    accountId: string,
    createOrder: CreateOrder,
    options?: Configuration
  ): Promise<OrderObject> {
    const result = this.api.postOrders(accountId, createOrder, options)
    return result.toPromise()
  }
}

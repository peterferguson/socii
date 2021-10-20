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
import { TradingAccount } from "../models/TradingAccount"
import { MarketDay } from "../models/MarketDay"
import { ClockResponse } from "../models/ClockResponse"
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
import { PortfolioHistory } from "../models/PortfolioHistory"
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

export interface AccountsApiAccountsAccountIdDocumentsUploadPostRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof AccountsApiaccountsAccountIdDocumentsUploadPost
   */
  accountId: string
  /**
   *
   * @type DocumentUpload
   * @memberof AccountsApiaccountsAccountIdDocumentsUploadPost
   */
  documentUpload: DocumentUpload
}

export interface AccountsApiAccountsActivitiesActivityTypeGetRequest {
  /**
   *
   * @type &#39;FILL&#39; | &#39;ACATC&#39; | &#39;ACATS&#39; | &#39;CSD&#39; | &#39;CSR&#39; | &#39;CSW&#39; | &#39;DIV&#39; | &#39;DIVCGL&#39; | &#39;DIVCGS&#39; | &#39;DIVNRA&#39; | &#39;DIVROC&#39; | &#39;DIVTXEX&#39; | &#39;INT&#39; | &#39;JNLC&#39; | &#39;JNLS&#39; | &#39;MA&#39; | &#39;NC&#39; | &#39;PTC&#39; | &#39;REORG&#39; | &#39;SSO&#39; | &#39;SSP&#39;
   * @memberof AccountsApiaccountsActivitiesActivityTypeGet
   */
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
    | "SSP"
  /**
   *
   * @type string
   * @memberof AccountsApiaccountsActivitiesActivityTypeGet
   */
  date?: string
  /**
   *
   * @type string
   * @memberof AccountsApiaccountsActivitiesActivityTypeGet
   */
  until?: string
  /**
   *
   * @type string
   * @memberof AccountsApiaccountsActivitiesActivityTypeGet
   */
  after?: string
  /**
   *
   * @type &#39;asc&#39; | &#39;desc&#39;
   * @memberof AccountsApiaccountsActivitiesActivityTypeGet
   */
  direction?: "asc" | "desc"
  /**
   *
   * @type string
   * @memberof AccountsApiaccountsActivitiesActivityTypeGet
   */
  accountId?: string
  /**
   *
   * @type number
   * @memberof AccountsApiaccountsActivitiesActivityTypeGet
   */
  pageSize?: number
  /**
   *
   * @type string
   * @memberof AccountsApiaccountsActivitiesActivityTypeGet
   */
  pageToken?: string
}

export interface AccountsApiAccountsActivitiesGetRequest {
  /**
   *
   * @type string
   * @memberof AccountsApiaccountsActivitiesGet
   */
  date?: string
  /**
   *
   * @type string
   * @memberof AccountsApiaccountsActivitiesGet
   */
  until?: string
  /**
   *
   * @type string
   * @memberof AccountsApiaccountsActivitiesGet
   */
  after?: string
  /**
   *
   * @type &#39;asc&#39; | &#39;desc&#39;
   * @memberof AccountsApiaccountsActivitiesGet
   */
  direction?: "asc" | "desc"
  /**
   *
   * @type string
   * @memberof AccountsApiaccountsActivitiesGet
   */
  accountId?: string
  /**
   *
   * @type number
   * @memberof AccountsApiaccountsActivitiesGet
   */
  pageSize?: number
  /**
   *
   * @type string
   * @memberof AccountsApiaccountsActivitiesGet
   */
  pageToken?: string
}

export interface AccountsApiAccountsGetRequest {
  /**
   * The query supports partial match of account number, names, emails, etc.. Items can be space delimited.
   * @type string
   * @memberof AccountsApiaccountsGet
   */
  query?: string
}

export interface AccountsApiAccountsPostRequest {
  /**
   *
   * @type AccountCreationObject
   * @memberof AccountsApiaccountsPost
   */
  accountCreationObject: AccountCreationObject
}

export interface AccountsApiDeleteAccountRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof AccountsApideleteAccount
   */
  accountId: string
}

export interface AccountsApiDeleteAchRelationshipRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof AccountsApideleteAchRelationship
   */
  accountId: string
  /**
   * ACH relationship identifier
   * @type string
   * @memberof AccountsApideleteAchRelationship
   */
  achRelationshipId: string
}

export interface AccountsApiDeleteRecipientBankRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof AccountsApideleteRecipientBank
   */
  accountId: string
  /**
   *
   * @type string
   * @memberof AccountsApideleteRecipientBank
   */
  bankId: string
}

export interface AccountsApiDeleteTransferRequest {
  /**
   *
   * @type string
   * @memberof AccountsApideleteTransfer
   */
  accountId: string
  /**
   *
   * @type string
   * @memberof AccountsApideleteTransfer
   */
  transferId: string
}

export interface AccountsApiEventsAccountsStatusGetRequest {
  /**
   *
   * @type Date
   * @memberof AccountsApieventsAccountsStatusGet
   */
  since?: Date
  /**
   *
   * @type Date
   * @memberof AccountsApieventsAccountsStatusGet
   */
  until?: Date
  /**
   *
   * @type number
   * @memberof AccountsApieventsAccountsStatusGet
   */
  sinceId?: number
  /**
   *
   * @type number
   * @memberof AccountsApieventsAccountsStatusGet
   */
  untilId?: number
}

export interface AccountsApiGetAccountRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof AccountsApigetAccount
   */
  accountId: string
}

export interface AccountsApiGetAchRelationshipsRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof AccountsApigetAchRelationships
   */
  accountId: string
  /**
   * Comma-separated status values
   * @type string
   * @memberof AccountsApigetAchRelationships
   */
  statuses?: string
}

export interface AccountsApiGetRecipientBanksRequest {
  /**
   *
   * @type string
   * @memberof AccountsApigetRecipientBanks
   */
  accountId: string
  /**
   *
   * @type string
   * @memberof AccountsApigetRecipientBanks
   */
  status?: string
  /**
   *
   * @type string
   * @memberof AccountsApigetRecipientBanks
   */
  bankName?: string
}

export interface AccountsApiGetTradingAccountRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof AccountsApigetTradingAccount
   */
  accountId: string
}

export interface AccountsApiGetTransfersRequest {
  /**
   *
   * @type string
   * @memberof AccountsApigetTransfers
   */
  accountId: string
  /**
   *
   * @type &#39;INCOMING&#39; | &#39;OUTGOING&#39;
   * @memberof AccountsApigetTransfers
   */
  direction?: "INCOMING" | "OUTGOING"
  /**
   *
   * @type number
   * @memberof AccountsApigetTransfers
   */
  limit?: number
  /**
   *
   * @type number
   * @memberof AccountsApigetTransfers
   */
  offset?: number
}

export interface AccountsApiPatchAccountRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof AccountsApipatchAccount
   */
  accountId: string
  /**
   *
   * @type AccountUpdate
   * @memberof AccountsApipatchAccount
   */
  accountUpdate: AccountUpdate
}

export interface AccountsApiPostAchRelationshipsRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof AccountsApipostAchRelationships
   */
  accountId: string
  /**
   *
   * @type ACHRelationshipData
   * @memberof AccountsApipostAchRelationships
   */
  aCHRelationshipData: ACHRelationshipData
}

export interface AccountsApiPostRecipientBanksRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof AccountsApipostRecipientBanks
   */
  accountId: string
  /**
   *
   * @type BankData
   * @memberof AccountsApipostRecipientBanks
   */
  bankData: BankData
}

export interface AccountsApiPostTransfersRequest {
  /**
   *
   * @type string
   * @memberof AccountsApipostTransfers
   */
  accountId: string
  /**
   *
   * @type TransferData
   * @memberof AccountsApipostTransfers
   */
  transferData: TransferData
}

export class ObjectAccountsApi {
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
   * @param param the request object
   */
  public accountsAccountIdDocumentsUploadPost(
    param: AccountsApiAccountsAccountIdDocumentsUploadPostRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api
      .accountsAccountIdDocumentsUploadPost(
        param.accountId,
        param.documentUpload,
        options
      )
      .toPromise()
  }

  /**
   * Retrieve specific account activities
   * @param param the request object
   */
  public accountsActivitiesActivityTypeGet(
    param: AccountsApiAccountsActivitiesActivityTypeGetRequest,
    options?: Configuration
  ): Promise<Array<ActivityItem>> {
    return this.api
      .accountsActivitiesActivityTypeGet(
        param.activityType,
        param.date,
        param.until,
        param.after,
        param.direction,
        param.accountId,
        param.pageSize,
        param.pageToken,
        options
      )
      .toPromise()
  }

  /**
   * Retrieve account activities
   * @param param the request object
   */
  public accountsActivitiesGet(
    param: AccountsApiAccountsActivitiesGetRequest,
    options?: Configuration
  ): Promise<Array<ActivityItem>> {
    return this.api
      .accountsActivitiesGet(
        param.date,
        param.until,
        param.after,
        param.direction,
        param.accountId,
        param.pageSize,
        param.pageToken,
        options
      )
      .toPromise()
  }

  /**
   * Retrieve all accounts
   * @param param the request object
   */
  public accountsGet(
    param: AccountsApiAccountsGetRequest,
    options?: Configuration
  ): Promise<Array<Account>> {
    return this.api.accountsGet(param.query, options).toPromise()
  }

  /**
   * Create an account
   * @param param the request object
   */
  public accountsPost(
    param: AccountsApiAccountsPostRequest,
    options?: Configuration
  ): Promise<Account> {
    return this.api.accountsPost(param.accountCreationObject, options).toPromise()
  }

  /**
   * Request to close an account
   * @param param the request object
   */
  public deleteAccount(
    param: AccountsApiDeleteAccountRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api.deleteAccount(param.accountId, options).toPromise()
  }

  /**
   * Delete an existing ACH relationship
   * @param param the request object
   */
  public deleteAchRelationship(
    param: AccountsApiDeleteAchRelationshipRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api
      .deleteAchRelationship(param.accountId, param.achRelationshipId, options)
      .toPromise()
  }

  /**
   * Delete a Bank Relationship for an account
   * @param param the request object
   */
  public deleteRecipientBank(
    param: AccountsApiDeleteRecipientBankRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api
      .deleteRecipientBank(param.accountId, param.bankId, options)
      .toPromise()
  }

  /**
   * Request to close a transfer
   * @param param the request object
   */
  public deleteTransfer(
    param: AccountsApiDeleteTransferRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api
      .deleteTransfer(param.accountId, param.transferId, options)
      .toPromise()
  }

  /**
   * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
   * Subscribe to account status events (SSE).
   * @param param the request object
   */
  public eventsAccountsStatusGet(
    param: AccountsApiEventsAccountsStatusGetRequest,
    options?: Configuration
  ): Promise<InlineResponse2004> {
    return this.api
      .eventsAccountsStatusGet(
        param.since,
        param.until,
        param.sinceId,
        param.untilId,
        options
      )
      .toPromise()
  }

  /**
   * The response is an Account model.
   * Retrieve an account.
   * @param param the request object
   */
  public getAccount(
    param: AccountsApiGetAccountRequest,
    options?: Configuration
  ): Promise<AccountExtended> {
    return this.api.getAccount(param.accountId, options).toPromise()
  }

  /**
   * Retrieve ACH Relationships for an account
   * @param param the request object
   */
  public getAchRelationships(
    param: AccountsApiGetAchRelationshipsRequest,
    options?: Configuration
  ): Promise<Array<ACHRelationshipResource>> {
    return this.api
      .getAchRelationships(param.accountId, param.statuses, options)
      .toPromise()
  }

  /**
   * Retrieve bank relationships for an account
   * @param param the request object
   */
  public getRecipientBanks(
    param: AccountsApiGetRecipientBanksRequest,
    options?: Configuration
  ): Promise<Array<BankResource>> {
    return this.api
      .getRecipientBanks(param.accountId, param.status, param.bankName, options)
      .toPromise()
  }

  /**
   * The response is a Trading Account model.
   * Retrieve trading details for an account.
   * @param param the request object
   */
  public getTradingAccount(
    param: AccountsApiGetTradingAccountRequest,
    options?: Configuration
  ): Promise<TradingAccount> {
    return this.api.getTradingAccount(param.accountId, options).toPromise()
  }

  /**
   * You can filter requested transfers by values such as direction and status.
   * Return a list of transfers for an account.
   * @param param the request object
   */
  public getTransfers(
    param: AccountsApiGetTransfersRequest,
    options?: Configuration
  ): Promise<Array<TransferResource>> {
    return this.api
      .getTransfers(
        param.accountId,
        param.direction,
        param.limit,
        param.offset,
        options
      )
      .toPromise()
  }

  /**
   * Update an account
   * @param param the request object
   */
  public patchAccount(
    param: AccountsApiPatchAccountRequest,
    options?: Configuration
  ): Promise<Account> {
    return this.api
      .patchAccount(param.accountId, param.accountUpdate, options)
      .toPromise()
  }

  /**
   * Create an ACH Relationship
   * @param param the request object
   */
  public postAchRelationships(
    param: AccountsApiPostAchRelationshipsRequest,
    options?: Configuration
  ): Promise<ACHRelationshipResource> {
    return this.api
      .postAchRelationships(param.accountId, param.aCHRelationshipData, options)
      .toPromise()
  }

  /**
   * Create a Bank Relationship for an account
   * @param param the request object
   */
  public postRecipientBanks(
    param: AccountsApiPostRecipientBanksRequest,
    options?: Configuration
  ): Promise<BankResource> {
    return this.api
      .postRecipientBanks(param.accountId, param.bankData, options)
      .toPromise()
  }

  /**
   * This operation allows you to fund an account with virtual money in the sandbox environment.
   * Request a new transfer
   * @param param the request object
   */
  public postTransfers(
    param: AccountsApiPostTransfersRequest,
    options?: Configuration
  ): Promise<TransferResource> {
    return this.api
      .postTransfers(param.accountId, param.transferData, options)
      .toPromise()
  }
}

export interface AssetsApiAssetsAssetIdGetRequest {
  /**
   * The UUID of the required asset
   * @type string
   * @memberof AssetsApiassetsAssetIdGet
   */
  assetId: string
}

export interface AssetsApiAssetsSymbolGetRequest {
  /**
   * The symbol of the required asset
   * @type string
   * @memberof AssetsApiassetsSymbolGet
   */
  symbol: string
}

export interface AssetsApiGetAssetsRequest {}

export class ObjectAssetsApi {
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
   * @param param the request object
   */
  public assetsAssetIdGet(
    param: AssetsApiAssetsAssetIdGetRequest,
    options?: Configuration
  ): Promise<AssetResource> {
    return this.api.assetsAssetIdGet(param.assetId, options).toPromise()
  }

  /**
   * Returns the requested asset, if found
   * Retrieve an asset by symbol
   * @param param the request object
   */
  public assetsSymbolGet(
    param: AssetsApiAssetsSymbolGetRequest,
    options?: Configuration
  ): Promise<AssetResource> {
    return this.api.assetsSymbolGet(param.symbol, options).toPromise()
  }

  /**
   * Returns all assets
   * Retrieve all assets
   * @param param the request object
   */
  public getAssets(
    param: AssetsApiGetAssetsRequest,
    options?: Configuration
  ): Promise<Array<AssetResource>> {
    return this.api.getAssets(options).toPromise()
  }
}

export interface CalendarApiCalendarGetRequest {
  /**
   * The first date to retrieve data for. (Inclusive)
   * @type string
   * @memberof CalendarApicalendarGet
   */
  start?: string
  /**
   * The last date to retrieve data for. (Inclusive)
   * @type string
   * @memberof CalendarApicalendarGet
   */
  end?: string
}

export class ObjectCalendarApi {
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
   * @param param the request object
   */
  public calendarGet(
    param: CalendarApiCalendarGetRequest,
    options?: Configuration
  ): Promise<MarketDay[]> {
    return this.api.calendarGet(param.start, param.end, options).toPromise()
  }
}

export interface ClockApiClockGetRequest {}

export class ObjectClockApi {
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
   * @param param the request object
   */
  public clockGet(
    param: ClockApiClockGetRequest,
    options?: Configuration
  ): Promise<ClockResponse> {
    return this.api.clockGet(options).toPromise()
  }
}

export interface DocumentsApiAccountsAccountIdDocumentsDocumentIdDownloadGetRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof DocumentsApiaccountsAccountIdDocumentsDocumentIdDownloadGet
   */
  accountId: string
  /**
   *
   * @type string
   * @memberof DocumentsApiaccountsAccountIdDocumentsDocumentIdDownloadGet
   */
  documentId: string
}

export interface DocumentsApiAccountsAccountIdDocumentsGetRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof DocumentsApiaccountsAccountIdDocumentsGet
   */
  accountId: string
  /**
   * optional date value to filter the list (inclusive).
   * @type string
   * @memberof DocumentsApiaccountsAccountIdDocumentsGet
   */
  startDate?: string
  /**
   * optional date value to filter the list (inclusive).
   * @type string
   * @memberof DocumentsApiaccountsAccountIdDocumentsGet
   */
  endDate?: string
}

export interface DocumentsApiDocumentsDocumentIdGetRequest {
  /**
   *
   * @type string
   * @memberof DocumentsApidocumentsDocumentIdGet
   */
  documentId: string
}

export class ObjectDocumentsApi {
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
   * @param param the request object
   */
  public accountsAccountIdDocumentsDocumentIdDownloadGet(
    param: DocumentsApiAccountsAccountIdDocumentsDocumentIdDownloadGetRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api
      .accountsAccountIdDocumentsDocumentIdDownloadGet(
        param.accountId,
        param.documentId,
        options
      )
      .toPromise()
  }

  /**
   * You can query account documents such as monthly  statements and trade confirms under an account.
   * Return a list of account documents.
   * @param param the request object
   */
  public accountsAccountIdDocumentsGet(
    param: DocumentsApiAccountsAccountIdDocumentsGetRequest,
    options?: Configuration
  ): Promise<Array<InlineResponse2003>> {
    return this.api
      .accountsAccountIdDocumentsGet(
        param.accountId,
        param.startDate,
        param.endDate,
        options
      )
      .toPromise()
  }

  /**
   * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
   * Download a document file directly
   * @param param the request object
   */
  public documentsDocumentIdGet(
    param: DocumentsApiDocumentsDocumentIdGetRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api.documentsDocumentIdGet(param.documentId, options).toPromise()
  }
}

export interface EventsApiEventsAccountsStatusGetRequest {
  /**
   *
   * @type Date
   * @memberof EventsApieventsAccountsStatusGet
   */
  since?: Date
  /**
   *
   * @type Date
   * @memberof EventsApieventsAccountsStatusGet
   */
  until?: Date
  /**
   *
   * @type number
   * @memberof EventsApieventsAccountsStatusGet
   */
  sinceId?: number
  /**
   *
   * @type number
   * @memberof EventsApieventsAccountsStatusGet
   */
  untilId?: number
}

export interface EventsApiEventsJournalsStatusGetRequest {
  /**
   *
   * @type Date
   * @memberof EventsApieventsJournalsStatusGet
   */
  since?: Date
  /**
   *
   * @type Date
   * @memberof EventsApieventsJournalsStatusGet
   */
  until?: Date
  /**
   *
   * @type number
   * @memberof EventsApieventsJournalsStatusGet
   */
  sinceId?: number
  /**
   *
   * @type number
   * @memberof EventsApieventsJournalsStatusGet
   */
  untilId?: number
}

export class ObjectEventsApi {
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
   * @param param the request object
   */
  public eventsAccountsStatusGet(
    param: EventsApiEventsAccountsStatusGetRequest,
    options?: Configuration
  ): Promise<InlineResponse2004> {
    return this.api
      .eventsAccountsStatusGet(
        param.since,
        param.until,
        param.sinceId,
        param.untilId,
        options
      )
      .toPromise()
  }

  /**
   * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
   * Subscribe to journal events (SSE).
   * @param param the request object
   */
  public eventsJournalsStatusGet(
    param: EventsApiEventsJournalsStatusGetRequest,
    options?: Configuration
  ): Promise<InlineResponse2005> {
    return this.api
      .eventsJournalsStatusGet(
        param.since,
        param.until,
        param.sinceId,
        param.untilId,
        options
      )
      .toPromise()
  }
}

export interface FundingApiDeleteAchRelationshipRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof FundingApideleteAchRelationship
   */
  accountId: string
  /**
   * ACH relationship identifier
   * @type string
   * @memberof FundingApideleteAchRelationship
   */
  achRelationshipId: string
}

export interface FundingApiDeleteRecipientBankRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof FundingApideleteRecipientBank
   */
  accountId: string
  /**
   *
   * @type string
   * @memberof FundingApideleteRecipientBank
   */
  bankId: string
}

export interface FundingApiDeleteTransferRequest {
  /**
   *
   * @type string
   * @memberof FundingApideleteTransfer
   */
  accountId: string
  /**
   *
   * @type string
   * @memberof FundingApideleteTransfer
   */
  transferId: string
}

export interface FundingApiGetAchRelationshipsRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof FundingApigetAchRelationships
   */
  accountId: string
  /**
   * Comma-separated status values
   * @type string
   * @memberof FundingApigetAchRelationships
   */
  statuses?: string
}

export interface FundingApiGetRecipientBanksRequest {
  /**
   *
   * @type string
   * @memberof FundingApigetRecipientBanks
   */
  accountId: string
  /**
   *
   * @type string
   * @memberof FundingApigetRecipientBanks
   */
  status?: string
  /**
   *
   * @type string
   * @memberof FundingApigetRecipientBanks
   */
  bankName?: string
}

export interface FundingApiGetTransfersRequest {
  /**
   *
   * @type string
   * @memberof FundingApigetTransfers
   */
  accountId: string
  /**
   *
   * @type &#39;INCOMING&#39; | &#39;OUTGOING&#39;
   * @memberof FundingApigetTransfers
   */
  direction?: "INCOMING" | "OUTGOING"
  /**
   *
   * @type number
   * @memberof FundingApigetTransfers
   */
  limit?: number
  /**
   *
   * @type number
   * @memberof FundingApigetTransfers
   */
  offset?: number
}

export interface FundingApiPostAchRelationshipsRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof FundingApipostAchRelationships
   */
  accountId: string
  /**
   *
   * @type ACHRelationshipData
   * @memberof FundingApipostAchRelationships
   */
  aCHRelationshipData: ACHRelationshipData
}

export interface FundingApiPostRecipientBanksRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof FundingApipostRecipientBanks
   */
  accountId: string
  /**
   *
   * @type BankData
   * @memberof FundingApipostRecipientBanks
   */
  bankData: BankData
}

export interface FundingApiPostTransfersRequest {
  /**
   *
   * @type string
   * @memberof FundingApipostTransfers
   */
  accountId: string
  /**
   *
   * @type TransferData
   * @memberof FundingApipostTransfers
   */
  transferData: TransferData
}

export class ObjectFundingApi {
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
   * @param param the request object
   */
  public deleteAchRelationship(
    param: FundingApiDeleteAchRelationshipRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api
      .deleteAchRelationship(param.accountId, param.achRelationshipId, options)
      .toPromise()
  }

  /**
   * Delete a Bank Relationship for an account
   * @param param the request object
   */
  public deleteRecipientBank(
    param: FundingApiDeleteRecipientBankRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api
      .deleteRecipientBank(param.accountId, param.bankId, options)
      .toPromise()
  }

  /**
   * Request to close a transfer
   * @param param the request object
   */
  public deleteTransfer(
    param: FundingApiDeleteTransferRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api
      .deleteTransfer(param.accountId, param.transferId, options)
      .toPromise()
  }

  /**
   * Retrieve ACH Relationships for an account
   * @param param the request object
   */
  public getAchRelationships(
    param: FundingApiGetAchRelationshipsRequest,
    options?: Configuration
  ): Promise<Array<ACHRelationshipResource>> {
    return this.api
      .getAchRelationships(param.accountId, param.statuses, options)
      .toPromise()
  }

  /**
   * Retrieve bank relationships for an account
   * @param param the request object
   */
  public getRecipientBanks(
    param: FundingApiGetRecipientBanksRequest,
    options?: Configuration
  ): Promise<Array<BankResource>> {
    return this.api
      .getRecipientBanks(param.accountId, param.status, param.bankName, options)
      .toPromise()
  }

  /**
   * You can filter requested transfers by values such as direction and status.
   * Return a list of transfers for an account.
   * @param param the request object
   */
  public getTransfers(
    param: FundingApiGetTransfersRequest,
    options?: Configuration
  ): Promise<Array<TransferResource>> {
    return this.api
      .getTransfers(
        param.accountId,
        param.direction,
        param.limit,
        param.offset,
        options
      )
      .toPromise()
  }

  /**
   * Create an ACH Relationship
   * @param param the request object
   */
  public postAchRelationships(
    param: FundingApiPostAchRelationshipsRequest,
    options?: Configuration
  ): Promise<ACHRelationshipResource> {
    return this.api
      .postAchRelationships(param.accountId, param.aCHRelationshipData, options)
      .toPromise()
  }

  /**
   * Create a Bank Relationship for an account
   * @param param the request object
   */
  public postRecipientBanks(
    param: FundingApiPostRecipientBanksRequest,
    options?: Configuration
  ): Promise<BankResource> {
    return this.api
      .postRecipientBanks(param.accountId, param.bankData, options)
      .toPromise()
  }

  /**
   * This operation allows you to fund an account with virtual money in the sandbox environment.
   * Request a new transfer
   * @param param the request object
   */
  public postTransfers(
    param: FundingApiPostTransfersRequest,
    options?: Configuration
  ): Promise<TransferResource> {
    return this.api
      .postTransfers(param.accountId, param.transferData, options)
      .toPromise()
  }
}

export interface JournalsApiDeleteJournalRequest {
  /**
   *
   * @type string
   * @memberof JournalsApideleteJournal
   */
  journalId: string
}

export interface JournalsApiEventsJournalsStatusGetRequest {
  /**
   *
   * @type Date
   * @memberof JournalsApieventsJournalsStatusGet
   */
  since?: Date
  /**
   *
   * @type Date
   * @memberof JournalsApieventsJournalsStatusGet
   */
  until?: Date
  /**
   *
   * @type number
   * @memberof JournalsApieventsJournalsStatusGet
   */
  sinceId?: number
  /**
   *
   * @type number
   * @memberof JournalsApieventsJournalsStatusGet
   */
  untilId?: number
}

export interface JournalsApiGetJournalsRequest {
  /**
   * by settle_date
   * @type string
   * @memberof JournalsApigetJournals
   */
  after?: string
  /**
   * by settle_date
   * @type string
   * @memberof JournalsApigetJournals
   */
  before?: string
  /**
   *
   * @type &#39;pending&#39; | &#39;canceled&#39; | &#39;executed&#39;
   * @memberof JournalsApigetJournals
   */
  status?: "pending" | "canceled" | "executed"
  /**
   *
   * @type &#39;JNLC&#39; | &#39;JNLS&#39;
   * @memberof JournalsApigetJournals
   */
  entryType?: "JNLC" | "JNLS"
  /**
   *
   * @type string
   * @memberof JournalsApigetJournals
   */
  toAccount?: string
  /**
   *
   * @type string
   * @memberof JournalsApigetJournals
   */
  fromAccount?: string
}

export interface JournalsApiPostJournalsRequest {
  /**
   *
   * @type JournalData
   * @memberof JournalsApipostJournals
   */
  journalData: JournalData
}

export interface JournalsApiPostJournalsBatchRequest {
  /**
   *
   * @type BatchJournalRequest
   * @memberof JournalsApipostJournalsBatch
   */
  batchJournalRequest: BatchJournalRequest
}

export class ObjectJournalsApi {
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
   * @param param the request object
   */
  public deleteJournal(
    param: JournalsApiDeleteJournalRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api.deleteJournal(param.journalId, options).toPromise()
  }

  /**
   * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
   * Subscribe to journal events (SSE).
   * @param param the request object
   */
  public eventsJournalsStatusGet(
    param: JournalsApiEventsJournalsStatusGetRequest,
    options?: Configuration
  ): Promise<InlineResponse2005> {
    return this.api
      .eventsJournalsStatusGet(
        param.since,
        param.until,
        param.sinceId,
        param.untilId,
        options
      )
      .toPromise()
  }

  /**
   * Return a list of requested journals.
   * @param param the request object
   */
  public getJournals(
    param: JournalsApiGetJournalsRequest,
    options?: Configuration
  ): Promise<Array<JournalResource>> {
    return this.api
      .getJournals(
        param.after,
        param.before,
        param.status,
        param.entryType,
        param.toAccount,
        param.fromAccount,
        options
      )
      .toPromise()
  }

  /**
   * A journal can be JNLC (move cash) or JNLS (move shares), dictated by `entry_type`. Generally, journal requests are subject to approval and starts from the `pending` status. The status changes are propagated through the Event API. Under certain conditions agreed for the partner, such journal transactions that meet the criteria are executed right away.
   * Request a journal.
   * @param param the request object
   */
  public postJournals(
    param: JournalsApiPostJournalsRequest,
    options?: Configuration
  ): Promise<JournalResource> {
    return this.api.postJournals(param.journalData, options).toPromise()
  }

  /**
   * Create a batch journal
   * @param param the request object
   */
  public postJournalsBatch(
    param: JournalsApiPostJournalsBatchRequest,
    options?: Configuration
  ): Promise<Array<BatchJournalResponse>> {
    return this.api.postJournalsBatch(param.batchJournalRequest, options).toPromise()
  }
}

export interface OAuthApiOauthAuthorizePostRequest {
  /**
   *
   * @type InlineObject1
   * @memberof OAuthApioauthAuthorizePost
   */
  inlineObject1: InlineObject1
}

export interface OAuthApiOauthClientsClientIdGetRequest {
  /**
   *
   * @type string
   * @memberof OAuthApioauthClientsClientIdGet
   */
  clientId: string
  /**
   *
   * @type &#39;code&#39; | &#39;token&#39;
   * @memberof OAuthApioauthClientsClientIdGet
   */
  responseType?: "code" | "token"
  /**
   *
   * @type string
   * @memberof OAuthApioauthClientsClientIdGet
   */
  redirectUri?: string
  /**
   *
   * @type string
   * @memberof OAuthApioauthClientsClientIdGet
   */
  scope?: string
}

export interface OAuthApiOauthTokenPostRequest {
  /**
   *
   * @type InlineObject
   * @memberof OAuthApioauthTokenPost
   */
  inlineObject: InlineObject
}

export class ObjectOAuthApi {
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
   * @param param the request object
   */
  public oauthAuthorizePost(
    param: OAuthApiOauthAuthorizePostRequest,
    options?: Configuration
  ): Promise<InlineResponse2008> {
    return this.api.oauthAuthorizePost(param.inlineObject1, options).toPromise()
  }

  /**
   * The endpoint returns the details of OAuth client to display in the authorization page.
   * Returns an OAuth client.
   * @param param the request object
   */
  public oauthClientsClientIdGet(
    param: OAuthApiOauthClientsClientIdGetRequest,
    options?: Configuration
  ): Promise<InlineResponse2006> {
    return this.api
      .oauthClientsClientIdGet(
        param.clientId,
        param.responseType,
        param.redirectUri,
        param.scope,
        options
      )
      .toPromise()
  }

  /**
   * This operation issues an access token for an account.
   * Issue a token.
   * @param param the request object
   */
  public oauthTokenPost(
    param: OAuthApiOauthTokenPostRequest,
    options?: Configuration
  ): Promise<InlineResponse2007> {
    return this.api.oauthTokenPost(param.inlineObject, options).toPromise()
  }
}

import { ObservablePortfolioApi } from "./ObservableAPI"
import {
  PortfolioApiRequestFactory,
  PortfolioApiResponseProcessor,
} from "../apis/PortfolioApi"

export interface PortfolioApiGetPortfolioHistoryRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof PortfolioApigetPortfolioHistory
   */
  accountId: string
  /**
   * The duration of the data in number + unit, such as 1D
   * @type string
   * @memberof PortfolioApigetPortfolioHistory
   */
  period?: string
  /**
   * The resolution of time window
   * @type &#39;1Min&#39; | &#39;5Min&#39; | &#39;15Min&#39; | &#39;1H&#39; | &#39;1D&#39;
   * @memberof PortfolioApigetPortfolioHistory
   */
  timeframe?: "1Min" | "5Min" | "15Min" | "1H" | "1D"
  /**
   * The date the data is returned up to, in “YYYY-MM-DD” format. Defaults to the current market date (rolls over at the market open if extended_hours is false, otherwise at 7am ET)
   * @type string
   * @memberof PortfolioApigetPortfolioHistory
   */
  dateEnd?: string
  /**
   * If true, include extended hours in the result
   * @type boolean
   * @memberof PortfolioApigetPortfolioHistory
   */
  extendedHours?: boolean
}

export interface PortfolioApiGetPositionsRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof PortfolioApigetPositions
   */
  accountId: string
}

export class ObjectPortfolioApi {
  private api: ObservablePortfolioApi

  public constructor(
    configuration: Configuration,
    requestFactory?: PortfolioApiRequestFactory,
    responseProcessor?: PortfolioApiResponseProcessor
  ) {
    this.api = new ObservablePortfolioApi(
      configuration,
      requestFactory,
      responseProcessor
    )
  }

  /**
   * Get timeseries data for equity and profit loss information of the account
   * @param param the request object
   */
  public getPortfolioHistory(
    param: PortfolioApiGetPortfolioHistoryRequest,
    options?: Configuration
  ): Promise<PortfolioHistory> {
    return this.api
      .getPortfolioHistory(
        param.accountId,
        param.period,
        param.timeframe,
        param.dateEnd,
        param.extendedHours,
        options
      )
      .toPromise()
  }

  /**
   * List open positions for an account
   * @param param the request object
   */
  public getPositions(
    param: PortfolioApiGetPositionsRequest,
    options?: Configuration
  ): Promise<Array<Position>> {
    return this.api.getPositions(param.accountId, options).toPromise()
  }
}
export interface TradingApiDeleteOrderRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof TradingApideleteOrder
   */
  accountId: string
  /**
   * Order identifier.
   * @type string
   * @memberof TradingApideleteOrder
   */
  orderId: string
}

export interface TradingApiDeleteOrdersRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof TradingApideleteOrders
   */
  accountId: string
}

export interface TradingApiGetOrderRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof TradingApigetOrder
   */
  accountId: string
  /**
   * Order identifier.
   * @type string
   * @memberof TradingApigetOrder
   */
  orderId: string
}

export interface TradingApiGetOrdersRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof TradingApigetOrders
   */
  accountId: string
  /**
   * Status of the orders to list.
   * @type &#39;open&#39; | &#39;closed&#39; | &#39;all&#39;
   * @memberof TradingApigetOrders
   */
  status?: "open" | "closed" | "all"
  /**
   * The maximum number of orders in response.
   * @type number
   * @memberof TradingApigetOrders
   */
  limit?: number
  /**
   * The response will include only ones submitted after this timestamp (exclusive.)
   * @type Date
   * @memberof TradingApigetOrders
   */
  after?: Date
  /**
   * The response will include only ones submitted until this timestamp (exclusive.)
   * @type Date
   * @memberof TradingApigetOrders
   */
  until?: Date
  /**
   * The chronological order of response based on the submission time. asc or desc. Defaults to desc.
   * @type &#39;asc&#39; | &#39;desc&#39;
   * @memberof TradingApigetOrders
   */
  direction?: "asc" | "desc"
  /**
   * If true, the result will roll up multi-leg orders under the legs field of primary order.
   * @type boolean
   * @memberof TradingApigetOrders
   */
  nested?: boolean
  /**
   * A comma-separated list of symbols to filter by.
   * @type string
   * @memberof TradingApigetOrders
   */
  symbols?: string
}

export interface TradingApiPatchOrderRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof TradingApipatchOrder
   */
  accountId: string
  /**
   * Order identifier.
   * @type string
   * @memberof TradingApipatchOrder
   */
  orderId: string
  /**
   *
   * @type PatchOrder
   * @memberof TradingApipatchOrder
   */
  patchOrder: PatchOrder
}

export interface TradingApiPostOrdersRequest {
  /**
   * Account identifier.
   * @type string
   * @memberof TradingApipostOrders
   */
  accountId: string
  /**
   *
   * @type CreateOrder
   * @memberof TradingApipostOrders
   */
  createOrder: CreateOrder
}

export class ObjectTradingApi {
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
   * @param param the request object
   */
  public deleteOrder(
    param: TradingApiDeleteOrderRequest,
    options?: Configuration
  ): Promise<void> {
    return this.api.deleteOrder(param.accountId, param.orderId, options).toPromise()
  }

  /**
   * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
   * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
   * @param param the request object
   */
  public deleteOrders(
    param: TradingApiDeleteOrdersRequest,
    options?: Configuration
  ): Promise<Array<InlineResponse207>> {
    return this.api.deleteOrders(param.accountId, options).toPromise()
  }

  /**
   * Retrieves a single order for the given order_id.
   * Retrieves a single order for the given order_id.
   * @param param the request object
   */
  public getOrder(
    param: TradingApiGetOrderRequest,
    options?: Configuration
  ): Promise<OrderObject> {
    return this.api.getOrder(param.accountId, param.orderId, options).toPromise()
  }

  /**
   * Retrieves a list of orders for the account, filtered by the supplied query parameters.
   * Retrieves a list of orders for the account, filtered by the supplied query parameters.
   * @param param the request object
   */
  public getOrders(
    param: TradingApiGetOrdersRequest,
    options?: Configuration
  ): Promise<Array<OrderObject>> {
    return this.api
      .getOrders(
        param.accountId,
        param.status,
        param.limit,
        param.after,
        param.until,
        param.direction,
        param.nested,
        param.symbols,
        options
      )
      .toPromise()
  }

  /**
   * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
   * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
   * @param param the request object
   */
  public patchOrder(
    param: TradingApiPatchOrderRequest,
    options?: Configuration
  ): Promise<OrderObject> {
    return this.api
      .patchOrder(param.accountId, param.orderId, param.patchOrder, options)
      .toPromise()
  }

  /**
   * Create an order for an account.
   * Create an order for an account.
   * @param param the request object
   */
  public postOrders(
    param: TradingApiPostOrdersRequest,
    options?: Configuration
  ): Promise<OrderObject> {
    return this.api.postOrders(param.accountId, param.createOrder, options).toPromise()
  }
}

import {
    AccountsApiRequestFactory,
    AccountsApiResponseProcessor
} from "../apis/AccountsApi"
import { AssetsApiRequestFactory, AssetsApiResponseProcessor } from "../apis/AssetsApi"
import {
    CalendarApiRequestFactory,
    CalendarApiResponseProcessor
} from "../apis/CalendarApi"
import { ClockApiRequestFactory, ClockApiResponseProcessor } from "../apis/ClockApi"
import {
    DocumentsApiRequestFactory,
    DocumentsApiResponseProcessor
} from "../apis/DocumentsApi"
import { EventsApiRequestFactory, EventsApiResponseProcessor } from "../apis/EventsApi"
import {
    FundingApiRequestFactory,
    FundingApiResponseProcessor
} from "../apis/FundingApi"
import {
    JournalsApiRequestFactory,
    JournalsApiResponseProcessor
} from "../apis/JournalsApi"
import { OAuthApiRequestFactory, OAuthApiResponseProcessor } from "../apis/OAuthApi"
import {
    TradingApiRequestFactory,
    TradingApiResponseProcessor
} from "../apis/TradingApi"
import { Configuration } from "../configuration"
import { RequestContext, ResponseContext } from "../http/http"
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
import { from, map, mergeMap, Observable, of } from "../rxjsStub"

export class ObservableAccountsApi {
  private requestFactory: AccountsApiRequestFactory
  private responseProcessor: AccountsApiResponseProcessor
  private configuration: Configuration

  public constructor(
    configuration: Configuration,
    requestFactory?: AccountsApiRequestFactory,
    responseProcessor?: AccountsApiResponseProcessor
  ) {
    this.configuration = configuration
    this.requestFactory = requestFactory || new AccountsApiRequestFactory(configuration)
    this.responseProcessor = responseProcessor || new AccountsApiResponseProcessor()
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
  ): Observable<void> {
    const requestContextPromise =
      this.requestFactory.accountsAccountIdDocumentsUploadPost(
        accountId,
        documentUpload,
        options
      )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.accountsAccountIdDocumentsUploadPost(rsp)
            )
          )
        })
      )
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
  ): Observable<Array<ActivityItem>> {
    const requestContextPromise = this.requestFactory.accountsActivitiesActivityTypeGet(
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

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.accountsActivitiesActivityTypeGet(rsp)
            )
          )
        })
      )
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
  ): Observable<Array<ActivityItem>> {
    const requestContextPromise = this.requestFactory.accountsActivitiesGet(
      date,
      until,
      after,
      direction,
      accountId,
      pageSize,
      pageToken,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.accountsActivitiesGet(rsp)
            )
          )
        })
      )
  }

  /**
   * Retrieve all accounts
   * @param query The query supports partial match of account number, names, emails, etc.. Items can be space delimited.
   */
  public accountsGet(
    query?: string,
    options?: Configuration
  ): Observable<Array<Account>> {
    const requestContextPromise = this.requestFactory.accountsGet(query, options)

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.accountsGet(rsp))
          )
        })
      )
  }

  /**
   * Create an account
   * @param accountCreationObject
   */
  public accountsPost(
    accountCreationObject: AccountCreationObject,
    options?: Configuration
  ): Observable<Account> {
    const requestContextPromise = this.requestFactory.accountsPost(
      accountCreationObject,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.accountsPost(rsp))
          )
        })
      )
  }

  /**
   * Request to close an account
   * @param accountId Account identifier.
   */
  public deleteAccount(accountId: string, options?: Configuration): Observable<void> {
    const requestContextPromise = this.requestFactory.deleteAccount(accountId, options)

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.deleteAccount(rsp))
          )
        })
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
  ): Observable<void> {
    const requestContextPromise = this.requestFactory.deleteAchRelationship(
      accountId,
      achRelationshipId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.deleteAchRelationship(rsp)
            )
          )
        })
      )
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
  ): Observable<void> {
    const requestContextPromise = this.requestFactory.deleteRecipientBank(
      accountId,
      bankId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.deleteRecipientBank(rsp)
            )
          )
        })
      )
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
  ): Observable<void> {
    const requestContextPromise = this.requestFactory.deleteTransfer(
      accountId,
      transferId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.deleteTransfer(rsp))
          )
        })
      )
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
  ): Observable<InlineResponse2004> {
    const requestContextPromise = this.requestFactory.eventsAccountsStatusGet(
      since,
      until,
      sinceId,
      untilId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.eventsAccountsStatusGet(rsp)
            )
          )
        })
      )
  }

  /**
   * The response is an Account model.
   * Retrieve an account.
   * @param accountId Account identifier.
   */
  public getAccount(
    accountId: string,
    options?: Configuration
  ): Observable<AccountExtended> {
    const requestContextPromise = this.requestFactory.getAccount(accountId, options)

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.getAccount(rsp))
          )
        })
      )
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
  ): Observable<Array<ACHRelationshipResource>> {
    const requestContextPromise = this.requestFactory.getAchRelationships(
      accountId,
      statuses,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.getAchRelationships(rsp)
            )
          )
        })
      )
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
  ): Observable<Array<BankResource>> {
    const requestContextPromise = this.requestFactory.getRecipientBanks(
      accountId,
      status,
      bankName,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.getRecipientBanks(rsp))
          )
        })
      )
  }

  /**
   * The response is a Trading Account model.
   * Retrieve trading details for an account.
   * @param accountId Account identifier.
   */
  public getTradingAccount(
    accountId: string,
    options?: Configuration
  ): Observable<InlineResponse200> {
    const requestContextPromise = this.requestFactory.getTradingAccount(
      accountId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.getTradingAccount(rsp))
          )
        })
      )
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
  ): Observable<Array<TransferResource>> {
    const requestContextPromise = this.requestFactory.getTransfers(
      accountId,
      direction,
      limit,
      offset,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.getTransfers(rsp))
          )
        })
      )
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
  ): Observable<Account> {
    const requestContextPromise = this.requestFactory.patchAccount(
      accountId,
      accountUpdate,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.patchAccount(rsp))
          )
        })
      )
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
  ): Observable<ACHRelationshipResource> {
    const requestContextPromise = this.requestFactory.postAchRelationships(
      accountId,
      aCHRelationshipData,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.postAchRelationships(rsp)
            )
          )
        })
      )
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
  ): Observable<BankResource> {
    const requestContextPromise = this.requestFactory.postRecipientBanks(
      accountId,
      bankData,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.postRecipientBanks(rsp)
            )
          )
        })
      )
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
  ): Observable<TransferResource> {
    const requestContextPromise = this.requestFactory.postTransfers(
      accountId,
      transferData,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.postTransfers(rsp))
          )
        })
      )
  }
}

export class ObservableAssetsApi {
  private requestFactory: AssetsApiRequestFactory
  private responseProcessor: AssetsApiResponseProcessor
  private configuration: Configuration

  public constructor(
    configuration: Configuration,
    requestFactory?: AssetsApiRequestFactory,
    responseProcessor?: AssetsApiResponseProcessor
  ) {
    this.configuration = configuration
    this.requestFactory = requestFactory || new AssetsApiRequestFactory(configuration)
    this.responseProcessor = responseProcessor || new AssetsApiResponseProcessor()
  }

  /**
   * Returns the requested asset, if found
   * Retrieve an asset by UUID
   * @param assetId The UUID of the required asset
   */
  public assetsAssetIdGet(assetId: string, options?: Configuration): Observable<void> {
    const requestContextPromise = this.requestFactory.assetsAssetIdGet(assetId, options)

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.assetsAssetIdGet(rsp))
          )
        })
      )
  }

  /**
   * Returns the requested asset, if found
   * Retrieve an asset by symbol
   * @param symbol The symbol of the required asset
   */
  public assetsSymbolGet(symbol: string, options?: Configuration): Observable<void> {
    const requestContextPromise = this.requestFactory.assetsSymbolGet(symbol, options)

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.assetsSymbolGet(rsp))
          )
        })
      )
  }

  /**
   * Returns all assets
   * Retrieve all assets
   */
  public getAssets(options?: Configuration): Observable<Array<AssetResource>> {
    const requestContextPromise = this.requestFactory.getAssets(options)

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.getAssets(rsp))
          )
        })
      )
  }
}

export class ObservableCalendarApi {
  private requestFactory: CalendarApiRequestFactory
  private responseProcessor: CalendarApiResponseProcessor
  private configuration: Configuration

  public constructor(
    configuration: Configuration,
    requestFactory?: CalendarApiRequestFactory,
    responseProcessor?: CalendarApiResponseProcessor
  ) {
    this.configuration = configuration
    this.requestFactory = requestFactory || new CalendarApiRequestFactory(configuration)
    this.responseProcessor = responseProcessor || new CalendarApiResponseProcessor()
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
  ): Observable<InlineResponse2001> {
    const requestContextPromise = this.requestFactory.calendarGet(start, end, options)

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.calendarGet(rsp))
          )
        })
      )
  }
}

export class ObservableClockApi {
  private requestFactory: ClockApiRequestFactory
  private responseProcessor: ClockApiResponseProcessor
  private configuration: Configuration

  public constructor(
    configuration: Configuration,
    requestFactory?: ClockApiRequestFactory,
    responseProcessor?: ClockApiResponseProcessor
  ) {
    this.configuration = configuration
    this.requestFactory = requestFactory || new ClockApiRequestFactory(configuration)
    this.responseProcessor = responseProcessor || new ClockApiResponseProcessor()
  }

  /**
   * Query market clock
   */
  public clockGet(options?: Configuration): Observable<InlineResponse2002> {
    const requestContextPromise = this.requestFactory.clockGet(options)

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.clockGet(rsp))
          )
        })
      )
  }
}

export class ObservableDocumentsApi {
  private requestFactory: DocumentsApiRequestFactory
  private responseProcessor: DocumentsApiResponseProcessor
  private configuration: Configuration

  public constructor(
    configuration: Configuration,
    requestFactory?: DocumentsApiRequestFactory,
    responseProcessor?: DocumentsApiResponseProcessor
  ) {
    this.configuration = configuration
    this.requestFactory =
      requestFactory || new DocumentsApiRequestFactory(configuration)
    this.responseProcessor = responseProcessor || new DocumentsApiResponseProcessor()
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
  ): Observable<void> {
    const requestContextPromise =
      this.requestFactory.accountsAccountIdDocumentsDocumentIdDownloadGet(
        accountId,
        documentId,
        options
      )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.accountsAccountIdDocumentsDocumentIdDownloadGet(
                rsp
              )
            )
          )
        })
      )
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
  ): Observable<Array<InlineResponse2003>> {
    const requestContextPromise = this.requestFactory.accountsAccountIdDocumentsGet(
      accountId,
      startDate,
      endDate,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.accountsAccountIdDocumentsGet(rsp)
            )
          )
        })
      )
  }

  /**
   * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
   * Download a document file directly
   * @param documentId
   */
  public documentsDocumentIdGet(
    documentId: string,
    options?: Configuration
  ): Observable<void> {
    const requestContextPromise = this.requestFactory.documentsDocumentIdGet(
      documentId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.documentsDocumentIdGet(rsp)
            )
          )
        })
      )
  }
}

export class ObservableEventsApi {
  private requestFactory: EventsApiRequestFactory
  private responseProcessor: EventsApiResponseProcessor
  private configuration: Configuration

  public constructor(
    configuration: Configuration,
    requestFactory?: EventsApiRequestFactory,
    responseProcessor?: EventsApiResponseProcessor
  ) {
    this.configuration = configuration
    this.requestFactory = requestFactory || new EventsApiRequestFactory(configuration)
    this.responseProcessor = responseProcessor || new EventsApiResponseProcessor()
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
  ): Observable<InlineResponse2004> {
    const requestContextPromise = this.requestFactory.eventsAccountsStatusGet(
      since,
      until,
      sinceId,
      untilId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.eventsAccountsStatusGet(rsp)
            )
          )
        })
      )
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
  ): Observable<InlineResponse2005> {
    const requestContextPromise = this.requestFactory.eventsJournalsStatusGet(
      since,
      until,
      sinceId,
      untilId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.eventsJournalsStatusGet(rsp)
            )
          )
        })
      )
  }
}

export class ObservableFundingApi {
  private requestFactory: FundingApiRequestFactory
  private responseProcessor: FundingApiResponseProcessor
  private configuration: Configuration

  public constructor(
    configuration: Configuration,
    requestFactory?: FundingApiRequestFactory,
    responseProcessor?: FundingApiResponseProcessor
  ) {
    this.configuration = configuration
    this.requestFactory = requestFactory || new FundingApiRequestFactory(configuration)
    this.responseProcessor = responseProcessor || new FundingApiResponseProcessor()
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
  ): Observable<void> {
    const requestContextPromise = this.requestFactory.deleteAchRelationship(
      accountId,
      achRelationshipId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.deleteAchRelationship(rsp)
            )
          )
        })
      )
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
  ): Observable<void> {
    const requestContextPromise = this.requestFactory.deleteRecipientBank(
      accountId,
      bankId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.deleteRecipientBank(rsp)
            )
          )
        })
      )
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
  ): Observable<void> {
    const requestContextPromise = this.requestFactory.deleteTransfer(
      accountId,
      transferId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.deleteTransfer(rsp))
          )
        })
      )
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
  ): Observable<Array<ACHRelationshipResource>> {
    const requestContextPromise = this.requestFactory.getAchRelationships(
      accountId,
      statuses,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.getAchRelationships(rsp)
            )
          )
        })
      )
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
  ): Observable<Array<BankResource>> {
    const requestContextPromise = this.requestFactory.getRecipientBanks(
      accountId,
      status,
      bankName,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.getRecipientBanks(rsp))
          )
        })
      )
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
  ): Observable<Array<TransferResource>> {
    const requestContextPromise = this.requestFactory.getTransfers(
      accountId,
      direction,
      limit,
      offset,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.getTransfers(rsp))
          )
        })
      )
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
  ): Observable<ACHRelationshipResource> {
    const requestContextPromise = this.requestFactory.postAchRelationships(
      accountId,
      aCHRelationshipData,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.postAchRelationships(rsp)
            )
          )
        })
      )
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
  ): Observable<BankResource> {
    const requestContextPromise = this.requestFactory.postRecipientBanks(
      accountId,
      bankData,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.postRecipientBanks(rsp)
            )
          )
        })
      )
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
  ): Observable<TransferResource> {
    const requestContextPromise = this.requestFactory.postTransfers(
      accountId,
      transferData,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.postTransfers(rsp))
          )
        })
      )
  }
}

export class ObservableJournalsApi {
  private requestFactory: JournalsApiRequestFactory
  private responseProcessor: JournalsApiResponseProcessor
  private configuration: Configuration

  public constructor(
    configuration: Configuration,
    requestFactory?: JournalsApiRequestFactory,
    responseProcessor?: JournalsApiResponseProcessor
  ) {
    this.configuration = configuration
    this.requestFactory = requestFactory || new JournalsApiRequestFactory(configuration)
    this.responseProcessor = responseProcessor || new JournalsApiResponseProcessor()
  }

  /**
   * You can cancel journals while they are in the pending status. An attempt to cancel already-executed journals will return an error.
   * Cancel a pending journal.
   * @param journalId
   */
  public deleteJournal(journalId: string, options?: Configuration): Observable<void> {
    const requestContextPromise = this.requestFactory.deleteJournal(journalId, options)

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.deleteJournal(rsp))
          )
        })
      )
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
  ): Observable<InlineResponse2005> {
    const requestContextPromise = this.requestFactory.eventsJournalsStatusGet(
      since,
      until,
      sinceId,
      untilId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.eventsJournalsStatusGet(rsp)
            )
          )
        })
      )
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
  ): Observable<Array<JournalResource>> {
    const requestContextPromise = this.requestFactory.getJournals(
      after,
      before,
      status,
      entryType,
      toAccount,
      fromAccount,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.getJournals(rsp))
          )
        })
      )
  }

  /**
   * A journal can be JNLC (move cash) or JNLS (move shares), dictated by `entry_type`. Generally, journal requests are subject to approval and starts from the `pending` status. The status changes are propagated through the Event API. Under certain conditions agreed for the partner, such journal transactions that meet the criteria are executed right away.
   * Request a journal.
   * @param journalData
   */
  public postJournals(
    journalData: JournalData,
    options?: Configuration
  ): Observable<JournalResource> {
    const requestContextPromise = this.requestFactory.postJournals(journalData, options)

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.postJournals(rsp))
          )
        })
      )
  }

  /**
   * Create a batch journal
   * @param batchJournalRequest
   */
  public postJournalsBatch(
    batchJournalRequest: BatchJournalRequest,
    options?: Configuration
  ): Observable<Array<BatchJournalResponse>> {
    const requestContextPromise = this.requestFactory.postJournalsBatch(
      batchJournalRequest,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.postJournalsBatch(rsp))
          )
        })
      )
  }
}

export class ObservableOAuthApi {
  private requestFactory: OAuthApiRequestFactory
  private responseProcessor: OAuthApiResponseProcessor
  private configuration: Configuration

  public constructor(
    configuration: Configuration,
    requestFactory?: OAuthApiRequestFactory,
    responseProcessor?: OAuthApiResponseProcessor
  ) {
    this.configuration = configuration
    this.requestFactory = requestFactory || new OAuthApiRequestFactory(configuration)
    this.responseProcessor = responseProcessor || new OAuthApiResponseProcessor()
  }

  /**
   * The operation issues an OAuth code which can be used in the OAuth code flow.
   * Issue a code.
   * @param inlineObject1
   */
  public oauthAuthorizePost(
    inlineObject1: InlineObject1,
    options?: Configuration
  ): Observable<InlineResponse2008> {
    const requestContextPromise = this.requestFactory.oauthAuthorizePost(
      inlineObject1,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.oauthAuthorizePost(rsp)
            )
          )
        })
      )
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
  ): Observable<InlineResponse2006> {
    const requestContextPromise = this.requestFactory.oauthClientsClientIdGet(
      clientId,
      responseType,
      redirectUri,
      scope,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) =>
              this.responseProcessor.oauthClientsClientIdGet(rsp)
            )
          )
        })
      )
  }

  /**
   * This operation issues an access token for an account.
   * Issue a token.
   * @param inlineObject
   */
  public oauthTokenPost(
    inlineObject: InlineObject,
    options?: Configuration
  ): Observable<InlineResponse2007> {
    const requestContextPromise = this.requestFactory.oauthTokenPost(
      inlineObject,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.oauthTokenPost(rsp))
          )
        })
      )
  }
}

export class ObservableTradingApi {
  private requestFactory: TradingApiRequestFactory
  private responseProcessor: TradingApiResponseProcessor
  private configuration: Configuration

  public constructor(
    configuration: Configuration,
    requestFactory?: TradingApiRequestFactory,
    responseProcessor?: TradingApiResponseProcessor
  ) {
    this.configuration = configuration
    this.requestFactory = requestFactory || new TradingApiRequestFactory(configuration)
    this.responseProcessor = responseProcessor || new TradingApiResponseProcessor()
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
  ): Observable<void> {
    const requestContextPromise = this.requestFactory.deleteOrder(
      accountId,
      orderId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.deleteOrder(rsp))
          )
        })
      )
  }

  /**
   * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
   * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
   * @param accountId Account identifier.
   */
  public deleteOrders(
    accountId: string,
    options?: Configuration
  ): Observable<Array<InlineResponse207>> {
    const requestContextPromise = this.requestFactory.deleteOrders(accountId, options)

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.deleteOrders(rsp))
          )
        })
      )
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
  ): Observable<OrderObject> {
    const requestContextPromise = this.requestFactory.getOrder(
      accountId,
      orderId,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.getOrder(rsp))
          )
        })
      )
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
  ): Observable<Array<OrderObject>> {
    const requestContextPromise = this.requestFactory.getOrders(
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

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.getOrders(rsp))
          )
        })
      )
  }

  /**
   * List open positions for an account
   * @param accountId Account identifier.
   */
  public getPositions(
    accountId: string,
    options?: Configuration
  ): Observable<Array<Position>> {
    const requestContextPromise = this.requestFactory.getPositions(accountId, options)

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.getPositions(rsp))
          )
        })
      )
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
  ): Observable<OrderObject> {
    const requestContextPromise = this.requestFactory.patchOrder(
      accountId,
      orderId,
      patchOrder,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.patchOrder(rsp))
          )
        })
      )
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
  ): Observable<OrderObject> {
    const requestContextPromise = this.requestFactory.postOrders(
      accountId,
      createOrder,
      options
    )

    // build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise)
    for (let middleware of this.configuration.middleware) {
      middlewarePreObservable = middlewarePreObservable.pipe(
        mergeMap((ctx: RequestContext) => middleware.pre(ctx))
      )
    }

    return middlewarePreObservable
      .pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)))
      .pipe(
        mergeMap((response: ResponseContext) => {
          let middlewarePostObservable = of(response)
          for (let middleware of this.configuration.middleware) {
            middlewarePostObservable = middlewarePostObservable.pipe(
              mergeMap((rsp: ResponseContext) => middleware.post(rsp))
            )
          }
          return middlewarePostObservable.pipe(
            map((rsp: ResponseContext) => this.responseProcessor.postOrders(rsp))
          )
        })
      )
  }
}

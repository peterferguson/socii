"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseTradingApi = exports.PromisePortfolioApi = exports.PromiseOAuthApi = exports.PromiseJournalsApi = exports.PromiseFundingApi = exports.PromiseEventsApi = exports.PromiseDocumentsApi = exports.PromiseClockApi = exports.PromiseCalendarApi = exports.PromiseAssetsApi = exports.PromiseAccountsApi = void 0;
const ObservableAPI_1 = require("./ObservableAPI");
class PromiseAccountsApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableAccountsApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Upload a document to an already existing account
     * @param accountId Account identifier.
     * @param documentUpload
     */
    accountsAccountIdDocumentsUploadPost(accountId, documentUpload, options) {
        const result = this.api.accountsAccountIdDocumentsUploadPost(accountId, documentUpload, options);
        return result.toPromise();
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
    accountsActivitiesActivityTypeGet(activityType, date, until, after, direction, accountId, pageSize, pageToken, options) {
        const result = this.api.accountsActivitiesActivityTypeGet(activityType, date, until, after, direction, accountId, pageSize, pageToken, options);
        return result.toPromise();
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
    accountsActivitiesGet(date, until, after, direction, accountId, pageSize, pageToken, options) {
        const result = this.api.accountsActivitiesGet(date, until, after, direction, accountId, pageSize, pageToken, options);
        return result.toPromise();
    }
    /**
     * Retrieve all accounts
     * @param query The query supports partial match of account number, names, emails, etc.. Items can be space delimited.
     */
    accountsGet(query, options) {
        const result = this.api.accountsGet(query, options);
        return result.toPromise();
    }
    /**
     * Create an account
     * @param accountCreationObject
     */
    accountsPost(accountCreationObject, options) {
        const result = this.api.accountsPost(accountCreationObject, options);
        return result.toPromise();
    }
    /**
     * Request to close an account
     * @param accountId Account identifier.
     */
    deleteAccount(accountId, options) {
        const result = this.api.deleteAccount(accountId, options);
        return result.toPromise();
    }
    /**
     * Delete an existing ACH relationship
     * @param accountId Account identifier.
     * @param achRelationshipId ACH relationship identifier
     */
    deleteAchRelationship(accountId, achRelationshipId, options) {
        const result = this.api.deleteAchRelationship(accountId, achRelationshipId, options);
        return result.toPromise();
    }
    /**
     * Delete a Bank Relationship for an account
     * @param accountId Account identifier.
     * @param bankId
     */
    deleteRecipientBank(accountId, bankId, options) {
        const result = this.api.deleteRecipientBank(accountId, bankId, options);
        return result.toPromise();
    }
    /**
     * Request to close a transfer
     * @param accountId
     * @param transferId
     */
    deleteTransfer(accountId, transferId, options) {
        const result = this.api.deleteTransfer(accountId, transferId, options);
        return result.toPromise();
    }
    /**
     * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
     * Subscribe to account status events (SSE).
     * @param since
     * @param until
     * @param sinceId
     * @param untilId
     */
    eventsAccountsStatusGet(since, until, sinceId, untilId, options) {
        const result = this.api.eventsAccountsStatusGet(since, until, sinceId, untilId, options);
        return result.toPromise();
    }
    /**
     * The response is an Account model.
     * Retrieve an account.
     * @param accountId Account identifier.
     */
    getAccount(accountId, options) {
        const result = this.api.getAccount(accountId, options);
        return result.toPromise();
    }
    /**
     * Retrieve ACH Relationships for an account
     * @param accountId Account identifier.
     * @param statuses Comma-separated status values
     */
    getAchRelationships(accountId, statuses, options) {
        const result = this.api.getAchRelationships(accountId, statuses, options);
        return result.toPromise();
    }
    /**
     * Retrieve bank relationships for an account
     * @param accountId
     * @param status
     * @param bankName
     */
    getRecipientBanks(accountId, status, bankName, options) {
        const result = this.api.getRecipientBanks(accountId, status, bankName, options);
        return result.toPromise();
    }
    /**
     * The response is a Trading Account model.
     * Retrieve trading details for an account.
     * @param accountId Account identifier.
     */
    getTradingAccount(accountId, options) {
        const result = this.api.getTradingAccount(accountId, options);
        return result.toPromise();
    }
    /**
     * You can filter requested transfers by values such as direction and status.
     * Return a list of transfers for an account.
     * @param accountId
     * @param direction
     * @param limit
     * @param offset
     */
    getTransfers(accountId, direction, limit, offset, options) {
        const result = this.api.getTransfers(accountId, direction, limit, offset, options);
        return result.toPromise();
    }
    /**
     * Update an account
     * @param accountId Account identifier.
     * @param accountUpdate
     */
    patchAccount(accountId, accountUpdate, options) {
        const result = this.api.patchAccount(accountId, accountUpdate, options);
        return result.toPromise();
    }
    /**
     * Create an ACH Relationship
     * @param accountId Account identifier.
     * @param aCHRelationshipData
     */
    postAchRelationships(accountId, aCHRelationshipData, options) {
        const result = this.api.postAchRelationships(accountId, aCHRelationshipData, options);
        return result.toPromise();
    }
    /**
     * Create a Bank Relationship for an account
     * @param accountId Account identifier.
     * @param bankData
     */
    postRecipientBanks(accountId, bankData, options) {
        const result = this.api.postRecipientBanks(accountId, bankData, options);
        return result.toPromise();
    }
    /**
     * This operation allows you to fund an account with virtual money in the sandbox environment.
     * Request a new transfer
     * @param accountId
     * @param transferData
     */
    postTransfers(accountId, transferData, options) {
        const result = this.api.postTransfers(accountId, transferData, options);
        return result.toPromise();
    }
}
exports.PromiseAccountsApi = PromiseAccountsApi;
class PromiseAssetsApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableAssetsApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Returns the requested asset, if found
     * Retrieve an asset by UUID
     * @param assetId The UUID of the required asset
     */
    assetsAssetIdGet(assetId, options) {
        const result = this.api.assetsAssetIdGet(assetId, options);
        return result.toPromise();
    }
    /**
     * Returns the requested asset, if found
     * Retrieve an asset by symbol
     * @param symbol The symbol of the required asset
     */
    assetsSymbolGet(symbol, options) {
        const result = this.api.assetsSymbolGet(symbol, options);
        return result.toPromise();
    }
    /**
     * Returns all assets
     * Retrieve all assets
     */
    getAssets(options) {
        const result = this.api.getAssets(options);
        return result.toPromise();
    }
}
exports.PromiseAssetsApi = PromiseAssetsApi;
class PromiseCalendarApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableCalendarApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Query market calendar
     * @param start The first date to retrieve data for. (Inclusive)
     * @param end The last date to retrieve data for. (Inclusive)
     */
    calendarGet(start, end, options) {
        const result = this.api.calendarGet(start, end, options);
        return result.toPromise();
    }
}
exports.PromiseCalendarApi = PromiseCalendarApi;
class PromiseClockApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableClockApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Query market clock
     */
    clockGet(options) {
        const result = this.api.clockGet(options);
        return result.toPromise();
    }
}
exports.PromiseClockApi = PromiseClockApi;
class PromiseDocumentsApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableDocumentsApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
     * Download a document file that belongs to an account.
     * @param accountId Account identifier.
     * @param documentId
     */
    accountsAccountIdDocumentsDocumentIdDownloadGet(accountId, documentId, options) {
        const result = this.api.accountsAccountIdDocumentsDocumentIdDownloadGet(accountId, documentId, options);
        return result.toPromise();
    }
    /**
     * You can query account documents such as monthly  statements and trade confirms under an account.
     * Return a list of account documents.
     * @param accountId Account identifier.
     * @param startDate optional date value to filter the list (inclusive).
     * @param endDate optional date value to filter the list (inclusive).
     */
    accountsAccountIdDocumentsGet(accountId, startDate, endDate, options) {
        const result = this.api.accountsAccountIdDocumentsGet(accountId, startDate, endDate, options);
        return result.toPromise();
    }
    /**
     * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
     * Download a document file directly
     * @param documentId
     */
    documentsDocumentIdGet(documentId, options) {
        const result = this.api.documentsDocumentIdGet(documentId, options);
        return result.toPromise();
    }
}
exports.PromiseDocumentsApi = PromiseDocumentsApi;
class PromiseEventsApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableEventsApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
     * Subscribe to account status events (SSE).
     * @param since
     * @param until
     * @param sinceId
     * @param untilId
     */
    eventsAccountsStatusGet(since, until, sinceId, untilId, options) {
        const result = this.api.eventsAccountsStatusGet(since, until, sinceId, untilId, options);
        return result.toPromise();
    }
    /**
     * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
     * Subscribe to journal events (SSE).
     * @param since
     * @param until
     * @param sinceId
     * @param untilId
     */
    eventsJournalsStatusGet(since, until, sinceId, untilId, options) {
        const result = this.api.eventsJournalsStatusGet(since, until, sinceId, untilId, options);
        return result.toPromise();
    }
}
exports.PromiseEventsApi = PromiseEventsApi;
class PromiseFundingApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableFundingApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Delete an existing ACH relationship
     * @param accountId Account identifier.
     * @param achRelationshipId ACH relationship identifier
     */
    deleteAchRelationship(accountId, achRelationshipId, options) {
        const result = this.api.deleteAchRelationship(accountId, achRelationshipId, options);
        return result.toPromise();
    }
    /**
     * Delete a Bank Relationship for an account
     * @param accountId Account identifier.
     * @param bankId
     */
    deleteRecipientBank(accountId, bankId, options) {
        const result = this.api.deleteRecipientBank(accountId, bankId, options);
        return result.toPromise();
    }
    /**
     * Request to close a transfer
     * @param accountId
     * @param transferId
     */
    deleteTransfer(accountId, transferId, options) {
        const result = this.api.deleteTransfer(accountId, transferId, options);
        return result.toPromise();
    }
    /**
     * Retrieve ACH Relationships for an account
     * @param accountId Account identifier.
     * @param statuses Comma-separated status values
     */
    getAchRelationships(accountId, statuses, options) {
        const result = this.api.getAchRelationships(accountId, statuses, options);
        return result.toPromise();
    }
    /**
     * Retrieve bank relationships for an account
     * @param accountId
     * @param status
     * @param bankName
     */
    getRecipientBanks(accountId, status, bankName, options) {
        const result = this.api.getRecipientBanks(accountId, status, bankName, options);
        return result.toPromise();
    }
    /**
     * You can filter requested transfers by values such as direction and status.
     * Return a list of transfers for an account.
     * @param accountId
     * @param direction
     * @param limit
     * @param offset
     */
    getTransfers(accountId, direction, limit, offset, options) {
        const result = this.api.getTransfers(accountId, direction, limit, offset, options);
        return result.toPromise();
    }
    /**
     * Create an ACH Relationship
     * @param accountId Account identifier.
     * @param aCHRelationshipData
     */
    postAchRelationships(accountId, aCHRelationshipData, options) {
        const result = this.api.postAchRelationships(accountId, aCHRelationshipData, options);
        return result.toPromise();
    }
    /**
     * Create a Bank Relationship for an account
     * @param accountId Account identifier.
     * @param bankData
     */
    postRecipientBanks(accountId, bankData, options) {
        const result = this.api.postRecipientBanks(accountId, bankData, options);
        return result.toPromise();
    }
    /**
     * This operation allows you to fund an account with virtual money in the sandbox environment.
     * Request a new transfer
     * @param accountId
     * @param transferData
     */
    postTransfers(accountId, transferData, options) {
        const result = this.api.postTransfers(accountId, transferData, options);
        return result.toPromise();
    }
}
exports.PromiseFundingApi = PromiseFundingApi;
class PromiseJournalsApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableJournalsApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * You can cancel journals while they are in the pending status. An attempt to cancel already-executed journals will return an error.
     * Cancel a pending journal.
     * @param journalId
     */
    deleteJournal(journalId, options) {
        const result = this.api.deleteJournal(journalId, options);
        return result.toPromise();
    }
    /**
     * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
     * Subscribe to journal events (SSE).
     * @param since
     * @param until
     * @param sinceId
     * @param untilId
     */
    eventsJournalsStatusGet(since, until, sinceId, untilId, options) {
        const result = this.api.eventsJournalsStatusGet(since, until, sinceId, untilId, options);
        return result.toPromise();
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
    getJournals(after, before, status, entryType, toAccount, fromAccount, options) {
        const result = this.api.getJournals(after, before, status, entryType, toAccount, fromAccount, options);
        return result.toPromise();
    }
    /**
     * A journal can be JNLC (move cash) or JNLS (move shares), dictated by `entry_type`. Generally, journal requests are subject to approval and starts from the `pending` status. The status changes are propagated through the Event API. Under certain conditions agreed for the partner, such journal transactions that meet the criteria are executed right away.
     * Request a journal.
     * @param journalData
     */
    postJournals(journalData, options) {
        const result = this.api.postJournals(journalData, options);
        return result.toPromise();
    }
    /**
     * Create a batch journal
     * @param batchJournalRequest
     */
    postJournalsBatch(batchJournalRequest, options) {
        const result = this.api.postJournalsBatch(batchJournalRequest, options);
        return result.toPromise();
    }
}
exports.PromiseJournalsApi = PromiseJournalsApi;
class PromiseOAuthApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableOAuthApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * The operation issues an OAuth code which can be used in the OAuth code flow.
     * Issue a code.
     * @param inlineObject1
     */
    oauthAuthorizePost(inlineObject1, options) {
        const result = this.api.oauthAuthorizePost(inlineObject1, options);
        return result.toPromise();
    }
    /**
     * The endpoint returns the details of OAuth client to display in the authorization page.
     * Returns an OAuth client.
     * @param clientId
     * @param responseType
     * @param redirectUri
     * @param scope
     */
    oauthClientsClientIdGet(clientId, responseType, redirectUri, scope, options) {
        const result = this.api.oauthClientsClientIdGet(clientId, responseType, redirectUri, scope, options);
        return result.toPromise();
    }
    /**
     * This operation issues an access token for an account.
     * Issue a token.
     * @param inlineObject
     */
    oauthTokenPost(inlineObject, options) {
        const result = this.api.oauthTokenPost(inlineObject, options);
        return result.toPromise();
    }
}
exports.PromiseOAuthApi = PromiseOAuthApi;
class PromisePortfolioApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservablePortfolioApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Get timeseries data for equity and profit loss information of the account
     * @param accountId Account identifier.
     * @param period The duration of the data in number + unit, such as 1D
     * @param timeframe The resolution of time window
     * @param dateEnd The date the data is returned up to, in “YYYY-MM-DD” format. Defaults to the current market date (rolls over at the market open if extended_hours is false, otherwise at 7am ET)
     * @param extendedHours If true, include extended hours in the result
     */
    getPortfolioHistory(accountId, period, timeframe, dateEnd, extendedHours, options) {
        const result = this.api.getPortfolioHistory(accountId, period, timeframe, dateEnd, extendedHours, options);
        return result.toPromise();
    }
    /**
     * List open positions for an account
     * @param accountId Account identifier.
     */
    getPositions(accountId, options) {
        const result = this.api.getPositions(accountId, options);
        return result.toPromise();
    }
}
exports.PromisePortfolioApi = PromisePortfolioApi;
class PromiseTradingApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableTradingApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Attempts to cancel an open order.
     * Attempts to cancel an open order.
     * @param accountId Account identifier.
     * @param orderId Order identifier.
     */
    deleteOrder(accountId, orderId, options) {
        const result = this.api.deleteOrder(accountId, orderId, options);
        return result.toPromise();
    }
    /**
     * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
     * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
     * @param accountId Account identifier.
     */
    deleteOrders(accountId, options) {
        const result = this.api.deleteOrders(accountId, options);
        return result.toPromise();
    }
    /**
     * Retrieves a single order for the given order_id.
     * Retrieves a single order for the given order_id.
     * @param accountId Account identifier.
     * @param orderId Order identifier.
     */
    getOrder(accountId, orderId, options) {
        const result = this.api.getOrder(accountId, orderId, options);
        return result.toPromise();
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
    getOrders(accountId, status, limit, after, until, direction, nested, symbols, options) {
        const result = this.api.getOrders(accountId, status, limit, after, until, direction, nested, symbols, options);
        return result.toPromise();
    }
    /**
     * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
     * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
     * @param accountId Account identifier.
     * @param orderId Order identifier.
     * @param patchOrder
     */
    patchOrder(accountId, orderId, patchOrder, options) {
        const result = this.api.patchOrder(accountId, orderId, patchOrder, options);
        return result.toPromise();
    }
    /**
     * Create an order for an account.
     * Create an order for an account.
     * @param accountId Account identifier.
     * @param createOrder
     */
    postOrders(accountId, createOrder, options) {
        const result = this.api.postOrders(accountId, createOrder, options);
        return result.toPromise();
    }
}
exports.PromiseTradingApi = PromiseTradingApi;
//# sourceMappingURL=PromiseAPI.js.map
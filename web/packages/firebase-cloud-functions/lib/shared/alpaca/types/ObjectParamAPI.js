"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectTradingApi = exports.ObjectPortfolioApi = exports.ObjectOAuthApi = exports.ObjectJournalsApi = exports.ObjectFundingApi = exports.ObjectEventsApi = exports.ObjectDocumentsApi = exports.ObjectClockApi = exports.ObjectCalendarApi = exports.ObjectAssetsApi = exports.ObjectAccountsApi = void 0;
const ObservableAPI_1 = require("./ObservableAPI");
class ObjectAccountsApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableAccountsApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Upload a document to an already existing account
     * @param param the request object
     */
    accountsAccountIdDocumentsUploadPost(param, options) {
        return this.api
            .accountsAccountIdDocumentsUploadPost(param.accountId, param.documentUpload, options)
            .toPromise();
    }
    /**
     * Retrieve specific account activities
     * @param param the request object
     */
    accountsActivitiesActivityTypeGet(param, options) {
        return this.api
            .accountsActivitiesActivityTypeGet(param.activityType, param.date, param.until, param.after, param.direction, param.accountId, param.pageSize, param.pageToken, options)
            .toPromise();
    }
    /**
     * Retrieve account activities
     * @param param the request object
     */
    accountsActivitiesGet(param, options) {
        return this.api
            .accountsActivitiesGet(param.date, param.until, param.after, param.direction, param.accountId, param.pageSize, param.pageToken, options)
            .toPromise();
    }
    /**
     * Retrieve all accounts
     * @param param the request object
     */
    accountsGet(param, options) {
        return this.api.accountsGet(param.query, options).toPromise();
    }
    /**
     * Create an account
     * @param param the request object
     */
    accountsPost(param, options) {
        return this.api.accountsPost(param.accountCreationObject, options).toPromise();
    }
    /**
     * Request to close an account
     * @param param the request object
     */
    deleteAccount(param, options) {
        return this.api.deleteAccount(param.accountId, options).toPromise();
    }
    /**
     * Delete an existing ACH relationship
     * @param param the request object
     */
    deleteAchRelationship(param, options) {
        return this.api
            .deleteAchRelationship(param.accountId, param.achRelationshipId, options)
            .toPromise();
    }
    /**
     * Delete a Bank Relationship for an account
     * @param param the request object
     */
    deleteRecipientBank(param, options) {
        return this.api
            .deleteRecipientBank(param.accountId, param.bankId, options)
            .toPromise();
    }
    /**
     * Request to close a transfer
     * @param param the request object
     */
    deleteTransfer(param, options) {
        return this.api
            .deleteTransfer(param.accountId, param.transferId, options)
            .toPromise();
    }
    /**
     * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
     * Subscribe to account status events (SSE).
     * @param param the request object
     */
    eventsAccountsStatusGet(param, options) {
        return this.api
            .eventsAccountsStatusGet(param.since, param.until, param.sinceId, param.untilId, options)
            .toPromise();
    }
    /**
     * The response is an Account model.
     * Retrieve an account.
     * @param param the request object
     */
    getAccount(param, options) {
        return this.api.getAccount(param.accountId, options).toPromise();
    }
    /**
     * Retrieve ACH Relationships for an account
     * @param param the request object
     */
    getAchRelationships(param, options) {
        return this.api
            .getAchRelationships(param.accountId, param.statuses, options)
            .toPromise();
    }
    /**
     * Retrieve bank relationships for an account
     * @param param the request object
     */
    getRecipientBanks(param, options) {
        return this.api
            .getRecipientBanks(param.accountId, param.status, param.bankName, options)
            .toPromise();
    }
    /**
     * The response is a Trading Account model.
     * Retrieve trading details for an account.
     * @param param the request object
     */
    getTradingAccount(param, options) {
        return this.api.getTradingAccount(param.accountId, options).toPromise();
    }
    /**
     * You can filter requested transfers by values such as direction and status.
     * Return a list of transfers for an account.
     * @param param the request object
     */
    getTransfers(param, options) {
        return this.api
            .getTransfers(param.accountId, param.direction, param.limit, param.offset, options)
            .toPromise();
    }
    /**
     * Update an account
     * @param param the request object
     */
    patchAccount(param, options) {
        return this.api
            .patchAccount(param.accountId, param.accountUpdate, options)
            .toPromise();
    }
    /**
     * Create an ACH Relationship
     * @param param the request object
     */
    postAchRelationships(param, options) {
        return this.api
            .postAchRelationships(param.accountId, param.aCHRelationshipData, options)
            .toPromise();
    }
    /**
     * Create a Bank Relationship for an account
     * @param param the request object
     */
    postRecipientBanks(param, options) {
        return this.api
            .postRecipientBanks(param.accountId, param.bankData, options)
            .toPromise();
    }
    /**
     * This operation allows you to fund an account with virtual money in the sandbox environment.
     * Request a new transfer
     * @param param the request object
     */
    postTransfers(param, options) {
        return this.api
            .postTransfers(param.accountId, param.transferData, options)
            .toPromise();
    }
}
exports.ObjectAccountsApi = ObjectAccountsApi;
class ObjectAssetsApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableAssetsApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Returns the requested asset, if found
     * Retrieve an asset by UUID
     * @param param the request object
     */
    assetsAssetIdGet(param, options) {
        return this.api.assetsAssetIdGet(param.assetId, options).toPromise();
    }
    /**
     * Returns the requested asset, if found
     * Retrieve an asset by symbol
     * @param param the request object
     */
    assetsSymbolGet(param, options) {
        return this.api.assetsSymbolGet(param.symbol, options).toPromise();
    }
    /**
     * Returns all assets
     * Retrieve all assets
     * @param param the request object
     */
    getAssets(param, options) {
        return this.api.getAssets(options).toPromise();
    }
}
exports.ObjectAssetsApi = ObjectAssetsApi;
class ObjectCalendarApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableCalendarApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Query market calendar
     * @param param the request object
     */
    calendarGet(param, options) {
        return this.api.calendarGet(param.start, param.end, options).toPromise();
    }
}
exports.ObjectCalendarApi = ObjectCalendarApi;
class ObjectClockApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableClockApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Query market clock
     * @param param the request object
     */
    clockGet(param, options) {
        return this.api.clockGet(options).toPromise();
    }
}
exports.ObjectClockApi = ObjectClockApi;
class ObjectDocumentsApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableDocumentsApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
     * Download a document file that belongs to an account.
     * @param param the request object
     */
    accountsAccountIdDocumentsDocumentIdDownloadGet(param, options) {
        return this.api
            .accountsAccountIdDocumentsDocumentIdDownloadGet(param.accountId, param.documentId, options)
            .toPromise();
    }
    /**
     * You can query account documents such as monthly  statements and trade confirms under an account.
     * Return a list of account documents.
     * @param param the request object
     */
    accountsAccountIdDocumentsGet(param, options) {
        return this.api
            .accountsAccountIdDocumentsGet(param.accountId, param.startDate, param.endDate, options)
            .toPromise();
    }
    /**
     * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
     * Download a document file directly
     * @param param the request object
     */
    documentsDocumentIdGet(param, options) {
        return this.api.documentsDocumentIdGet(param.documentId, options).toPromise();
    }
}
exports.ObjectDocumentsApi = ObjectDocumentsApi;
class ObjectEventsApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableEventsApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
     * Subscribe to account status events (SSE).
     * @param param the request object
     */
    eventsAccountsStatusGet(param, options) {
        return this.api
            .eventsAccountsStatusGet(param.since, param.until, param.sinceId, param.untilId, options)
            .toPromise();
    }
    /**
     * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
     * Subscribe to journal events (SSE).
     * @param param the request object
     */
    eventsJournalsStatusGet(param, options) {
        return this.api
            .eventsJournalsStatusGet(param.since, param.until, param.sinceId, param.untilId, options)
            .toPromise();
    }
}
exports.ObjectEventsApi = ObjectEventsApi;
class ObjectFundingApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableFundingApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Delete an existing ACH relationship
     * @param param the request object
     */
    deleteAchRelationship(param, options) {
        return this.api
            .deleteAchRelationship(param.accountId, param.achRelationshipId, options)
            .toPromise();
    }
    /**
     * Delete a Bank Relationship for an account
     * @param param the request object
     */
    deleteRecipientBank(param, options) {
        return this.api
            .deleteRecipientBank(param.accountId, param.bankId, options)
            .toPromise();
    }
    /**
     * Request to close a transfer
     * @param param the request object
     */
    deleteTransfer(param, options) {
        return this.api
            .deleteTransfer(param.accountId, param.transferId, options)
            .toPromise();
    }
    /**
     * Retrieve ACH Relationships for an account
     * @param param the request object
     */
    getAchRelationships(param, options) {
        return this.api
            .getAchRelationships(param.accountId, param.statuses, options)
            .toPromise();
    }
    /**
     * Retrieve bank relationships for an account
     * @param param the request object
     */
    getRecipientBanks(param, options) {
        return this.api
            .getRecipientBanks(param.accountId, param.status, param.bankName, options)
            .toPromise();
    }
    /**
     * You can filter requested transfers by values such as direction and status.
     * Return a list of transfers for an account.
     * @param param the request object
     */
    getTransfers(param, options) {
        return this.api
            .getTransfers(param.accountId, param.direction, param.limit, param.offset, options)
            .toPromise();
    }
    /**
     * Create an ACH Relationship
     * @param param the request object
     */
    postAchRelationships(param, options) {
        return this.api
            .postAchRelationships(param.accountId, param.aCHRelationshipData, options)
            .toPromise();
    }
    /**
     * Create a Bank Relationship for an account
     * @param param the request object
     */
    postRecipientBanks(param, options) {
        return this.api
            .postRecipientBanks(param.accountId, param.bankData, options)
            .toPromise();
    }
    /**
     * This operation allows you to fund an account with virtual money in the sandbox environment.
     * Request a new transfer
     * @param param the request object
     */
    postTransfers(param, options) {
        return this.api
            .postTransfers(param.accountId, param.transferData, options)
            .toPromise();
    }
}
exports.ObjectFundingApi = ObjectFundingApi;
class ObjectJournalsApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableJournalsApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * You can cancel journals while they are in the pending status. An attempt to cancel already-executed journals will return an error.
     * Cancel a pending journal.
     * @param param the request object
     */
    deleteJournal(param, options) {
        return this.api.deleteJournal(param.journalId, options).toPromise();
    }
    /**
     * Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)
     * Subscribe to journal events (SSE).
     * @param param the request object
     */
    eventsJournalsStatusGet(param, options) {
        return this.api
            .eventsJournalsStatusGet(param.since, param.until, param.sinceId, param.untilId, options)
            .toPromise();
    }
    /**
     * Return a list of requested journals.
     * @param param the request object
     */
    getJournals(param, options) {
        return this.api
            .getJournals(param.after, param.before, param.status, param.entryType, param.toAccount, param.fromAccount, options)
            .toPromise();
    }
    /**
     * A journal can be JNLC (move cash) or JNLS (move shares), dictated by `entry_type`. Generally, journal requests are subject to approval and starts from the `pending` status. The status changes are propagated through the Event API. Under certain conditions agreed for the partner, such journal transactions that meet the criteria are executed right away.
     * Request a journal.
     * @param param the request object
     */
    postJournals(param, options) {
        return this.api.postJournals(param.journalData, options).toPromise();
    }
    /**
     * Create a batch journal
     * @param param the request object
     */
    postJournalsBatch(param, options) {
        return this.api.postJournalsBatch(param.batchJournalRequest, options).toPromise();
    }
}
exports.ObjectJournalsApi = ObjectJournalsApi;
class ObjectOAuthApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableOAuthApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * The operation issues an OAuth code which can be used in the OAuth code flow.
     * Issue a code.
     * @param param the request object
     */
    oauthAuthorizePost(param, options) {
        return this.api.oauthAuthorizePost(param.inlineObject1, options).toPromise();
    }
    /**
     * The endpoint returns the details of OAuth client to display in the authorization page.
     * Returns an OAuth client.
     * @param param the request object
     */
    oauthClientsClientIdGet(param, options) {
        return this.api
            .oauthClientsClientIdGet(param.clientId, param.responseType, param.redirectUri, param.scope, options)
            .toPromise();
    }
    /**
     * This operation issues an access token for an account.
     * Issue a token.
     * @param param the request object
     */
    oauthTokenPost(param, options) {
        return this.api.oauthTokenPost(param.inlineObject, options).toPromise();
    }
}
exports.ObjectOAuthApi = ObjectOAuthApi;
const ObservableAPI_2 = require("./ObservableAPI");
class ObjectPortfolioApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_2.ObservablePortfolioApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Get timeseries data for equity and profit loss information of the account
     * @param param the request object
     */
    getPortfolioHistory(param, options) {
        return this.api
            .getPortfolioHistory(param.accountId, param.period, param.timeframe, param.dateEnd, param.extendedHours, options)
            .toPromise();
    }
    /**
     * List open positions for an account
     * @param param the request object
     */
    getPositions(param, options) {
        return this.api.getPositions(param.accountId, options).toPromise();
    }
}
exports.ObjectPortfolioApi = ObjectPortfolioApi;
class ObjectTradingApi {
    api;
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableTradingApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Attempts to cancel an open order.
     * Attempts to cancel an open order.
     * @param param the request object
     */
    deleteOrder(param, options) {
        return this.api.deleteOrder(param.accountId, param.orderId, options).toPromise();
    }
    /**
     * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
     * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
     * @param param the request object
     */
    deleteOrders(param, options) {
        return this.api.deleteOrders(param.accountId, options).toPromise();
    }
    /**
     * Retrieves a single order for the given order_id.
     * Retrieves a single order for the given order_id.
     * @param param the request object
     */
    getOrder(param, options) {
        return this.api.getOrder(param.accountId, param.orderId, options).toPromise();
    }
    /**
     * Retrieves a list of orders for the account, filtered by the supplied query parameters.
     * Retrieves a list of orders for the account, filtered by the supplied query parameters.
     * @param param the request object
     */
    getOrders(param, options) {
        return this.api
            .getOrders(param.accountId, param.status, param.limit, param.after, param.until, param.direction, param.nested, param.symbols, options)
            .toPromise();
    }
    /**
     * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
     * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
     * @param param the request object
     */
    patchOrder(param, options) {
        return this.api
            .patchOrder(param.accountId, param.orderId, param.patchOrder, options)
            .toPromise();
    }
    /**
     * Create an order for an account.
     * Create an order for an account.
     * @param param the request object
     */
    postOrders(param, options) {
        return this.api.postOrders(param.accountId, param.createOrder, options).toPromise();
    }
}
exports.ObjectTradingApi = ObjectTradingApi;
//# sourceMappingURL=ObjectParamAPI.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableTradingApi = exports.ObservablePortfolioApi = exports.ObservableOAuthApi = exports.ObservableJournalsApi = exports.ObservableFundingApi = exports.ObservableEventsApi = exports.ObservableDocumentsApi = exports.ObservableClockApi = exports.ObservableCalendarApi = exports.ObservableAssetsApi = exports.ObservableAccountsApi = void 0;
const AccountsApi_1 = require("../apis/AccountsApi");
const AssetsApi_1 = require("../apis/AssetsApi");
const CalendarApi_1 = require("../apis/CalendarApi");
const ClockApi_1 = require("../apis/ClockApi");
const DocumentsApi_1 = require("../apis/DocumentsApi");
const EventsApi_1 = require("../apis/EventsApi");
const FundingApi_1 = require("../apis/FundingApi");
const JournalsApi_1 = require("../apis/JournalsApi");
const OAuthApi_1 = require("../apis/OAuthApi");
const TradingApi_1 = require("../apis/TradingApi");
const rxjsStub_1 = require("../rxjsStub");
class ObservableAccountsApi {
    requestFactory;
    responseProcessor;
    configuration;
    constructor(configuration, requestFactory, responseProcessor) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AccountsApi_1.AccountsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AccountsApi_1.AccountsApiResponseProcessor();
    }
    /**
     * Upload a document to an already existing account
     * @param accountId Account identifier.
     * @param documentUpload
     */
    accountsAccountIdDocumentsUploadPost(accountId, documentUpload, options) {
        const requestContextPromise = this.requestFactory.accountsAccountIdDocumentsUploadPost(accountId, documentUpload, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.accountsAccountIdDocumentsUploadPost(rsp)));
        }));
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
        const requestContextPromise = this.requestFactory.accountsActivitiesActivityTypeGet(activityType, date, until, after, direction, accountId, pageSize, pageToken, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.accountsActivitiesActivityTypeGet(rsp)));
        }));
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
        const requestContextPromise = this.requestFactory.accountsActivitiesGet(date, until, after, direction, accountId, pageSize, pageToken, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.accountsActivitiesGet(rsp)));
        }));
    }
    /**
     * Retrieve all accounts
     * @param query The query supports partial match of account number, names, emails, etc.. Items can be space delimited.
     */
    accountsGet(query, options) {
        const requestContextPromise = this.requestFactory.accountsGet(query, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.accountsGet(rsp)));
        }));
    }
    /**
     * Create an account
     * @param accountCreationObject
     */
    accountsPost(accountCreationObject, options) {
        const requestContextPromise = this.requestFactory.accountsPost(accountCreationObject, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.accountsPost(rsp)));
        }));
    }
    /**
     * Request to close an account
     * @param accountId Account identifier.
     */
    deleteAccount(accountId, options) {
        const requestContextPromise = this.requestFactory.deleteAccount(accountId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.deleteAccount(rsp)));
        }));
    }
    /**
     * Delete an existing ACH relationship
     * @param accountId Account identifier.
     * @param achRelationshipId ACH relationship identifier
     */
    deleteAchRelationship(accountId, achRelationshipId, options) {
        const requestContextPromise = this.requestFactory.deleteAchRelationship(accountId, achRelationshipId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.deleteAchRelationship(rsp)));
        }));
    }
    /**
     * Delete a Bank Relationship for an account
     * @param accountId Account identifier.
     * @param bankId
     */
    deleteRecipientBank(accountId, bankId, options) {
        const requestContextPromise = this.requestFactory.deleteRecipientBank(accountId, bankId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.deleteRecipientBank(rsp)));
        }));
    }
    /**
     * Request to close a transfer
     * @param accountId
     * @param transferId
     */
    deleteTransfer(accountId, transferId, options) {
        const requestContextPromise = this.requestFactory.deleteTransfer(accountId, transferId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.deleteTransfer(rsp)));
        }));
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
        const requestContextPromise = this.requestFactory.eventsAccountsStatusGet(since, until, sinceId, untilId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.eventsAccountsStatusGet(rsp)));
        }));
    }
    /**
     * The response is an Account model.
     * Retrieve an account.
     * @param accountId Account identifier.
     */
    getAccount(accountId, options) {
        const requestContextPromise = this.requestFactory.getAccount(accountId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getAccount(rsp)));
        }));
    }
    /**
     * Retrieve ACH Relationships for an account
     * @param accountId Account identifier.
     * @param statuses Comma-separated status values
     */
    getAchRelationships(accountId, statuses, options) {
        const requestContextPromise = this.requestFactory.getAchRelationships(accountId, statuses, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getAchRelationships(rsp)));
        }));
    }
    /**
     * Retrieve bank relationships for an account
     * @param accountId
     * @param status
     * @param bankName
     */
    getRecipientBanks(accountId, status, bankName, options) {
        const requestContextPromise = this.requestFactory.getRecipientBanks(accountId, status, bankName, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getRecipientBanks(rsp)));
        }));
    }
    /**
     * The response is a Trading Account model.
     * Retrieve trading details for an account.
     * @param accountId Account identifier.
     */
    getTradingAccount(accountId, options) {
        const requestContextPromise = this.requestFactory.getTradingAccount(accountId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getTradingAccount(rsp)));
        }));
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
        const requestContextPromise = this.requestFactory.getTransfers(accountId, direction, limit, offset, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getTransfers(rsp)));
        }));
    }
    /**
     * Update an account
     * @param accountId Account identifier.
     * @param accountUpdate
     */
    patchAccount(accountId, accountUpdate, options) {
        const requestContextPromise = this.requestFactory.patchAccount(accountId, accountUpdate, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.patchAccount(rsp)));
        }));
    }
    /**
     * Create an ACH Relationship
     * @param accountId Account identifier.
     * @param aCHRelationshipData
     */
    postAchRelationships(accountId, aCHRelationshipData, options) {
        const requestContextPromise = this.requestFactory.postAchRelationships(accountId, aCHRelationshipData, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.postAchRelationships(rsp)));
        }));
    }
    /**
     * Create a Bank Relationship for an account
     * @param accountId Account identifier.
     * @param bankData
     */
    postRecipientBanks(accountId, bankData, options) {
        const requestContextPromise = this.requestFactory.postRecipientBanks(accountId, bankData, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.postRecipientBanks(rsp)));
        }));
    }
    /**
     * This operation allows you to fund an account with virtual money in the sandbox environment.
     * Request a new transfer
     * @param accountId
     * @param transferData
     */
    postTransfers(accountId, transferData, options) {
        const requestContextPromise = this.requestFactory.postTransfers(accountId, transferData, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.postTransfers(rsp)));
        }));
    }
}
exports.ObservableAccountsApi = ObservableAccountsApi;
class ObservableAssetsApi {
    requestFactory;
    responseProcessor;
    configuration;
    constructor(configuration, requestFactory, responseProcessor) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AssetsApi_1.AssetsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AssetsApi_1.AssetsApiResponseProcessor();
    }
    /**
     * Returns the requested asset, if found
     * Retrieve an asset by UUID
     * @param assetId The UUID of the required asset
     */
    assetsAssetIdGet(assetId, options) {
        const requestContextPromise = this.requestFactory.assetsAssetIdGet(assetId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.assetsAssetIdGet(rsp)));
        }));
    }
    /**
     * Returns the requested asset, if found
     * Retrieve an asset by symbol
     * @param symbol The symbol of the required asset
     */
    assetsSymbolGet(symbol, options) {
        const requestContextPromise = this.requestFactory.assetsSymbolGet(symbol, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.assetsSymbolGet(rsp)));
        }));
    }
    /**
     * Returns all assets
     * Retrieve all assets
     */
    getAssets(options) {
        const requestContextPromise = this.requestFactory.getAssets(options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getAssets(rsp)));
        }));
    }
}
exports.ObservableAssetsApi = ObservableAssetsApi;
class ObservableCalendarApi {
    requestFactory;
    responseProcessor;
    configuration;
    constructor(configuration, requestFactory, responseProcessor) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new CalendarApi_1.CalendarApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new CalendarApi_1.CalendarApiResponseProcessor();
    }
    /**
     * Query market calendar
     * @param start The first date to retrieve data for. (Inclusive)
     * @param end The last date to retrieve data for. (Inclusive)
     */
    calendarGet(start, end, options) {
        const requestContextPromise = this.requestFactory.calendarGet(start, end, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.calendarGet(rsp)));
        }));
    }
}
exports.ObservableCalendarApi = ObservableCalendarApi;
class ObservableClockApi {
    requestFactory;
    responseProcessor;
    configuration;
    constructor(configuration, requestFactory, responseProcessor) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ClockApi_1.ClockApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ClockApi_1.ClockApiResponseProcessor();
    }
    /**
     * Query market clock
     */
    clockGet(options) {
        const requestContextPromise = this.requestFactory.clockGet(options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.clockGet(rsp)));
        }));
    }
}
exports.ObservableClockApi = ObservableClockApi;
class ObservableDocumentsApi {
    requestFactory;
    responseProcessor;
    configuration;
    constructor(configuration, requestFactory, responseProcessor) {
        this.configuration = configuration;
        this.requestFactory =
            requestFactory || new DocumentsApi_1.DocumentsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new DocumentsApi_1.DocumentsApiResponseProcessor();
    }
    /**
     * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
     * Download a document file that belongs to an account.
     * @param accountId Account identifier.
     * @param documentId
     */
    accountsAccountIdDocumentsDocumentIdDownloadGet(accountId, documentId, options) {
        const requestContextPromise = this.requestFactory.accountsAccountIdDocumentsDocumentIdDownloadGet(accountId, documentId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.accountsAccountIdDocumentsDocumentIdDownloadGet(rsp)));
        }));
    }
    /**
     * You can query account documents such as monthly  statements and trade confirms under an account.
     * Return a list of account documents.
     * @param accountId Account identifier.
     * @param startDate optional date value to filter the list (inclusive).
     * @param endDate optional date value to filter the list (inclusive).
     */
    accountsAccountIdDocumentsGet(accountId, startDate, endDate, options) {
        const requestContextPromise = this.requestFactory.accountsAccountIdDocumentsGet(accountId, startDate, endDate, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.accountsAccountIdDocumentsGet(rsp)));
        }));
    }
    /**
     * The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found.
     * Download a document file directly
     * @param documentId
     */
    documentsDocumentIdGet(documentId, options) {
        const requestContextPromise = this.requestFactory.documentsDocumentIdGet(documentId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.documentsDocumentIdGet(rsp)));
        }));
    }
}
exports.ObservableDocumentsApi = ObservableDocumentsApi;
class ObservableEventsApi {
    requestFactory;
    responseProcessor;
    configuration;
    constructor(configuration, requestFactory, responseProcessor) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new EventsApi_1.EventsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new EventsApi_1.EventsApiResponseProcessor();
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
        const requestContextPromise = this.requestFactory.eventsAccountsStatusGet(since, until, sinceId, untilId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.eventsAccountsStatusGet(rsp)));
        }));
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
        const requestContextPromise = this.requestFactory.eventsJournalsStatusGet(since, until, sinceId, untilId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.eventsJournalsStatusGet(rsp)));
        }));
    }
}
exports.ObservableEventsApi = ObservableEventsApi;
class ObservableFundingApi {
    requestFactory;
    responseProcessor;
    configuration;
    constructor(configuration, requestFactory, responseProcessor) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new FundingApi_1.FundingApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new FundingApi_1.FundingApiResponseProcessor();
    }
    /**
     * Delete an existing ACH relationship
     * @param accountId Account identifier.
     * @param achRelationshipId ACH relationship identifier
     */
    deleteAchRelationship(accountId, achRelationshipId, options) {
        const requestContextPromise = this.requestFactory.deleteAchRelationship(accountId, achRelationshipId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.deleteAchRelationship(rsp)));
        }));
    }
    /**
     * Delete a Bank Relationship for an account
     * @param accountId Account identifier.
     * @param bankId
     */
    deleteRecipientBank(accountId, bankId, options) {
        const requestContextPromise = this.requestFactory.deleteRecipientBank(accountId, bankId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.deleteRecipientBank(rsp)));
        }));
    }
    /**
     * Request to close a transfer
     * @param accountId
     * @param transferId
     */
    deleteTransfer(accountId, transferId, options) {
        const requestContextPromise = this.requestFactory.deleteTransfer(accountId, transferId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.deleteTransfer(rsp)));
        }));
    }
    /**
     * Retrieve ACH Relationships for an account
     * @param accountId Account identifier.
     * @param statuses Comma-separated status values
     */
    getAchRelationships(accountId, statuses, options) {
        const requestContextPromise = this.requestFactory.getAchRelationships(accountId, statuses, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getAchRelationships(rsp)));
        }));
    }
    /**
     * Retrieve bank relationships for an account
     * @param accountId
     * @param status
     * @param bankName
     */
    getRecipientBanks(accountId, status, bankName, options) {
        const requestContextPromise = this.requestFactory.getRecipientBanks(accountId, status, bankName, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getRecipientBanks(rsp)));
        }));
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
        const requestContextPromise = this.requestFactory.getTransfers(accountId, direction, limit, offset, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getTransfers(rsp)));
        }));
    }
    /**
     * Create an ACH Relationship
     * @param accountId Account identifier.
     * @param aCHRelationshipData
     */
    postAchRelationships(accountId, aCHRelationshipData, options) {
        const requestContextPromise = this.requestFactory.postAchRelationships(accountId, aCHRelationshipData, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.postAchRelationships(rsp)));
        }));
    }
    /**
     * Create a Bank Relationship for an account
     * @param accountId Account identifier.
     * @param bankData
     */
    postRecipientBanks(accountId, bankData, options) {
        const requestContextPromise = this.requestFactory.postRecipientBanks(accountId, bankData, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.postRecipientBanks(rsp)));
        }));
    }
    /**
     * This operation allows you to fund an account with virtual money in the sandbox environment.
     * Request a new transfer
     * @param accountId
     * @param transferData
     */
    postTransfers(accountId, transferData, options) {
        const requestContextPromise = this.requestFactory.postTransfers(accountId, transferData, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.postTransfers(rsp)));
        }));
    }
}
exports.ObservableFundingApi = ObservableFundingApi;
class ObservableJournalsApi {
    requestFactory;
    responseProcessor;
    configuration;
    constructor(configuration, requestFactory, responseProcessor) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new JournalsApi_1.JournalsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new JournalsApi_1.JournalsApiResponseProcessor();
    }
    /**
     * You can cancel journals while they are in the pending status. An attempt to cancel already-executed journals will return an error.
     * Cancel a pending journal.
     * @param journalId
     */
    deleteJournal(journalId, options) {
        const requestContextPromise = this.requestFactory.deleteJournal(journalId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.deleteJournal(rsp)));
        }));
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
        const requestContextPromise = this.requestFactory.eventsJournalsStatusGet(since, until, sinceId, untilId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.eventsJournalsStatusGet(rsp)));
        }));
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
        const requestContextPromise = this.requestFactory.getJournals(after, before, status, entryType, toAccount, fromAccount, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getJournals(rsp)));
        }));
    }
    /**
     * A journal can be JNLC (move cash) or JNLS (move shares), dictated by `entry_type`. Generally, journal requests are subject to approval and starts from the `pending` status. The status changes are propagated through the Event API. Under certain conditions agreed for the partner, such journal transactions that meet the criteria are executed right away.
     * Request a journal.
     * @param journalData
     */
    postJournals(journalData, options) {
        const requestContextPromise = this.requestFactory.postJournals(journalData, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.postJournals(rsp)));
        }));
    }
    /**
     * Create a batch journal
     * @param batchJournalRequest
     */
    postJournalsBatch(batchJournalRequest, options) {
        const requestContextPromise = this.requestFactory.postJournalsBatch(batchJournalRequest, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.postJournalsBatch(rsp)));
        }));
    }
}
exports.ObservableJournalsApi = ObservableJournalsApi;
class ObservableOAuthApi {
    requestFactory;
    responseProcessor;
    configuration;
    constructor(configuration, requestFactory, responseProcessor) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new OAuthApi_1.OAuthApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new OAuthApi_1.OAuthApiResponseProcessor();
    }
    /**
     * The operation issues an OAuth code which can be used in the OAuth code flow.
     * Issue a code.
     * @param inlineObject1
     */
    oauthAuthorizePost(inlineObject1, options) {
        const requestContextPromise = this.requestFactory.oauthAuthorizePost(inlineObject1, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.oauthAuthorizePost(rsp)));
        }));
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
        const requestContextPromise = this.requestFactory.oauthClientsClientIdGet(clientId, responseType, redirectUri, scope, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.oauthClientsClientIdGet(rsp)));
        }));
    }
    /**
     * This operation issues an access token for an account.
     * Issue a token.
     * @param inlineObject
     */
    oauthTokenPost(inlineObject, options) {
        const requestContextPromise = this.requestFactory.oauthTokenPost(inlineObject, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.oauthTokenPost(rsp)));
        }));
    }
}
exports.ObservableOAuthApi = ObservableOAuthApi;
const PortfolioApi_1 = require("../apis/PortfolioApi");
class ObservablePortfolioApi {
    requestFactory;
    responseProcessor;
    configuration;
    constructor(configuration, requestFactory, responseProcessor) {
        this.configuration = configuration;
        this.requestFactory =
            requestFactory || new PortfolioApi_1.PortfolioApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new PortfolioApi_1.PortfolioApiResponseProcessor();
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
        const requestContextPromise = this.requestFactory.getPortfolioHistory(accountId, period, timeframe, dateEnd, extendedHours, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getPortfolioHistory(rsp)));
        }));
    }
    /**
     * List open positions for an account
     * @param accountId Account identifier.
     */
    getPositions(accountId, options) {
        const requestContextPromise = this.requestFactory.getPositions(accountId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getPositions(rsp)));
        }));
    }
}
exports.ObservablePortfolioApi = ObservablePortfolioApi;
class ObservableTradingApi {
    requestFactory;
    responseProcessor;
    configuration;
    constructor(configuration, requestFactory, responseProcessor) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new TradingApi_1.TradingApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new TradingApi_1.TradingApiResponseProcessor();
    }
    /**
     * Attempts to cancel an open order.
     * Attempts to cancel an open order.
     * @param accountId Account identifier.
     * @param orderId Order identifier.
     */
    deleteOrder(accountId, orderId, options) {
        const requestContextPromise = this.requestFactory.deleteOrder(accountId, orderId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.deleteOrder(rsp)));
        }));
    }
    /**
     * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
     * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
     * @param accountId Account identifier.
     */
    deleteOrders(accountId, options) {
        const requestContextPromise = this.requestFactory.deleteOrders(accountId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.deleteOrders(rsp)));
        }));
    }
    /**
     * Retrieves a single order for the given order_id.
     * Retrieves a single order for the given order_id.
     * @param accountId Account identifier.
     * @param orderId Order identifier.
     */
    getOrder(accountId, orderId, options) {
        const requestContextPromise = this.requestFactory.getOrder(accountId, orderId, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getOrder(rsp)));
        }));
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
        const requestContextPromise = this.requestFactory.getOrders(accountId, status, limit, after, until, direction, nested, symbols, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.getOrders(rsp)));
        }));
    }
    /**
     * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
     * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
     * @param accountId Account identifier.
     * @param orderId Order identifier.
     * @param patchOrder
     */
    patchOrder(accountId, orderId, patchOrder, options) {
        const requestContextPromise = this.requestFactory.patchOrder(accountId, orderId, patchOrder, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.patchOrder(rsp)));
        }));
    }
    /**
     * Create an order for an account.
     * Create an order for an account.
     * @param accountId Account identifier.
     * @param createOrder
     */
    postOrders(accountId, createOrder, options) {
        const requestContextPromise = this.requestFactory.postOrders(accountId, createOrder, options);
        // build promise chain
        let middlewarePreObservable = (0, rxjsStub_1.from)(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe((0, rxjsStub_1.mergeMap)((ctx) => middleware.pre(ctx)));
        }
        return middlewarePreObservable
            .pipe((0, rxjsStub_1.mergeMap)((ctx) => this.configuration.httpApi.send(ctx)))
            .pipe((0, rxjsStub_1.mergeMap)((response) => {
            let middlewarePostObservable = (0, rxjsStub_1.of)(response);
            for (let middleware of this.configuration.middleware) {
                middlewarePostObservable = middlewarePostObservable.pipe((0, rxjsStub_1.mergeMap)((rsp) => middleware.post(rsp)));
            }
            return middlewarePostObservable.pipe((0, rxjsStub_1.map)((rsp) => this.responseProcessor.postOrders(rsp)));
        }));
    }
}
exports.ObservableTradingApi = ObservableTradingApi;
//# sourceMappingURL=ObservableAPI.js.map
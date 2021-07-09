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


import * as runtime from '../runtime';
import {
    CreateOrder,
    CreateOrderFromJSON,
    CreateOrderToJSON,
    InlineResponse207,
    InlineResponse207FromJSON,
    InlineResponse207ToJSON,
    OrderObject,
    OrderObjectFromJSON,
    OrderObjectToJSON,
    PatchOrder,
    PatchOrderFromJSON,
    PatchOrderToJSON,
    Position,
    PositionFromJSON,
    PositionToJSON,
} from '../models';

export interface DeleteOrderRequest {
    accountId: string;
    orderId: string;
}

export interface DeleteOrdersRequest {
    accountId: string;
}

export interface GetOrderRequest {
    accountId: string;
    orderId: string;
}

export interface GetOrdersRequest {
    accountId: string;
    status?: GetOrdersStatusEnum;
    limit?: number;
    after?: Date;
    until?: Date;
    direction?: GetOrdersDirectionEnum;
    nested?: boolean;
    symbols?: string;
}

export interface GetPositionsRequest {
    accountId: string;
}

export interface PatchOrderRequest {
    accountId: string;
    orderId: string;
    patchOrder: PatchOrder;
}

export interface PostOrdersRequest {
    accountId: string;
    createOrder: CreateOrder;
}

/**
 * 
 */
export class TradingApi extends runtime.BaseAPI {

    /**
     * Attempts to cancel an open order.
     * Attempts to cancel an open order.
     */
    async deleteOrderRaw(requestParameters: DeleteOrderRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteOrder.');
        }

        if (requestParameters.orderId === null || requestParameters.orderId === undefined) {
            throw new runtime.RequiredError('orderId','Required parameter requestParameters.orderId was null or undefined when calling deleteOrder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/trading/accounts/{account_id}/orders/{order_id}`.replace(`{${"account_id"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"order_id"}}`, encodeURIComponent(String(requestParameters.orderId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Attempts to cancel an open order.
     * Attempts to cancel an open order.
     */
    async deleteOrder(requestParameters: DeleteOrderRequest): Promise<void> {
        await this.deleteOrderRaw(requestParameters);
    }

    /**
     * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
     * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
     */
    async deleteOrdersRaw(requestParameters: DeleteOrdersRequest): Promise<runtime.ApiResponse<Array<InlineResponse207>>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteOrders.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/trading/accounts/{account_id}/orders`.replace(`{${"account_id"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(InlineResponse207FromJSON));
    }

    /**
     * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
     * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
     */
    async deleteOrders(requestParameters: DeleteOrdersRequest): Promise<Array<InlineResponse207>> {
        const response = await this.deleteOrdersRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieves a single order for the given order_id.
     * Retrieves a single order for the given order_id.
     */
    async getOrderRaw(requestParameters: GetOrderRequest): Promise<runtime.ApiResponse<OrderObject>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getOrder.');
        }

        if (requestParameters.orderId === null || requestParameters.orderId === undefined) {
            throw new runtime.RequiredError('orderId','Required parameter requestParameters.orderId was null or undefined when calling getOrder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/trading/accounts/{account_id}/orders/{order_id}`.replace(`{${"account_id"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"order_id"}}`, encodeURIComponent(String(requestParameters.orderId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderObjectFromJSON(jsonValue));
    }

    /**
     * Retrieves a single order for the given order_id.
     * Retrieves a single order for the given order_id.
     */
    async getOrder(requestParameters: GetOrderRequest): Promise<OrderObject> {
        const response = await this.getOrderRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieves a list of orders for the account, filtered by the supplied query parameters.
     * Retrieves a list of orders for the account, filtered by the supplied query parameters.
     */
    async getOrdersRaw(requestParameters: GetOrdersRequest): Promise<runtime.ApiResponse<Array<OrderObject>>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getOrders.');
        }

        const queryParameters: any = {};

        if (requestParameters.status !== undefined) {
            queryParameters['status'] = requestParameters.status;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.after !== undefined) {
            queryParameters['after'] = (requestParameters.after as any).toISOString();
        }

        if (requestParameters.until !== undefined) {
            queryParameters['until'] = (requestParameters.until as any).toISOString();
        }

        if (requestParameters.direction !== undefined) {
            queryParameters['direction'] = requestParameters.direction;
        }

        if (requestParameters.nested !== undefined) {
            queryParameters['nested'] = requestParameters.nested;
        }

        if (requestParameters.symbols !== undefined) {
            queryParameters['symbols'] = requestParameters.symbols;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/trading/accounts/{account_id}/orders`.replace(`{${"account_id"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OrderObjectFromJSON));
    }

    /**
     * Retrieves a list of orders for the account, filtered by the supplied query parameters.
     * Retrieves a list of orders for the account, filtered by the supplied query parameters.
     */
    async getOrders(requestParameters: GetOrdersRequest): Promise<Array<OrderObject>> {
        const response = await this.getOrdersRaw(requestParameters);
        return await response.value();
    }

    /**
     * List open positions for an account
     */
    async getPositionsRaw(requestParameters: GetPositionsRequest): Promise<runtime.ApiResponse<Array<Position>>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getPositions.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/trading/accounts/{account_id}/positions`.replace(`{${"account_id"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PositionFromJSON));
    }

    /**
     * List open positions for an account
     */
    async getPositions(requestParameters: GetPositionsRequest): Promise<Array<Position>> {
        const response = await this.getPositionsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
     * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
     */
    async patchOrderRaw(requestParameters: PatchOrderRequest): Promise<runtime.ApiResponse<OrderObject>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling patchOrder.');
        }

        if (requestParameters.orderId === null || requestParameters.orderId === undefined) {
            throw new runtime.RequiredError('orderId','Required parameter requestParameters.orderId was null or undefined when calling patchOrder.');
        }

        if (requestParameters.patchOrder === null || requestParameters.patchOrder === undefined) {
            throw new runtime.RequiredError('patchOrder','Required parameter requestParameters.patchOrder was null or undefined when calling patchOrder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/trading/accounts/{account_id}/orders/{order_id}`.replace(`{${"account_id"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"order_id"}}`, encodeURIComponent(String(requestParameters.orderId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PatchOrderToJSON(requestParameters.patchOrder),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderObjectFromJSON(jsonValue));
    }

    /**
     * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
     * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
     */
    async patchOrder(requestParameters: PatchOrderRequest): Promise<OrderObject> {
        const response = await this.patchOrderRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create an order for an account.
     * Create an order for an account.
     */
    async postOrdersRaw(requestParameters: PostOrdersRequest): Promise<runtime.ApiResponse<OrderObject>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling postOrders.');
        }

        if (requestParameters.createOrder === null || requestParameters.createOrder === undefined) {
            throw new runtime.RequiredError('createOrder','Required parameter requestParameters.createOrder was null or undefined when calling postOrders.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/trading/accounts/{account_id}/orders`.replace(`{${"account_id"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateOrderToJSON(requestParameters.createOrder),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderObjectFromJSON(jsonValue));
    }

    /**
     * Create an order for an account.
     * Create an order for an account.
     */
    async postOrders(requestParameters: PostOrdersRequest): Promise<OrderObject> {
        const response = await this.postOrdersRaw(requestParameters);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum GetOrdersStatusEnum {
    Open = 'open',
    Closed = 'closed',
    All = 'all'
}
/**
    * @export
    * @enum {string}
    */
export enum GetOrdersDirectionEnum {
    Asc = 'asc',
    Desc = 'desc'
}

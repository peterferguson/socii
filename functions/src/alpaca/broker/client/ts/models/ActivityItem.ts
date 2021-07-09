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

import { exists, mapValues } from '../runtime';
import {
    ActivityType,
    ActivityTypeFromJSON,
    ActivityTypeFromJSONTyped,
    ActivityTypeToJSON,
    NonTradeActivity,
    NonTradeActivityFromJSON,
    NonTradeActivityFromJSONTyped,
    NonTradeActivityToJSON,
    TradeActivity,
    TradeActivityFromJSON,
    TradeActivityFromJSONTyped,
    TradeActivityToJSON,
} from './';

/**
 * 
 * @export
 * @interface ActivityItem
 */
export interface ActivityItem {
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    accountId?: string;
    /**
     * 
     * @type {ActivityType}
     * @memberof ActivityItem
     */
    activityType?: ActivityType;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    transactionTime?: string;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    type?: ActivityItemTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    price?: string;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    qty?: string;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    side?: ActivityItemSideEnum;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    symbol?: string;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    leavesQty?: string;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    orderId?: string;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    cumQty?: string;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    orderStatus?: ActivityItemOrderStatusEnum;
    /**
     * 
     * @type {Date}
     * @memberof ActivityItem
     */
    date?: Date;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    netAmount?: string;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    status?: ActivityItemStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof ActivityItem
     */
    perShareAmount?: string;
}

/**
* @export
* @enum {string}
*/
export enum ActivityItemTypeEnum {
    Fill = 'fill',
    PartialFill = 'partial_fill'
}/**
* @export
* @enum {string}
*/
export enum ActivityItemSideEnum {
    Buy = 'buy',
    Sell = 'sell'
}/**
* @export
* @enum {string}
*/
export enum ActivityItemOrderStatusEnum {
    New = 'new',
    PartiallyFilled = 'partially_filled',
    Filled = 'filled',
    DoneForDay = 'done_for_day',
    Canceled = 'canceled',
    Expired = 'expired',
    Replaced = 'replaced',
    PendingCancel = 'pending_cancel',
    PendingReplace = 'pending_replace',
    Accepted = 'accepted',
    PendingNew = 'pending_new',
    AcceptedForBidding = 'accepted_for_bidding',
    Stopped = 'stopped',
    Rejected = 'rejected',
    Suspended = 'suspended',
    Calculated = 'calculated'
}/**
* @export
* @enum {string}
*/
export enum ActivityItemStatusEnum {
    Executed = 'executed',
    Correct = 'correct',
    Canceled = 'canceled'
}

export function ActivityItemFromJSON(json: any): ActivityItem {
    return ActivityItemFromJSONTyped(json, false);
}

export function ActivityItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): ActivityItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'accountId': !exists(json, 'account_id') ? undefined : json['account_id'],
        'activityType': !exists(json, 'activity_type') ? undefined : ActivityTypeFromJSON(json['activity_type']),
        'transactionTime': !exists(json, 'transaction_time') ? undefined : json['transaction_time'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'price': !exists(json, 'price') ? undefined : json['price'],
        'qty': !exists(json, 'qty') ? undefined : json['qty'],
        'side': !exists(json, 'side') ? undefined : json['side'],
        'symbol': !exists(json, 'symbol') ? undefined : json['symbol'],
        'leavesQty': !exists(json, 'leaves_qty') ? undefined : json['leaves_qty'],
        'orderId': !exists(json, 'order_id') ? undefined : json['order_id'],
        'cumQty': !exists(json, 'cum_qty') ? undefined : json['cum_qty'],
        'orderStatus': !exists(json, 'order_status') ? undefined : json['order_status'],
        'date': !exists(json, 'date') ? undefined : (new Date(json['date'])),
        'netAmount': !exists(json, 'net_amount') ? undefined : json['net_amount'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'perShareAmount': !exists(json, 'per_share_amount') ? undefined : json['per_share_amount'],
    };
}

export function ActivityItemToJSON(value?: ActivityItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'account_id': value.accountId,
        'activity_type': ActivityTypeToJSON(value.activityType),
        'transaction_time': value.transactionTime,
        'type': value.type,
        'price': value.price,
        'qty': value.qty,
        'side': value.side,
        'symbol': value.symbol,
        'leaves_qty': value.leavesQty,
        'order_id': value.orderId,
        'cum_qty': value.cumQty,
        'order_status': value.orderStatus,
        'date': value.date === undefined ? undefined : (value.date.toISOString().substr(0,10)),
        'net_amount': value.netAmount,
        'description': value.description,
        'status': value.status,
        'per_share_amount': value.perShareAmount,
    };
}


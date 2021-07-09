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
/**
 * 
 * @export
 * @interface Position
 */
export interface Position {
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    assetId?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    symbol?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    exchange?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    assetClass?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    avgEntryPrice?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    qty?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    side?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    marketValue?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    costBasis?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    unrealizedPl?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    unrealizedPlpc?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    unrealizedIntradayPl?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    unrealizedIntradayPlpc?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    currentPrice?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    lastdayPrice?: string;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    changeToday?: string;
}

export function PositionFromJSON(json: any): Position {
    return PositionFromJSONTyped(json, false);
}

export function PositionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Position {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'assetId': !exists(json, 'asset_id') ? undefined : json['asset_id'],
        'symbol': !exists(json, 'symbol') ? undefined : json['symbol'],
        'exchange': !exists(json, 'exchange') ? undefined : json['exchange'],
        'assetClass': !exists(json, 'asset_class') ? undefined : json['asset_class'],
        'avgEntryPrice': !exists(json, 'avg_entry_price') ? undefined : json['avg_entry_price'],
        'qty': !exists(json, 'qty') ? undefined : json['qty'],
        'side': !exists(json, 'side') ? undefined : json['side'],
        'marketValue': !exists(json, 'market_value') ? undefined : json['market_value'],
        'costBasis': !exists(json, 'cost_basis') ? undefined : json['cost_basis'],
        'unrealizedPl': !exists(json, 'unrealized_pl') ? undefined : json['unrealized_pl'],
        'unrealizedPlpc': !exists(json, 'unrealized_plpc') ? undefined : json['unrealized_plpc'],
        'unrealizedIntradayPl': !exists(json, 'unrealized_intraday_pl') ? undefined : json['unrealized_intraday_pl'],
        'unrealizedIntradayPlpc': !exists(json, 'unrealized_intraday_plpc') ? undefined : json['unrealized_intraday_plpc'],
        'currentPrice': !exists(json, 'current_price') ? undefined : json['current_price'],
        'lastdayPrice': !exists(json, 'lastday_price') ? undefined : json['lastday_price'],
        'changeToday': !exists(json, 'change_today') ? undefined : json['change_today'],
    };
}

export function PositionToJSON(value?: Position | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'asset_id': value.assetId,
        'symbol': value.symbol,
        'exchange': value.exchange,
        'asset_class': value.assetClass,
        'avg_entry_price': value.avgEntryPrice,
        'qty': value.qty,
        'side': value.side,
        'market_value': value.marketValue,
        'cost_basis': value.costBasis,
        'unrealized_pl': value.unrealizedPl,
        'unrealized_plpc': value.unrealizedPlpc,
        'unrealized_intraday_pl': value.unrealizedIntradayPl,
        'unrealized_intraday_plpc': value.unrealizedIntradayPlpc,
        'current_price': value.currentPrice,
        'lastday_price': value.lastdayPrice,
        'change_today': value.changeToday,
    };
}


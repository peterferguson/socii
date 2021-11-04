import io
import json
import logging
from typing import Any, Dict, List, Optional, Tuple, Union

import pandas as pd
import yahooquery as yq
from flask.wrappers import Request
from werkzeug.datastructures import MultiDict


def get_ticker(ticker_symbol: str) -> yq.Ticker:
    # - Ensure the ticker is in the correct format
    tickers = ticker_symbol.upper()

    for symbol in tickers.split(" "):
        assert (
            1 <= len(symbol) <= 6
        ), f"The provided `ticker_symbol` ({ticker_symbol}) must be between 1 & 5 Characters long"

    # TODO: Add yahoo ticker conversion i.e. London stocks should have .L suffix
    return yq.Ticker(tickers, asynchronous=True)


def get_json(request: Request) -> Tuple[Optional[Any], MultiDict[str, str]]:
    """Reduce boilerplate for GCP Cloud HTTP JSON Handling

    Args:
        request (Request): HTTP Request for parsing

    Returns:
        Union[Union[Any, None], MultiDict[str, str]]: JSON & args parsed from the request
    """
    return request.get_json(silent=True), request.args


def parse_symbol_from_request(symbol: str, request: Request) -> Optional[str]:
    """Parse a symbol (the key of a JSON key-value pair) from a request

    Args:
        symbol (str): [description]
        request (Request): [description]

    Returns:
        Optional[str]: [description]
    """
    _json, _args = get_json(request)
    if _json and symbol in _json:
        return _json[symbol]
    elif _args and symbol in _args:
        return _args[symbol]
    return None


def yahoo_ticker_from_request(request: Request) -> Optional[yq.Ticker]:
    """Parse the request for the ticker symbol key `tickerSymbol` and return the
        corresponding yahooquery Ticker object.

    Args:
        request (Request): GCP HTTP Function request

    Returns:
        Optional[yq.Ticker]: tickerSymbols yq.Ticker object
    """
    ticker_symbol = parse_symbol_from_request("tickerSymbol", request)

    if not ticker_symbol:
        return None

    return get_ticker(ticker_symbol)


def get_history(request: Request) -> Optional[List[Dict[str, Union[str, int]]]]:
    """Parse the request for the ticker symbol key `tickerSymbol` and return the
    history based on the following parameters:
        - `period`
        - `interval`
        - `start`
        - `end`
    """
    logging.info(f"Request: {request.json}")
    ticker = yahoo_ticker_from_request(request)
    period = parse_symbol_from_request("period", request) or "ytd"
    interval = parse_symbol_from_request("interval", request) or "1d"
    start = parse_symbol_from_request("start", request) or None
    end = parse_symbol_from_request("end", request) or None

    if not ticker:
        return None

    buffer = io.StringIO()
    history = ticker.history(period=period, interval=interval, start=start, end=end)

    if type(history) == dict:
        """
        On the first day of the time period passed in, the history is a dict
        The data is more of a meta data object, so converting the meta to a dataframe
        """
        logging.info(f"history returned a dict: {json.dumps(history)}")
        return [
            {
                "symbol": ticker,
                "timestamp": data["meta"]["regularMarketTime"],
                "close": data["meta"]["chartPreviousClose"],
            }
            for ticker, data in history.items()
        ]

    history = history.reset_index()
    history.info(buf=buffer)
    logging.info(f"history dataframe info: {buffer.getvalue()}")
    history.date = pd.to_datetime(history.date).map(lambda x: int(x.timestamp() * 1000))
    history.rename(columns={"date": "timestamp"}, inplace=True)
    return history.fillna("").to_dict(orient="records")


# - Some problem with the yahoo finance api... just do this client side

# def get_exchange_rate(request: Request) -> Optional[Dict[str, Union[str, int]]]:
#     """Gets the exchange rate for the currency pair `fromCurrency`-`toCurrency` of params
#         `fromCurrency` and `toCurrency`

#     Args:
#         request (Request): GCP HTTP Function request

#     Returns:
#         Optional[Dict[str, Union[str, int]]]: exchange rate as a dictionary
#     """
#     fromCurrency = parse_symbol_from_request("fromCurrency", request)
#     toCurrency = parse_symbol_from_request("toCurrency", request)
#     period = parse_symbol_from_request("period", request) or "day"

#     if not fromCurrency or not toCurrency:
#         return None

#     print(yq.currency_converter(fromCurrency, toCurrency, period))
#     return yq.currency_converter(fromCurrency, toCurrency, period)

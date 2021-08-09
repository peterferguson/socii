from typing import Any, Dict, List, Optional, Tuple, Union

import pandas as pd
import yahooquery as yq
from flask.wrappers import Request
from werkzeug.datastructures import MultiDict


def get_ticker(ticker_symbol: str) -> yq.Ticker:
    # - Ensure the ticker is in the correct format
    ticker = ticker_symbol.upper()
    assert (
        1 < len(ticker) <= 6
    ), "The provided `ticker_symbol` must be between 1 & 5 Characters long"
    # TODO: Add yahoo ticker conversion i.e. London stocks should have .L suffix
    return yq.Ticker(ticker)


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
    ticker = yahoo_ticker_from_request(request)
    period = parse_symbol_from_request("period", request) or "ytd"
    interval = parse_symbol_from_request("interval", request) or "1d"
    start = parse_symbol_from_request("start", request) or None
    end = parse_symbol_from_request("end", request) or None

    if not ticker:
        return None

    history = (
        ticker.history(period=period, interval=interval, start=start, end=end)
        .reset_index()
        .set_index("symbol")
    )
    history.date = pd.to_datetime(history.date).map(lambda x: int(x.timestamp() * 1000))
    history.rename(columns={"date": "timestamp"}, inplace=True)
    return history.to_dict(orient="records")

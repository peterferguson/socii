import json
import os
import sys
from unittest.mock import Mock

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import pandas as pd
import yahoo.main as main
from yahoo.utils.constants import key_stats_keys


def test_get_yahoo_news():
    ticker = "TSLA"
    data = {"tickerSymbol": ticker}
    req = Mock(get_json=Mock(return_value=data), args=data)

    assert main.get_news(req)


def test_get_summary_detail_is_json():
    ticker = "TSLA"
    data = {"tickerSymbol": ticker}
    req = Mock(get_json=Mock(return_value=data), args=data)

    assert isinstance(json.loads(main.get_summary_detail(req)), dict)


def test_get_summary_detail():
    ticker = "TSLA"
    data = {"tickerSymbol": ticker}
    req = Mock(get_json=Mock(return_value=data), args=data)

    assert main.get_key_summary(req)


def test_get_key_stats_has_correct_schema():

    ticker = "TSLA"
    data = {"tickerSymbol": ticker}
    req = Mock(get_json=Mock(return_value=data), args=data)

    assert all(
        [
            key in key_stats_keys
            for _, ticker_stats in json.loads(main.get_key_summary(req)).items()
            for key in ticker_stats.keys()
        ]
    )


def test_get_historical_prices_returns_ohlc_dict():
    # TODO: Create a model for the data structure of the historical prices
    ticker = "TSLA"
    data = {"tickerSymbol": ticker}
    req = Mock(get_json=Mock(return_value=data), args=data)

    result = json.loads(main.get_historical_prices(req))

    assert isinstance(result, list)
    assert isinstance(result[0], dict)
    assert all(
        [
            key
            for key in result[0].keys()
            if key
            in ["open", "high", "low", "close", "volume", "adjclose", "timestamp"]
        ]
    )


def test_get_currency_exchange_rate_returns_conversion_dict():
    # TODO: Create a model for the data structure of the conversion
    data = {"fromCurrency": "USD", "toCurrency": "GBP"}
    req = Mock(get_json=Mock(return_value=data), args=data)

    result = json.loads(main.get_currency_exchange_rate(req))

    assert isinstance(result, dict)
    assert all([key for key in result.keys() if key in ["rate", "lastRefresh"]])

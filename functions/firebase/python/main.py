import json
import os
import sys

# Imports the Cloud Logging client library
import google.cloud.logging
import yahooquery as yq
from flask.wrappers import Request

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from utils.helper import get_history, yahoo_ticker_from_request
from utils.middleware import cors

if __name__ != "__main__":
    # Instantiates a client
    client = google.cloud.logging.Client()

    # Retrieves a Cloud Logging handler based on the environment
    # you're running in and integrates the handler with the
    # Python logging module. By default this captures all logs
    # at INFO level and higher
    client.get_default_handler()
    client.setup_logging()

""" The following are a colleciton of HTTP Cloud Functions to be deployed on gcp.
    They are all HTTP functions and will use the yahooquery python library.

    The first argument of each function is a flask.Request object:
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>

    And each will be able to return any object that can be turned into a flask.Response 
    object using `make_response`:
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
"""


def get_news(request: Request) -> str:
    ticker = yahoo_ticker_from_request(request)
    return json.dumps(ticker.news())


def get_summary_detail(request: Request) -> str:
    ticker = yahoo_ticker_from_request(request)
    return json.dumps(ticker.summary_detail)


def get_key_summary(request: Request) -> str:
    ticker = yahoo_ticker_from_request(request)
    return json.dumps(ticker.key_stats)


@cors(methods=["POST"])
def get_historical_prices(request: Request) -> str:
    history = get_history(request)
    return json.dumps(history)


if __name__ == "__main__":
    from rich import print

    ticker = yq.Ticker("AAPL TSLA NFLX")
    print(ticker.history().reset_index().to_dict(orient="records"))
    # print(ticker.history().reset_index().set_index("symbol").to_dict("records"))

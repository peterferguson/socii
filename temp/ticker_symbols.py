from time import sleep
import json
from typing import Union
import requests

import yahooquery as yq
from rich import print
import firebase_admin
from firebase_admin import firestore, storage
from tqdm import tqdm

# Helper Functions
def willItFloat(string: str) -> Union[str, float]:
    try:
        return float(string)
    except ValueError:
        return string


def camelCase(string: str) -> str:
    return (
        string[0].lower() + string[1:]
        if not all(x.isupper() for x in string[:2])
        else string
    )


def yahooData(isin: str, exchanges=yq.get_exchanges().to_dict("records")):
    isin_search = yq.search(isin, first_quote=True)

    if "symbol" not in isin_search:
        return {
            "exchangeAbbreviation": "",
            "shortName": "",
            "assetType": "",
            "tickerSymbol": "",
            "longName": "",
            "marketCountry": "",
            "marketName": "",
            "yahooMarketSuffix": "",
            "ISIN": isin,
        }

    suffix = isin_search["symbol"].split(".")[1] if "." in isin_search["symbol"] else ""

    keys_mapping = {
        "exchange": "exchangeAbbreviation",
        "shortname": "shortName",
        "quoteType": "assetType",
        "symbol": "tickerSymbol",
        "longname": "longName",
        "Country": "marketCountry",
        "Market, or Index": "marketName",
        "Suffix": "yahooMarketSuffix",
        "ISIN": "ISIN",
    }

    markets = [market for market in exchanges if "." + suffix == market["Suffix"]]
    market = (
        markets[0]
        if markets
        else {
            "Country": "United States of America",
            "Market, or Index": "",
            "Suffix": "",
        }
    )

    data = {
        **isin_search,
        **market,
        **{"ISIN": isin},
    }

    return {
        **{keys_mapping[k]: v for k, v in data.items() if k in keys_mapping},
        **{"timestamp": firestore.SERVER_TIMESTAMP},
    }


def yahooDataToFirestore(isin: str, is_popular: bool = False):
    data = yahooData(isin)
    if is_popular:
        data = {**data, **{"isPopular": True}}
    client.document(f"tickers/{isin}").set(data)


def alphaVantageDataToFirestore(
    ticker: str, query_params: dict[str, str] = {"function": "OVERVIEW"}
):
    base_url = "https://www.alphavantage.co/query?"
    api_key = "&apikey=E9W8LZBTXVYZ31IO"
    symbol = f"&symbol={ticker}"
    params = "&".join([f"{param}={value}" for param, value in query_params.items()])

    data = requests.get(base_url + params + symbol + api_key).json()

    if "note" in data and "Alpha Vantange" in data['note']:
        # API call limit reached ... return without writing to Firestore
        print(f"API call limit reached for {ticker}")
        return

    data = {camelCase(k): willItFloat(v) for k, v in data.items() if "None" not in v}
    
    data["lastUpdate"] = firestore.SERVER_TIMESTAMP

    isin = tickerToISIN(ticker)
    client.document(f"tickers/{isin}/data/alphaVantage").set(data)


def yahooSummaryToFirestore(ticker: str = ""):
    isin = tickerToISIN(ticker)

    ticker_ref = yq.Ticker(ticker)

    summary_keys = [
        "previousClose",
        "open",
        "dayLow",
        "dayHigh",
        "regularMarketPreviousClose",
        "regularMarketOpen",
        "regularMarketDayLow",
        "regularMarketDayHigh",
        "payoutRatio",
        "trailingPE",
        "forwardPE",
        "volume",
        "regularMarketVolume",
        "averageVolume",
        "averageVolume10days",
        "averageDailyVolume10Day",
        "marketCap",
        "fiftyTwoWeekLow",
        "fiftyTwoWeekHigh",
        "priceToSalesTrailing12Months",
        "fiftyDayAverage",
        "twoHundredDayAverage",
        "currency",
    ]

    data = {
        k: v for k, v in ticker_ref.summary_detail[ticker].items() if k in summary_keys
    }

    data = {
        **data,
        **{
            "page_views": ticker_ref.page_views[ticker],
            "recommendations": ticker_ref.recommendations[ticker],
            "sec_filings": fillings.to_dict("records")
            if not isinstance(fillings := ticker_ref.sec_filings, dict)
            else fillings,
            "company_officers": company_officers.to_dict("records")
            if not isinstance(company_officers := ticker_ref.company_officers, dict)
            else company_officers,
            "corporate_events": corporate_events.to_dict("records")
            if not isinstance(corporate_events := ticker_ref.corporate_events, dict)
            else corporate_events,
            "corporate_guidance": corporate_guidance.to_dict("records")
            if not isinstance(corporate_guidance := ticker_ref.corporate_guidance, dict)
            else corporate_guidance,
            "calendar_events": ticker_ref.calendar_events[ticker],
            "earning_history": earning_history.to_dict("records")
            if not isinstance(earning_history := ticker_ref.earning_history, dict)
            else earning_history,
            "summary_profile": ticker_ref.summary_profile[ticker],
            "lastUpdate": firestore.SERVER_TIMESTAMP,
        },
    }

    client.document(f"tickers/{isin}/data/yahoo").set(data)


def trading212TickersToFireStore():
    with open("/Users/peter/Projects/socii/temp/t212_tickers.json", "r") as f:
        ticker_mapping = json.load(f)
        ticker_isins = [
            isin
            for ticker in ticker_mapping
            if (isin := ticker.get("isin")) and isin[:2] not in ("GB", "US")
        ]
    for isin in tqdm(ticker_isins):
        yahooDataToFirestore(isin)
        sleep(1)


def tickerToISIN(ticker: str) -> str:
    query = client.collection("tickers").where("tickerSymbol", "==", ticker).limit(1)
    results = query.get()
    return results[0].to_dict()["ISIN"] if results else None


def isinToTicker(isin: str) -> str:
    query = client.collection("tickers").where("ISIN", "==", isin).limit(1)
    results = query.get()
    return results[0].to_dict()["tickerSymbol"] if results else None


def logoLocation():
    # Access storage bucket
    bucket = storage.bucket()
    for blob in bucket.list_blobs():
        if "logos" in blob.name:
            isin = blob.name.split("/")[-1].split(".")[0]
            # print(blob.make_public())
            print(blob.public_url)


if __name__ == "__main__":

    with open("/Users/peter/Projects/socii/serviceAccountKey.json", "r") as f:
        service_account_info = json.load(f)

    credentials = firebase_admin.credentials.Certificate(service_account_info)

    # initialize firebase admin
    firebase_app = firebase_admin.initialize_app(
        credentials, options=dict(storageBucket="sociiinvest.appspot.com")
    )

    client = firestore.client()

    # uploadLogoLocation()
    popular_tickers = [
        "TSLA",
        "ZM",
        "AMZN",
        "NFLX",
        "NVDA",
        "AAPL",
        "SPOT",
        "UBER",
        "BABA",
        "TTD",
        "GME",
    ]

    # # * Make popular tickers
    # for ticker in popular_tickers:
    #     isin = tickerToISIN(ticker)
    #     if isin:
    #         yahooDataToFirestore(isin, is_popular=True)

    # # * Upload yahoo data
    # # TODO : Set up cloud function to update these every so often
    # for ticker in tqdm(popular_tickers):
    #     yahooSummaryToFirestore(ticker=ticker)

    # * Upload alpha vantage data
    # TODO : Set up cloud function to update these every so often
    for ticker in tqdm(popular_tickers):
        alphaVantageDataToFirestore(ticker=ticker)

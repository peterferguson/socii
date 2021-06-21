from time import sleep
import json
from typing import Union
import re
import requests
from datetime import datetime

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


# ! added to data gcp function
def alphaVantageDataToFirestore(
    ticker: str, query_params: dict[str, str] = {"function": "OVERVIEW"}
):
    base_url = "https://www.alphavantage.co/query?"
    api_key = "&apikey=E9W8LZBTXVYZ31IO"
    symbol = f"&symbol={ticker}"
    params = "&".join([f"{param}={value}" for param, value in query_params.items()])

    data = requests.get(base_url + params + symbol + api_key).json()

    if "note" in data and "Alpha Vantange" in data["note"]:
        # API call limit reached ... return without writing to Firestore
        print(f"API call limit reached for {ticker}")
        return

    data = {camelCase(k): willItFloat(v) for k, v in data.items() if "None" not in v}

    data["lastUpdate"] = firestore.SERVER_TIMESTAMP

    isin = tickerToISIN(ticker)
    client.document(f"tickers/{isin}/data/alphaVantage").set(data)


def alphaVantageTimeseriesToFirestore(
    ticker: str = "",
    query_params: dict[str, str] = {"function": "TIME_SERIES_DAILY"},
    isin: str = "",
):

    if ticker and not isin:
        isin = tickerToISIN(ticker)

    if isin and not ticker:
        ticker = isinToTicker(isin)

    if not ticker or not isin:
        return

    base_url = "https://www.alphavantage.co/query?"
    api_key = "&apikey=E9W8LZBTXVYZ31IO"
    symbol = f"&symbol={ticker}"
    params = "&".join([f"{param}={value}" for param, value in query_params.items()])

    data = requests.get(base_url + params + symbol + api_key).json()

    if "note" in data and "Alpha Vantange" in data["note"]:
        # - API call limit reached ... return without writing to Firestore
        print(f"API call limit reached for {ticker}")
        return

    timeseries_key = [key for key in data.keys() if "time series" in key.lower()][0]

    timeseries = data[timeseries_key]

    batch = client.batch()

    for count, (ts, ohlc) in enumerate(timeseries.items()):
        if count > 499:
            batch.commit()
            batch = client.batch()

        _date = datetime.strptime(ts, "%Y-%m-%d")

        batch.set(
            client.document(f"tickers/{isin}/timeseries/{int(_date.timestamp())}"),
            {
                **{
                    re.sub("[0-9.\n]", " ", desc).strip(): float(value)
                    for desc, value in ohlc.items()
                },
                **{"timestamp": _date},
            },
        )

    batch.update(
        client.document(f"tickers/{isin}"),
        {"timeseriesLastUpdated": firestore.SERVER_TIMESTAMP},
    )
    batch.commit()


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

    client.document(f"tickers/{isin}/times/yahoo").set(data)


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


def makeLogoPublic(isin: str):
    # Access storage bucket
    bucket = storage.bucket()
    blob = bucket.blob(f"logos/{isin}.png")
    blob.make_public()
    print(blob.public_url)


def uploadLogoUrl(ticker: str = "", isin: str = ""):
    if not ticker and not isin:
        return
    if not isin and ticker:
        isin = tickerToISIN(ticker)
    client.document(f"tickers/{isin}").update(
        {
            "logoUrl": f"https://storage.googleapis.com/sociiinvest.appspot.com/logos/{isin}.png"
        }
    )
    try:
        makeLogoPublic(isin)
    except:
        print(f"{ticker} failed to make public at logos/{isin}.png")
    


if __name__ == "__main__":

    with open("/Users/peter/Projects/socii/app/serviceAccountKey.json", "r") as f:
        service_account_info = json.load(f)

    credentials = firebase_admin.credentials.Certificate(service_account_info)

    # initialize firebase admin
    firebase_app = firebase_admin.initialize_app(
        credentials, options=dict(storageBucket="sociiinvest.appspot.com")
    )

    client = firestore.client()

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
    ] + [  # - these are not marked as popular
        "GERN",
        "AMC",
        "XLF",
        "WISH",
        "SNDL",
        "SPY",
        "AAPL",
        "CLNE",
        "BACO",
        "ORPH",
        "NIO",
        "GE",
        "SQQQ",
        "FT",
        "TRCH",
        "PLTR",
        "T",
        "WFC",
        "GFI",
        "EDU",
        "AMD",
        "INTC",
        "XLE",
        "QQQA",
        "ALF",
        "IWMV",
        "VXX",
        "FCX",
        "HBANCLF",
        "C",
        "JPMA",
        "ANPCN",
        "NLY",
        "NAKDUVXYE",
        "EEM",
        "MU",
        "XOMA",
        "AHT",
        "BBVZ",
        "ZOM",
        "X",
        "PFE",
        "ITUB",
        "MSFT",
        "EWZ",
        "PBR",
        "EFA",
        "CSCO",
        "RIG",
        "XPEV",
        "TQQQ",
        "SLV",
        "TALC",
        "CLOVI",
        "IVR",
        "ABEV",
        "GDX",
        "NOK",
        "KO",
        "ET",
        "VALEH",
        "HYG",
        "TELLA",
        "ATHA",
        "GOLD",
        "ERIC",
        "SWNL",
        "LU",
        "AAL",
        "JD",
        "HL",
        "TLT",
        "CCL",
        "CMCSA",
        "SIRI",
        "MUX",
        "VXRTS",
        "SDS",
        "GM",
        "KMIS",
        "SESN",
        "HPQ",
        "SLB",
        "VIAC",
        "TSLA",
        "BBD",
        "LKCO",
        "MO",
        "NVDA",
        "OXY",
        "HPE",
        "MRO",
        "AUYS",
        "SENS",
        "WKHS",
        "FB",
        "BNL",
    ]

    # # * Make popular tickers
    # for ticker in tqdm(popular_tickers):
    #     isin = tickerToISIN(ticker)
    #     if isin:
    #         yahooDataToFirestore(isin, is_popular=True)

    # # * Upload storage logo urls to firestore docs
    # # TODO : Set up cloud function to update these every so often
    #     uploadLogoUrl(ticker)
    #     makeLogoPublic(isin)

    # # * Upload yahoo data
    # # TODO : Set up cloud function to update these every so often
    #     yahooSummaryToFirestore(ticker=ticker)

    # # * Upload alpha vantage timeseries (monthly)
    # # TODO : Set up cloud function to update these every so often
    #     alphaVantageDataToFirestore(ticker=ticker)
    # alphaVantageTimeseriesToFirestore(
    #     ticker=ticker, query_params={"function": "TIME_SERIES_MONTHLY"}
    # )
    # alphaVantageTimeseriesToFirestore(ticker=ticker)
    # sleep(60)

    query = (
        client.collection("tickers")
        .where("marketCountry", "==", "United States of America")
        .where("exchangeAbbreviation", "!=", "PNK")
        .order_by("exchangeAbbreviation", "ASCENDING")
        .limit(150)
    )

    for snapshot in tqdm(query.get()):
        ticker = snapshot.to_dict()
        isin = ticker.get("ISIN")
        tickerSymbol = ticker.get("tickerSymbol")
        if not isin or not tickerSymbol:
            continue
        if isin in ["CA09088U1093", "CA33938T1049", "IL0010826357"]:
            continue
        uploadLogoUrl(isin=isin)
        alphaVantageTimeseriesToFirestore(ticker=tickerSymbol, isin=isin)

        sleep(60)
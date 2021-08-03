import io
import json
import os
import re
from datetime import datetime
from time import sleep
from typing import Optional, Tuple, Union
from urllib.error import HTTPError
from urllib.request import urlopen

import firebase_admin
import numpy as np
import pandas as pd
import pyEX as pyex
import requests
import yahooquery as yq
from colorthief import ColorThief
from dotenv import load_dotenv
from firebase_admin import firestore, storage
from google.api_core.exceptions import NotFound
from google.cloud.firestore import Client
from google.cloud.storage import Bucket
from PIL import Image, UnidentifiedImageError
from rich import print
from tqdm import tqdm

load_dotenv()


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


def clamp(x):
    return max(0, min(x, 255))


def to_hex(r, g, b):
    return "#{0:02x}{1:02x}{2:02x}".format(clamp(r), clamp(g), clamp(b))


def getDominantLogoColor(
    ticker: str = "", isin: str = ""
) -> Optional[Tuple[int, int, int]]:

    if not ticker and not isin:
        return None
    if not isin and ticker:
        isin = tickerToISIN(ticker)

    logo_url = (
        f"https://storage.googleapis.com/sociiinvest.appspot.com/logos/{isin}.png"
    )
    try:
        fd = urlopen(logo_url)
        f = io.BytesIO(fd.read())
        color_thief = ColorThief(f)
    except UnidentifiedImageError:
        return None

    return to_hex(*color_thief.get_color(quality=10))


if __name__ == "__main__":

    with open("/Users/peter/Projects/socii/app/serviceAccountKey.json", "r") as f:
        service_account_info = json.load(f)

    credentials = firebase_admin.credentials.Certificate(service_account_info)

    # initialize firebase admin
    firebase_app = firebase_admin.initialize_app(
        credentials, options=dict(storageBucket="sociiinvest.appspot.com")
    )

    client: Client = firestore.client()
    bucket: Bucket = storage.bucket()
    iex = pyex.Client(api_token=os.environ.get("IEX_TOKEN", ""))

    with open("/Users/peter/Projects/socii/functions/temp/logos.csv", "r") as f:
        logos = pd.read_csv(f)

    logos["isin"] = logos["isin"].apply(
        lambda x: x.replace("logos/", "").replace(".png", "")
    )

    # for doc in client.collection("tickers").list_documents():
    #     print(doc.id)
    #     break

    with open(
        "/Users/peter/projects/socii/functions/temp/alpaca/alpaca_stocks.csv", "r"
    ) as f:
        alpaca_stocks = pd.read_csv(f, sep=",")

    # TODO: Add isin from iex to alpaca & hence firestore

    with open("/Users/peter/Projects/socii/functions/temp/logos.csv", "a") as f:
        for index, stock in tqdm(alpaca_stocks.iterrows()):
            isin = stock["isin"]
            symbol = stock["symbol"]
            ticker_ref = client.document(f"tickers/{isin}")
            ticker_snapshot = ticker_ref.get()
            if not ticker_snapshot.exists or "alpaca" not in ticker_snapshot.to_dict():
                #  - Add ticker to firestore
                ticker_ref.set(
                    {
                        **yahooData(isin),
                        "alpaca": {
                            "id": stock["id"],
                            "name": stock["name"],
                            "symbol": stock["symbol"],
                            "exchange": stock["exchange"],
                            "fractionable": stock["fractionable"],
                            "class": stock["class"],
                            "lastUpdated": firestore.SERVER_TIMESTAMP,
                        },
                    }
                )
                print(f"Added yahoo data for {symbol} to 'tickers/{isin}'")
            if isin not in logos["isin"].to_list() and isin is not np.nan:
                try:
                    url = iex.stocks.logo(stock["symbol"])["url"]
                except Exception as e:
                    print(e)
                    continue
                if url:
                    logo = requests.get(url).content
                    if logo:
                        # - Save logo dominant color in firestore
                        logo_bytes = io.BytesIO(logo)
                        try:
                            color_thief = ColorThief(logo_bytes)
                            logo_color = to_hex(*color_thief.get_color(quality=10))
                            ticker_ref.update({"logoColor": logo_color})
                            print(
                                f"Saved dominant logo color for {symbol} to 'tickers/{isin}'"
                            )
                        except Exception as e:
                            print(e)
                            continue
                        #  - Store logo in storage
                        try:
                            blob = bucket.blob(f"logos/{isin}.png")
                            blob.upload_from_string(logo)
                            blob.make_public()
                            f.write(f"\n{isin}")
                            print(blob.public_url)
                        except Exception as e:
                            print(
                                f"{stock['symbol']} failed to make upload to logos/{isin}.png"
                            )
                            print(e)

    # TODO: Check that the isins also exist in the database... if not add yahoo data

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

    # query = (
    #     client.collection("tickers")
    #     .where("marketCountry", "==", "United States of America")
    #     .where("exchangeAbbreviation", "!=", "PNK")
    #     .order_by("exchangeAbbreviation", "ASCENDING")
    # )

    # for snapshot in tqdm(query.get()):
    #     ticker = snapshot.to_dict()
    #     isin = ticker.get("ISIN")
    #     tickerSymbol = ticker.get("tickerSymbol")
    #     if not isin or not tickerSymbol:
    #         continue
    #     if isin in ["CA09088U1093", "CA33938T1049", "IL0010826357"]:
    #         continue
    #     uploadLogoUrl(isin=isin)
    #     alphaVantageTimeseriesToFirestore(ticker=tickerSymbol, isin=isin)

    #     sleep(60)

    # - Store dominant logo color
    # batch = client.batch()
    # count = 0
    # for index, doc_snapshot in enumerate(query.get()):
    #     if index < 150:
    #         continue
    #     print(index)
    #     if count > 499:
    #         print("commiting batch")
    #         batch.commit()
    #         batch = client.batch()
    #         count = 0
    #     isin = doc_snapshot.id
    #     try:
    #         logo_color = getDominantLogoColor(isin=isin)
    #     except HTTPError:
    #         try:
    #             makeLogoPublic(isin)
    #             logo_color = getDominantLogoColor(isin=isin)
    #         except NotFound:
    #             continue
    #     except NotFound:
    #         continue
    #     if not logo_color:
    #         continue
    #     batch.update(
    #         client.document(f"tickers/{isin}"),
    #         {
    #             "logoColorLastUpdated": firestore.SERVER_TIMESTAMP,
    #             "logoColor": logo_color,
    #         },
    #     )
    #     count += 1
    # batch.commit()

    # getDominantLogoColor("TSLA")

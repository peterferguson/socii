from time import sleep, time

from dotenv import dotenv_values

config = dotenv_values("./.env")

import json
from datetime import datetime
from urllib.error import HTTPError
from urllib.request import getproxies

import firebase_admin

# import grequests
import pandas as pd
import requests
import urllib3
import yahooquery as yq
from bs4 import BeautifulSoup
from firebase_admin import firestore
from google.cloud.firestore import Client
from rich import print
from tqdm import tqdm

configuration: dict[str, str] = {
    "base_server": "https://broker-api.sandbox.alpaca.markets/v1",
    "auth_header": config.get("ALPACA_AUTH_HEADER", ""),
}

# - https://stackoverflow.com/questions/312443/how-do-you-split-a-list-into-evenly-sized-chunks
def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i : i + n]


def get_alpaca() -> pd.DataFrame:
    http = urllib3.PoolManager()

    r = http.request(
        "GET",
        configuration["base_server"] + "/assets",
        headers={
            "Authorization": configuration["auth_header"],
            "Content-Type": "application/json",
        },
    )
    print(r.status)
    return pd.DataFrame.from_dict(json.loads(r.data.decode("utf-8")))


def get_stock_isin_from_csv(name: str) -> pd.DataFrame:
    return pd.read_csv("temp/alpaca/stocks.csv").query(
        f"country == 'united states' and symbol == '{name}'"
    )


def get_etf_isin_from_csv(name: str) -> pd.DataFrame:
    return pd.read_csv("temp/alpaca/etfs.csv").query(
        f"country == 'united states' and symbol == '{name}'"
    )


def store_alpaca_etfs() -> None:
    start = time()
    alpaca = get_alpaca()
    print(f"Got alpaca asset dataframe in {time()-start:.4f}s")

    start = time()
    active_alpaca_etfs = alpaca[alpaca.name.str.lower().str.contains("etf")].query(
        "status == 'active'"
    )
    print(f"Got alpaca etf dataframe in {time()-start:.4f}s")

    start = time()
    active_alpaca_etfs["isin"] = active_alpaca_etfs.query(
        "status == 'active'"
    ).symbol.apply(
        lambda x: df["isin"].iloc[0]
        if not (df := get_etf_isin_from_csv(x)).empty
        else None
    )
    print(f"Got alpaca etfs isins in {time()-start:.4f}s")
    print(active_alpaca_etfs["isin"].notna().value_counts())

    with open(
        "/Users/peter/projects/socii/functions/temp/alpaca/alpaca_etfs.csv", "w+"
    ) as f:
        active_alpaca_etfs.to_csv(f, index=False)


def store_alpaca_stocks() -> None:
    start = time()
    alpaca = get_alpaca()
    print(f"Got alpaca asset dataframe in {time()-start:.4f}s")

    start = time()
    active_alpaca_stocks = alpaca[~alpaca.name.str.lower().str.contains("etf")].query(
        "status == 'active'"
    )
    print(f"Got alpaca stock dataframe in {time()-start:.4f}s")

    start = time()
    active_alpaca_stocks["isin"] = active_alpaca_stocks.query(
        "status == 'active'"
    ).symbol.apply(
        lambda x: df["isin"].iloc[0]
        if not (df := get_stock_isin_from_csv(x)).empty
        else None
    )
    print(f"Got alpaca stock isins in {time()-start:.4f}s")

    # print(active_alpaca_stocks)
    with open(
        "/Users/peter/projects/socii/functions/temp/alpaca/alpaca_stocks.csv", "w+"
    ) as f:
        active_alpaca_stocks.to_csv(f, index=False)
    print(active_alpaca_stocks["isin"].notna().value_counts())


def alpacaStocksToFirestore(client: Client, stocks: pd.DataFrame) -> None:
    batch = client.batch()
    stored_count = 0
    for count, stock in tqdm(stocks.iterrows()):
        if (stored_count - 870) % 500 == 0:
            batch.commit()
            batch = client.batch()
        isin = stock["isin"]
        doc_ref = client.document(f"tickers/{isin}")
        doc_snap = doc_ref.get()
        if doc_snap.exists:
            stored_count += 1
            if stored_count <= 871:
                continue
            data = doc_snap.to_dict()
            batch.update(
                client.document(f"tickers/{isin}"),
                {
                    "alpaca": {
                        "id": stock["id"],
                        "name": stock["name"],
                        "symbol": stock["symbol"],
                        "exchange": stock["exchange"],
                        "fractionable": stock["fractionable"],
                        "class": stock["class"],
                        "lastUpdated": firestore.SERVER_TIMESTAMP,
                    },
                },
            )
    batch.commit()


def update_firestore_tickers_from_symbol_with_alpaca(client: Client) -> None:

    with open("./temp/alpaca/alpaca_stocks.csv") as stocks_file:
        stocks = pd.read_csv(stocks_file)
    stocks_without_isin = stocks[~stocks["isin"].notna()]

    for deci in chunks(stocks_without_isin.symbol.to_list(), 10):

        new_isin = client.collection("tickers").where("tickerSymbol", "in", deci)

        for stock_doc in tqdm(new_isin.stream()):
            isin = stock_doc.id
            stock_data = stock_doc.to_dict()
            print(isin)

            # - Get stock csv data
            stock = stocks[stocks.symbol == stock_data["tickerSymbol"]]
            stock_index = stock.index[0]

            # - Update csv entry
            stocks.loc[stock_index, "isin"] = isin

            # - Update firestore
            stock_doc._reference.update(
                {
                    "alpaca": {
                        "id": stock.loc[stock_index, "id"],
                        "name": stock.loc[stock_index, "name"],
                        "symbol": stock.loc[stock_index, "symbol"],
                        "exchange": stock.loc[stock_index, "exchange"],
                        "fractionable": bool(stock.loc[stock_index, "fractionable"]),
                        "class": stock.loc[stock_index, "class"],
                        "lastUpdated": firestore.SERVER_TIMESTAMP,
                    }
                }
            )

    with open("./temp/alpaca/alpaca_stocks.csv", "w") as stocks_file:
        stocks.to_csv(stocks_file, index=False)


def scrape_isin(stocks_without_isin: pd.DataFrame, exclude_stocks: list[str]) -> str:

    base_url = "https://www.youinvest.co.uk/market-research/{exchange}%3A{symbol}"

    links = [
        base_url.format(**stock)
        for stock in stocks_without_isin[["symbol", "exchange"]].to_dict("records")
        if f"{stock['exchange']}:{stock['symbol']}" not in exclude_stocks
    ]

    start_time = time()

    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/12.0",
        "Accept-Language": "en-GB",
        "Accept-Encoding": "gzip, deflate",
        "Accept": "text/html",
        "Referer": "http://www.google.com/",
    }

    with open("./temp/alpaca/stock_isins.csv", "w") as csv:
        for count, link in tqdm(enumerate(links)):
            r = requests.get(link, headers=headers)
            if r.status_code > 400:
                print(f"No ISIN found at {link}")
                continue
            soup = BeautifulSoup(r.text, "lxml")
            results = soup.find_all("td", attrs={"id": "Col0Isin"})
            isin = results[0].text
            if isin:
                # - Write to csv for temp storage
                csv.write(f"\n{link}:{isin}")

    return "--- %s seconds ---" % (time() - start_time)


def csv_alpaca_stocks_from_firestore(client: Client) -> pd.DataFrame:

    firestore_alpaca_query = client.collection("tickers").where("alpaca.name", ">", "")

    docs = firestore_alpaca_query.stream()

    with open("./temp/alpaca/isin_already_in_firebase.csv", "a") as f:
        f.write("id|symbol|name\n")
        for doc in docs:
            f.write(
                f"{doc.get('alpaca.id')}|{doc.get('alpaca.symbol')}|{doc.get('alpaca.name')}\n"
            )

    return pd.read_csv("./temp/alpaca/isin_already_in_firebase.csv")


def update_firestore_alpaca_stocks(client: Client):
    with open("./temp/alpaca/isin_already_in_firebase.csv", "r") as f:
        already_in_firebase = pd.read_csv(f, delimiter="|")

    with open("./temp/alpaca/alpaca_stocks.csv", "r") as f:
        alpaca_stocks = pd.read_csv(f)

    with open("./temp/alpaca/isin_missing_in_firebase.csv", "a") as f:
        f.write("id|symbol|name\n")

        for _, stock in tqdm(alpaca_stocks.iterrows()):
            isin = stock["isin"]
            if not isin or stock["id"] in already_in_firebase.id.to_list():
                continue
            else:
                doc_ref = client.document(f"tickers/{isin}")
                doc_snap = doc_ref.get()
                if not doc_snap.exists:
                    print(f"{isin} cannot be found in firebase")
                    f.write(f"{stock['id']}|{stock['symbol']}|{stock['name']}\n")
                    continue
                print(f"Adding {isin} to firebase")
                doc_ref.update(
                    {
                        "alpaca": {
                            "id": stock["id"],
                            "name": stock["name"],
                            "symbol": stock["symbol"],
                            "exchange": stock["exchange"],
                            "fractionable": bool(stock["fractionable"]),
                            "class": stock["class"],
                            "lastUpdated": firestore.SERVER_TIMESTAMP,
                        }
                    }
                )


if __name__ == "__main__":

    with open("/Users/peter/Projects/socii/app/serviceAccountKey.json", "r") as f:
        service_account_info = json.load(f)

    credentials = firebase_admin.credentials.Certificate(service_account_info)

    # initialize firebase admin
    firebase_app = firebase_admin.initialize_app(
        credentials, options=dict(storageBucket="sociiinvest.appspot.com")
    )

    client: Client = firestore.client()

    update_firestore_alpaca_stocks(client)
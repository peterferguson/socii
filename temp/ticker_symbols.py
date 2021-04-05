from time import sleep
import yahooquery as yq
from rich import print
import firebase_admin
from firebase_admin import firestore, storage
import json
from tqdm import tqdm

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

    return {keys_mapping[k]: v for k, v in data.items() if k in keys_mapping}


with open("/Users/peter/Projects/socii/serviceAccountKey.json", "r") as f:
    service_account_info = json.load(f)

with open("/Users/peter/Projects/socii/temp/t212_tickers.json", "r") as f:
    ticker_mapping = json.load(f)
    ticker_isins = [
        isin
        for ticker in ticker_mapping
        if (isin := ticker.get("isin")) and isin[:2] not in ("GB", "US")
    ]

credentials = firebase_admin.credentials.Certificate(service_account_info)

# initialize firebase admin
firebase_app = firebase_admin.initialize_app(
    credentials, options=dict(storageBucket="sociiinvest.appspot.com")
)

# # Access storage bucket
# bucket  = storage.bucket()
# blob = bucket.blob(f"logos/{isin}.png").download_to_filename(f"{isin}.png")

client = firestore.client()

for isin in tqdm(ticker_isins):
    client.document(f"tickers/{isin}").set(yahooData(isin))
    sleep(1)
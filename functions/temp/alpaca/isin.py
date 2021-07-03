from time import sleep
from datetime import datetime

import pandas as pd
import yahooquery as yq
from rich import print
import firebase_admin
from firebase_admin import firestore, storage
from tqdm import tqdm
import json


def getAlpaca() -> pd.DataFrame:
    with open("temp/alpaca/responses/alpacaAssets.json", "r") as f:
        assets = json.load(f)
    return pd.DataFrame.from_dict(assets)


def getStockISIN(name: str) -> str:
    return pd.read_csv("temp/alpaca/stocks.csv").query(
        f"country == 'united states' and symbol == '{name}'"
    )


def getETFISIN(name: str) -> str:
    return pd.read_csv("temp/alpaca/etfs.csv").query(
        f"country == 'united states' and symbol == '{name}'"
    )


if __name__ == "__main__":
    alpaca = getAlpaca()
    active_alpaca_etfs = alpaca[alpaca.name.str.lower().str.contains("etf")].query(
        "status == 'active'"
    )
    active_alpaca_stocks = alpaca[~alpaca.name.str.lower().str.contains("etf")].query(
        "status == 'active'"
    )
    # active_alpaca_etfs["isin"] = active_alpaca_etfs.query(
    #     "status == 'active'"
    # ).symbol.apply(lambda x: df["isin"].iloc[0] if not (df := getETFISIN(x)).empty else None)

    active_alpaca_stocks["isin"] = active_alpaca_stocks.query(
        "status == 'active'"
    ).symbol.apply(
        lambda x: df["isin"].iloc[0] if not (df := getStockISIN(x)).empty else None
    )
    print(active_alpaca_etfs)
    print(active_alpaca_etfs["isin"].notna().value_counts())
    # print(active_alpaca_stocks)
    # print(active_alpaca_stocks["isin"].notna().value_counts())
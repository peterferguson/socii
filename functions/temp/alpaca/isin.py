from time import sleep, time

from dotenv import dotenv_values

config = dotenv_values("./.env")

import json
from datetime import datetime
from urllib.request import getproxies
from urllib.error import HTTPError

import requests

# import grequests
import pandas as pd
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


def getAlpaca() -> pd.DataFrame:
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


def getStockISIN(name: str) -> pd.DataFrame:
    return pd.read_csv("temp/alpaca/stocks.csv").query(
        f"country == 'united states' and symbol == '{name}'"
    )


def getETFISIN(name: str) -> pd.DataFrame:
    return pd.read_csv("temp/alpaca/etfs.csv").query(
        f"country == 'united states' and symbol == '{name}'"
    )


def storeAlpacaETFs() -> None:
    start = time()
    alpaca = getAlpaca()
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
        lambda x: df["isin"].iloc[0] if not (df := getETFISIN(x)).empty else None
    )
    print(f"Got alpaca etfs isins in {time()-start:.4f}s")
    print(active_alpaca_etfs["isin"].notna().value_counts())

    with open(
        "/Users/peter/projects/socii/functions/temp/alpaca/alpaca_etfs.csv", "w+"
    ) as f:
        active_alpaca_etfs.to_csv(f, index=False)


def storeAlpacaStocks() -> None:
    start = time()
    alpaca = getAlpaca()
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
        lambda x: df["isin"].iloc[0] if not (df := getStockISIN(x)).empty else None
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


def updateStocksWithoutISIN(client: Client) -> None:

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


def scrapeISINFromAJBell(exchange: str, symbol: str) -> str:
    print(f"{exchange}:{symbol}")
    isin_scrape_url = "https://www.youinvest.co.uk/market-research/"
    isin_scrape_url += f"{exchange}%3A{symbol}"

    try:
        tables = pd.read_html(isin_scrape_url)
    except HTTPError:
        print(f"No ISIN found for {exchange}:{symbol} at {isin_scrape_url}")
        return ""
    return tables[1].iloc[0, 1]


if __name__ == "__main__":

    # with open("/Users/peter/Projects/socii/app/serviceAccountKey.json", "r") as f:
    #     service_account_info = json.load(f)

    # credentials = firebase_admin.credentials.Certificate(service_account_info)

    # # initialize firebase admin
    # firebase_app = firebase_admin.initialize_app(
    #     credentials, options=dict(storageBucket="sociiinvest.appspot.com")
    # )

    # client: Client = firestore.client()

    with open("./temp/alpaca/alpaca_stocks.csv") as stocks_file:
        stocks = pd.read_csv(stocks_file)

    stocks_without_isin = stocks[~stocks["isin"].notna()]

    missing_isin = [
        "ARCA:TMF",
        "NYSE:BGT",
        "NYSE:BKT",
        "NASDAQ:BIB",
        "ARCA:BNDC",
        "NYSE:BUI",
        "NYSE:BTZ",
        "NYSE:BXMX",
        "NYSE:CEM",
        "ARCA:BRZU",
        "NYSE:BTA",
        "NYSE:KF",
        "NYSE:BWG",
        "NASDAQ:CGO",
        "NASDAQ:CHW",
        "NYSE:BLE",
        "NYSE:BOE",
        "NYSE:BWSN",
        "NYSE:BTT",
        "ARCA:BZQ",
        "NYSE:BSL",
        "NYSE:CAF",
        "ARCA:BTAL",
        "ARCA:CEFD",
        "ARCA:CHAD",
        "NASDAQ:CNFRL",
        "NYSE:BYM",
        "ARCA:CLDS",
        "NYSE:CMSD",
        "NASDAQ:CPTAG",
        "ARCA:COW",
        "ARCA:CORN",
        "BATS:CSM",
        "NYSE:CIF",
        "NYSE:CMSA",
        "ARCA:CORP",
        "NASDAQ:CSSEN",
        "NYSE:CTR",
        "NYSE:CUBB",
        "NASDAQ:CPZ",
        "ARCA:CYB",
        "NASDAQ:CUBA",
        "ARCA:DBB",
        "ARCA:DFEN",
        "BATS:DDWM",
        "ARCA:CROC",
        "NASDAQ:CSQ",
        "NASDAQ:CXSE",
        "ARCA:DBA",
        "NYSE:DCF",
        "NYSE:CTDD",
        "ARCA:DNL",
        "ARCA:CURE",
        "NYSE:CXH",
        "NYSE:DBL",
        "ARCA:DES",
        "ARCA:DFE",
        "ARCA:DUSL",
        "NYSE:EEA",
        "NYSE:CTBB",
        "ARCA:DBP",
        "ARCA:DDM",
        "NYSE:DIAX",
        "NYSE:DRUA",
        "ARCA:DOG",
        "NYSE:CXE",
        "NYSE:DHF",
        "NYSE:DFP",
        "ARCA:DBE",
        "NASDAQ:DHCNL",
        "NYSE:DSM",
        "ARCA:DRN",
        "ARCA:DBC",
        "ARCA:DDG",
        "ARCA:DGL",
        "NASDAQ:DGRE",
        "ARCA:DTH",
        "NYSE:EFL",
        "NYSE:DMO",
        "NYSE:DNP",
        "ARCA:DIVA",
        "NYSE:DTF",
        "ARCA:DMCY",
        "NYSE:DSU",
        "ARCA:DWM",
        "ARCA:EDC",
        "ARCA:EFZ",
        "NASDAQ:FAB",
        "NASDAQ:FEM",
        "NYSE:EXD",
        "ARCA:DWMF",
        "NASDAQ:DXJS",
        "NYSE:EDI",
        "NYSE:EHI",
        "NYSE:EDD",
        "NYSE:ETX",
        "NASDAQ:FEP",
        "ARCA:FDM",
        "NYSE:FTHY",
        "ARCA:FXY",
        "ARCA:DOO",
        "ARCA:EFU",
        "ARCA:EZM",
        "NYSE:FDEU",
        "NASDAQ:FPA",
        "NYSE:GF",
        "NYSE:GJO",
        "NYSE:GER",
        "NYSE:GUT",
        "NYSE:EXG",
        "ARCA:FAZ",
        "NYSE:FPF",
        "ARCA:FXH",
        "ARCA:GAZ",
        "NYSE:HTY",
        "ARCA:IAUM",
        "NYSE:ETJ",
        "NASDAQ:FDT",
        "NYSE:FEO",
        "NASDAQ:FDTS",
        "ARCA:FXD",
        "NASDAQ:FYT",
        "ARCA:FXC",
        "NYSE:GNT",
        "NYSE:IDE",
        "NYSE:IIF",
        "NYSE:IIM",
        "NASDAQ:INBKL",
        "NASDAQ:GBRGR",
        "BATS:HYIN",
        "ARCA:HYGV",
        "NYSE:IGA",
        "NYSE:IGR",
        "ARCA:INDL",
        "ARCA:IQDF",
        "ARCA:IQDE",
        "ARCA:GRN",
        "ARCA:HYS",
        "BATS:IGHG",
        "NASDAQ:JMPNZ",
        "NYSE:JGH",
        "NYSE:JHAA",
        "ARCA:JJU",
        "NYSE:JMM",
        "NYSE:JOF",
        "NYSE:KKRS",
        "ARCA:JJT",
        "NYSE:JTD",
        "NYSE:JHI",
        "ARCA:JNUG",
        "NYSE:JEMD",
        "ARCA:JJM",
        "ARCA:JJP",
        "NYSE:JPI",
        "NYSE:JPT",
        "NYSE:KMF",
        "ARCA:KORU",
        "NASDAQ:JMPNL",
        "ARCA:KOLD",
        "NYSE:KSM",
        "NYSE:KTN",
        "NYSE:KTF",
        "NYSE:LDP",
        "NYSE:KIO",
        "ARCA:LBJ",
        "BATS:LKOR",
        "NYSE:MHN",
        "ARCA:MBSD",
        "ARCA:MCRO",
        "NYSE:MHF",
        "NYSE:MYC",
        "NASDAQ:NEWTL",
        "NYSE:MHNC",
        "NYSE:MCI",
        "NYSE:MIE",
        "ARCA:MJO",
        "NYSE:MQY",
        "NYSE:MXE",
        "NYSE:MGR",
        "NYSE:MHI",
        "ARCA:MJJ",
        "ARCA:MLPR",
        "NYSE:NIE",
        "NASDAQ:MDIV",
        "NYSE:MGU",
        "NYSE:MIN",
        "NYSE:MPV",
        "NYSE:MYN",
        "NYSE:NAD",
        "ARCA:MINT",
        "NYSE:MUE",
        "NYSE:MUJ",
        "NYSE:NEA",
        "NASDAQ:NEWTZ",
        "NYSE:NXQ",
        "NASDAQ:OFSSG",
        "ARCA:OIL",
        "ARCA:MLPB",
        "NYSE:MUC",
        "NYSE:NDMO",
        "NYSE:NFJ",
        "NYSE:MNP",
        "ARCA:MZZ",
        "NYSE:NCZ",
        "NYSE:NGC.U",
        "ARCA:NFRA",
        "NASDAQ:OFSSI",
        "NASDAQ:OXSQZ",
        "NYSE:PCQ",
        "NYSE:NIQ",
        "NYSE:NMI",
        "NYSE:NXJ",
        "NYSE:PAI",
        "NYSE:NKX",
        "NYSE:NMS",
        "ARCA:OGCP",
        "NYSE:NMCO",
        "NYSE:PDO",
        "NYSE:PFD",
        "NASDAQ:OXSQG",
        "NYSE:PMF",
        "ARCA:PHYS",
        "NYSE:PMX",
        "NYSE:RIV",
        "ARCA:SPXL",
        "NYSE:RCA",
        "NYSE:RFMZ",
        "ARCA:TBT",
        "NYSE:PML",
        "ARCA:PYPE",
        "ARCA:QULL",
        "ARCA:RFCI",
        "ARCA:RJN",
        "NASDAQ:RILYG",
        "NYSE:THW",
        "NYSE:GPM",
        "ARCA:TWM",
        "ARCA:ULE",
        "ARCA:UPRO",
        "ARCA:UMDD",
        "ARCA:USFR",
        "ARCA:GRES",
        "ARCA:UDN",
        "NYSE:TWN",
        "NYSE:BGY",
        "NASDAQ:TUR",
        "NYSE:TY",
        "ARCA:UNG",
        "ARCA:USML",
        "ARCA:UPV",
        "NYSE:BGIO",
        "NYSE:WIW",
        "NYSE:TVC",
        "ARCA:UJB",
        "ARCA:UNL",
        "ARCA:UMI",
        "NYSE:BGB",
        "NASDAQ:CCD",
        "ARCA:UST",
        "NYSE:BIF",
        "NYSE:BFZ",
        "NYSE:CELG.RT",
        "ARCA:GQRE",
        "NYSE:MFM",
        "ARCA:MEXX",
        "NASDAQ:USOI",
        "NASDAQ:CHY",
        "ARCA:HIBS",
        "NYSE:GJP",
        "NYSE:HIO",
        "NYSE:BFK",
        "NYSE:BHV",
        "NYSE:HPS",
        "NYSE:GHY",
        "NYSE:HQH",
        "NYSE:HGLB",
        "NYSE:IGD",
        "NYSE:FAM",
        "NASDAQ:FYC",
    ]

    base_url = "https://www.youinvest.co.uk/market-research/{exchange}%3A{symbol}"
    
    links = [
        base_url.format(**stock)
        for stock in stocks_without_isin[["symbol", "exchange"]].to_dict("records")
        if f"{stock['exchange']}:{stock['symbol']}" not in missing_isin
    ]

    start_time = time()

    # reqs = (grequests.get(link) for link in links)
    # resp = grequests.imap(reqs, grequests.Pool(10))

    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/12.0",
        "Accept-Language": "en-GB",
        "Accept-Encoding": "gzip, deflate",
        "Accept": "text/html",
        "Referer": "http://www.google.com/",
    }

    with open('./temp/alpaca/stock_isins.csv','w') as csv:
        for count, link in tqdm(enumerate(links)):
            if count < 14: 
                continue
            r = requests.get(link, headers=headers)
            if r.status_code > 400:
                print(f"No ISIN found at {link}")
                continue
            soup = BeautifulSoup(r.text, "lxml")
            results = soup.find_all("td", attrs={"id": "Col0Isin"})
            isin = results[0].text
            if isin:
                csv.write(f"\n{link}:{isin}")

    print("--- %s seconds ---" % (time() - start_time))

    # ! This code hung after hours 😢
    # count = 0
    # for stock_chunk in tqdm(chunks([tup for tup in stocks_without_isin.iterrows()], 5)):
    #     for index, stock in stock_chunk:
    #         if f"{stock.exchange}:{stock.symbol}" in missing_isin:
    #             continue
    #         if count > 20:
    #             with open("./temp/alpaca/alpaca_stocks.csv", "w") as stocks_file:
    #                 stocks.to_csv(stocks_file, index=False)
    #             count = 0

    #         isin = scrapeISINFromAJBell(stock.exchange, stock.symbol)
    #         if isin:
    #             count += 1
    #             stocks.loc[index, "isin"] = isin
    #     sleep(5)

    # with open("./temp/alpaca/alpaca_stocks.csv", "w") as stocks_file:
    #     stocks.to_csv(stocks_file, index=False)

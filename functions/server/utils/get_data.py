import aiohttp
import asyncio
import os
import logging
from typing import List

from alpaca_trade_api.stream import Stream, _DataStream

logger = logging.getLogger("main")


api_key = os.environ.get("APCA_API_KEY_ID", "")
api_secret = os.environ.get("APCA_API_SECRET_KEY", "")


# TODO: add support for crypto trades
# TODO: REFACTOR - move to utils, create a websocket forward so we can actually connect on the frontend?


async def get_market_time():
    """
    Get the current market time.
    """
    async with aiohttp.ClientSession(
        auth=aiohttp.BasicAuth(api_key, api_secret)
    ) as session:
        async with session.get(
            os.environ.get("APCA_API_BASE_URL", "") + "/v1/clock",
        ) as response:
            return await response.json()


async def get_latest_quote(session, symbol):
    """
    Get the latest quote for a given symbol.
    """
    url = os.environ.get("APCA_API_DATA_URL", "") + f"/v2/stocks/{symbol}/quotes/latest"
    async with session.get(url) as resp:
        logger.info(resp.status)
        if resp.ok:
            data = await resp.json()
            return {
                "symbol": data["symbol"],
                "quote": {
                    "timestamp": data["quote"].pop("t"),
                    **_DataStream("", "", "")._cast("q", data["quote"])._raw,
                },
            }
        else:
            logger.error(f"Error getting quote for {symbol}")


async def get_latest_quotes(symbols: List[str]):
    """
    Get the latest quote for a given list of symbols async.
    """
    logger.info(f"Getting latest quotes for {symbols} from Alpaca API")
    async with aiohttp.ClientSession(
        auth=aiohttp.BasicAuth(api_key, api_secret)
    ) as session:
        tasks = []
        for symbol in symbols:
            tasks.append(asyncio.ensure_future(get_latest_quote(session, symbol)))

        return await asyncio.gather(*tasks)


def stream_quotes(stream: Stream, data_type: str, symbols: List[str], data):
    """
    Get realtime data from Alpaca API.

    Alpaca historical quotes are delayed by 15 minutes. So in order to get the latest
    quotes, we need use the websocket during market hours.

    Args:
        stream: Stream object
        data_type: data type to get
        symbols: list of symbols to get data for
        data: data to get

    Returns:
        data: data from Alpaca API

    """
    logger.info(f"Getting {data_type} data for {symbols} from Alpaca API")

    quote_symbols = symbols if data_type == "quotes" else None

    if not quote_symbols:
        return

    # - continue until quotes for all symbols are received
    logger.info("Subscribing to quotes...")

    @stream.on_quote(*quote_symbols)
    async def _(quote):
        logger.info("Quotes received")
        data[quote.symbol] = quote._raw
        if all(symbol in data.keys() for symbol in quote_symbols):
            try:
                stream.unsubscribe_quotes(*symbols)
            except RuntimeError:
                #  ignore event loop is already running exception
                pass
            finally:
                return

        # ---------------------------------------------------------------------------
        # - Uncomment to stream quote data continuously with three seconds delay
        # ---------------------------------------------------------------------------
        # await asyncio.sleep(3)

        # TODO: add support for crypto trades
        # stream.subscribe_crypto_trades(print_crypto_trade, "BTCUSD")

    try:
        stream.run()
    except RuntimeError:
        #  ignore event loop is already running exception
        pass

    return
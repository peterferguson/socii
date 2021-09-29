import aiohttp
import asyncio
import os
import logging
from typing import List

from alpaca_trade_api.stream import Stream

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
            data = await response.json()
            return data


async def get_latest_quote(session, symbol):
    """
    Get the latest quote for a given symbol.
    """
    url = os.environ.get("APCA_API_DATA_URL", "") + f"/v2/stocks/{symbol}/quotes/latest"
    async with session.get(url) as resp:
        logger.info(resp.status)
        return await resp.json()


async def get_latest_quotes(symbols):
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


async def get_data(stream: Stream, data_type: str, symbols: List[str], data):
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
    trade_symbols = symbols if data_type == "trades" else None

    if not quote_symbols and not trade_symbols:
        return

    market_time = await get_market_time()
    logger.info(f"Market time: {market_time}")

    data["_meta"] = market_time

    if quote_symbols:

        if not market_time["is_open"]:
            logger.info("Market is closed, getting historical quote data")

            latest = await get_latest_quotes(symbols)
            for result in latest:
                data[result["symbol"]] = result

            return

        # - continue until quotes for all symbols are received
        logger.info("Waiting for data...")

        @stream.on_quote(*quote_symbols)
        async def _(quote):
            data[quote.symbol] = quote._raw
            logger.info(quote)

            # ---------------------------------------------------------------------------
            # - Uncomment to stream quote data continuously with three seconds delay
            # ---------------------------------------------------------------------------
            # await asyncio.sleep(3)

            try:
                stream.unsubscribe_quotes(quote.symbol)
            except RuntimeError:
                #  ignore event loop is already running exception
                pass
            try:
                stream.run()  # keep the stream alive
            except RuntimeError:
                #  ignore event loop is already running exception
                pass

            # stream.subscribe_crypto_trades(print_crypto_trade, "BTCUSD")

        while any(symbol not in data.keys() for symbol in symbols):
            pass

    return
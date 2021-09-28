import asyncio
import json
import os
import logging
from typing import List

from alpaca_trade_api.common import URL
from alpaca_trade_api.stream import Stream

logger = logging.getLogger("main")

data_url = os.getenv("APCA_API_DATA_URL", "")

logger.info(logging.INFO, "Getting data from Alpaca API")


async def get_data(data_type: str, symbols: List[str]):
    """
    Get data from Alpaca API.
    """
    logger.info("Getting data from Alpaca API")

    quote_symbols = symbols if data_type == "quotes" else None
    trade_symbols = symbols if data_type == "trades" else None

    if not quote_symbols and not trade_symbols:
        return

    feed = "iex"
    stream = Stream(data_stream_url=URL(data_url), data_feed=feed)

    if quote_symbols:
        latest_quotes = {symbol: None for symbol in quote_symbols}

        @stream.on_quote(*quote_symbols)
        async def quote_handler(quote):
            latest_quotes[quote.symbol] = quote._raw
            logger.info(quote)
            try:
                stream.unsubscribe_quotes(quote.symbol)
            except RuntimeError:
                #  ignore event loop is already running exception
                pass

            # ---------------------------------------------------------------------------
            # - Uncomment to stream quote data continuously with three seconds delay
            # ---------------------------------------------------------------------------

            # try:
            #     await stream.unsubscribe_quotes(quote.symbol)
            # except RuntimeError:
            #     #  ignore event loop is already running exception
            #     pass
            # await asyncio.sleep(3)

    try:
        stream.run()  # keep the stream alive
    except RuntimeError:
        #  ignore event loop is already running exception
        pass

    # stream.subscribe_crypto_trades(print_crypto_trade, "BTCUSD")

    # - continue until quotes for all symbols are received
    logger.info("Waiting for data...")
    logger.info(any(v == None for v in latest_quotes.values()))
    while any(v == None for v in latest_quotes.values()):
        await asyncio.sleep(0.1)
    asyncio.gather(stream.stop_ws())
    return latest_quotes

import asyncio
import logging
import os
import threading

from alpaca_trade_api.common import URL
from alpaca_trade_api.stream import Stream

from fastapi import APIRouter
from fastapi.param_functions import Depends
from utils.get_data import stream_quotes, get_latest_quotes, get_market_time
from utils.verify_token import verify_token

logger = logging.getLogger("main")

router = APIRouter()

data_url = os.getenv("APCA_API_DATA_URL", "").replace("https://", "wss://stream.")

feed = "iex"

global stream


def consumer_thread(data_type, symbols, data):
    try:
        # make sure we have an event loop, if not create a new one
        loop = asyncio.get_event_loop()
        loop.set_debug(True)
    except RuntimeError:
        loop = asyncio.new_event_loop()
        loop.set_debug(True)
        asyncio.set_event_loop(loop)

    stream = Stream(data_stream_url=URL(data_url), data_feed=feed)

    try:
        stream_quotes(stream, data_type, symbols, data)
        logger.info("Consumer thread finished")
        logger.info(data)
    finally:
        loop.stop()
        loop.close()


@router.get("/", dependencies=[Depends(verify_token)])
async def get_quotes(
    symbols: str,  # Comma-separated list of symbols to subscribe to,
):
    """
    Get quotes for a list of symbols.
    """
    logger.info(f"Getting quotes for {symbols}")
    # * mutable to store the data from work on another thread
    data: dict[str, dict] = {}

    market_time = await get_market_time()
    logger.info(f"Market time: {market_time}")

    data["_meta"] = market_time

    if not market_time["is_open"]:
        logger.info("Market is closed, getting historical quote data")
        logger.info(f"for {symbols}")

        latest = await get_latest_quotes(symbols.split(","))
        for result in latest:
            if data and result and result["symbol"] in data:
                data[result["symbol"]] = result

        return data

    thread = threading.Thread(
        target=consumer_thread, args=("quotes", symbols.split(","), data)
    )

    thread.start()

    logger.info("Waiting for quotes...")
    thread.join(10)

    while any(symbol not in data.keys() for symbol in symbols):
        await asyncio.sleep(0.1)

    stream.unsubscribe_quotes(*symbols)
    logger.info(data)

    return data

import asyncio
import logging
import os
import time
import threading

from alpaca_trade_api.common import URL
from alpaca_trade_api.stream import Stream
import msgpack

from fastapi import APIRouter
from fastapi.param_functions import Depends
from utils.get_data import stream_quotes, get_latest_quotes, get_market_time
from utils.verify_token import verify_token

logger = logging.getLogger("main")

router = APIRouter()

data_url = os.getenv("APCA_API_DATA_URL", "").replace("https://", "wss://stream.")

feed = "iex"


def consumer_thread(stream, loop, data_type, symbols, data):
    logger.info(f"Starting {data_type} consumer thread")
    loop.set_debug(True)
    asyncio.set_event_loop(loop)
    try:
        stream_quotes(stream, data_type, symbols, data)
        logger.info("Consumer thread finished")
    finally:
        logger.info("Closing stream")


@router.get("/", dependencies=[Depends(verify_token)])
async def get_quotes(symbols: str):
    """
    Get quotes for a list of symbols.

    :param symbols: Comma-separated list of symbols to subscribe to,
    :return:
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
            if result and result["symbol"] not in data:
                data[result["symbol"]] = result
        return data
    else:
        stream = Stream(data_stream_url=URL(data_url), data_feed=feed)

        loop = asyncio.new_event_loop()

        thread = threading.Thread(
            target=consumer_thread,
            args=(stream, loop, "quotes", symbols.split(","), data),
        )

        thread.start()
        logger.info("Waiting for quotes...")

        start = time.time()
        while any(symbol not in data.keys() for symbol in symbols.split(",")):
            await asyncio.sleep(0.1)
            if time.time() - start > 3 * len(symbols.split(",")):
                logger.info("Reached timeout")
                break

        logger.info(
            f"Got quotes for {' '.join([k for k in data.keys() if k != '_meta'])}"
        )
        logger.info("Stopping websocket")
        asyncio.run_coroutine_threadsafe(stream.stop_ws(), loop)

        logger.info("Stopping event loop")
        try:
            loop.stop()
        except RuntimeError:
            # Futures have not yet stopped but they will run forever if we don't
            pass

        logger.info("Stopping the thread")
        thread.join()

    logger.info(f"Received quotes: {data}")

    return data


###############################################################################
# TODO We need to handle concurrent connections! For now we can simply create #
# TODO a queue which we add the symbols to be queried to and simply store     #
# TODO them in firestore which can then be subscribed to from anywhere        #
###############################################################################
import asyncio
import logging
import os
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
        logger.info(data)
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
            if data and result and result["symbol"] in data:
                data[result["symbol"]] = result

        return data

    stream = Stream(data_stream_url=URL(data_url), data_feed=feed)
    event = threading.Event()

    loop = asyncio.new_event_loop()

    thread = threading.Thread(
        target=consumer_thread, args=(stream, loop, "quotes", symbols.split(","), data)
    )

    thread.start()
    logger.info("Waiting for quotes...")

    while any(symbol not in data.keys() for symbol in symbols.split(",")):
        await asyncio.sleep(0.1)

    print("Got quotes")
    print("Stopping the thread")
    thread.join(1 * len(symbols.split(",")))
    event.set()

    # ! Alpaca API doesn't seem to like closing the stream
    # ! so we have to manually close it
    print("Unsubscribing from the stream")
    asyncio.run_coroutine_threadsafe(
        stream._data_ws._ws.send(
            msgpack.packb(
                {
                    "action": "unsubscribe",
                    "trades": (),
                    "quotes": symbols.split(","),
                    "bars": (),
                    "dailyBars": (),
                }
            )
        ),
        loop,
    )
    stream._data_ws._handlers["quotes"] = None
    asyncio.run_coroutine_threadsafe(stream._data_ws._ws.close(), loop)
    asyncio.run_coroutine_threadsafe(stream.stop_ws(), loop)

    print("Stopping event loop")
    try:
        loop.stop()
    except RuntimeError:
        # Futures have not yet stopped but they will run forever if we don't
        pass

    # Thread can still be alive at this point. Do another join without a timeout
    # to verify thread shutdown.
    thread.join()
    print("thread has stopped.")

    logger.info("Received quotes: ", data)

    return data


###############################################################################
# TODO We need to handle concurrent connections! For now we can simply create #
# TODO a queue which we add the symbols to be queried to and simply store     #
# TODO them in firestore which can then be subscribed to from anywhere        #
###############################################################################
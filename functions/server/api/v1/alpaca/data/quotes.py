"""
This code was influenced by:
 - https://towardsdatascience.com/dive-into-queue-module-in-python-its-more-than-fifo-ce86c40944ef
 - https://stackoverflow.com/questions/16506429/check-if-element-is-already-in-a-queue
 - https://stackoverflow.com/questions/1312331/using-a-global-dictionary-with-threads-in-python
"""

import asyncio
import logging
import os
import threading
import queue

from alpaca_trade_api.common import URL
from alpaca_trade_api.stream import Stream

from fastapi import APIRouter
from fastapi.param_functions import Depends
from utils.get_data import stream_quotes, get_latest_quotes, get_market_time
from utils.verify_token import verify_token

logger = logging.getLogger("main")
router = APIRouter()

data_url = os.getenv("APCA_API_DATA_URL", "").replace("https://", "wss://stream.")

FEED = "iex"
MAX_SYMBOLS_TO_POLL = 10

# - Force only new symbols to be added to the queue
class SetQueue(queue.Queue):
    def _init(self, maxsize):
        self.queue = set()

    def _put(self, item):
        self.queue.add(item)

    def _get(self):
        return self.queue.pop()


def store_quote_in_firebase(data_q):
    while True:
        try:
            data = data_q.get_nowait()
            print(data)
            data_q.task_done()
        except queue.Empty:
            print("Finished storing all data")
            break


def consumer_thread(stream, loop, data_type, symbol_q, data_q):
    logger.info(f"Starting {data_type} consumer thread")
    loop.set_debug(True)
    asyncio.set_event_loop(loop)
    while True:
        try:
            symbol = symbol_q.get()
            market_time = asyncio.run_coroutine_threadsafe(
                get_market_time(), loop
            ).result()
            logger.info(f"Market time: {market_time}")

            if not market_time["is_open"]:
                logger.info("Market is closed, getting historical quote data")
                logger.info(f"for {symbol}")

                latest = asyncio.run_coroutine_threadsafe(
                    get_latest_quotes(symbol), loop
                ).result()
                for result in latest:
                    data_q.put(result)
            else:
                # TODO: replace the data {} below
                stream_quotes(stream, data_type, [symbol], {})
            symbol_q.task_done()
        except queue.Empty:
            break

    logger.info("Consumer thread finished")


@router.get("/", dependencies=[Depends(verify_token)])
async def get_quotes(symbols: str):
    """
    Get quotes for a list of symbols.

    :param symbols: Comma-separated list of symbols to subscribe to,
    :return:
    """

    logger.info(f"Getting quotes for {symbols}")
    # - One queue for the symbols currently queried & one for the data to be stored in firebase
    # - both on separate threads
    symbol_q = SetQueue(maxsize=MAX_SYMBOLS_TO_POLL)
    data_q = queue.Queue()

    try:
        for symbol in symbols.split(","):
            symbol_q.put(symbol, block=False)
    except queue.Full:
        logger.info(f"Currently polling for quotes on {MAX_SYMBOLS_TO_POLL} symbols.")
        # TODO: Handle response for this or a wait mechanism

    stream = Stream(data_stream_url=URL(data_url), data_feed=FEED)

    loop = asyncio.new_event_loop()

    listen_thread = threading.Thread(
        target=consumer_thread,
        args=(stream, loop, "quotes", symbol_q, data_q),
    )

    store_thread = threading.Thread(
        target=store_quote_in_firebase,
        args=(data_q,),
    )

    listen_thread.start()
    store_thread.start()

    logger.info("Stopping websocket")
    asyncio.run_coroutine_threadsafe(stream.stop_ws(), loop)

    logger.info("Stopping event loop")
    try:
        loop.stop()
    except RuntimeError:
        # Futures have not yet stopped but they will run forever if we don't
        pass

    logger.info("Stopping the listen thread")
    symbol_q.join()
    data_q.join()

    # - need to define some return data (or should we do it as fire & forget?)
    return


###############################################################################
# TODO We need to handle concurrent connections! For now we can simply create #
# TODO a queue which we add the symbols to be queried to and simply store     #
# TODO them in firestore which can then be subscribed to from anywhere        #
###############################################################################
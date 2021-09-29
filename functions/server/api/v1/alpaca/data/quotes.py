import asyncio
import logging
import os
import threading
from typing import Any, List


from alpaca_trade_api.common import URL
from alpaca_trade_api.stream import Stream


from core.connection_manager import ConnectionManager
from fastapi import APIRouter
from fastapi.param_functions import Depends
from utils.get_data import get_data
from utils.verify_token import verify_token

logger = logging.getLogger("main")

router = APIRouter()

manager = ConnectionManager()

data_url = os.getenv("APCA_API_DATA_URL", "")

feed = "iex"


# def unsubscribe_handler(stream: Stream, data_type: str, symbols: List[str]):
#     switch = {
#         "quotes": stream.unsubscribe_quotes,
#         "trades": stream.unsubscribe_trades,
#         "bars": stream.unsubscribe_bars,
#     }
#     try:
#         switch[data_type](*symbols)
#     except KeyError:
#         logger.error("handlers", stream._data_ws._handlers)
#         logger.error("Invalid data type", data_type)
#     except Exception as e:
#         logger.error(e)


def consumer_thread(data_type, symbols, data):
    try:
        # make sure we have an event loop, if not create a new one
        loop = asyncio.get_event_loop()
        loop.set_debug(True)
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

    stream = Stream(data_stream_url=URL(data_url), data_feed=feed)

    try:
        loop.run_until_complete(get_data(stream, data_type, symbols, data))
    finally:
        # unsubscribe_handler(stream, data_type, symbols)
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
    data: dict[str, dict] = {}
    thread = threading.Thread(
        target=consumer_thread, args=("quotes", symbols.split(","), data)
    )

    thread.start()

    # await stream.unsubscribe_quotes(*symbols.split(","))

    thread.join()

    logger.info("Got data")
    logger.info(data)

    return data

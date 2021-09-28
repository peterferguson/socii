import logging
import os
from contextlib import asynccontextmanager
from typing import List, Optional

import websockets

logger = logging.getLogger("main")


api_key = os.environ.get("APCA_API_KEY_ID", "")
api_secret = os.environ.get("APCA_API_SECRET_KEY", "")


@asynccontextmanager
async def stream_alpaca_data(
    trade_symbols: Optional[List[str]],
    quote_symbols: Optional[List[str]],
):
    source = "iex"
    websocket = None

    try:
        async with websockets.connect(
            os.getenv("APCA_API_DATA_URL", "") + source,
        ) as websocket:
            while True:
                try:
                    await websocket.send(
                        {
                            "action": "auth",
                            "key": api_key,
                            "secret": api_secret,
                        }
                    )
                    await websocket.send(
                        {
                            "action": "subscribe",
                            "trades": trade_symbols,
                            "quotes": quote_symbols,
                        }
                    )
                    yield websocket

                except websockets.exceptions.ConnectionClosed as e:
                    logger.error(f"The connection was closed")
                    break
    finally:
        if websocket:
            await websocket.send(
                {
                    "action": "unsubscribe",
                    "trades": trade_symbols,
                    "quotes": quote_symbols,
                }
            )
            await websocket.close()
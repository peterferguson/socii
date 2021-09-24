import asyncio
import json
import logging
import os

from broadcaster import Broadcast
from fastapi import WebSocket, WebSocketDisconnect, BackgroundTasks

from core.connection_manager import ConnectionManager
from crud.get_last_event_id import get_last_event_id
from crud.get_alpaca_id import get_alpaca_id
from models.alpaca.events import EventQueryParams
from utils.store_events import store_events
from utils.stream_alpaca_events import stream_alpaca_events

logger = logging.getLogger("main")


# - alpaca events endpoints
event_endpoint_mapping = {
    "accounts": "accounts/status",
    "journals": "journals/status",
    "trades": "trades",
    "transfers": "transfers/status",
    "nta": "nta",  # non-trading activity
}

api_key = os.environ.get("ALPACA_KEY", "")
api_secret = os.environ.get("ALPACA_SECRET", "")

broadcast = Broadcast(os.environ.get("REDIS_URL", "redis://localhost:6379"))

# TODO: This doesnt really handle multiple connections correctly
# -
# -     On connection of a new client the server should send all the events related
# -     to that client from the list already gathered by the query from the other
# -     connected clients.
# -

# TODO: Queue events on redis for late connectors & send them their own events on connection


async def queue_event(alpaca_id: str, event: dict):
    if alpaca_id == event["account_id"]:
        await broadcast.publish(channel=alpaca_id, message=json.dumps(event))


async def queue_alpaca_events(
    event_type: str,
    since_id: str,
    alpaca_id: str,
    background_tasks: BackgroundTasks,
):
    async with stream_alpaca_events(
        event_type, EventQueryParams(since_id=since_id)
    ) as stream:
        for line in stream:
            if line:
                event = json.loads(line[6:].decode("utf-8"))
                await queue_event(alpaca_id, event)
                background_tasks.add_task(store_events, event_type, event)


async def send_events(
    websocket: WebSocket, connection_manager: ConnectionManager, alpaca_id: str
):
    async with broadcast.subscribe(channel=alpaca_id) as subscriber:
        async for event in subscriber:
            logger.info(f"sending {event.message}")
            await connection_manager.send_personal_message(event.message, websocket)


async def handle_event_stream(
    event_type: str,
    websocket: WebSocket,
    connection_manager: ConnectionManager,
    token: str,
    background_tasks: BackgroundTasks,
):
    await broadcast.connect()
    await connection_manager.connect(websocket)
    last_event_id = await get_last_event_id(event_type)
    alpaca_id = await get_alpaca_id(token)
    try:
        await connection_manager.send_personal_message(
            "Connected to trades stream", websocket
        )
        logger.info(
            f"{event_type} event stream for {alpaca_id} since {last_event_id} is connected"
        )
        try:
            # Kick off both coroutines in parallel, and then block
            # until both are completed.
            await asyncio.gather(
                queue_alpaca_events(
                    event_type,
                    last_event_id,
                    alpaca_id,
                    background_tasks=background_tasks,
                ),
                send_events(
                    websocket=websocket,
                    connection_manager=connection_manager,
                    alpaca_id=alpaca_id,
                ),
            )
        except Exception as e:  # Don't do except: pass
            import traceback

            traceback.print_exc()
        finally:
            await broadcast.disconnect()
            await connection_manager.disconnect(websocket)
            logger.info(
                f"{event_type} event stream for {alpaca_id} since {last_event_id} is disconnected"
            )
            logger.info("Connection closed")
    except WebSocketDisconnect:
        await broadcast.disconnect()
        connection_manager.disconnect(websocket)

import json
import logging
import os

from fastapi import BackgroundTasks, Depends

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


api_key = os.environ.get("APCA_API_KEY_ID", "")
api_secret = os.environ.get("APCA_API_SECRET_KEY", "")


async def get_events(
    event_type: str,
    background_tasks: BackgroundTasks,
    event_params: EventQueryParams = Depends(),
):
    events = []
    async with stream_alpaca_events(event_type, event_params, timeout=2) as stream:
        for line in stream:
            if line:
                event = json.loads(line[6:].decode("utf-8"))
                logger.info(event)
                background_tasks.add_task(store_events, event_type, event)
                events.append(event)
    return {"message": "successfully updated trade events"}

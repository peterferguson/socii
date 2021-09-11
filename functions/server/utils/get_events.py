from utils.alpaca_events import alpaca_events
import json
import logging
import os
from typing import Optional

from fastapi import BackgroundTasks, Depends
from requests.models import Response

from models.alpaca.events import EventQueryParams
from utils.store_events import store_events

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


@alpaca_events(timeout=5)
async def get_events(
    event_type: str,
    background_tasks: BackgroundTasks,
    event_params: EventQueryParams = Depends(EventQueryParams),
    response: Optional[Response] = None,
):
    if response is None:
        return {"message": "No response"}
    logger.info(f"Response: {Response}")
    events = []
    for index, line in enumerate(response.iter_lines()):
        line_str = line.decode("utf-8")
        if index == 0:
            logger.info(line_str.replace(": ", ""))
        if line and "data: " in line_str:
            event = json.loads(line_str.replace("data: ", ""))
            logger.info(event)
            events.append(event)

    background_tasks.add_task(store_events, event_type, events)
    return {"events": json.dumps(events)}

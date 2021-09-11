import json
import logging
import os

import requests
from fastapi import BackgroundTasks, Depends

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


async def stream_events(
    type: str,
    background_tasks: BackgroundTasks,
    event_params: EventQueryParams = Depends(EventQueryParams),
):

    query_string = await event_params.get_query_string(type)
    s = requests.Session()

    try:
        with s.get(
            os.getenv("ALPACA_BASE_URL", "")
            + f"events/"
            + event_endpoint_mapping[type]
            + query_string,
            auth=(api_key, api_secret),
            headers={"content-type": "text/event-stream"},
            stream=True,
            timeout=5,
        ) as response:
            logger.info(f"Request Url {response.request.url}")

            if not response.ok:
                logger.error(f"{response.status_code} {response.reason}")
                return {"code": response.status_code, "message": response.reason}

            events = []
            for line in response.iter_lines():
                if line and "data: " in line.decode("utf-8"):
                    event = json.loads(line.decode("utf-8").replace("data: ", ""))
                    logger.info(event)
                    events.append(event)
    except requests.exceptions.ConnectionError as e:
        if "Read timed out." in str(e):
            logger.info("Timed out")
        else:
            logger.info("ConnectionError")
            logger.error(e)

    background_tasks.add_task(store_events, type, events)
    return {"events": json.dumps(events)}

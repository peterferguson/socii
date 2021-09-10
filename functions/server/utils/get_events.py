from utils.store_events import store_events
import os
import json
from typing import Optional

import requests
from fastapi.logger import logger
from fastapi import BackgroundTasks

from utils.get_last_event_id import get_last_event_id


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


async def get_events(
    type: str,
    background_tasks: BackgroundTasks,
    since: Optional[str] = "",
    until: Optional[str] = "",
    since_id: Optional[str] = "",
    until_id: Optional[str] = "",
):
    params = {
        "since": since,
        "until": until,
        "since_id": since_id,
        "until_id": until_id,
    }
    query_params = ""
    if any(value != "" for value in params.values()):
        query_params = "?" + "&".join(
            [f"{param}={value}" for param, value in params.items() if value]
        )
    else:
        query_params = f"?since_id={await get_last_event_id(type)}"

    s = requests.Session()

    try:
        with s.get(
            os.getenv("ALPACA_BASE_URL", "")
            + "events/"
            + event_endpoint_mapping[type]
            + query_params,
            auth=(api_key, api_secret),
            headers={"content-type": "text/event-stream"},
            stream=True,
            timeout=5,
        ) as response:
            events = []
            for line in response.iter_lines():
                if line and "data: " in line.decode("utf-8"):
                    events.append(json.loads(line.decode("utf-8").split("data: ")[1]))
    except requests.exceptions.ConnectionError as e:
        if "Read timed out." in str(e):
            logger.info("Timed out")
        else:
            logger.info("ConnectionError")
            logger.error(e)

    background_tasks.add_task(store_events, type, events)
    return {"events": json.dumps(events)}

import json
import logging
import os
from contextlib import asynccontextmanager

import requests
from fastapi import Depends

from models.alpaca.events import EventQueryParams

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


@asynccontextmanager
async def stream_alpaca_events(
    event_type: str,
    event_params: EventQueryParams = Depends(),
    timeout: int = 10,
):
    query_string = await event_params.get_query_string(event_type)
    s = requests.Session()

    try:
        with s.get(
            os.getenv("APCA_API_BASE_URL", "")
            + f"events/"
            + event_endpoint_mapping[event_type]
            + query_string,
            auth=(api_key, api_secret),
            headers={"content-type": "text/event-stream"},
            stream=True,
            timeout=timeout,
        ) as response:
            logger.info(f"Request Url {response.request.url}")

            if not response.ok:
                logger.error(f"{response.status_code} {response.reason}")
                raise Exception(
                    {"code": response.status_code, "message": response.reason}
                )

            lines = response.iter_lines()
            first_line = next(lines)
            logger.info(first_line.decode("utf-8").replace(": ", ""))

            yield lines

    except requests.exceptions.ConnectionError as e:
        if "Read timed out." in str(e):
            logger.info("Timed out")
        else:
            logger.info("ConnectionError")
            logger.error(e)
    finally:
        s.close()
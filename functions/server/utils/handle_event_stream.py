from core.connection_manager import ConnectionManager
import json
import logging
import os
from typing import Optional

import requests
from fastapi import WebSocket, websockets
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

# TODO: This doesnt really handle multiple connections correctly
# -
# -     On connection of a new client the server should send all the events related
# -     to that client from the list already gathered by the query from the other
# -     connected clients.
# -


async def handle_event_stream(
    websocket: WebSocket,
    connection_manager: ConnectionManager,
    event_type: str,
    since_id: str,
    alpaca_id: str,
):

    s = requests.Session()

    try:
        with s.get(
            os.getenv("ALPACA_BASE_URL", "")
            + f"events/"
            + event_endpoint_mapping[event_type]
            + "?since=2021-09-01",
            # + f"?since_id={since_id}",
            auth=(api_key, api_secret),
            headers={"content-type": "text/event-stream"},
            stream=True,
            timeout=10,
        ) as response:
            logger.info(f"Request Url {response.request.url}")

            if not response.ok:
                logger.error(f"{response.status_code} {response.reason}")
                return {"code": response.status_code, "message": response.reason}

            await connection_manager.send_personal_message(
                f"alpaca_id: {alpaca_id}", websocket
            )

            lines = response.iter_lines()
            first_line = next(lines)
            logger.info(first_line.decode("utf-8").replace(": ", ""))

            events = []
            for line in lines:
                line_str = line.decode("utf-8")
                if line and "data: " in line_str:
                    event = json.loads(line_str.replace("data: ", ""))
                    logger.info(event)
                    events.append(event)
                    if alpaca_id == event["account_id"]:
                        await websocket.send_text(json.dumps(event))
                        await connection_manager.send_personal_json(event, websocket)

    except requests.exceptions.ConnectionError as e:
        if "Read timed out." in str(e):
            logger.info("Timed out")
        else:
            logger.info("ConnectionError")
            logger.error(e)

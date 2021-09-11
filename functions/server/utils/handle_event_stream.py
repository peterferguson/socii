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
        ) as response:
            logger.info(f"Request Url {response.request.url}")

            if not response.ok:
                logger.error(f"{response.status_code} {response.reason}")
                return {"code": response.status_code, "message": response.reason}

            await connection_manager.send_personal_message(
                f"alpaca_id: {alpaca_id}", websocket
            )

            events = []
            for index, line in enumerate(response.iter_lines()):
                line_str = line.decode("utf-8")
                if index == 0:
                    logger.info(line_str.replace(": ", ""))
                if line and "data: " in line_str:
                    event = json.loads(line_str.replace("data: ", ""))
                    logger.info(event)
                    events.append(event)
                    # if alpaca_id == event["account_id"]:
                    if "039e64b6-a4eb-409e-b9dc-17cc7a2dd6ce" == event["account_id"]:
                        await connection_manager.send_personal_message(
                            line_str.replace("data: ", ""), websocket
                        )

    except requests.exceptions.ConnectionError as e:
        if "Read timed out." in str(e):
            logger.info("Timed out")
        else:
            logger.info("ConnectionError")
            logger.error(e)

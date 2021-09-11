import logging
import os
from functools import wraps

import requests

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

# TODO: this should decorate both the get & stream endpoint functions
#       However, the decorator throws a error for iterating over a coroutine?!

def alpaca_events(timeout=5):
    def decorator(f):
        @wraps(f)
        async def wrapped(*args, **kwargs):

            event_type = kwargs.get("event_type")
            event_params = kwargs.get("event_params")

            query_string = await event_params.get_query_string(event_type)
            s = requests.Session()

            try:
                with s.get(
                    os.getenv("ALPACA_BASE_URL", "")
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
                        return {
                            "code": response.status_code,
                            "message": response.reason,
                        }
                    r = f(*args, **kwargs, response=response)
            except requests.exceptions.ConnectionError as e:
                if "Read timed out." in str(e):
                    logger.info("Timed out")
                else:
                    logger.info("ConnectionError")
                    logger.error(e)
            return r

        return wrapped

    return decorator

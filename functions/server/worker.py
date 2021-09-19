import os
import logging
import asyncio

from celery import Celery

logger = logging.getLogger("main")

celery = Celery(__name__)
celery.conf.broker_url = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379")
celery.conf.result_backend = os.environ.get(
    "CELERY_RESULT_BACKEND", "redis://localhost:6379"
)


@celery.task(name="queue_event")
def queue_event(event):
    """
    Queue an event to be sent to a websocket.

    Args:
        event (dict): The event to be sent.
    """
    logger.debug("Queueing event: %s", event)
    return event
from models.alpaca.events import Event
from typing import List

from google.cloud import firestore

from .initialise_firestore import initialise_firestore


async def store_events(type: str, data: List[Event]):
    """Store events in the database.
    Args:
      type (str): The event type.
      data (str): The event data which is a stringified list of json.
    """
    # Get the database.
    db = initialise_firestore(use_async=True)

    events_ref = db.collection(f"{type}Events")

    batch = db.batch()
    for index, event in enumerate(data):
        if index + 1 % 500 == 0:
            await batch.commit()
            batch = db.batch()

        print(f"Storing event {event['event_id']}")
        doc_ref = events_ref.document(str(event["event_id"]))

        batch.set(
            doc_ref,
            {
                **event,
                "type": type,
                "insertTimestamp": firestore.SERVER_TIMESTAMP,
            },
        )

    await batch.commit()
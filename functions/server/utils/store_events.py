from models.alpaca.events import Event
from typing import List, Union

from google.cloud import firestore

from .initialise_firestore import initialise_firestore


async def store_events(type: str, data: Union[List[Event], Event]):
    """Store events in the database.
    Args:
      type (str): The event type.
      data (str): The event data which is a stringified list of json.
    """
    # Get the database.
    db = initialise_firestore(use_async=True)

    events_ref = db.collection(f"{type}Events")

    if isinstance(data, list):

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
    else: 
        print(f"Storing event {data['event_id']}")
        doc_ref = events_ref.document(str(data["event_id"]))
        await doc_ref.set(
            {
                **data,
                "type": type,
                "insertTimestamp": firestore.SERVER_TIMESTAMP,
            },
            merge=True,
        )
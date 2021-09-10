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

    event_data = json.loads(data)

    events_ref = db.collection("{eventType}Events")

    batch = db.batch()
    for index, event in enumerate(event_data):
        if index % 500 == 0:
            batch.commit()
            batch = db.batch()

        doc_ref = events_ref.document(str(event.event_id))

        batch.set(
            doc_ref,
            {
                **event_data,
                "type": type,
                "insertTimestamp": firestore.SERVER_TIMESTAMP,
            },
        )

    await batch.commit()

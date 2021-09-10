from typing import Optional

from google.cloud import firestore

from .initialise_firestore import initialise_firestore


async def get_last_event_id(eventType: str) -> str:
    db = initialise_firestore()
    docStream = (
        db.collection(f"{eventType}Events")
        .order_by("event_id", direction=firestore.Query.DESCENDING)
        .limit(1)
        .stream()
    )
    docs = [doc async for doc in docStream]
    return docs.pop().id if docs else ""

from google.cloud import firestore

from utils.initialise_firestore import initialise_firestore


async def get_last_event_id(eventType: str) -> str:
    db = initialise_firestore()
    doc_stream = (
        db.collection(f"{eventType}Events")
        .order_by("event_id", direction=firestore.Query.DESCENDING)
        .limit(1)
        .stream()
    )
    docs = [doc async for doc in doc_stream]
    return docs.pop().id if docs else ""

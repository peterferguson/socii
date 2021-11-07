from utils.initialise_firestore import initialise_firestore


async def get_user_by_uid(uid: str) -> str:
    db = initialise_firestore()
    doc_ref = db.collection(f"users").document(uid)
    doc = await doc_ref.get()

    return doc.to_dict() if doc.exists else None

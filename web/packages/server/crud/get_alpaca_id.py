from crud.get_user_by_uid import get_user_by_uid
from utils.initialise_firestore import initialise_firestore


async def get_alpaca_id(uid: str) -> str:
    user = await get_user_by_uid(uid)
    alpaca_id = user.get("alpacaAccountId")
    return alpaca_id
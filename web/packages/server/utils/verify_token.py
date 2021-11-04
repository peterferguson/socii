import logging
import os

import jwt
from fastapi import HTTPException, Query
from firebase_admin import auth

from utils.initialise_firebase import initialise_firebase

logger = logging.getLogger("main")

app = initialise_firebase()


async def verify_token(token: str = Query(...)) -> dict:
    logger.info(f"Verifying token: {token}")
    try:
        decoded_token = auth.verify_id_token(token)
        logger.info(f"token verified {decoded_token}")
    except auth.InvalidIdTokenError:
        try:
            # ! If token is not valid, test if token is sent from server
            decoded_token = jwt.decode(
                token, os.environ.get("APCA_API_SECRET_KEY", ""), algorithms=["HS256"]
            )
        except jwt.exceptions.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
    except auth.ExpiredIdTokenError:
        raise HTTPException(status_code=401, detail="Token Expired")
    if decoded_token is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return decoded_token

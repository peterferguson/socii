import os
from functools import lru_cache
from typing import Optional

from core.config import settings
from dotenv import load_dotenv
from firebase_admin import auth

load_dotenv(settings.Config.env_file)


@lru_cache
def initialise_firestore(project_id: Optional[str] = None) -> auth.Client:
    """
    Initialise the Firestore client.

    Args:
        project_id: The project ID to use.

    Returns:
        The Firestore client.
    """
    if project_id is None:
        os.environ.get("FIREBASE_PROJECT_ID")

    return auth.Client(project=project_id)

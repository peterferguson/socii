import os
from typing import Optional, Union
from functools import lru_cache

from firebase_admin import firestore
from dotenv import load_dotenv

from core.config import settings

load_dotenv(settings.Config.env_file)


@lru_cache
def initialise_firestore(
    project_id: Optional[str] = None, use_async: bool = True
) -> Union[firestore.Client, firestore.AsyncClient]:
    """
    Initialise the Firestore client.

    Args:
        project_id: The project ID to use.
        use_async: whether to use async or not.

    Returns:
        The Firestore client.
    """
    if project_id is None:
        os.environ.get("FIREBASE_PROJECT_ID")

    if use_async:
        return firestore.AsyncClient(project=project_id)

    return firestore.Client(project=project_id)

from functools import lru_cache

from core.config import settings
from dotenv import load_dotenv
from firebase_admin import App, initialize_app

load_dotenv(settings.Config.env_file)


@lru_cache
def initialise_firebase() -> App:
    """
    Initialise a Firebase app.

    Returns:
        The Firebase app.
    """
    return initialize_app()

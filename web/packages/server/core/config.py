from typing import List

from pydantic import AnyHttpUrl, BaseModel, BaseSettings


class LogConfig(BaseModel):
    """Logging configuration to be set for the server"""

    LOGGER_NAME: str = "main"
    LOG_FORMAT: str = "%(levelprefix)s | %(asctime)s | %(message)s"
    LOG_LEVEL: str = "DEBUG"

    # Logging config
    version = 1
    disable_existing_loggers = False
    formatters = {
        "default": {
            "()": "uvicorn.logging.DefaultFormatter",
            "fmt": LOG_FORMAT,
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    }
    handlers = {
        "default": {
            "formatter": "default",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stderr",
        },
    }
    loggers = {
        "main": {"handlers": ["default"], "level": LOG_LEVEL},
    }


class Settings(BaseSettings):
    PROJECT_NAME: str = "socii alpaca events server"
    API_V1_STR: str = "/api/v1"
    APCA_API_KEY_ID: str
    APCA_API_SECRET_KEY: str
    APCA_API_BASE_URL: str
    FIREBASE_PROJECT_ID: str
    GOOGLE_APPLICATION_CREDENTIALS: str
    CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost",
        "http://localhost:3000",
        "https://socii.app",
        "https://development.socii.app",
        "https://investsocial.app",
        "https://investsocial.co.uk",
        "https://socii.vercel.app",
    ]

    class Config:
        case_sensitive = True
        env_file = ".env.dev"


settings = Settings()

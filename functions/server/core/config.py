from typing import List

from pydantic import AnyHttpUrl, BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "socii alpaca events server"
    API_V1_STR: str = "/api/v1"
    ALPACA_KEY: str
    ALPACA_SECRET: str
    ALPACA_BASE_URL: str
    FIREBASE_PROJECT_ID: str
    GOOGLE_APPLICATION_CREDENTIALS: str
    # BACKEND_CORS_ORIGINS is a JSON-formatted list of origins
    # e.g: '["http://localhost", "http://localhost:4200", "http://localhost:3000", \
    # "http://localhost:8080", "http://local.dockertoolbox.tiangolo.com"]'
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    class Config:
        case_sensitive = True
        env_file = ".env.dev"


settings = Settings()
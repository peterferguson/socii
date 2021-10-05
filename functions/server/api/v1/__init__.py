from fastapi import APIRouter

from api.v1.alpaca import events_router, data_router

api_router = APIRouter()

api_router.include_router(
    events_router, prefix="/alpaca/events", tags=["alpaca", "events"]
)
api_router.include_router(data_router, prefix="/alpaca/data", tags=["alpaca", "data"])

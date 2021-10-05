from fastapi import APIRouter

from .events import events_router
from .data import data_router

alpaca_router = APIRouter()

alpaca_router.include_router(
    events_router, prefix="/alpaca/events", tags=["alpaca", "events"]
)
alpaca_router.include_router(
    data_router, prefix="/alpaca/data", tags=["alpaca", "data"]
)

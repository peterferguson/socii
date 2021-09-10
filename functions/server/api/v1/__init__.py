from fastapi import APIRouter

from api.v1.alpaca import alpaca_router

api_router = APIRouter()

api_router.include_router(
    alpaca_router, prefix="/alpaca/events", tags=["alpaca", "events"]
)

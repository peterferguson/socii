from fastapi import APIRouter

from api.v1.alpaca.data import quotes

data_router = APIRouter()

data_router.include_router(quotes.router, prefix="/quotes", tags=["quotes"])

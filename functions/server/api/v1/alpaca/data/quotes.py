import logging

from fastapi import APIRouter, Path
from fastapi.param_functions import Depends

from core.connection_manager import ConnectionManager
from utils.get_data import get_data
from utils.verify_token import verify_token


logger = logging.getLogger("main")

router = APIRouter()

manager = ConnectionManager()


@router.get("/", dependencies=[Depends(verify_token)])
async def get_quotes(
    symbols: str,  # Comma-separated list of symbols to subscribe to,
):
    return await get_data(data_type="quotes", symbols=symbols.split(","))

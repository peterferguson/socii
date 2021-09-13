import logging

from fastapi import APIRouter, BackgroundTasks, WebSocket
from fastapi.param_functions import Depends

from core.connection_manager import ConnectionManager
from models.alpaca.events import EventQueryParams
from utils.get_events import get_events
from utils.verify_token import verify_token
from utils.handle_event_stream import handle_event_stream


logger = logging.getLogger("main")

router = APIRouter()

manager = ConnectionManager()

# TODO: Having this as firebase verification token is not ideal.
#       We should have a way to get the user's alpaca account id.
#       That way we can return only their trades.
@router.get("/", dependencies=[Depends(verify_token)])
async def get_trades(
    background_tasks: BackgroundTasks,
    query_params: EventQueryParams = Depends(),
):
    return await get_events(event_type="trades", background_tasks=background_tasks)


@router.websocket("/stream")
async def stream_trades(
    websocket: WebSocket,
    background_tasks: BackgroundTasks,
    token: dict = Depends(verify_token),
):
    """
    Streams trade events from the Alpaca API to appropiate clients.
    """
    logger.info("Websocket connection opened")
    await handle_event_stream(
        event_type="trades",
        websocket=websocket,
        connection_manager=manager,
        token=token.get("uid", ""),
        background_tasks=background_tasks,
    )

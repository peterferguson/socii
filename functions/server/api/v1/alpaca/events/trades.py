from typing import Optional

from fastapi import APIRouter, BackgroundTasks, WebSocket, WebSocketDisconnect
from fastapi.param_functions import Depends

from core.connection_manager import ConnectionManager
from models.alpaca.events import EventQueryParams
from utils.get_events import get_events
from utils.verify_token import verify_token
from utils.handle_event_stream import handle_event_stream
from crud.get_last_event_id import get_last_event_id
from crud.get_alpaca_id import get_alpaca_id

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


@router.websocket("/stream/")
async def stream_trades(
    websocket: WebSocket,
    background_tasks: BackgroundTasks,
    q: Optional[int] = None,
    token: dict = Depends(verify_token),
):
    await manager.connect(websocket)
    event_type = "trades"
    last_event_id = await get_last_event_id(event_type)
    alpaca_id = await get_alpaca_id(token.get("uid"))
    try:
        await handle_event_stream(
            websocket=websocket,
            connection_manager=manager,
            event_type=event_type,
            since_id=last_event_id,
            alpaca_id=alpaca_id,
        )
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{alpaca_id} left the chat")
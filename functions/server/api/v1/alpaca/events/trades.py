from typing import Optional

from fastapi import APIRouter, BackgroundTasks, WebSocket, WebSocketDisconnect
from fastapi.param_functions import Depends

from core.connection_manager import ConnectionManager
from models.alpaca.events import EventQueryParams
from utils.get_events import get_events
from utils.verify_token import verify_token

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
    return await get_events("trades", background_tasks, query_params)


# @router.websocket("/stream/{alpaca_id}")
# async def stream_trades(
#     websocket: WebSocket,
#     background_tasks: BackgroundTasks,
#     alpaca_id: str,
#     since_id: Optional[str] = "",
#     q: Optional[int] = None,
#     id_token: str = Depends(verify_token),
# ):
#     await manager.connect(websocket)
#     try:
#         while True:
#             data = await websocket.receive_text()
#             await manager.send_personal_message(
#                 f"query token value is: {id_token}", websocket
#             )
#             if q is not None:
#                 await manager.send_personal_message(
#                     f"Query parameter q is: {q}", websocket
#                 )
#             await manager.send_personal_message(
#                 f"Message text was: {data}, for item ID: {alpaca_id}", websocket
#             )
#     except WebSocketDisconnect:
#         manager.disconnect(websocket)
#         await manager.broadcast(f"Client #{alpaca_id} left the chat")
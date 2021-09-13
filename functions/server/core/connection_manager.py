from typing import List

from fastapi import WebSocket

import logging

logger = logging.getLogger("main")


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def send_personal_json(self, json_: dict, websocket: WebSocket):
        await websocket.send_json(json_)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

    async def broadcast_json(self, json_: dict):
        for connection in self.active_connections:
            await connection.send_json(json_)

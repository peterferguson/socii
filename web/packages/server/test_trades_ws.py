from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)


def test_trades_ws():
    client = TestClient()
    with client.websocket_connect("/ws") as websocket:
        data = websocket.receive_json()
        print(data)
        assert data == {"type": "trades"}

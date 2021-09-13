import asyncio
import websockets
from rich import print

url = "ws://localhost:5000/api/v1/alpaca/events/trades/stream"


async def print_from_stream():
    async with websockets.connect(
        url
        + "?token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyYWZkYjliOGJmZmMyY2M4ZTU4NGQ2ZWE2ODlmYzEwYTg3MGI2NzgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUGV0ZXIgRmVyZ3Vzb24iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeWdmdjFjRDFtRklyUnhPRi1MdVVKUHNyLU96Ulg0T1Y5SERYb1c9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc29jaWktZGV2ZWxvcG1lbnQiLCJhdWQiOiJzb2NpaS1kZXZlbG9wbWVudCIsImF1dGhfdGltZSI6MTYzMDc4Njk0MywidXNlcl9pZCI6IjVMekdvUG11ZnJjYmlTdVlaV0ZpR2tBdXE4NTMiLCJzdWIiOiI1THpHb1BtdWZyY2JpU3VZWldGaUdrQXVxODUzIiwiaWF0IjoxNjMxNTIwMzExLCJleHAiOjE2MzE1MjM5MTEsImVtYWlsIjoicGV0ZXJmZXJndXNvbjk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEwNTAyNjU3NTUyOTE2MTEwNzE1Il0sImVtYWlsIjpbInBldGVyZmVyZ3Vzb245NUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.exmmeynuKoTSsmnAPlD5x98MN8fdN7RCGHeMw5Vn40vruwfF1_2AqcyVJb6VGnXVtTjq1Wd8GLBXJ3qD8uYswul0ycTuHJ_fLDnl0-vwBGdFBiBHNcVBvC_eBNvn0EnZo_sawgudwWqqhC-75e2awmYCGAGENRFq0UdZ5F3M0QH9UUE9jth-GY749CfvVZycnc9SuDxnRPM5dEIstfhtjyeaU7YDP8QakM2DuEF5Fc1rEV-PcO6MPIwk5m8-pVFwmdzoZkrQQWXQfXlmN6cziNAgxaPrcNNmLUmEs220lt72fkBtFnRfkxppkXKITmNjEiBgYH_k3lSox-W-JobAAg",
        extra_headers={
            "Content-Type": "application/json",
        },
    ) as websocket:
        while True:
            greeting = await websocket.recv()
            print("< {}".format(greeting))


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(print_from_stream())
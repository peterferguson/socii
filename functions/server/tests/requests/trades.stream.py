import asyncio
import websockets
from rich import print

url = "ws://localhost:5000/api/v1/alpaca/events/trades/stream/"


async def print_from_stream():
    async with websockets.connect(
        url,
        extra_headers={
            "Content-Type": "application/json",
            "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyYWZkYjliOGJmZmMyY2M4ZTU4NGQ2ZWE2ODlmYzEwYTg3MGI2NzgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUGV0ZXIgRmVyZ3Vzb24iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeWdmdjFjRDFtRklyUnhPRi1MdVVKUHNyLU96Ulg0T1Y5SERYb1c9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc29jaWktZGV2ZWxvcG1lbnQiLCJhdWQiOiJzb2NpaS1kZXZlbG9wbWVudCIsImF1dGhfdGltZSI6MTYzMTM5ODI4NCwidXNlcl9pZCI6IjVMekdvUG11ZnJjYmlTdVlaV0ZpR2tBdXE4NTMiLCJzdWIiOiI1THpHb1BtdWZyY2JpU3VZWldGaUdrQXVxODUzIiwiaWF0IjoxNjMxMzk4Mjg0LCJleHAiOjE2MzE0MDE4ODQsImVtYWlsIjoicGV0ZXJmZXJndXNvbjk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEwNTAyNjU3NTUyOTE2MTEwNzE1Il0sImVtYWlsIjpbInBldGVyZmVyZ3Vzb245NUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.qD3smtMue45T2T943Ai-cRgpcyICwSJi-axf0CyKXf0r4VOSineUVYKFYPtLPYxkZKxgbQqvvWwZz55xq_iwcfVLCBMfVSs_lSCtgI-IKE8Pgh3rtDEaIEwHskmdm-9Fvv5EXEV5UhD1iYkbGXfwjHcvnixPo-p3ymezqlcuA4-tWK0fxscin2u1NslHSjPMIDZKmGQJzon8Xo69seWvmK6JI34W40IfSy_ul12ykGxFmoDuJC11aCk6DYoE_LPnNjXv9KYqSPhMDc8Nkgh4qFdt7sJRB2UHZrNZEPjQKIh6EtniIFUFYfWYjEizazTRLRi-QMAIPfHs-Qk_EgmgUw",
        },
    ) as websocket:
        while True:
            greeting = await websocket.recv()
            print("< {}".format(greeting))


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(print_from_stream())
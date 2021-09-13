import asyncio
import websockets
from rich import print

url = "ws://localhost:5000/api/v1/alpaca/events/trades/stream"


async def print_from_stream():
    async with websockets.connect(
        url
        + "?token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyYWZkYjliOGJmZmMyY2M4ZTU4NGQ2ZWE2ODlmYzEwYTg3MGI2NzgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUGV0ZXIgRmVyZ3Vzb24iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeWdmdjFjRDFtRklyUnhPRi1MdVVKUHNyLU96Ulg0T1Y5SERYb1c9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc29jaWktZGV2ZWxvcG1lbnQiLCJhdWQiOiJzb2NpaS1kZXZlbG9wbWVudCIsImF1dGhfdGltZSI6MTYzMDc4Njk0MywidXNlcl9pZCI6IjVMekdvUG11ZnJjYmlTdVlaV0ZpR2tBdXE4NTMiLCJzdWIiOiI1THpHb1BtdWZyY2JpU3VZWldGaUdrQXVxODUzIiwiaWF0IjoxNjMxNTI3NTM1LCJleHAiOjE2MzE1MzExMzUsImVtYWlsIjoicGV0ZXJmZXJndXNvbjk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEwNTAyNjU3NTUyOTE2MTEwNzE1Il0sImVtYWlsIjpbInBldGVyZmVyZ3Vzb245NUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.lJo1n4Vj8zo2SjdK221a6JB_z3YZHMoX6PA2eX8C5-NwrfpkaK4RAHFUG68OcEwBhgWP8_dw5hxcI_1W1a32UfRvNvhPftX17QJe6oLYK_eS-GqK1Pws4CGJAMa4Q0Mirk5j97UAIu4OR7bAIumB5aa4NfkoAO6Q3J97fQKSBJjdEPDJ-bsBCPCx5Xyqoz02bJ72ybdAZLWEutTcE_l_GiknKPniPDi-ySsT2P6tPxr_lAlXwlal21cmGDIEOugFa16KLTvgwEPbsX0jkj1-ItzSUGcdfsRvt4ay8TsdEs1mj52MTh-NEcHckguFYuu7BOS2oVlaXMpD2vzYu9k7nA",
        extra_headers={
            "Content-Type": "application/json",
        },
    ) as websocket:
        while True:
            greeting = await websocket.recv()
            print("< {}".format(greeting))


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(print_from_stream())
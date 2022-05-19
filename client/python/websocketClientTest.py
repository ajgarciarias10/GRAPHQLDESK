import asyncio
import websockets

async def hello():
    async with websockets.connect("ws://192.168.1.38:5050") as websocket:
        await websocket.send("Hello world!")
        print(f"[MESSAGE RECV] {await websocket.recv()}")

asyncio.run(hello())
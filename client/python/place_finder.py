import asyncio
import cv2
import socket
import websockets
import math
import json

sock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
sock.connect(('8.8.8.8',80))
WiFi_ip, port = sock.getsockname()
sock.close()



async def getDeskPositionsFromImage(websocket):

    print(f"[CONNECTION FROM] {websocket.remote_address}")
    data = json.loads(await websocket.recv())

    place_name =data['place']
    svg_width = data['svg_width']
    svg_height = data['svg_height']


    im = cv2.imread("../assets/"+place_name+"_blueprint.png")
    im = cv2.resize(im,(svg_width,svg_height))

    # Setup SimpleBlobDetector parameters.
    params = cv2.SimpleBlobDetector_Params()

    # # Change thresholds
    params.minThreshold = 10
    params.maxThreshold = 200

    # Filter by Circularity
    params.filterByCircularity = True
    params.minCircularity = 0.5

    # Filter by Area.
    params.filterByArea = True
    params.minArea = 25

    # # Create a detector with the parameters
    # # OLD: detector = cv2.SimpleBlobDetector(params)
    detector = cv2.SimpleBlobDetector_create(params)

    # # Detect blobs.
    keypoints = detector.detect(im)

    Desks_Positions = []

    for keypoint in keypoints:
        x = math.floor(keypoint.pt[0]) 
        y = math.floor(keypoint.pt[1])
        Desks_Positions.append([x,y])

    await websocket.send(json.dumps(Desks_Positions))
    await websocket.close()

    print(f"[CONNECTION CLOSED] {websocket.remote_address}")


async def test(websocket):
    print(f"[CONNECTION FROM] {websocket.remote_address}")

    data = json.loads(await websocket.recv())
    print(f"[DATA RECV] {data['place']}")
    # async for message in websocket:
    #     print(f"[MESSAGE SEND] {message}")
    await websocket.send("fefw")

    print(f"[CONNECTION CLOSED] {websocket.remote_address}")


async def main():
    print(f"[RUNNING ON]{WiFi_ip}:5050")
    async with websockets.serve(getDeskPositionsFromImage, WiFi_ip, 5050):
        await asyncio.Future()  # run forever

asyncio.run(main())
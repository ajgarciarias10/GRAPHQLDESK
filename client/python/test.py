import cv2
import numpy as np
import math

#Doesn't allow array truncation
#np.set_printoptions(threshold=sys.maxsize)

#Open image
# img = cv2.imread("./assets/u_blueprint.png")
im = cv2.imread("./assets/MAD_Planta_3_blueprint.png")
# height = im.shape[0]
# width = im.shape[1]
# print(width,height)
im = cv2.resize(im,(1206, 744))


# Setup SimpleBlobDetector parameters.
params = cv2.SimpleBlobDetector_Params()

# Change thresholds
params.minThreshold = 10
params.maxThreshold = 200

# Filter by Circularity
params.filterByCircularity = True
params.minCircularity = 0.5

# Filter by Area.
params.filterByArea = True
params.minArea = 25



# Create a detector with the parameters
# OLD: detector = cv2.SimpleBlobDetector(params)
detector = cv2.SimpleBlobDetector_create(params)

# Detect blobs.
keypoints = detector.detect(im)

# Draw detected blobs as red circles.
# cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS ensures
# the size of the circle corresponds to the size of blob
Desks_Positions = []

for keypoint in keypoints:
    x = math.floor(keypoint.pt[0]) 
    y = math.floor(keypoint.pt[1])
    Desks_Positions.append([x,y])

print(Desks_Positions)

im_with_keypoints = cv2.drawKeypoints(im, keypoints, np.array([]), (0,0,0), cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
cv2.imshow("Keypoints", im_with_keypoints)
cv2.waitKey(0)
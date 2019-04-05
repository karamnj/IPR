import cv2
import sys
x=0
y=0

cascPath = "haarcascade_frontalface_default.xml"
faceCascade = cv2.CascadeClassifier(cascPath)
font=cv2.FONT_HERSHEY_SIMPLEX

vidcap = cv2.VideoCapture('nj.mp4')
# success,image = vidcap.read()
count = 0
success = True
while success:
  success,image = vidcap.read()
  # print('Read a new frame: ', success)
  gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

  faces = faceCascade.detectMultiScale(
      gray,
      scaleFactor=1.1,
      minNeighbors=5,
      minSize=(30, 30),
      flags=cv2.CASCADE_SCALE_IMAGE
  )
  # DRAW A RECTANGLE AROUND THE FACES FOUND
  for (x, y, w, h) in faces:
    crop_img = image[y:y+h, x:x+w]
    print('x,y,w,h', x, y, w, h)
    cv2.imwrite("frame%d.jpg" % count, crop_img)     # save frame as JPEG file
    count += 1
    break

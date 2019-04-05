# IPR INSTALLATION & USAGE INSTRUCTIONS
# Install Docker
# Download Docker Image from the following location
https://siriuscom-my.sharepoint.com/:f:/p/niranjan_karam/EtHeSxsSAvFNko98gUPb72UBg6iHD9YHX2nJn3k6v6yCcA?e=5MIg4s

# Copy image from path to any host:
sudo docker load -i <path to copied image file>
sudo docker run --name <image> -p 8080:80 -e TERM=xterm -d <template-name>

# Run Docker
docker run -it -v /Users/niranjank/code/tensorflow:/tensor/ gcr.io/tensorflow/tensorflow:ipr

# Copy and Link folder:
docker cp -L /Users/niranjank/code/tensorflow 362494e5ee4d:/tensor/

# Start a container:
docker container start  362494e5ee4d
docker exec -it tf1 bash

# Check Faces in an Image
curl -X POST -F upload=@/Users/niranjank/code/tensorflow/iserve/nj.jpeg http://niranjanmacbook.local:3000/checkImagesForFaces

# Extract images from mp4: opencv
Change video file name in split.py
Run: python split.py

# Train a Model - Flowers
IMAGE_SIZE=224
ARCHITECTURE="mobilenet_0.50_${IMAGE_SIZE}"
python -m scripts.retrain \
--bottleneck_dir=tf_files/bottlenecks \
--how_many_training_steps=500 \
--model_dir=tf_files/models/ \
--summaries_dir=tf_files/training_summaries/"${ARCHITECTURE}" \
--output_graph=tf_files/retrained_graph.pb \
--output_labels=tf_files/retrained_labels.txt \
--architecture="${ARCHITECTURE}" \
--image_dir=tf_files/flower_photos
python -m scripts.retrain   --bottleneck_dir=tf_files/bottlenecks   --how_many_training_steps=500   --model_dir=tf_files/models/   --summaries_dir=tf_files/training_summaries/"${ARCHITECTURE}"   --output_graph=tf_files/retrained_graph.pb   --output_labels=tf_files/retrained_labels.txt   --architecture="${ARCHITECTURE}"   --image_dir=tf_files/flower_photos

python -m scripts.label_image     --graph=tf_files/retrained_graph.pb      --image=tf_files/flower_photos/daisy/21652746_cc379e0eea_m.jpg
python -m scripts.label_image     --graph=tf_files/retrained_graph.pb      --image=tf_files/flower_photos/roses/2414954629_3708a1a04d.jpg

# Train a Model - Faces
IMAGE_SIZE=224
ARCHITECTURE="mobilenet_0.50_${IMAGE_SIZE}"
python -m scripts.retrain \
--bottleneck_dir=tf_files/bottlenecks \
--how_many_training_steps=500 \
--model_dir=tf_files/models/ \
--summaries_dir=tf_files/training_summaries/"${ARCHITECTURE}" \
--output_graph=tf_files/retrained_graph.pb \
--output_labels=tf_files/retrained_labels.txt \
--architecture="${ARCHITECTURE}" \
--image_dir=tf_files/people_photos

python -m scripts.label_image     --graph=tf_files/retrained_graph.pb      --image=tf_files/people_photos/niranjan/frame6.jpg
python -m scripts.label_image     --graph=tf_files/retrained_graph.pb      --image=nj.jpeg

# Please feel free to enhance and contribute.

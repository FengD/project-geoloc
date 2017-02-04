#!/bin/bash
echo "you should have node installed and run the install_local.sh script before"

# getting parent path
parent_path=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )
cd "$parent_path"

# starting backend
echo "starting backend..."
echo "starting users service..."
forever start backend/user/user_app.js
echo "starting question service..."
forever start backend/question/question_app.js
echo "starting uploadImage service..."
forever start backend/uploadImage/uploadImage.js
echo "starting chart service..."
forever start backend/chart/chartServer.js
# starting frontend
echo "front end startup"
forever start frontend/server.js


# starting backend
# echo "starting backend..."
# echo "starting users service..."
# cd backend/user/
# node user_app.js &
# echo "starting question service..."
# cd ../question
# node question_app.js &
# echo "starting uploadImage service..."
# cd ../uploadImage
# node uploadImage.js &
# echo "front end startup"
# cd ../../frontend
# node server.js &

echo "startup complete"

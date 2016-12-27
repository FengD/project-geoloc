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

echo "startup complete"

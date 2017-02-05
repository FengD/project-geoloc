#!/bin/bash
echo "this script should be executed in root mode"
echo "you should have npm installed"

# getting parent path
parent_path=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )
cd "$parent_path"

# installing tools
echo "installing forever..."
npm install -g forever
echo "installing grunt..."
npm install -g grunt
echo "installing bower..."
npm install -g bower

# installing backend
echo "installing users service..."
cd backend/user
npm install
echo "installing question service..."
cd ../question
npm install
echo "installing uploadImage service..."
cd ../uploadImage
npm install
echo "installing chart service..."
cd ../chart
npm install

# initial all questions
cd ../..
mongo localhost/geoloc initial.js


# installing frontend
cd frontend
bower install
npm install

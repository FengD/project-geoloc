#!/bin/bash

# stopping everything
echo "stopping everything..."
forever stopall
# sudo kill $(sudo lsof -t -i:8080)
# sudo kill $(sudo lsof -t -i:8081)
# sudo kill $(sudo lsof -t -i:8082)
# sudo kill $(sudo lsof -t -i:3000)
echo "system stopped"

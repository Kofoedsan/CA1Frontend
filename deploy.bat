#!/usr/bin/env bash

# PROJECT_NAME="Name or your frontend project, for example movie --> folder you created under /var/www"
# DROPLET_URL="URL for your droplet"
echo -n "please enter the project name as it appears on the server in /var/www/"
read -r 
PROJECT_NAME=CA1Frontend
echo -n "please enter the droplet url (e.g myserver.dk)"
read -r
DROPLET_URL=139.59.140.32

echo "##############################"
echo "Building the frontend project"
echo "##############################"

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./build/* kofoed@139.59.140.32:/home/kofoed/CA1Frontend


#!/bin/bash
set -xv

npm run update-webdriver

./clean.sh

./mvnw install -Dserver=jetty9x

#sudo npm install -g npm-license
npm-license || true

#docker-compose -f docker-compose.yml -p TEST ps

exit 0

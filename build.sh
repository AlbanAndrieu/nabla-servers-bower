#!/bin/bash
set -xv

#sudo apt install phantomjs
npm run update-webdriver

./clean.sh

./mvnw install -Dserver=jetty9x

#sudo npm install -g npm-license
npm-license || true

exit 0

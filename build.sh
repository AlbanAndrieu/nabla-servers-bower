#!/bin/bash
set -eu

WORKING_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}"  )" && pwd  )"

# shellcheck source=/dev/null
source "${WORKING_DIR}/scripts/step-0-color.sh"

echo -e "${magenta} ./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update --versions.chrome 97.0.4692.71 ${NC}"
echo -e "${magenta} npm install -g bower@1.8.13 grunt-cli@1.4.3 webdriver-manager@12.1.8 ${NC}"
#npm run update-webdriver
#webdriver-manager update --chrome --versions.chrome=97.0.4692.71

echo -e "${magenta} grunt serve:dist --debug ${NC}"

rm -f package-lock.json || true
./clean.sh

echo -e "${green} ./mvnw install -Dserver=jetty9x ${NC}"
./mvnw install -Dserver=jetty9x

echo -e "${green} ./mvnw clean install org.codehaus.cargo:cargo-maven2-plugin:run -Dserver=jetty9x ${NC}"

npm list > list.log || true

#sudo npm install -g npm-license
echo -e "${magenta} npm-license ${NC}"

#docker-compose -f docker-compose.yml -p TEST ps

exit 0

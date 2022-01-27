#!/bin/bash
set -e

WORKING_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}"  )" && pwd  )"

# shellcheck source=/dev/null
source "${WORKING_DIR}/scripts/step-0-color.sh"

echo -e "${magenta} Cleaning started. ${NC}"

rm -Rf npm/ .node_cache/ .node_tmp/ .tmp/ .bower/ bower_components/ node/ node_modules/ .sass-cache/ .scannerwork/ .repository/ target/ target-eclipse/ build/ phantomas/ dist/ docs/groovydocs/ docs/js/ docs/partials/ site/ coverage/ report/

#source $(dirname $0)/scripts/utils.inc
#rm -Rf $WORKING_DIR/scripts/bower/bower-*

#grunt
#export BUILD_NUMBER=1
#export DRY_RUN_OPT="--git-push-dryrun=true"
if [ "${IS_M2RELEASEBUILD}" = "false" ] ; then
  $WORKING_DIR/scripts/bower/clean.sh --action=clean-tag ${DRY_RUN_OPT} --verbose=true
fi

#git tag -l 'v0.0.*'

rm -f checkstyle.xml package-lock.json || true

echo -e "${magenta} NPM cleaning started. ${NC}"

npm --version
#npm cache clean || true
#npm cache verify
echo -e "${green} Cleaning DONE. ${NC}"

exit 0

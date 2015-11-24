#!/bin/bash

# always stop on errors
set -e

#source $(dirname $0)/scripts/utils.inc
cd $(dirname $0);
SCRIPT_DIR=$(pwd)
#rm -Rf $SCRIPT_DIR/scripts/bower/bower-*

#grunt
#export BUILD_NUMBER=1
#export DRY_RUN_OPT="--git-push-dryrun=true"
if [ "${IS_M2RELEASEBUILD}" = "false" ] ; then
  $SCRIPT_DIR/scripts/bower/clean.sh --action=clean-tag ${DRY_RUN_OPT} --verbose=true
fi

git tag -l 'v0.0.*'

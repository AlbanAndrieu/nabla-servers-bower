#!/bin/bash

cd $(dirname $0);
SCRIPT_DIR=$(pwd)
rm -Rf $SCRIPT_DIR/scripts/bower/bower-*

#grunt || exit 1
#export BUILD_NUMBER=1
$SCRIPT_DIR/scripts/bower/publish.sh --action=prepare --git-push-dryrun=true --verbose=true || exit 2
#$SCRIPT_DIR/scripts/bower/publish.sh --action=publish --git-push-dryrun=true --verbose=true || exit 3

#cd $SCRIPT_DIR/scripts/bower/bower-sample-component
#git push

git tag -l 'v1.0.*'

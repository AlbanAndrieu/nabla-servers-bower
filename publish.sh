#!/bin/bash

# always stop on errors
set -e

cd $(dirname $0);
SCRIPT_DIR=$(pwd)
rm -Rf $SCRIPT_DIR/scripts/bower/bower-*

#grunt
#export BUILD_NUMBER=1
#export DRY_RUN_OPT="--git-push-dryrun=true"
$SCRIPT_DIR/scripts/bower/publish.sh --action=prepare --verbose=true
$SCRIPT_DIR/scripts/bower/publish.sh --action=publish ${DRY_RUN_OPT} --verbose=true

git tag -l 'v1.0.*'

#git ls-remote --tags --heads https://github.com/AlbanAndrieu/nabla-bower-sample-component.git | grep -o 'refs/tags/v[0-9]*\.[0-9]*\.[0-9]*' | sort -r | head | grep -o '[^\/]*$'

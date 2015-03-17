#!/bin/bash

cd $(dirname $0);
SCRIPT_DIR=$(pwd)

grunt || exit 1
export BUILD_NUMBER=1
$SCRIPT_DIR/scripts/bower/publish.sh --action=prepare --git-push-dryrun=true --verbose=true || exit 2
#$SCRIPT_DIR/scripts/bower/publish.sh --action=publish --git-push-dryrun=true --verbose=true || exit 3

#cd $SCRIPT_DIR/scripts/bower/bower-sample-component
#git push

#bower register sample-component https://github.com/AlbanAndrieu/nabla-bower-sample-component.git
#How to remove a wrong tag in git
#git tag -d v1.0.0-build.1+sha.06a8c7e
#git push origin :refs/tags/v1.0.0-build.1+sha.06a8c7e
#create a tag
#git tag v1.0.1
#git push origin tag v1.0.1
#git tag
git tag -l 'v1.0.*'

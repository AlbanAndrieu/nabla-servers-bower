#!/bin/bash

cd $(dirname $0);
SCRIPT_DIR=$(pwd)

grunt
export BUILD_NUMBER=1
$SCRIPT_DIR/scripts/bower/publish.sh --action=prepare --git-push-dryrun=true --verbose=true
#$SCRIPT_DIR/scripts/bower/publish.sh --action=publish --git-push-dryrun=true --verbose=true

#cd $SCRIPT_DIR/scripts/bower/bower-sample-component
#git push

#bower register sample-component ssh://git@scm-git-eur.misys.global.ad:7999/risk/bower-fr-sample-component.git
#bower register sample-component https://scm-git-eur.misys.global.ad/scm/risk/bower-fr-sample-component.git
#How to remove a wrong tag in git
#git tag -d v0.0.0-local+sha.a6d3020
#git push origin :refs/tags/v0.0.0-local+sha.a6d3020
#create a tag
#git tag 0.0.1-beta.1
#git push origin tag 0.0.1-beta.1
#git tag
git tag -l '0.0.*'

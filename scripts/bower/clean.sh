#!/bin/bash

# Script for updating the Angular bower repos from current local build.

echo "#################################"
echo "#### Update bower ###############"
echo "#################################"

ARG_DEFS=(
  "--action=(clean-tag)"
)

function init {
  TMP_DIR=$(resolveDir ../../components)
  #BUILD_DIR=$(resolveDir ../../build)
  #NEW_VERSION=$(cat $BUILD_DIR/version.txt)
  REPOS=(
    nabla-styles
  )
}

function clean-tag {
  for repo in "${REPOS[@]}"
  do
    echo "cd $TMP_DIR/$repo/bower_repo"
    cd $TMP_DIR/$repo/bower_repo

	#remove the older tag created by jenkins
	echo "-- Remove older bower-$repo tag"
	#git tag -l 'v*' | sort
	git tag -l '*build*' | sort | head -1 | xargs git tag -d
	#git fetch --prune --tags
	git fetch
	git tag -l '*build*' | sort | head -1 | xargs -n 1 git push --delete origin

    #echo "-- Pushing bower-$repo"
    #git push origin master
    #git push origin v$NEW_VERSION

    cd $SCRIPT_DIR
  done
}

source $(dirname $0)/../utils.inc

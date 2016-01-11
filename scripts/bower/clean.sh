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
	git fetch --tags
	echo "-- Remove older bower-$repo tag"
    git tag -l '*build*' > tags
    awk -F"-" '{print $2}' tags | awk -F"." '{print $2}' | sort -n -u | awk 'NF' | head -1 | xargs -I {} echo '-build.'{} > tag-todelete
    grep -f tag-todelete tags
    grep -f tag-todelete tags | xargs git tag -d
	#git fetch --prune --tags
	git fetch
	grep -f tag-todelete tags | xargs -n 1 git push --delete origin

    #echo "-- Pushing bower-$repo"
    #git push origin master
    #git push origin v$NEW_VERSION

    cd $SCRIPT_DIR
  done
}

source $(dirname $0)/../utils.inc

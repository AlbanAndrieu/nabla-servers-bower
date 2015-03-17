#!/bin/bash

# Script for removing tags from the Angular bower repos

echo "#################################"
echo "#### Untag bower ################"
echo "#################################"

ARG_DEFS=(
  "--action=(prepare|publish)"
  "--version-number=([0-9]+\.[0-9]+\.[0-9]+(-[a-z]+\.[0-9]+)?)"
)

function init {
  TMP_DIR=$(resolveDir ../../tmp)
  REPOS=(
    sample-component
  )
}

function prepare {
  :
}

function publish {
  for repo in "${REPOS[@]}"
  do
    tags=`git ls-remote --tags ssh://git@scm-git-eur.misys.global.ad:7999/risk/bower-fr-$repo`
    if [[ $tags =~ "refs/tags/v$VERSION_NUMBER" ]]; then
      echo "-- Creating dummy git repo for bower-fr-$repo with origin remote"
      mkdir $TMP_DIR/bower-fr-$repo
      cd $TMP_DIR/bower-fr-$repo
      git init
      git remote add origin ssh://git@scm-git-eur.misys.global.ad:7999/risk/bower-fr-$repo.git
      git push origin :v$VERSION_NUMBER
      echo "-- Deleting v$VERSION_NUMBER tag from bower-fr-$repo"
      cd $SCRIPT_DIR
    else
      echo "-- No remote tag matching v$VERSION_NUMBER exists on bower-fr-$repo"
    fi
  done
}

source $(dirname $0)/../utils.inc

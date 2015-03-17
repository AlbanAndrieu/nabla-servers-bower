#!/bin/bash

grunt
./scripts/bower/publish.sh​ --action=prepare --git-push-dryrun=true --verbose=true

#cd scripts/bower/bower-sample-component
#git push

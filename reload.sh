#!/bin/bash
cd ~/academy-aor
#while [ true ]; do
GIT=`git pull`
if [[ $GIT =~ "Already" ]]; then
  echo $GIT
else
  yarn generate
  pm2 restart all
fi
#sleep 5
#done

#!/bin/bash

echo "====> Prepare Start <===="

if [ ! -d "$QM_PREVIEW_DEPLOY_PATH" ]; then
  git clone "$QM_PUBLISH_GIT" "$QM_PREVIEW_DEPLOY_PATH"
  if [ ! -d "$QM_PREVIEW_DEPLOY_PATH" ]; then
    echo "[E] clone git error."
    exit 1
  fi
  cd $QM_PREVIEW_DEPLOY_PATH
  WORK_BRANCH=$(git branch -a | grep "$CI_BUILD_REF_NAME")
  if [ -n "$WORK_BRANCH" ]; then
    echo "[D] found branch $CI_BUILD_REF_NAME, checkout"
    git checkout $CI_BUILD_REF_NAME
  else
    echo "[D] branch $CI_BUILD_REF_NAME not found"
    if [ "${CI_BUILD_REF_NAME:0:7}" = "hotfix/" ]; then
      echo "[D] create branch $CI_BUILD_REF_NAME from master"
      git checkout -b "$CI_BUILD_REF_NAME" origin/master
    else
      echo "[D] create branch $CI_BUILD_REF_NAME from develop"
      git checkout -b "$CI_BUILD_REF_NAME" origin/develop
    fi
    git push -u origin "$CI_BUILD_REF_NAME"
  fi
  # TODO 1. checkout
else
  cd $QM_PREVIEW_DEPLOY_PATH
  git reset --hard
  git fetch
  git pull
fi

echo "-----------------------------"
git log -n 1

echo "====> Build Start <===="
cd $CI_PROJECT_DIR
ls -l
qmis -v

if [ "${CI_BUILD_REF_NAME}" = "master" ]; then
  echo "qmis release -compDd $QM_PREVIEW_DEPLOY_PATH"
  qmis release -compDd $QM_PREVIEW_DEPLOY_PATH
else
  echo "qmis release -cmpd $QM_PREVIEW_DEPLOY_PATH"
  qmis release -cmpd $QM_PREVIEW_DEPLOY_PATH
fi

if [ $? -ne 0 ];then
  echo "[E] qmis release error"
  exit 1
fi
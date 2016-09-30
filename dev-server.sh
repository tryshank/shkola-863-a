#!/usr/bin/env bash
. ./set-env-vars.sh

webpack-dev-server --hot --inline & cd server && NODE_ENV=development node app.js
#!/bin/bash
export ENV_REDIS_SECRET="hey you"
export ENV_SERVER_PORT=3000
export ENV_MONGODB_URI="mongodb://localhost:27017/shkola"

webpack-dev-server --hot --inline & cd server && NODE_ENV=development node app.js
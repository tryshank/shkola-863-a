#!/bin/bash
echo "set vars..."
export ENV_MONGO_DEBUG="true"
export ENV_REDIS_SECRET="hey you"
export ENV_SERVER_PORT=3000
export ENV_MONGODB_URI="mongodb://localhost:27017/shkola"
export ENV_MAIL_SERVER="smtp.gmail.com"
export ENV_MAIL_SUBJECT="Mail from Courses web-site"
export ENV_MAIL_ADMIN_EMAIL="test"
export ENV_MAIL_USER="test"
export ENV_MAIL_PASSWORD="test"
export ENV_REGISTRATION_ADMIN_PASSWORD="1"
export ENV_SERVER_HOST="http://localhost"
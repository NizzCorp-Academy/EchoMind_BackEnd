#!/bin/sh
set -e

# Read Docker secrets and export them as environment variables
if [ -f "/run/secrets/JWT_SECRET" ]; then
  export JWT_SECRET=$(cat /run/secrets/JWT_SECRET)
fi

if [ -f "/run/secrets/MONGO_USERNAME" ]; then
  export MONGO_USERNAME=$(cat /run/secrets/MONGO_USERNAME)
fi

if [ -f "/run/secrets/MONGO_PASSWORD" ]; then
  export MONGO_PASSWORD=$(cat /run/secrets/MONGO_PASSWORD)
fi

if [ -f "/run/secrets/MONGO_URI" ]; then
  export MONGO_URI=$(cat /run/secrets/MONGO_URI)
fi

# Execute the given command
exec "$@"
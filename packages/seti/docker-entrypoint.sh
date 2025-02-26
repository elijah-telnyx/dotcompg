#!/bin/sh

# Runtime environment variables
# https://www.saltycrane.com/blog/2021/04/buildtime-vs-runtime-environment-variables-nextjs-docker/
# https://app.getguru.com/card/ik47AGbT/Kubernetes-Vault-Integration-Usage
set -a
SECRETS_FILE="/vault/secrets/seti.env"

if [ -f "$SECRETS_FILE" ]; then
  source "$SECRETS_FILE"
  export NODE_ENV=${NODE_ENV}
  export NEXT_PUBLIC_RUNTIME_ENV=${NEXT_PUBLIC_RUNTIME_ENV}
  export RUNTIME=true
else
  export NEXT_PUBLIC_RUNTIME_ENV=${NEXT_PUBLIC_RUNTIME_ENV}
  echo "$SECRETS_FILE Not Found. Using local config"
fi

echo "RUNTIME_ENV=$NEXT_PUBLIC_RUNTIME_ENV"

npm run start:seti

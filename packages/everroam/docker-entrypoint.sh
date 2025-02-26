#!/bin/sh

# Runtime environment variables
# https://www.saltycrane.com/blog/2021/04/buildtime-vs-runtime-environment-variables-nextjs-docker/
# https://app.getguru.com/card/ik47AGbT/Kubernetes-Vault-Integration-Usage
set -a
SECRETS_FILE="/vault/secrets/everroam.env"

if [ -f "$SECRETS_FILE" ]; then
  source "$SECRETS_FILE"
  export NODE_ENV=${NODE_ENV}
  export NEXT_PUBLIC_RUNTIME_ENV=${NEXT_PUBLIC_RUNTIME_ENV}
  export CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN
  export CONTENTFUL_ACCESS_TOKEN_PREVIEW=$CONTENTFUL_ACCESS_TOKEN_PREVIEW
  export GOOGLE_SERVICE_ACCOUNT_EMAIL=$GOOGLE_SERVICE_ACCOUNT_EMAIL
  export GOOGLE_PRIVATE_KEY=$GOOGLE_PRIVATE_KEY
  export RUNTIME=true
else
  export NEXT_PUBLIC_RUNTIME_ENV=${NEXT_PUBLIC_RUNTIME_ENV}
  echo "$SECRETS_FILE Not Found. Using local config"
fi

echo "RUNTIME_ENV=$NEXT_PUBLIC_RUNTIME_ENV"

npm run start:everroam

#!/bin/sh

# Runtime environment variables
# https://www.saltycrane.com/blog/2021/04/buildtime-vs-runtime-environment-variables-nextjs-docker/
# https://app.getguru.com/card/ik47AGbT/Kubernetes-Vault-Integration-Usage
set -a
SECRETS_FILE="/vault/secrets/telnyxdotcom-stateful.env"

if [ -f "$SECRETS_FILE" ]; then
  source "$SECRETS_FILE"
  export NODE_ENV=${NODE_ENV}
  export NEXT_PUBLIC_RUNTIME_ENV=${NEXT_PUBLIC_RUNTIME_ENV}
  export ANALYTICS_SEGMENT_WRITE_KEY=$ANALYTICS_SEGMENT_WRITE_KEY
  export CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN
  export CONTENTFUL_ACCESS_TOKEN_BLOG=$CONTENTFUL_ACCESS_TOKEN_BLOG
  export CONTENTFUL_ACCESS_TOKEN_PREVIEW=$CONTENTFUL_ACCESS_TOKEN_PREVIEW
  export CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW=$CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW
  export STRAPI_ACCESS_TOKEN=$STRAPI_ACCESS_TOKEN
  export STRAPI_GITHUB_REPO_TOKEN=$STRAPI_GITHUB_REPO_TOKEN
  export CONTENTFUL_MANAGEMENT_TOKEN_ASSETS=$CONTENTFUL_MANAGEMENT_TOKEN_ASSETS
  export DOCUMENTS_API_KEY=$DOCUMENTS_API_KEY
  export DOMO_CLIENT_ID=$DOMO_CLIENT_ID
  export DOMO_SECRET=$DOMO_SECRET
  export AIRTABLE_TOKEN=$AIRTABLE_TOKEN
  export RECAPTCHA_V3_SECRET=$RECAPTCHA_V3_SECRET
  export NEUTRINO_SECRET_KEY=$NEUTRINO_SECRET_KEY
  export NEUTRINO_SECRET_USER_ID=$NEUTRINO_SECRET_USER_ID
  export SENDGRID_API_KEY=$SENDGRID_API_KEY
  export SENDGRID_CONTACTS_API_KEY=$SENDGRID_CONTACTS_API_KEY
  export CLOUDFLARE_API_KEY=$CLOUDFLARE_API_KEY
  export PORTAL_API_V2_KEY=$PORTAL_API_V2_KEY
  export GOOGLE_SERVICE_ACCOUNT_EMAIL=$GOOGLE_SERVICE_ACCOUNT_EMAIL
  export GOOGLE_PRIVATE_KEY=$GOOGLE_PRIVATE_KEY
  export PORTAL_CHATBOT_API_V2_KEY=$PORTAL_CHATBOT_API_V2_KEY
  export PORTAL_VOICE_AI_API_V2_KEY=$PORTAL_VOICE_AI_API_V2_KEY
  export CLOUDFLARE_ZONE_ID=$CLOUDFLARE_ZONE_ID
  export INTERCOM_SECRET_KEY=$INTERCOM_SECRET_KEY
  export HCAPTCHA_SECRET_KEY=$HCAPTCHA_SECRET_KEY
  export DISABLE_IN_MEMORY_CACHE=${DISABLE_IN_MEMORY_CACHE}
  export RUNTIME=true
else
  export NEXT_PUBLIC_RUNTIME_ENV=${NEXT_PUBLIC_RUNTIME_ENV}
  echo "$SECRETS_FILE Not Found. Using local config"
fi

echo "RUNTIME_ENV=$NEXT_PUBLIC_RUNTIME_ENV"

# /app/docker-entrypoint.sh
# /app/packages/(...)

if [ ! -f "packages/telnyxdotcom/.next/BUILD_ID" ]; then
  ls -la packages/telnyxdotcom/.next
  echo "Storage mount directory empty. Initializing .next directory"
  cp -r packages/telnyxdotcom/.next-init/. packages/telnyxdotcom/.next
  # remove the ephemeral .next-init directory
  rm -rf packages/telnyxdotcom/.next-init
  buildId=$(cat packages/telnyxdotcom/.next/BUILD_ID)
else
  buildId=$(cat packages/telnyxdotcom/.next/BUILD_ID)
  initBuildId=$(cat packages/telnyxdotcom/.next-init/BUILD_ID)

  if [ "$buildId" != "$initBuildId" ]; then
    echo "Build ID mismatch - previous: $buildId, init: $initBuildId. Merging .next directories"
    # Copy static files from the previous builds to build init: do not replace init static files since they're the most up-to-date
    cp -rf packages/telnyxdotcom/.next/static/. packages/telnyxdotcom/.next-init/static/
    # Set initBuildId as the target build ID
    yes | cp -rf packages/telnyxdotcom/.next-init/. packages/telnyxdotcom/.next
    # remove the ephemeral .next-init directory
    rm -rf packages/telnyxdotcom/.next-init
    buildId=$(cat packages/telnyxdotcom/.next/BUILD_ID)
  fi
fi

echo "Build ID - $buildId"
npm run start:telnyxdotcom

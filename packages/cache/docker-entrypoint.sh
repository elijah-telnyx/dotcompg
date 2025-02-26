#!/bin/sh

# K8S - source secrets and some env variables
set -o allexport
SECRETS_FILE="/vault/secrets/telnyxdotcom-cache-monitor.env"
set +o allexport
if [ -f "$SECRETS_FILE" ]; then
    set -a
    . "$SECRETS_FILE"
    export CLOUDFLARE_API_KEY=${CLOUDFLARE_API_KEY}
    export CLOUDFLARE_ZONE_ID=${CLOUDFLARE_ZONE_ID}
    export PORTAL_API_V2_KEY=${PORTAL_API_V2_KEY}
    export SLACK_OAUTH_TOKEN=${SLACK_OAUTH_TOKEN}
    set +a
else
    echo "$SECRETS_FILE Not Found. Using local config"
fi

# Start API
node server.js
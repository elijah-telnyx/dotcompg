#!/bin/sh

# K8S - source secrets and some env variables
set -o allexport
SECRETS_FILE="/vault/secrets/telnyxdotcom-e2e.env"
set +o allexport
if [ -f "$SECRETS_FILE" ]; then
    set -a
    . "$SECRETS_FILE"
    export E2E_PLAYWRIGHT_WORKERS=${E2E_PLAYWRIGHT_WORKERS}
    export E2E_PLAYWRIGHT_RETRIES=${E2E_PLAYWRIGHT_RETRIES}
    export E2E_TEST_TIMEOUT=${E2E_TEST_TIMEOUT}
    export E2E_AJS_ANONYMOUS_ID=${E2E_AJS_ANONYMOUS_ID}
    export E2E_AJS_USER_ID=${E2E_AJS_USER_ID}
    export E2E_GOOGLE_USER_EMAIL=${E2E_GOOGLE_USER_EMAIL}
    export E2E_GOOGLE_USER_PASSWORD=${E2E_GOOGLE_USER_PASSWORD}
    export E2E_PORTAL_V2_API_KEY_PROD=${E2E_PORTAL_V2_API_KEY_PROD}
    export NODE_ENV=${NODE_ENV}
    export PORT=${PORT}
    export RUNTIME_ENV=${RUNTIME_ENV}
    set +a
else
    echo "$SECRETS_FILE Not Found"
fi

# Start service and health check
npm run start

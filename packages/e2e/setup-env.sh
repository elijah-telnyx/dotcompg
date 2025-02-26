#!/bin/bash
# Creates an environment variable file for local development from secrets in vault
#
# This script requires `vault` CLI installed in the PATH of the machine
# For installing vault:
#    https://app.getguru.com/card/inEG88jT/Install-vault-client
#
# For authenticating vault:
#    https://app.getguru.com/card/Tezq4nyc/Vault-API
#
# Example of authentication:
# ```
# vault login \
#   -address=https://vault-ha.query.dev.telnyx.io \
#   -method=ldap username=$(whoami)
# ```

SQUAD='dotcom-squad'
PROJECT='telnyxdotcom-e2e'
VAULT='https://vault-ha.query.dev.telnyx.io'
TOKEN=~/.vault-token
SECRETS=(
	PORT
	NODE_ENV
	RUNTIME_ENV
	E2E_TEST_TIMEOUT
	E2E_PLAYWRIGHT_WORKERS
	E2E_PLAYWRIGHT_RETRIES
	E2E_AJS_ANONYMOUS_ID
	E2E_AJS_USER_ID
	E2E_GOOGLE_USER_EMAIL
	E2E_GOOGLE_USER_PASSWORD
	E2E_PORTAL_V2_API_KEY_PROD
)

# fallback to "dev" if not provided by parameter -- <dev/test/staging/production>
RUNTIME_ENV="${1:-dev}"

# Login to vault first
echo "Environment Variables setup from Vault using Login via LDAP"

# export env var to avoid cli warnings
export VAULT_ADDR=${VAULT}

# https://github.com/hashicorp/vault/issues/2059#issue-186879686
if [ ! -f "$TOKEN" ]; then
	vault login -address=${VAULT} -method=ldap username=$(whoami)
fi

# Fetch secrets from vault
for SECRET in "${SECRETS[@]}"; do
	VAULT_CMD=$(vault kv get -address="${VAULT}" -field=${SECRET} -format=yaml ${SQUAD}/${PROJECT})
	VALUE=$(echo "${VAULT_CMD}")
	ENVS="${ENVS}${SECRET}=${VALUE}\n"
done

# Create .env.developmnent file
echo -e "${ENVS}" >".env"
echo "✅ Created .env"

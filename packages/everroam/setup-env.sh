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
PROJECT='everroam'
VAULT='https://vault-ha.query.dev.telnyx.io'
TOKEN=~/.vault-token
SECRETS=(
	CONTENTFUL_ACCESS_TOKEN
	CONTENTFUL_ACCESS_TOKEN_PREVIEW
	GOOGLE_SERVICE_ACCOUNT_EMAIL
	GOOGLE_PRIVATE_KEY
	PORT
)

# fallback to "dev" if not provided by parameter -- <dev/test/staging/production>
RUNTIME_ENV="${1:-dev}"

# Static environment variables
ENVS="NEXT_PUBLIC_RUNTIME_ENV=${RUNTIME_ENV}\n"
# Default preview api behavior
ENVS="${ENVS}PREVIEW_MODE_DEFAULT=true\n"

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
echo -e "${ENVS}" >".env.local"
echo "✅ Created .env.local"

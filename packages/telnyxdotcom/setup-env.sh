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
PROJECT='telnyxdotcom'
VAULT='https://vault-ha.query.dev.telnyx.io'
TOKEN=~/.vault-token
SECRETS=(
	ANALYTICS_SEGMENT_WRITE_KEY
	ANALYTICS_SEGMENT_WRITE_KEY_PROD
	CONTENTFUL_ACCESS_TOKEN
	CONTENTFUL_ACCESS_TOKEN_PROD
	CONTENTFUL_ACCESS_TOKEN_BLOG
	CONTENTFUL_ACCESS_TOKEN_BLOG_PROD
	CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW
	CONTENTFUL_ACCESS_TOKEN_PREVIEW
	STRAPI_ACCESS_TOKEN
	STRAPI_GITHUB_REPO_TOKEN
	CONTENTFUL_MANAGEMENT_TOKEN_ASSETS
	DOCUMENTS_API_KEY
	DOCUMENTS_API_KEY_PROD
	DOMO_CLIENT_ID
	DOMO_SECRET
	AIRTABLE_TOKEN
	NEUTRINO_SECRET_KEY
	NEUTRINO_SECRET_KEY_PROD
	NEUTRINO_SECRET_USER_ID
	NEUTRINO_SECRET_USER_ID_PROD
	PORT
	RECAPTCHA_V3_SECRET
	RECAPTCHA_V3_SECRET_PROD
	SENDGRID_API_KEY
	SENDGRID_API_KEY_PROD
	SENDGRID_CONTACTS_API_KEY
	PORTAL_API_V2_KEY
	PORTAL_API_V2_KEY_PROD
	GOOGLE_SERVICE_ACCOUNT_EMAIL
	GOOGLE_PRIVATE_KEY
	PORTAL_CHATBOT_API_V2_KEY
	PORTAL_CHATBOT_API_V2_KEY_PROD
	PORTAL_VOICE_AI_API_V2_KEY
	CLOUDFLARE_API_KEY
	CLOUDFLARE_ZONE_ID
	INTERCOM_SECRET_KEY
	HCAPTCHA_SECRET_KEY
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

define help
------------------------------------------------------------------------------------
--- Usage - make [yourtarget]

--- Available Targets:
--- build:					Build docker image for service
--- test:						Run tests
--- push: 					Push docker image for service

------------------------------------------------------------------------------------
endef
export help

help:
	$(info $(help))

###################################################################
# ARGS and Definitions
###################################################################

SERVICE_NAME := telnyxdotcom-stateful-oci
IMAGE_TAG := red
IMAGE_TAG_PROD := prod
IMAGE_NAME := registry.internal.telnyx.com/jenkins/$(SERVICE_NAME):$(IMAGE_TAG)
IMAGE_NAME_PROD := registry.internal.telnyx.com/jenkins/$(SERVICE_NAME):$(IMAGE_TAG_PROD)
BUILD_ARGS := --build-arg BUILD_NUMBER \
	--build-arg SERVICE_VERSION \
	--build-arg ANALYTICS_SEGMENT_WRITE_KEY \
	--build-arg CONTENTFUL_ACCESS_TOKEN \
	--build-arg CONTENTFUL_ACCESS_TOKEN_BLOG \
	--build-arg CONTENTFUL_ACCESS_TOKEN_PREVIEW \
	--build-arg CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW \
	--build-arg STRAPI_ACCESS_TOKEN \
	--build-arg STRAPI_GITHUB_REPO_TOKEN \
	--build-arg CONTENTFUL_MANAGEMENT_TOKEN_ASSETS \
	--build-arg DOCUMENTS_API_KEY \
	--build-arg DOMO_CLIENT_ID \
	--build-arg DOMO_SECRET \
	--build-arg AIRTABLE_TOKEN \
	--build-arg NEUTRINO_SECRET_KEY \
	--build-arg NEUTRINO_SECRET_USER_ID \
	--build-arg RECAPTCHA_V3_SECRET \
	--build-arg SENDGRID_API_KEY \
	--build-arg SENDGRID_CONTACTS_API_KEY \
	--build-arg PORTAL_API_V2_KEY \
	--build-arg PORTAL_CHATBOT_API_V2_KEY \
	--build-arg PORTAL_VOICE_AI_API_V2_KEY \
	--build-arg CLOUDFLARE_API_KEY \
	--build-arg CLOUDFLARE_ZONE_ID \
	--build-arg INTERCOM_SECRET_KEY \
	--build-arg GOOGLE_SERVICE_ACCOUNT_EMAIL \
	--build-arg GOOGLE_PRIVATE_KEY \
	--build-arg DISABLE_IN_MEMORY_CACHE

###################################################################
# Docker pipeline
###################################################################

build:
	docker build $(BUILD_ARGS) \
			--build-arg NEXT_PUBLIC_RUNTIME_ENV=staging \
			-f Dockerfile \
			-t $(IMAGE_NAME) ../..

# TODO: Replace PORTAL_API_V2_KEY_PROD with PORTAL_API_V2_KEY when:
# - logic in https://github.com/team-telnyx/telnyxdotcom-monorepo/blob/9f631b95fb64885fb89d0085fc4b5c04e4ce2b3f/packages/telnyxdotcom/src/lib/Api/Api.ts#L56 is removed
# - logic in https://github.com/team-telnyx/telnyxdotcom-monorepo/blob/9f631b95fb64885fb89d0085fc4b5c04e4ce2b3f/packages/telnyxdotcom/src/services/subpoenaService.ts#L168-L169 is removed
build-prod:
	docker build $(BUILD_ARGS) \
			--build-arg NEXT_PUBLIC_RUNTIME_ENV=production \
			--build-arg PORTAL_API_V2_KEY_PROD=$(PORTAL_API_V2_KEY_PROD) \
			-f Dockerfile \
			-t $(IMAGE_NAME_PROD) ../..

build-local:
	docker build -t telnyxdotcom-stateful -f Dockerfile $(shell cat ../telnyxdotcom/.env.local | sed '/^$$/d' | sed 's@^@--build-arg @g') ../../.

run-local:
	docker run --name telnyxdotcom-stateful -d -p 3000:3000 $(shell cat ../telnyxdotcom/.env.local | sed '/^$$/d' | sed 's@^@--env @g') telnyxdotcom-stateful

test:
	echo "Empty"

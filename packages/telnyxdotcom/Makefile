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

SERVICE_NAME := telnyxdotcom
IMAGE_TAG := red
IMAGE_NAME := registry.internal.telnyx.com/jenkins/$(SERVICE_NAME):$(IMAGE_TAG)
BUILD_ARGS := --build-arg BUILD_NUMBER \
	--build-arg ANALYTICS_SEGMENT_WRITE_KEY \
	--build-arg CONTENTFUL_ACCESS_TOKEN \
	--build-arg CONTENTFUL_ACCESS_TOKEN_BLOG \
	--build-arg CONTENTFUL_ACCESS_TOKEN_PREVIEW \
	--build-arg CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW \
	--build-arg CONTENTFUL_MANAGEMENT_TOKEN_ASSETS \
	--build-arg DOCUMENTS_API_KEY \
	--build-arg DOMO_CLIENT_ID \
	--build-arg DOMO_SECRET \
	--build-arg AIRTABLE_TOKEN \
	--build-arg STRAPI_ACCESS_TOKEN \
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
	--build-arg GOOGLE_PRIVATE_KEY

BUILD_ARGS_PROD := --build-arg ANALYTICS_SEGMENT_WRITE_KEY_PROD \
	--build-arg CONTENTFUL_ACCESS_TOKEN_PROD \
	--build-arg CONTENTFUL_ACCESS_TOKEN_BLOG_PROD \
	--build-arg CONTENTFUL_MANAGEMENT_TOKEN_ASSETS \
	--build-arg DOCUMENTS_API_KEY_PROD \
	--build-arg NEUTRINO_SECRET_KEY_PROD \
	--build-arg NEUTRINO_SECRET_USER_ID_PROD \
	--build-arg RECAPTCHA_V3_SECRET_PROD \
	--build-arg SENDGRID_API_KEY_PROD \
	--build-arg PORTAL_API_V2_KEY_PROD \
	--build-arg PORTAL_CHATBOT_API_V2_KEY_PROD \
	--build-arg CLOUDFLARE_API_KEY \
	--build-arg CLOUDFLARE_ZONE_ID \
	--build-arg INTERCOM_SECRET_KEY \
	--build-arg GOOGLE_SERVICE_ACCOUNT_EMAIL \
	--build-arg GOOGLE_PRIVATE_KEY

###################################################################
# Docker pipeline
###################################################################

build:
	docker build $(BUILD_ARGS) $(BUILD_ARGS_PROD) \
	-f Dockerfile \
	-t $(IMAGE_NAME) ../..

test:
	echo "Temporary disabled"

push:
	docker push $(IMAGE_NAME)

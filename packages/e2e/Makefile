define help
------------------------------------------------------------------------------------
--- Usage - make [yourtarget]
--- Available Targets:
--- clean:			Uninstall dependencies
--- build			build image with node server
------------------------------------------------------------------------------------
endef
export help

SHELL=bash
SERVICE_NAME ?= telnyxdotcom-e2e
VERSION := red
IMAGE_NAME := registry.internal.telnyx.com/jenkins/$(SERVICE_NAME):$(VERSION)
PORT ?= 4029

build_args := --build-arg PORT \
	--build-arg BUILD_NUMBER \
	--build-arg NODE_ENV \
	--build-arg E2E_TEST_TIMEOUT \
	--build-arg E2E_PLAYWRIGHT_WORKERS \
	--build-arg E2E_PLAYWRIGHT_RETRIES \
	--build-arg E2E_AJS_ANONYMOUS_ID \
	--build-arg E2E_AJS_USER_ID \
	--build-arg E2E_GOOGLE_USER_EMAIL \
	--build-arg E2E_GOOGLE_USER_PASSWORD \
	--build-arg E2E_PORTAL_V2_API_KEY_PROD

help:
	$(info $(help))

build:
	docker build $(build_args) \
	-f Dockerfile \
	-t $(IMAGE_NAME) .

test:
	echo "In build"

update-snapshots:
	docker cp $(SERVICE_NAME):/app/src/ ./

push:
	docker push $(IMAGE_NAME)

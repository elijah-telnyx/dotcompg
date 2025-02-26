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

SERVICE_NAME := everroam-oci
IMAGE_TAG := red
IMAGE_TAG_PROD := prod
IMAGE_NAME := registry.internal.telnyx.com/jenkins/$(SERVICE_NAME):$(IMAGE_TAG)
IMAGE_NAME_PROD := registry.internal.telnyx.com/jenkins/$(SERVICE_NAME):$(IMAGE_TAG_PROD)
BUILD_ARGS := --build-arg BUILD_NUMBER \
	--build-arg SERVICE_VERSION \
	--build-arg CONTENTFUL_ACCESS_TOKEN \
	--build-arg CONTENTFUL_ACCESS_TOKEN_PREVIEW \
	--build-arg GOOGLE_SERVICE_ACCOUNT_EMAIL \
	--build-arg GOOGLE_PRIVATE_KEY

###################################################################
# Docker pipeline
###################################################################

build:
	docker build $(BUILD_ARGS) \
			--build-arg NEXT_PUBLIC_RUNTIME_ENV=staging \
			-f Dockerfile \
			-t $(IMAGE_NAME) ../..

build-prod:
	docker build $(BUILD_ARGS) \
			--build-arg NEXT_PUBLIC_RUNTIME_ENV=production \
			-f Dockerfile \
			-t $(IMAGE_NAME_PROD) ../..

build-local:
	docker build -t everroam -f Dockerfile $(shell cat ../everroam/.env.local | sed '/^$$/d' | sed 's@^@--build-arg @g') ../../.

run-local:
	docker run --name everroam -d -p 3000:3000 $(shell cat ../everroam/.env.local | sed '/^$$/d' | sed 's@^@--env @g') everroam

test:
	echo "Empty"

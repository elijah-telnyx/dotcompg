define help
------------------------------------------------------------------------------------
--- Usage - make [yourtarget]

--- Available Targets:
--- test:		Run tests
--- build: 	Pack everything to deploy to STAGING and PROD

------------------------------------------------------------------------------------
endef
export help

SERVICE_NAME ?= telnyxdotcom-ui
IMAGE_TAG := red
IMAGE_NAME := registry.internal.telnyx.com/jenkins/$(SERVICE_NAME):$(IMAGE_TAG)

help:
	$(info $(help))

# ../.. uses the root context for the docker build
build:
	docker build \
	--build-arg PORT=6891 \
	-f Dockerfile \
	-t $(IMAGE_NAME) ../..

test:
	echo "In build"

push:
	docker push $(IMAGE_NAME)

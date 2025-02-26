define help
------------------------------------------------------------------------------------
--- Usage - make [yourtarget]
--- Available Targets:
--- build			build image with node server
------------------------------------------------------------------------------------
endef
export help

SHELL=bash
SERVICE_NAME ?= telnyxdotcom-cache-monitor-oci
VERSION := red
IMAGE_NAME := registry.internal.telnyx.com/jenkins/$(SERVICE_NAME):$(VERSION)
PORT ?= 4029

build_args := \
	--build-arg PORT \
	--build-arg BUILD_NUMBER

help:
	$(info $(help))

build:
	docker build $(build_args) \
	-f Dockerfile \
	-t $(IMAGE_NAME) .

test:
	echo "No tests to run."

push:
	docker push $(IMAGE_NAME)

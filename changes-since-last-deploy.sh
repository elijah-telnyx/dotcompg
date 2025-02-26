#!/bin/bash
# Returns the staged changes since last production deployment. Source: https://consul.internal.telnyx.com. Considers UI package.
# This script assumes that telnyxdotcom has at least one instance deployed to ch1b-prod
# This script requires `jq` installed in the PATH of the machine
#        service-name defaults to telnyxdotcom if not provided

if [ "$#" -lt 2 ]; then
    echo "Usage: $0 [service-name] <package-name> <dc>"
    echo "Example: $0 telnyxdotcom-stateful telnyxdotcom ch1b-prod"
    echo "Note: service-name defaults to telnyxdotcom-stateful if not provided"
    exit 1
fi

SERVICE="${1:-telnyxdotcom-stateful}"
PACKAGE="${2}"
DC="${3:-ch1b-prod}"

# Validate package exists
if [ ! -d "packages/$PACKAGE" ]; then
    echo "Error: Package 'packages/$PACKAGE' does not exist"
    exit 1
fi

HOST="consul.internal.telnyx.com"

SERVICE_VERSION_COMMIT=$(curl -s "https://$HOST/v1/health/service/$SERVICE?dc=$DC" | jq ".[0].Service.Meta.version" | grep -o -E "[a-z0-9]{7}")

LOG=$(git log --pretty='%C(yellow)%ad%C(reset) %C(blue)[%an]%C(reset) %s\n' --date=short $SERVICE_VERSION_COMMIT.. "packages/$PACKAGE" "packages/ui")

echo -e $LOG | sed 's/^ //'

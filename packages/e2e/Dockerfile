ARG NODE_VERSION=20.7.0-alpine

#
# (1/2) Build step image
#
FROM registry.internal.telnyx.com/mcr/playwright:v1.38.0-focal AS build

RUN mkdir -p /home/node/e2e

WORKDIR /home/node/e2e

# Copy project files for build
COPY ./ /home/node/e2e/

RUN mkdir node_modules && npm ci

# static envs by args
ARG BUILD_NUMBER
ENV BUILD_NUMBER $BUILD_NUMBER

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ARG E2E_TEST_TIMEOUT
ENV E2E_TEST_TIMEOUT $E2E_TEST_TIMEOUT

ARG E2E_PLAYWRIGHT_WORKERS
ENV E2E_PLAYWRIGHT_WORKERS $E2E_PLAYWRIGHT_WORKERS

ARG E2E_PLAYWRIGHT_RETRIES
ENV E2E_PLAYWRIGHT_RETRIES $E2E_PLAYWRIGHT_RETRIES

ARG E2E_AJS_ANONYMOUS_ID
ENV E2E_AJS_ANONYMOUS_ID $E2E_AJS_ANONYMOUS_ID

ARG E2E_AJS_USER_ID
ENV E2E_AJS_USER_ID $E2E_AJS_USER_ID

ARG E2E_GOOGLE_USER_EMAIL
ENV E2E_GOOGLE_USER_EMAIL $E2E_GOOGLE_USER_EMAIL

ARG E2E_GOOGLE_USER_PASSWORD
ENV E2E_GOOGLE_USER_PASSWORD $E2E_GOOGLE_USER_PASSWORD

ARG E2E_PORTAL_V2_API_KEY_PROD
ENV E2E_PORTAL_V2_API_KEY_PROD $E2E_PORTAL_V2_API_KEY_PROD

# Build prod reports. Prevent build stop on tests failure
ENV RUNTIME_ENV 'production'
# https://github.com/microsoft/playwright/issues/10638
ENV PLAYWRIGHT_NO_LAYOUT_SHIFT_CHECK '1'
RUN npm run build; exit 0

#
# (2/2) Final image - Expose reports
#
FROM node:${NODE_VERSION} AS runtime

ARG PORT

# User + mkdir + `--chown=node:node` must be set to get around `EACCES: permission denied` errors
# See https://github.com/nodejs/docker-node/issues/740

USER node

# Change working directory for safety
WORKDIR /app

COPY --from=build --chown=node:node /home/node/e2e/package.json /app/package.json
COPY --from=build --chown=node:node /home/node/e2e/package-lock.json /app/package-lock.json
COPY --from=build --chown=node:node /home/node/e2e/server.js /app/server.js
COPY --from=build --chown=node:node /home/node/e2e/registerMetrics.js /app/registerMetrics.js
COPY --from=build --chown=node:node /home/node/e2e/src/ /app/src/
COPY --from=build --chown=node:node /home/node/e2e/results/ /app/results/
# Copy the dependencies
COPY --from=build --chown=node:node /home/node/e2e/node_modules/ /app/node_modules/

# Entrypoint to start container
COPY --from=build --chown=node:node /home/node/e2e/docker-entrypoint.sh /app/docker-entrypoint.sh

EXPOSE $PORT

# start server
ENTRYPOINT ["/app/docker-entrypoint.sh"]

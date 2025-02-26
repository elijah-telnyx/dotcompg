ARG NODE_VERSION=20.7.0-alpine

#
# To run locally (at the 'ui' package root):
# `docker build -f Dockerfile -t telnyx-ui --build-arg PORT=6006 .`

#
# (1/2) Build Storybook
#
FROM node:${NODE_VERSION} as dependencies
WORKDIR /app

COPY package.json package-lock.json ./

# Copy packages' package.json
COPY ./packages/ui/package.json ./packages/ui/package.json
COPY ./packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY ./packages/theme/package.json ./packages/theme/package.json

RUN npm config list && mkdir node_modules && npm ci

# Peer deps
RUN npm install next@13.5.8 -w telnyxdotcom-ui
RUN npm install react@18.2.0 -w telnyxdotcom-ui
RUN npm install react-dom@18.2.0 -w telnyxdotcom-ui

# Build app
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

COPY --from=dependencies /app .

# Copy packages' source code
COPY ./packages/ui ./packages/ui
COPY ./packages/eslint-config ./packages/eslint-config
COPY ./packages/theme ./packages/theme

RUN npm run build-storybook --workspace=telnyxdotcom-ui

#
# (2/2) Run Storybook
#
FROM node:${NODE_VERSION} as runner
WORKDIR /app

COPY --from=builder /app/packages/ui/storybook-static /app/storybook-static

USER node
ARG PORT
ENV PORT ${PORT}
EXPOSE $PORT

# Start storybook server:
CMD npx http-server ./storybook-static -p ${PORT}

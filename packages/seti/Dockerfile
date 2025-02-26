ARG NODE_VERSION=20.7.0-alpine

FROM registry.internal.telnyx.com/docker/library/node:${NODE_VERSION}

WORKDIR /app
COPY package.json package-lock.json ./

# Copy packages' package.json
COPY ./packages/theme/package.json ./packages/theme/package.json
COPY ./packages/ui/package.json ./packages/ui/package.json
COPY ./packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY ./packages/seti/package.json ./packages/seti/package.json
ENV NODE_ENV production

RUN mkdir node_modules && npm ci

# Copy packages' source code
COPY ./packages/theme ./packages/theme
COPY ./packages/ui ./packages/ui
COPY ./packages/eslint-config ./packages/eslint-config
COPY ./packages/seti ./packages/seti

# Necessary as the entrypoint script is used in the build/runtime process
COPY ./packages/seti/docker-entrypoint.sh ./docker-entrypoint.sh
RUN ["chmod", "+x", "/app/docker-entrypoint.sh"]

# Assign build arguments to dev environment variable file
ARG NEXT_PUBLIC_RUNTIME_ENV
ARG BUILD_NUMBER
ARG BRANCH_NAME
ARG BUILD_NUMBER
ARG SERVICE_VERSION

RUN echo "NODE_ENV=production" > ./packages/seti/.env.production
RUN echo "NEXT_PUBLIC_RUNTIME_ENV=$NEXT_PUBLIC_RUNTIME_ENV" >> ./packages/seti/.env.production
RUN echo "NEXT_PUBLIC_BUILD_NUMBER=$BUILD_NUMBER" >> ./packages/seti/.env.production
RUN echo "NEXT_PUBLIC_BRANCH_NAME=$BRANCH_NAME" >> ./packages/seti/.env.production
RUN echo "NEXT_PUBLIC_SERVICE_VERSION=$SERVICE_VERSION" >> ./packages/seti/.env.production

RUN npm run build:seti

EXPOSE 3000
ENV PORT 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]

ARG NODE_VERSION=20.7.0-alpine

FROM node:${NODE_VERSION}

WORKDIR /app
COPY package.json package-lock.json ./

# Copy packages' package.json
COPY ./packages/theme/package.json ./packages/theme/package.json
COPY ./packages/ui/package.json ./packages/ui/package.json
COPY ./packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY ./packages/everroam/package.json ./packages/everroam/package.json
ENV NODE_ENV production

RUN mkdir node_modules && npm ci

# Copy packages' source code
COPY ./packages/theme ./packages/theme
COPY ./packages/ui ./packages/ui
COPY ./packages/eslint-config ./packages/eslint-config
COPY ./packages/everroam ./packages/everroam

# Necessary as the entrypoint script is used in the build/runtime process
COPY ./packages/everroam/docker-entrypoint.sh ./docker-entrypoint.sh
RUN ["chmod", "+x", "/app/docker-entrypoint.sh"]

# Assign build arguments to dev environment variable file
ARG NEXT_PUBLIC_RUNTIME_ENV
ARG BUILD_NUMBER
ARG SERVICE_VERSION
ARG CONTENTFUL_ACCESS_TOKEN
ARG CONTENTFUL_ACCESS_TOKEN_PREVIEW
ARG GOOGLE_SERVICE_ACCOUNT_EMAIL
ARG GOOGLE_PRIVATE_KEY

RUN echo "NODE_ENV=production" > ./packages/everroam/.env.production
RUN echo "NEXT_PUBLIC_RUNTIME_ENV=$NEXT_PUBLIC_RUNTIME_ENV" >> ./packages/everroam/.env.production
RUN echo "NEXT_PUBLIC_BUILD_NUMBER=$BUILD_NUMBER" >> ./packages/everroam/.env.production
RUN echo "SERVICE_VERSION=$SERVICE_VERSION" >> ./packages/everroam/.env.production
RUN echo "CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN" >> ./packages/everroam/.env.production
RUN echo "CONTENTFUL_ACCESS_TOKEN_PREVIEW=$CONTENTFUL_ACCESS_TOKEN_PREVIEW" >> ./packages/everroam/.env.production
RUN echo "GOOGLE_SERVICE_ACCOUNT_EMAIL=$GOOGLE_SERVICE_ACCOUNT_EMAIL" >> ./packages/everroam/.env.production
RUN echo "GOOGLE_PRIVATE_KEY=$GOOGLE_PRIVATE_KEY" >> ./packages/everroam/.env.production

RUN npm run build:everroam

EXPOSE 3000
ENV PORT 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]

ARG NODE_VERSION=20.7.0-alpine

FROM registry.internal.telnyx.com/docker/library/node:${NODE_VERSION}

WORKDIR /app
COPY package.json package-lock.json ./

# Copy packages' package.json
COPY ./packages/theme/package.json ./packages/theme/package.json
COPY ./packages/ui/package.json ./packages/ui/package.json
COPY ./packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY ./packages/telnyxdotcom/package.json ./packages/telnyxdotcom/package.json
ENV NODE_ENV production

RUN mkdir node_modules && npm ci

# Copy packages' source code
COPY ./packages/theme ./packages/theme
COPY ./packages/ui ./packages/ui
COPY ./packages/eslint-config ./packages/eslint-config
COPY ./packages/telnyxdotcom ./packages/telnyxdotcom
# Necessary as the entrypoint script is used in the build/runtime process
COPY ./packages/telnyxdotcom-stateful/docker-entrypoint.sh ./docker-entrypoint.sh
RUN ["chmod", "+x", "/app/docker-entrypoint.sh"]

# Assign build arguments to dev environment variable file
ARG ANALYTICS_SEGMENT_WRITE_KEY
ARG CONTENTFUL_ACCESS_TOKEN
ARG CONTENTFUL_ACCESS_TOKEN_BLOG
ARG CONTENTFUL_ACCESS_TOKEN_PREVIEW
ARG CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW
ARG STRAPI_ACCESS_TOKEN
ARG STRAPI_GITHUB_REPO_TOKEN
ARG CONTENTFUL_MANAGEMENT_TOKEN_ASSETS
ARG DOCUMENTS_API_KEY
ARG DOMO_CLIENT_ID
ARG DOMO_SECRET
ARG AIRTABLE_TOKEN
ARG BUILD_NUMBER
ARG SERVICE_VERSION
ARG RECAPTCHA_V3_SECRET
ARG NEUTRINO_SECRET_KEY
ARG NEUTRINO_SECRET_USER_ID
ARG NEXT_PUBLIC_RUNTIME_ENV
ARG SENDGRID_API_KEY
ARG SENDGRID_CONTACTS_API_KEY
ARG PORTAL_API_V2_KEY
ARG PORTAL_API_V2_KEY_PROD
ARG GOOGLE_SERVICE_ACCOUNT_EMAIL
ARG GOOGLE_PRIVATE_KEY
ARG PORTAL_CHATBOT_API_V2_KEY
ARG PORTAL_VOICE_AI_API_V2_KEY
ARG DISABLE_IN_MEMORY_CACHE

RUN echo "NODE_ENV=production" > ./packages/telnyxdotcom/.env.production
RUN echo "NEXT_PUBLIC_RUNTIME_ENV=$NEXT_PUBLIC_RUNTIME_ENV" >> ./packages/telnyxdotcom/.env.production
RUN echo "NEXT_PUBLIC_BUILD_NUMBER=$BUILD_NUMBER" >> ./packages/telnyxdotcom/.env.production
RUN echo "SERVICE_VERSION=$SERVICE_VERSION" >> ./packages/telnyxdotcom/.env.production
RUN echo "ANALYTICS_SEGMENT_WRITE_KEY=$ANALYTICS_SEGMENT_WRITE_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN" >> ./packages/telnyxdotcom/.env.production
RUN echo "CONTENTFUL_ACCESS_TOKEN_BLOG=$CONTENTFUL_ACCESS_TOKEN_BLOG" >> ./packages/telnyxdotcom/.env.production
RUN echo "CONTENTFUL_ACCESS_TOKEN_PREVIEW=$CONTENTFUL_ACCESS_TOKEN_PREVIEW" >> ./packages/telnyxdotcom/.env.production
RUN echo "CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW=$CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW" >> ./packages/telnyxdotcom/.env.production
RUN echo "STRAPI_ACCESS_TOKEN=$STRAPI_ACCESS_TOKEN" >> ./packages/telnyxdotcom/.env.production
RUN echo "STRAPI_GITHUB_REPO_TOKEN=$STRAPI_GITHUB_REPO_TOKEN" >> ./packages/telnyxdotcom/.env.production
RUN echo "CONTENTFUL_MANAGEMENT_TOKEN_ASSETS=$CONTENTFUL_MANAGEMENT_TOKEN_ASSETS" >> ./packages/telnyxdotcom/.env.production
RUN echo "DOCUMENTS_API_KEY=$DOCUMENTS_API_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "DOMO_CLIENT_ID=$DOMO_CLIENT_ID" >> ./packages/telnyxdotcom/.env.production
RUN echo "DOMO_SECRET=$DOMO_SECRET" >> ./packages/telnyxdotcom/.env.production
RUN echo "RECAPTCHA_V3_SECRET=$RECAPTCHA_V3_SECRET" >> ./packages/telnyxdotcom/.env.production
RUN echo "NEUTRINO_SECRET_KEY=$NEUTRINO_SECRET_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "NEUTRINO_SECRET_USER_ID=$NEUTRINO_SECRET_USER_ID" >> ./packages/telnyxdotcom/.env.production
RUN echo "SENDGRID_API_KEY=$SENDGRID_API_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "PORTAL_API_V2_KEY=$PORTAL_API_V2_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "PORTAL_API_V2_KEY_PROD=$PORTAL_API_V2_KEY_PROD" >> ./packages/telnyxdotcom/.env.production
RUN echo "GOOGLE_SERVICE_ACCOUNT_EMAIL=$GOOGLE_SERVICE_ACCOUNT_EMAIL" >> ./packages/telnyxdotcom/.env.production
RUN echo "GOOGLE_PRIVATE_KEY=$GOOGLE_PRIVATE_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "PORTAL_CHATBOT_API_V2_KEY=$PORTAL_CHATBOT_API_V2_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "PORTAL_VOICE_AI_API_V2_KEY=$PORTAL_VOICE_AI_API_V2_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "DISABLE_IN_MEMORY_CACHE=$DISABLE_IN_MEMORY_CACHE" >> ./packages/telnyxdotcom/.env.production

RUN npm run build:telnyxdotcom

RUN mv ./packages/telnyxdotcom/.next ./packages/telnyxdotcom/.next-init

EXPOSE 3000
ENV PORT 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]

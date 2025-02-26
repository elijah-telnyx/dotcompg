ARG NODE_VERSION=20.7.0-alpine

# Install dependencies
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./

# Copy packages' package.json
COPY ./packages/theme/package.json ./packages/theme/package.json
COPY ./packages/ui/package.json ./packages/ui/package.json
COPY ./packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY ./packages/telnyxdotcom/package.json ./packages/telnyxdotcom/package.json
ENV NODE_ENV production

RUN mkdir node_modules && npm ci

# use a single stage for building both because CMS API times out on paralled multistage build
FROM node:${NODE_VERSION} AS build

WORKDIR /staging

COPY --from=deps /app .

# Copy packages' source code
COPY ./packages/theme ./packages/theme
COPY ./packages/ui ./packages/ui
COPY ./packages/eslint-config ./packages/eslint-config
COPY ./packages/telnyxdotcom ./packages/telnyxdotcom

# Assign build arguments to dev environment variable file
ARG ANALYTICS_SEGMENT_WRITE_KEY
ARG CONTENTFUL_ACCESS_TOKEN
ARG CONTENTFUL_ACCESS_TOKEN_BLOG
ARG CONTENTFUL_ACCESS_TOKEN_PREVIEW
ARG CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW
ARG CONTENTFUL_MANAGEMENT_TOKEN_ASSETS
ARG DOCUMENTS_API_KEY
ARG DOMO_CLIENT_ID
ARG DOMO_SECRET
ARG AIRTABLE_TOKEN
ARG STRAPI_ACCESS_TOKEN
ARG BUILD_NUMBER
ARG RECAPTCHA_V3_SECRET
ARG NEUTRINO_SECRET_KEY
ARG NEUTRINO_SECRET_USER_ID
ARG SENDGRID_API_KEY
ARG SENDGRID_CONTACTS_API_KEY
ARG PORTAL_API_V2_KEY
ARG GOOGLE_SERVICE_ACCOUNT_EMAIL
ARG GOOGLE_PRIVATE_KEY
ARG PORTAL_CHATBOT_API_V2_KEY

RUN echo "NODE_ENV=production" > ./packages/telnyxdotcom/.env.production
RUN echo "NEXT_PUBLIC_RUNTIME_ENV=staging" >> ./packages/telnyxdotcom/.env.production
RUN echo "NEXT_PUBLIC_BUILD_NUMBER=$BUILD_NUMBER" >> ./packages/telnyxdotcom/.env.production
RUN echo "ANALYTICS_SEGMENT_WRITE_KEY=$ANALYTICS_SEGMENT_WRITE_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN" >> ./packages/telnyxdotcom/.env.production
RUN echo "CONTENTFUL_ACCESS_TOKEN_BLOG=$CONTENTFUL_ACCESS_TOKEN_BLOG" >> ./packages/telnyxdotcom/.env.production
RUN echo "CONTENTFUL_ACCESS_TOKEN_PREVIEW=$CONTENTFUL_ACCESS_TOKEN_PREVIEW" >> ./packages/telnyxdotcom/.env.production
RUN echo "CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW=$CONTENTFUL_ACCESS_TOKEN_BLOG_PREVIEW" >> ./packages/telnyxdotcom/.env.production
RUN echo "CONTENTFUL_MANAGEMENT_TOKEN_ASSETS=$CONTENTFUL_MANAGEMENT_TOKEN_ASSETS" >> ./packages/telnyxdotcom/.env.production
RUN echo "DOCUMENTS_API_KEY=$DOCUMENTS_API_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "DOMO_CLIENT_ID=$DOMO_CLIENT_ID" >> ./packages/telnyxdotcom/.env.production
RUN echo "DOMO_SECRET=$DOMO_SECRET" >> ./packages/telnyxdotcom/.env.production
RUN echo "RECAPTCHA_V3_SECRET=$RECAPTCHA_V3_SECRET" >> ./packages/telnyxdotcom/.env.production
RUN echo "NEUTRINO_SECRET_KEY=$NEUTRINO_SECRET_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "NEUTRINO_SECRET_USER_ID=$NEUTRINO_SECRET_USER_ID" >> ./packages/telnyxdotcom/.env.production
RUN echo "SENDGRID_API_KEY=$SENDGRID_API_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "SENDGRID_CONTACTS_API_KEY=$SENDGRID_CONTACTS_API_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "PORTAL_API_V2_KEY=$PORTAL_API_V2_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "GOOGLE_SERVICE_ACCOUNT_EMAIL=$GOOGLE_SERVICE_ACCOUNT_EMAIL" >> ./packages/telnyxdotcom/.env.production
RUN echo "GOOGLE_PRIVATE_KEY=$GOOGLE_PRIVATE_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "PORTAL_CHATBOT_API_V2_KEY=$PORTAL_CHATBOT_API_V2_KEY" >> ./packages/telnyxdotcom/.env.production
RUN echo "PORTAL_VOICE_AI_API_V2_KEY=$PORTAL_VOICE_AI_API_V2_KEY" >> ./packages/telnyxdotcom/.env.production

# Build staging
RUN npm run build:telnyxdotcom

WORKDIR /production

COPY --from=deps /app .

# Copy packages' source code
COPY ./packages/theme ./packages/theme
COPY ./packages/ui ./packages/ui
COPY ./packages/eslint-config ./packages/eslint-config
COPY ./packages/telnyxdotcom ./packages/telnyxdotcom

# Assign build arguments to production environment variable file
ARG ANALYTICS_SEGMENT_WRITE_KEY_PROD
ARG CONTENTFUL_ACCESS_TOKEN_PROD
ARG CONTENTFUL_ACCESS_TOKEN_BLOG_PROD
ARG DOCUMENTS_API_KEY_PROD
ARG BUILD_NUMBER_PROD
ARG RECAPTCHA_V3_SECRET_PROD
ARG NEUTRINO_SECRET_KEY_PROD
ARG NEUTRINO_SECRET_USER_ID_PROD
ARG SENDGRID_API_KEY_PROD
ARG PORTAL_API_V2_KEY_PROD

RUN echo "NODE_ENV=production" >./packages/telnyxdotcom/.env.production
RUN echo "NEXT_PUBLIC_RUNTIME_ENV=production" >>./packages/telnyxdotcom/.env.production
RUN echo "NEXT_PUBLIC_BUILD_NUMBER=$BUILD_NUMBER" >>./packages/telnyxdotcom/.env.production
RUN echo "ANALYTICS_SEGMENT_WRITE_KEY=$ANALYTICS_SEGMENT_WRITE_KEY_PROD" >>./packages/telnyxdotcom/.env.production
RUN echo "CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN_PROD" >>./packages/telnyxdotcom/.env.production
RUN echo "CONTENTFUL_ACCESS_TOKEN_BLOG=$CONTENTFUL_ACCESS_TOKEN_BLOG_PROD" >>./packages/telnyxdotcom/.env.production
RUN echo "CONTENTFUL_MANAGEMENT_TOKEN_ASSETS=$CONTENTFUL_MANAGEMENT_TOKEN_ASSETS" >>./packages/telnyxdotcom/.env.production
RUN echo "DOCUMENTS_API_KEY=$DOCUMENTS_API_KEY_PROD" >>./packages/telnyxdotcom/.env.production
RUN echo "RECAPTCHA_V3_SECRET=$RECAPTCHA_V3_SECRET_PROD" >>./packages/telnyxdotcom/.env.production
RUN echo "NEUTRINO_SECRET_KEY=$NEUTRINO_SECRET_KEY_PROD" >>./packages/telnyxdotcom/.env.production
RUN echo "NEUTRINO_SECRET_USER_ID=$NEUTRINO_SECRET_USER_ID_PROD" >>./packages/telnyxdotcom/.env.production
RUN echo "SENDGRID_API_KEY=$SENDGRID_API_KEY_PROD" >>./packages/telnyxdotcom/.env.production
RUN echo "PORTAL_API_V2_KEY=$PORTAL_API_V2_KEY_PROD" >>./packages/telnyxdotcom/.env.production
RUN echo "PORTAL_CHATBOT_API_V2_KEY=$PORTAL_CHATBOT_API_V2_KEY_PROD" >>./packages/telnyxdotcom/.env.production

# Build production
RUN npm run build:telnyxdotcom

# Run app
FROM node:${NODE_VERSION} AS runtime
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# necessary to copy node_modules until we use next standalone
COPY --from=deps /app ./deps/

# COPY STAGING FILES
COPY --from=build --chown=nextjs:nodejs /staging/packages/telnyxdotcom/.next ./staging/packages/telnyxdotcom/.next/
COPY --from=build /staging/packages/telnyxdotcom/public ./staging/packages/telnyxdotcom/public
COPY --from=build /staging/packages/telnyxdotcom/package.json ./staging/packages/telnyxdotcom/package.json
COPY --from=build /staging/packages/telnyxdotcom/next.config.mjs ./staging/packages/telnyxdotcom/next.config.mjs

# COPY PRODUCTION FILES
COPY --from=build --chown=nextjs:nodejs /production/packages/telnyxdotcom/.next ./production/packages/telnyxdotcom/.next/
COPY --from=build /production/packages/telnyxdotcom/public ./production/packages/telnyxdotcom/public
COPY --from=build /production/packages/telnyxdotcom/package.json ./production/packages/telnyxdotcom/package.json
COPY --from=build /production/packages/telnyxdotcom/next.config.mjs ./production/packages/telnyxdotcom/next.config.mjs

COPY ./packages/telnyxdotcom/docker-entrypoint.sh /app/docker-entrypoint.sh
RUN ["chmod", "+x", "/app/docker-entrypoint.sh"]

USER nextjs

EXPOSE 3000
ENV PORT 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
